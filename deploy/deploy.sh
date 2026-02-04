#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────
# Manual deploy script for joshtillson.com
# Builds the site, syncs to S3, and invalidates CloudFront cache
# ─────────────────────────────────────────────────────────────

BUCKET_NAME="${S3_BUCKET:-joshtillson.com}"
DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID:-}"
REGION="${AWS_REGION:-ca-central-1}"

if [ -z "${DISTRIBUTION_ID}" ]; then
  echo "ERROR: CLOUDFRONT_DISTRIBUTION_ID is not set."
  echo "Set it as an environment variable or pass it as an argument:"
  echo "  CLOUDFRONT_DISTRIBUTION_ID=EXXXXX ./deploy/deploy.sh"
  exit 1
fi

# Move to project root
cd "$(dirname "$0")/.."

echo "==> Building site..."
npm run build

echo ""
echo "==> Syncing dist/ to s3://${BUCKET_NAME}..."
aws s3 sync dist/ "s3://${BUCKET_NAME}" \
  --region "${REGION}" \
  --delete

echo ""
echo "==> Invalidating CloudFront cache..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "${DISTRIBUTION_ID}" \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)

echo "    Invalidation created: ${INVALIDATION_ID}"

echo ""
echo "==> Deploy complete!"
echo "    Site will be updated once the CloudFront invalidation propagates."
