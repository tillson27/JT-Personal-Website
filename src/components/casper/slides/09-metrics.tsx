import { motion } from "framer-motion";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { CountUp, FadeUp, GradientText, Stagger } from "./_helpers";

function SupportingMetric({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-300/70">
        {label}
      </p>
      <p className="mt-1 text-[14px] font-semibold text-white">{value}</p>
    </motion.div>
  );
}

export const metricsSlide: Slide = {
  id: "metrics",
  title: "Metrics & value logic",
  section: "prd",
  render: () => (
    <SlideShell eyebrow="Metrics · Value logic">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[38px] font-semibold leading-[1.1] tracking-tight text-white">
            <GradientText>Recovery rate</GradientText> is the north star.
            Everything else supports it.
          </h2>
        </FadeUp>

        <div className="mt-6 grid flex-1 grid-cols-[1.2fr_1fr] gap-6">
          {/* Left: North star + supporting */}
          <div className="flex flex-col gap-4">
            <FadeUp>
              <div className="relative overflow-hidden rounded-2xl border border-purple-400/50 bg-gradient-to-br from-purple-500/25 via-fuchsia-500/15 to-transparent p-5">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-fuchsia-500/25 blur-3xl" />
                <div className="relative flex items-center gap-2">
                  <Star className="h-4 w-4 text-purple-200" aria-hidden />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-200">
                    North star
                  </p>
                </div>
                <p className="relative mt-2 text-[26px] font-semibold leading-tight text-white">
                  Recovery rate
                </p>
                <p className="relative mt-1 font-mono text-[12px] text-white/70">
                  = value recovered / original retail value
                </p>
              </div>
            </FadeUp>

            <FadeUp>
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  Supporting metrics
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <SupportingMetric
                    label="Quality"
                    value="% resold at full price"
                    delay={0.4}
                  />
                  <SupportingMetric
                    label="Speed"
                    value="Dispositioning cycle time"
                    delay={0.5}
                  />
                  <SupportingMetric
                    label="Trust proxy"
                    value="Override rate"
                    delay={0.6}
                  />
                  <SupportingMetric
                    label="Ops health"
                    value="Throughput (units / hr)"
                    delay={0.7}
                  />
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right: Value logic arithmetic */}
          <FadeUp>
            <div className="flex h-full flex-col rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-white/[0.04] to-fuchsia-500/[0.06] p-5">
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-fuchsia-200" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                  Value logic · a representative unit
                </p>
              </div>

              <p className="text-[12px] leading-snug text-white/70">
                A returned $100 apparel item, today vs. with the agent:
              </p>

              {/* Baseline */}
              <div className="mt-4 space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="uppercase tracking-[0.18em] text-white/50">Baseline</span>
                    <span className="font-mono text-white/70">$100 retail</span>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[13px] text-white/80">Recovered value</span>
                      <span className="font-mono text-[18px] font-semibold text-white">
                        <CountUp to={35} prefix="$" duration={1.6} />
                      </span>
                    </div>
                    <p className="mt-1 text-[10.5px] text-white/50">
                      ~48% resold at full price · ~30% eaten by reverse logistics · rest to markdown
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.0, type: "spring", stiffness: 220 }}
                    className="flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-200"
                  >
                    <ArrowRight className="h-3 w-3" aria-hidden />
                    with the agent
                  </motion.div>
                </div>

                {/* With agent */}
                <div>
                  <div className="mb-1 flex items-center justify-between text-[11px]">
                    <span className="uppercase tracking-[0.18em] text-purple-200">With agent</span>
                    <span className="font-mono text-purple-200">+5 pts recovery lift</span>
                  </div>
                  <div className="rounded-lg border border-purple-400/50 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 p-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[13px] text-white/90">Recovered value</span>
                      <span className="font-mono text-[22px] font-semibold text-white">
                        <CountUp to={40} prefix="$" duration={1.8} />
                      </span>
                    </div>
                    <p className="mt-1 text-[10.5px] text-purple-200/80">
                      +$5 per unit × millions of units = the number in the ask.
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-auto pt-4 text-[11px] italic leading-snug text-white/50">
                A few points of recovery lift, at retailer volumes, is real bottom-line money, not
                a rounding error.
              </p>
            </div>
          </FadeUp>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
