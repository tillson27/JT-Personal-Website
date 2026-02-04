#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────
# One-time AWS infrastructure setup for joshtillson.com
# Prerequisites: AWS CLI configured with appropriate permissions
# ─────────────────────────────────────────────────────────────

DOMAIN="joshtillson.com"
BUCKET_NAME="joshtillson.com"
REGION="ca-central-1"

echo "==> Setting up AWS infrastructure for ${DOMAIN}"
echo ""

# ─── 1. Create S3 Bucket ────────────────────────────────────
echo "==> Creating S3 bucket: ${BUCKET_NAME}"
if aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>/dev/null; then
  echo "    Bucket already exists, skipping."
else
  aws s3api create-bucket \
    --bucket "${BUCKET_NAME}" \
    --region "${REGION}" \
    --create-bucket-configuration LocationConstraint="${REGION}"
  echo "    Bucket created."
fi

# Block all public access (CloudFront will access via OAC)
aws s3api put-public-access-block \
  --bucket "${BUCKET_NAME}" \
  --public-access-block-configuration \
    BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
echo "    Public access blocked."

# ─── 2. Request ACM Certificate ─────────────────────────────
echo ""
echo "==> Requesting ACM certificate for ${DOMAIN} and www.${DOMAIN}"

EXISTING_CERT_ARN=$(aws acm list-certificates \
  --region us-east-1 \
  --query "CertificateSummaryList[?DomainName=='${DOMAIN}'].CertificateArn | [0]" \
  --output text 2>/dev/null || true)

if [ "${EXISTING_CERT_ARN}" != "None" ] && [ -n "${EXISTING_CERT_ARN}" ]; then
  CERT_ARN="${EXISTING_CERT_ARN}"
  echo "    Using existing certificate: ${CERT_ARN}"
else
  CERT_ARN=$(aws acm request-certificate \
    --region us-east-1 \
    --domain-name "${DOMAIN}" \
    --subject-alternative-names "www.${DOMAIN}" \
    --validation-method DNS \
    --query 'CertificateArn' \
    --output text)
  echo "    Certificate requested: ${CERT_ARN}"
fi

# ─── 3. DNS Validation for ACM ──────────────────────────────
echo ""
echo "==> Waiting for ACM to provide DNS validation records..."
sleep 10

CERT_STATUS=$(aws acm describe-certificate \
  --region us-east-1 \
  --certificate-arn "${CERT_ARN}" \
  --query 'Certificate.Status' \
  --output text)

if [ "${CERT_STATUS}" = "ISSUED" ]; then
  echo "    Certificate already issued."
else
  # Get the hosted zone ID
  HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name \
    --dns-name "${DOMAIN}" \
    --query "HostedZones[?Name=='${DOMAIN}.'].Id | [0]" \
    --output text | sed 's|/hostedzone/||')

  if [ -z "${HOSTED_ZONE_ID}" ] || [ "${HOSTED_ZONE_ID}" = "None" ]; then
    echo "    ERROR: No Route 53 hosted zone found for ${DOMAIN}"
    echo "    Create one manually: aws route53 create-hosted-zone --name ${DOMAIN} --caller-reference \$(date +%s)"
    echo "    Then update your domain registrar's nameservers to point to the Route 53 hosted zone."
    exit 1
  fi

  echo "    Found hosted zone: ${HOSTED_ZONE_ID}"

  # Create DNS validation records in Route 53
  VALIDATION_RECORDS=$(aws acm describe-certificate \
    --region us-east-1 \
    --certificate-arn "${CERT_ARN}" \
    --query 'Certificate.DomainValidationOptions[].ResourceRecord' \
    --output json)

  echo "${VALIDATION_RECORDS}" | jq -c '.[]' | while read -r record; do
    NAME=$(echo "${record}" | jq -r '.Name')
    VALUE=$(echo "${record}" | jq -r '.Value')
    TYPE=$(echo "${record}" | jq -r '.Type')

    # Add validation CNAME to Route 53
    aws route53 change-resource-record-sets \
      --hosted-zone-id "${HOSTED_ZONE_ID}" \
      --change-batch "{
        \"Changes\": [{
          \"Action\": \"UPSERT\",
          \"ResourceRecordSet\": {
            \"Name\": \"${NAME}\",
            \"Type\": \"${TYPE}\",
            \"TTL\": 300,
            \"ResourceRecords\": [{\"Value\": \"${VALUE}\"}]
          }
        }]
      }" > /dev/null
    echo "    Added validation record: ${NAME}"
  done

  echo ""
  echo "==> Waiting for certificate validation (this can take a few minutes)..."
  aws acm wait certificate-validated \
    --region us-east-1 \
    --certificate-arn "${CERT_ARN}"
  echo "    Certificate validated and issued."
