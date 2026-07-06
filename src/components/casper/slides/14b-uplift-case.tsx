import { motion } from "framer-motion";
import {
  Boxes,
  Building2,
  Calculator,
  DollarSign,
  RefreshCcw,
  Store,
  Truck,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { CountUp, FadeUp, GradientText, Stagger } from "./_helpers";

type AssumptionRow = {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
};

const ASSUMPTIONS: ReadonlyArray<AssumptionRow> = [
  {
    icon: Building2,
    label: "Annual revenue",
    value: "$500M",
    detail: "Mid-sized US apparel retailer, DTC + wholesale mix.",
  },
  {
    icon: Truck,
    label: "Online return rate",
    value: "24.5%",
    detail: "NRF 2024 benchmark for online apparel returns.",
  },
  {
    icon: Boxes,
    label: "Returned units / yr",
    value: "~2.4M",
    detail: "At ~$50 avg. retail on the returns pool.",
  },
  {
    icon: Store,
    label: "Recovery rate today",
    value: "35%",
    detail: "Eightx apparel band. What we're improving on.",
  },
];

type Sensitivity = {
  label: string;
  points: string;
  dollars: string;
  note: string;
  emphasis?: "primary" | "stretch";
  barWidth: string;
  delay: number;
};

const SENSITIVITY: ReadonlyArray<Sensitivity> = [
  {
    label: "Conservative",
    points: "+2 pts",
    dollars: "+$2.4M",
    note: "If we only clear the low bar.",
    barWidth: "20%",
    delay: 0.55,
  },
  {
    label: "First-version goal",
    points: "+5 pts",
    dollars: "+$6.0M",
    note: "The number carried through the deck.",
    emphasis: "primary",
    barWidth: "50%",
    delay: 0.65,
  },
  {
    label: "Optoro floor",
    points: "+8 pts",
    dollars: "+$9.6M",
    note: "Bottom of Optoro's published 10–30% lift band.",
    barWidth: "80%",
    delay: 0.75,
  },
  {
    label: "Stretch",
    points: "+12 pts",
    dollars: "+$14.4M",
    note: "Middle of the Optoro band — for reference only.",
    emphasis: "stretch",
    barWidth: "100%",
    delay: 0.85,
  },
];

type ValueSource = {
  headline: string;
  detail: string;
};

const VALUE_SOURCES: ReadonlyArray<ValueSource> = [
  {
    headline: "Fewer low-recovery calls",
    detail:
      "Sellable items no longer routed to liquidation. Every rescued item is a step-change in $ recovered.",
  },
  {
    headline: "Faster time-to-shelf",
    detail:
      "Faster disposition means faster resale — less markdown decay for items sent back to the main channel.",
  },
  {
    headline: "Fewer destroyed units",
    detail:
      "Sustainability rules obeyed by default. Fewer write-offs, fewer regulatory risks (EU 2026).",
  },
];

export const upliftCaseSlide: Slide = {
  id: "uplift-case",
  title: "Appendix · Uplift sized to a $500M retailer",
  section: "appendix",
  render: () => (
    <SlideShell eyebrow="Appendix · What the uplift looks like at real volume">
      <Stagger gap={0.06} fill>
        <FadeUp>
          <h2 className="text-[32px] font-semibold leading-[1.1] tracking-tight text-white">
            Same math, sized to a{" "}
            <GradientText>$500M apparel retailer.</GradientText>
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-1.5 max-w-4xl text-[12px] leading-snug text-white/60">
            The deck talks about +5 points of recovery. Applied to a prototypical
            mid-sized apparel retailer, here is what that number looks like in dollars
            and units. Assumptions on the left, sensitivity to different lift bands on
            the right.
          </p>
        </FadeUp>

        {/* Top strip: retailer profile */}
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {ASSUMPTIONS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-3"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-200">
                  <a.icon className="h-3.5 w-3.5" aria-hidden />
                </span>
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                  {a.label}
                </p>
              </div>
              <p className="mt-2 font-mono text-[22px] font-semibold leading-none text-white">
                {a.value}
              </p>
              <p className="mt-1.5 text-[10.5px] leading-snug text-white/55">
                {a.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Middle: math + sensitivity */}
        <div className="mt-3 grid min-h-0 flex-1 grid-cols-[1fr_1.15fr] gap-3">
          {/* Left: today vs. with agent + big impact number */}
          <FadeUp className="min-h-0">
            <div className="flex h-full flex-col rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 via-purple-500/10 to-transparent p-4">
              <div className="mb-2 flex items-center gap-2">
                <Calculator className="h-4 w-4 text-fuchsia-200" aria-hidden />
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                  The lift, in dollars
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-white/10 bg-black/30 p-2.5">
                  <p className="text-[9.5px] uppercase tracking-[0.16em] text-white/50">
                    Today
                  </p>
                  <p className="mt-1 font-mono text-[24px] font-semibold text-white">
                    <CountUp to={35} suffix="%" duration={1.6} />
                  </p>
                  <p className="text-[10px] text-white/50">recovery rate</p>
                  <p className="mt-2 text-[10.5px] leading-snug text-white/70">
                    <span className="font-semibold text-white">$42.9M</span> recovered
                    per year, of{" "}
                    <span className="font-semibold text-white">$122.5M</span> in
                    returned goods.
                  </p>
                </div>

                <div className="rounded-xl border border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-500/25 to-purple-500/20 p-2.5">
                  <div className="flex items-center justify-between">
                    <p className="text-[9.5px] uppercase tracking-[0.16em] text-fuchsia-100/80">
                      With agent
                    </p>
                    <span className="font-mono text-[10px] text-fuchsia-100">
                      +5 pts
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[24px] font-semibold text-white">
                    <CountUp to={40} suffix="%" duration={1.8} />
                  </p>
                  <p className="text-[10px] text-fuchsia-100/80">recovery rate</p>
                  <p className="mt-2 text-[10.5px] leading-snug text-white/85">
                    <span className="font-semibold text-white">$48.9M</span>{" "}
                    recovered — the goal recovery band we anchored the deck to.
                  </p>
                </div>
              </div>

              {/* Big impact tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 flex items-center gap-3 rounded-2xl border border-fuchsia-300/40 bg-black/40 px-3 py-2.5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-fuchsia-500/25 text-fuchsia-100">
                  <DollarSign className="h-4 w-4" aria-hidden />
                </span>
                <div className="flex-1">
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200/85">
                    Net recovered value · year one
                  </p>
                  <p className="mt-0.5 font-mono text-[26px] font-semibold leading-none text-white">
                    +$6.0M / year
                  </p>
                </div>
                <p className="max-w-[9rem] text-right text-[9.5px] leading-snug text-white/60">
                  ~$2.50 back per returned unit, on average — before any second-order
                  gains.
                </p>
              </motion.div>

              {/* Cumulative */}
              <div className="mt-auto pt-3">
                <div className="rounded-lg border border-white/10 bg-black/25 px-3 py-2">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/50">
                    Over three years, at the goal band
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-white/85">
                    <span className="font-semibold text-fuchsia-200">~$18M</span>{" "}
                    recovered against a build cost measured in a single-digit-million
                    engagement.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Right: sensitivity + where value comes from */}
          <FadeUp className="min-h-0">
            <div className="flex h-full flex-col gap-3">
              <div className="rounded-2xl border border-purple-400/30 bg-white/[0.03] p-3.5">
                <div className="mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-300" aria-hidden />
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-purple-300/80">
                    Sensitivity · four uplift bands
                  </p>
                </div>
                <div className="space-y-1.5">
                  {SENSITIVITY.map((s) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: s.delay }}
                      className={
                        s.emphasis === "primary"
                          ? "grid grid-cols-[92px_1fr_92px] items-center gap-2 rounded-lg border border-fuchsia-400/50 bg-fuchsia-500/[0.1] px-2.5 py-1.5"
                          : s.emphasis === "stretch"
                            ? "grid grid-cols-[92px_1fr_92px] items-center gap-2 rounded-lg border border-purple-400/25 bg-purple-500/[0.04] px-2.5 py-1.5"
                            : "grid grid-cols-[92px_1fr_92px] items-center gap-2 rounded-lg border border-white/8 bg-black/25 px-2.5 py-1.5"
                      }
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/75">
                          {s.label}
                        </span>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center justify-between text-[10px] text-white/70">
                          <span className="font-mono">{s.points}</span>
                          <span className="text-[9.5px] text-white/45">
                            {s.note}
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: s.barWidth }}
                            transition={{
                              duration: 0.9,
                              delay: s.delay + 0.15,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className={
                              s.emphasis === "primary"
                                ? "h-full rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-400"
                                : s.emphasis === "stretch"
                                  ? "h-full rounded-full bg-gradient-to-r from-purple-500/70 to-fuchsia-400/70"
                                  : "h-full rounded-full bg-gradient-to-r from-purple-400/60 to-purple-300/60"
                            }
                          />
                        </div>
                      </div>
                      <p
                        className={`text-right font-mono text-[13px] font-semibold ${
                          s.emphasis === "primary"
                            ? "text-fuchsia-100"
                            : "text-white/85"
                        }`}
                      >
                        {s.dollars}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-2 text-[9.5px] leading-snug text-white/40">
                  All dollar figures assume $122.5M in returned goods per year. Each
                  1-point lift = ~$1.2M recovered.
                </p>
              </div>

              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                <div className="mb-2 flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4 text-fuchsia-200" aria-hidden />
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200/85">
                    Where the recovered dollars come from
                  </p>
                </div>
                <ul className="space-y-1.5">
                  {VALUE_SOURCES.map((v, i) => (
                    <motion.li
                      key={v.headline}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.95 + i * 0.08 }}
                      className="flex gap-2 text-[11px] leading-snug text-white/80"
                    >
                      <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fuchsia-300" />
                      <span>
                        <span className="font-semibold text-white">
                          {v.headline}.
                        </span>{" "}
                        {v.detail}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>

        <p className="mt-2 text-[9.5px] leading-snug text-white/35">
          Illustrative model, not a client pitch. Return-rate benchmark from NRF 2024;
          category recovery band from Eightx 2026; Optoro lift band from public
          claims. Real engagements would replace every assumption with the retailer's
          own numbers in week one.
        </p>
      </Stagger>
    </SlideShell>
  ),
};
