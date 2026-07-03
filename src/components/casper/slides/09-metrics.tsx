import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { CountUp, FadeUp, GradientText, Stagger } from "./_helpers";

type Supporting = {
  label: string;
  metric: string;
  definition: string;
  target: string;
  delay: number;
};

const SUPPORTING: ReadonlyArray<Supporting> = [
  {
    label: "Quality",
    metric: "% resold at full price",
    definition: "Units restocked as A-stock at MSRP within 30 days.",
    target: "+3 pts vs. baseline",
    delay: 0.4,
  },
  {
    label: "Speed",
    metric: "Dispositioning cycle time",
    definition: "Seconds from scan to a confirmed disposition action.",
    target: "≤ current, don't regress",
    delay: 0.5,
  },
  {
    label: "Trust",
    metric: "Override rate",
    definition: "% of recs the associate overrides. Segmented by grade + category.",
    target: "Stable ≤ 25%, trending down",
    delay: 0.6,
  },
  {
    label: "Ops",
    metric: "Throughput (units / hr)",
    definition: "Units dispositioned per associate-hour.",
    target: "≥ current, +5% stretch",
    delay: 0.7,
  },
];

export const metricsSlide: Slide = {
  id: "metrics",
  title: "Metrics & value logic",
  section: "prd",
  render: () => (
    <SlideShell eyebrow="Metrics · What we measure and why">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            <GradientText>Recovery rate</GradientText> is the north star.
            Everything else supports or protects it.
          </h2>
        </FadeUp>

        <div className="mt-4 grid flex-1 grid-cols-[1.15fr_1fr] gap-4">
          {/* Left column: north star + supporting metrics table */}
          <div className="flex flex-col gap-3">
            {/* North star card */}
            <FadeUp>
              <div className="relative overflow-hidden rounded-2xl border border-purple-400/50 bg-gradient-to-br from-purple-500/25 via-fuchsia-500/15 to-transparent p-4">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-fuchsia-500/25 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-purple-200" aria-hidden />
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-purple-200">
                        North star
                      </p>
                    </div>
                    <p className="mt-1.5 text-[26px] font-semibold leading-tight text-white">
                      Recovery rate
                    </p>
                    <p className="mt-1 font-mono text-[11.5px] text-white/70">
                      = value recovered ÷ original retail value
                    </p>
                    <p className="mt-2 max-w-md text-[11.5px] leading-snug text-white/70">
                      The one number that captures whether we made the right call on this
                      unit — regardless of which channel it went to.
                    </p>
                  </div>
                  <div className="rounded-xl border border-purple-400/50 bg-black/30 px-4 py-3 text-center">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-purple-200/80">
                      MVP goal
                    </p>
                    <p className="mt-1 font-mono text-[22px] font-semibold text-white">
                      +5 pts
                    </p>
                    <p className="text-[9.5px] text-white/50">at 90 days post-launch</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Supporting metrics table */}
            <FadeUp>
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                  Supporting metrics · why each one exists
                </p>
                <div className="grid gap-2">
                  {SUPPORTING.map((s) => (
                    <motion.div
                      key={s.metric}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: s.delay }}
                      className="grid grid-cols-[70px_1fr_130px] gap-3 rounded-lg border border-white/5 bg-black/20 px-3 py-2"
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-300/70">
                        {s.label}
                      </span>
                      <div>
                        <p className="text-[12px] font-semibold text-white">{s.metric}</p>
                        <p className="text-[10.5px] leading-snug text-white/55">
                          {s.definition}
                        </p>
                      </div>
                      <span className="self-center text-right font-mono text-[10.5px] text-purple-200">
                        {s.target}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right: value logic */}
          <FadeUp>
            <div className="flex h-full flex-col rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-white/[0.04] to-fuchsia-500/[0.06] p-4">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-fuchsia-200" aria-hidden />
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                  Value logic · a representative $100 unit
                </p>
              </div>

              <p className="text-[11.5px] leading-snug text-white/65">
                A returned apparel item today vs. with the agent. This is why a "few points
                of recovery" is not a rounding error.
              </p>

              <div className="mt-3 space-y-2.5">
                {/* Baseline */}
                <div>
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span className="uppercase tracking-[0.18em] text-white/50">
                      Baseline
                    </span>
                    <span className="font-mono text-white/60">$100 retail</span>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/30 p-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[12px] text-white/80">Recovered value</span>
                      <span className="font-mono text-[18px] font-semibold text-white">
                        <CountUp to={35} prefix="$" duration={1.6} />
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-white/50">
                      48% resold full · 30% eaten by reverse logistics · rest markdown.
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.9, type: "spring", stiffness: 220 }}
                    className="flex items-center gap-1.5 rounded-full border border-purple-400/40 bg-purple-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-200"
                  >
                    <ArrowRight className="h-3 w-3" aria-hidden />
                    with the agent
                  </motion.div>
                </div>

                {/* With agent */}
                <div>
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span className="uppercase tracking-[0.18em] text-purple-200">
                      With agent
                    </span>
                    <span className="font-mono text-purple-200">
                      +5 pts recovery lift
                    </span>
                  </div>
                  <div className="rounded-lg border border-purple-400/50 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 p-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[12px] text-white/90">Recovered value</span>
                      <span className="font-mono text-[22px] font-semibold text-white">
                        <CountUp to={40} prefix="$" duration={1.8} />
                      </span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-purple-200/80">
                      +$5 per unit × millions of units per year = the ask.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-3">
                <div className="rounded-lg border border-white/10 bg-black/20 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    Scale check · at 5M units / yr
                  </p>
                  <p className="mt-1 text-[13px] leading-tight text-white">
                    <span className="font-semibold text-purple-200">$25M annualized</span>{" "}
                    recovery lift, before any surge or margin-mix effects.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
