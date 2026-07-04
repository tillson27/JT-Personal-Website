import { motion } from "framer-motion";
import { Clock, TrendingDown } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { AnimatedBar, CountUp, FadeUp, GradientText, Stagger } from "./_helpers";

function AnchorStat({
  value,
  unit,
  label,
  sourceLabel,
  sourceHref,
  delay,
  primary,
}: {
  value: number;
  unit: string;
  label: React.ReactNode;
  sourceLabel: string;
  sourceHref: string;
  delay: number;
  primary?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={
        primary
          ? "relative flex-1 overflow-hidden rounded-2xl border border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-500/25 via-purple-500/15 to-transparent p-4"
          : "relative flex-1 overflow-hidden rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-500/20 via-fuchsia-500/10 to-transparent p-4"
      }
    >
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <p
        className={
          primary
            ? "relative text-[10.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200"
            : "relative text-[10.5px] font-semibold uppercase tracking-[0.24em] text-purple-200"
        }
      >
        {primary ? "The gap" : "The hidden cost"}
      </p>
      <div className="relative mt-1.5 flex items-baseline gap-1">
        <CountUp
          to={value}
          suffix={unit}
          duration={1.8}
          className="text-[54px] font-semibold leading-none tracking-tight text-white"
        />
      </div>
      <p className="relative mt-2 text-[12.5px] leading-snug text-white/85">{label}</p>
      <a
        href={sourceHref}
        target="_blank"
        rel="noreferrer noopener"
        className="relative mt-2 inline-block text-[9.5px] uppercase tracking-[0.18em] text-white/40 underline-offset-4 transition hover:text-purple-200 hover:underline"
      >
        Source · {sourceLabel}
      </a>
    </motion.div>
  );
}

function CategoryBar({
  category,
  percent,
  color,
  delay,
}: {
  category: string;
  percent: string;
  color: string;
  delay: number;
}) {
  const num = parseFloat(percent);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[12px]">
        <span className="text-white/80">{category}</span>
        <span className="font-mono font-semibold text-white">{percent}</span>
      </div>
      <AnimatedBar percent={num * 2} color={color} delay={delay} />
    </div>
  );
}

function SourceLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/40 underline-offset-4 transition hover:text-purple-200 hover:underline"
    >
      {children}
    </a>
  );
}