fi

# ─── 4. Create CloudFront Origin Access Control ─────────────
echo ""
echo "==> Setting up CloudFront Origin Access Control"

OAC_ID=$(aws cloudfront list-origin-access-controls \
  --query "OriginAccessControlList.Items[?Name=='${DOMAIN}-oac'].Id | [0]" \
  --output text 2>/dev/null || true)

if [ "${OAC_ID}" != "None" ] && [ -n "${OAC_ID}" ]; then
  echo "    Using existing OAC: ${OAC_ID}"
else
  OAC_ID=$(aws cloudfront create-origin-access-control \
    --origin-access-control-config "{
      \"Name\": \"${DOMAIN}-oac\",
      \"Description\": \"OAC for ${DOMAIN}\",
      \"SigningProtocol\": \"sigv4\",
      \"SigningBehavior\": \"always\",
      \"OriginAccessControlOriginType\": \"s3\"
    }" \
    --query 'OriginAccessControl.Id' \
    --output text)
  echo "    Created OAC: ${OAC_ID}"
fi

# ─── 5. Create CloudFront Distribution ──────────────────────
echo ""
echo "==> Creating CloudFront distribution"

EXISTING_DIST_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?Aliases.Items[0]=='${DOMAIN}'].Id | [0]" \
  --output text 2>/dev/null || true)

if [ "${EXISTING_DIST_ID}" != "None" ] && [ -n "${EXISTING_DIST_ID}" ]; then
  DISTRIBUTION_ID="${EXISTING_DIST_ID}"
  echo "    Using existing distribution: ${DISTRIBUTION_ID}"
else
  DIST_CONFIG=$(cat <<ENDJSON
{
  "CallerReference": "$(date +%s)",
  "Aliases": {
    "Quantity": 2,
    "Items": ["${DOMAIN}", "www.${DOMAIN}"]
  },
  "DefaultRootObject": "index.html",
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "S3-${BUCKET_NAME}",
      "DomainName": "${BUCKET_NAME}.s3.${REGION}.amazonaws.com",
      "OriginAccessControlId": "${OAC_ID}",
      "S3OriginConfig": {
        "OriginAccessIdentity": ""
      }
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-${BUCKET_NAME}",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"],
      "CachedMethods": {
        "Quantity": 2,
        "Items": ["GET", "HEAD"]
      }
    },
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "Compress": true
  },
  "CustomErrorResponses": {
    "Quantity": 2,
    "Items": [
      {
        "ErrorCode": 403,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 0
      },
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 0
      }
    ]
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "${CERT_ARN}",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  },
  "Enabled": true,
  "HttpVersion": "http2and3",
  "Comment": "${DOMAIN} static site",
  "PriceClass": "PriceClass_100"
}
ENDJSON
)

  DISTRIBUTION_ID=$(aws cloudfront create-distribution \
    --distribution-config "${DIST_CONFIG}" \
    --query 'Distribution.Id' \
    --output text)
  echo "    Created distribution: ${DISTRIBUTION_ID}"
fi

# Get the CloudFront domain name
CF_DOMAIN=$(aws cloudfront get-distribution \
  --id "${DISTRIBUTION_ID}" \
  --query 'Distribution.DomainName' \
  --output text)
echo "    CloudFront domain: ${CF_DOMAIN}"

# ─── 6. Set S3 Bucket Policy for CloudFront OAC ─────────────
echo ""
echo "==> Setting S3 bucket policy for CloudFront access"

ACCOUNT_ID=$(aws sts get-caller-identity --query 'Account' --output text)