export const statsSlide: Slide = {
  id: "stats",
  title: "Where the money actually leaks",
  section: "discovery",
  render: () => (
    <SlideShell eyebrow="Discovery · The returns problem in three numbers">
      <Stagger gap={0.06} fill>
        <FadeUp>
          <h2 className="text-[32px] font-semibold leading-[1.05] tracking-tight text-white">
            Empty shelves make the news.{" "}
            <GradientText>Returns lose more money, and no one is watching.</GradientText>
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-1.5 max-w-4xl text-[12px] leading-snug text-white/60">
            A quick primer. When a customer sends an item back, it travels through what
            the industry calls <span className="font-semibold text-white">reverse logistics</span>:
            the shipping, sorting, inspecting, and re-routing work needed before that item
            can be sold again or written off. Every step costs money. Three numbers show
            how fast that cost adds up.
          </p>
        </FadeUp>

        <div className="mt-3 flex gap-3">
          <AnchorStat
            value={52}
            unit="%"
            label={
              <>
                of returned apparel is{" "}
                <span className="font-semibold text-white">not</span> resold at full
                price. It ends up on markdown, in outlet stores, sold in bulk to
                liquidators, or destroyed.
              </>
            }
            sourceLabel="Eightx · reverse logistics analysis"
            sourceHref="https://eightx.co/blog/reverse-logistics"
            delay={0.3}
            primary
          />
          <AnchorStat
            value={30}
            unit="%"
            label={
              <>
                of an item's original value can be eaten up just by the work of
                processing the return (labour, inspection, restock, shipping).
              </>
            }
            sourceLabel="Eightx · 20–30% range cited"
            sourceHref="https://eightx.co/blog/reverse-logistics"
            delay={0.45}
          />
          <AnchorStat
            value={45}
            unit="s"
            label={
              <>
                is how long a warehouse worker takes to decide{" "}
                <span className="font-semibold text-white">where a single item should go.</span>{" "}
                Multiply that by warehouse volume.
              </>
            }
            sourceLabel="Optoro · reverse-ops benchmarks"
            sourceHref="https://www.optoro.com/resource/"
            delay={0.6}
          />
        </div>

        <div className="mt-3 grid min-h-0 flex-1 grid-cols-2 gap-3">
          <FadeUp className="min-h-0">
            <div className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                Apparel is the worst category
              </p>
              <p className="mt-1 text-[11.5px] text-white/60">
                Share of orders returned, by category. Apparel and shoes lead by
                a wide margin.
              </p>
              <div className="mt-2.5 space-y-2">
                <CategoryBar
                  category="Shoes"
                  percent="31.4%"
                  color="from-fuchsia-400 to-purple-400"
                  delay={0.7}
                />
                <CategoryBar
                  category="Apparel (avg)"
                  percent="25.0%"
                  color="from-purple-400 to-fuchsia-400"
                  delay={0.8}
                />
                <CategoryBar
                  category="Electronics"
                  percent="12.0%"
                  color="from-purple-500/60 to-purple-400/60"
                  delay={0.9}
                />
                <CategoryBar
                  category="Beauty"
                  percent="8.0%"
                  color="from-purple-500/40 to-purple-400/40"
                  delay={1.0}
                />
              </div>
              <p className="mt-auto pt-2 text-[9.5px] leading-snug text-white/40">
                <SourceLink href="https://www.richpanel.com/blog/ecommerce-return-rates">
                  Richpanel · Eightx category benchmarks (2025)
                </SourceLink>
              </p>
            </div>
          </FadeUp>

          <FadeUp className="min-h-0">
            <div className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                And every day of waiting makes it worse
              </p>
              <ul className="mt-2 space-y-1.5 text-[11.5px] leading-snug text-white/85">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[9px] font-semibold text-purple-200">
                    01
                  </span>
                  <span>
                    US retailers expect{" "}
                    <span className="font-semibold text-white">$890B</span> in returns for
                    2025. That is <span className="font-semibold text-white">16.9%</span>{" "}
                    of everything sold, and online returns run near{" "}
                    <span className="font-semibold text-white">24.5%</span>.
                    <br />
                    <SourceLink href="https://nrf.com/research/2024-consumer-returns-retail-industry">
                      National Retail Federation, 2024
                    </SourceLink>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[9px] font-semibold text-purple-200">
                    02
                  </span>
                  <span>
                    Returned apparel that sits for even a few weeks loses{" "}
                    <span className="font-semibold text-white">25–50%</span> of its price
                    to markdowns. About <span className="font-semibold text-white">50–60%</span>{" "}
                    of returned apparel needs cleaning or minor repair before it can be
                    resold.
                    <br />
                    <SourceLink href="https://www.theindustry.fashion/">
                      TheIndustry.fashion, 2025
                    </SourceLink>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-fuchsia-500/20 text-[9px] font-semibold text-fuchsia-200">
                    <Clock className="h-3 w-3" />
                  </span>
                  <span>
                    A worker at a mid-sized warehouse makes{" "}
                    <span className="font-semibold text-white">400 to 800</span>{" "}
                    calls per shift on where each returned item should go, mostly by
                    gut feel and habit.
                    <br />
                    <SourceLink href="https://www.optoro.com/">
                      Optoro · reverse logistics benchmarks
                    </SourceLink>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-fuchsia-500/20 text-[9px] font-semibold text-fuchsia-200">
                    <TrendingDown className="h-3 w-3" />
                  </span>
                  <span>
                    <span className="font-semibold text-white">EU 2026:</span> a new law
                    bans destroying unsold clothing. Wrong calls now come with
                    regulatory risk on top of the wasted margin.
                    <br />
                    <SourceLink href="https://commission.europa.eu/energy-climate-change-environment/standards-tools-and-labels/products-labelling-rules-and-requirements/sustainable-products/ecodesign-sustainable-products-regulation_en">
                      EU Ecodesign for Sustainable Products Regulation
                    </SourceLink>
                  </span>
                </li>
              </ul>
            </div>
          </FadeUp>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