aws s3api put-bucket-policy \
  --bucket "${BUCKET_NAME}" \
  --policy "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [{
      \"Sid\": \"AllowCloudFrontServicePrincipalReadOnly\",
      \"Effect\": \"Allow\",
      \"Principal\": {
        \"Service\": \"cloudfront.amazonaws.com\"
      },
      \"Action\": \"s3:GetObject\",
      \"Resource\": \"arn:aws:s3:::${BUCKET_NAME}/*\",
      \"Condition\": {
        \"StringEquals\": {
          \"AWS:SourceArn\": \"arn:aws:cloudfront::${ACCOUNT_ID}:distribution/${DISTRIBUTION_ID}\"
        }
      }
    }]
  }"
echo "    Bucket policy set."

# ─── 7. Create Route 53 DNS Records ─────────────────────────
echo ""
echo "==> Creating Route 53 DNS records"

# Re-fetch hosted zone ID in case we skipped the cert validation section
if [ -z "${HOSTED_ZONE_ID:-}" ]; then
  HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name \
    --dns-name "${DOMAIN}" \
    --query "HostedZones[?Name=='${DOMAIN}.'].Id | [0]" \
    --output text | sed 's|/hostedzone/||')
fi

if [ -z "${HOSTED_ZONE_ID}" ] || [ "${HOSTED_ZONE_ID}" = "None" ]; then
  echo "    WARNING: No Route 53 hosted zone found for ${DOMAIN}"
  echo "    You'll need to create DNS records manually pointing to: ${CF_DOMAIN}"
else
  # A record for apex domain
  aws route53 change-resource-record-sets \
    --hosted-zone-id "${HOSTED_ZONE_ID}" \
    --change-batch "{
      \"Changes\": [
        {
          \"Action\": \"UPSERT\",
          \"ResourceRecordSet\": {
            \"Name\": \"${DOMAIN}\",
            \"Type\": \"A\",
            \"AliasTarget\": {
              \"HostedZoneId\": \"Z2FDTNDATAQYW2\",
              \"DNSName\": \"${CF_DOMAIN}\",
              \"EvaluateTargetHealth\": false
            }
          }
        },
        {
          \"Action\": \"UPSERT\",
          \"ResourceRecordSet\": {
            \"Name\": \"${DOMAIN}\",
            \"Type\": \"AAAA\",
            \"AliasTarget\": {
              \"HostedZoneId\": \"Z2FDTNDATAQYW2\",
              \"DNSName\": \"${CF_DOMAIN}\",
              \"EvaluateTargetHealth\": false
            }
          }
        },
        {
          \"Action\": \"UPSERT\",
          \"ResourceRecordSet\": {
            \"Name\": \"www.${DOMAIN}\",
            \"Type\": \"A\",
            \"AliasTarget\": {
              \"HostedZoneId\": \"Z2FDTNDATAQYW2\",
              \"DNSName\": \"${CF_DOMAIN}\",
              \"EvaluateTargetHealth\": false
            }
          }
        },
        {
          \"Action\": \"UPSERT\",
          \"ResourceRecordSet\": {
            \"Name\": \"www.${DOMAIN}\",
            \"Type\": \"AAAA\",
            \"AliasTarget\": {
              \"HostedZoneId\": \"Z2FDTNDATAQYW2\",
              \"DNSName\": \"${CF_DOMAIN}\",
              \"EvaluateTargetHealth\": false
            }
          }
        }
      ]
    }" > /dev/null
  echo "    DNS records created for ${DOMAIN} and www.${DOMAIN}"
fi

# ─── Done ────────────────────────────────────────────────────
echo ""
echo "=========================================="
echo "  Infrastructure setup complete!"
echo "=========================================="
echo ""
echo "  CloudFront Distribution ID: ${DISTRIBUTION_ID}"
echo "  CloudFront Domain: ${CF_DOMAIN}"
echo "  S3 Bucket: ${BUCKET_NAME}"
echo "  Certificate ARN: ${CERT_ARN}"
echo ""
echo "  Add these GitHub Secrets to your repo:"
echo "    AWS_ACCESS_KEY_ID       = <your key>"
echo "    AWS_SECRET_ACCESS_KEY   = <your secret>"
echo "    AWS_REGION              = ${REGION}"
echo "    S3_BUCKET               = ${BUCKET_NAME}"
echo "    CLOUDFRONT_DISTRIBUTION_ID = ${DISTRIBUTION_ID}"
echo ""
echo "  The CloudFront distribution may take 5-15 minutes to deploy."
echo "  Check status: aws cloudfront get-distribution --id ${DISTRIBUTION_ID} --query 'Distribution.Status'"
echo ""
