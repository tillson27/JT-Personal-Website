import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  EyeOff,
  Gauge,
  Repeat,
  Waves,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

function FrictionCard({
  icon: Icon,
  title,
  detail,
  impact,
  delay,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
  impact: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col rounded-2xl border border-purple-400/25 bg-gradient-to-br from-purple-500/[0.07] to-white/[0.02] p-4"
    >
      <div className="mb-2.5 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/20 text-purple-200">
          <Icon className="h-4.5 w-4.5" aria-hidden />
        </span>
        <p className="text-[13.5px] font-semibold text-white">{title}</p>
      </div>
      <p className="text-[12.5px] leading-snug text-white/75">{detail}</p>
      <div className="mt-auto pt-3">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-fuchsia-300/70">
          Where it hurts
        </p>
        <p className="mt-1 text-[11.5px] font-medium text-fuchsia-100">{impact}</p>
      </div>
    </motion.div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-300/70">
        {label}
      </span>
      <span className="mt-1 text-[13px] font-semibold text-white">{value}</span>
    </div>
  );
}

const REQUIREMENTS: ReadonlyArray<string> = [
  "Show what each channel would pay for this item, at the moment of the call",
  "Consistent: the same item gets the same call, no matter who is on shift",
  "Fast: a recommendation in under a second, with no extra typing",
  "Overrideable: the worker still makes the final decision",
];

export const frictionSlide: Slide = {
  id: "friction",
  title: "Where the friction lives",
  section: "discovery",
  render: () => (
    <SlideShell eyebrow="Where it breaks · The gap between the process and the payoff">
      <Stagger gap={0.08} fill>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            The quickest call and the{" "}
            <GradientText>most valuable call</GradientText> are rarely the same.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-3xl text-[13.5px] text-white/60">
            Four things go wrong at scale. When they line up, the worker takes the
            easiest option instead of the one that recovers the most value.
          </p>
        </FadeUp>

        <div className="mt-5 grid grid-cols-4 gap-3">
          <FrictionCard
            icon={EyeOff}
            title="Missing information"
            detail="The worker cannot see which channel would pay the most for this exact item, right now."
            impact="Loses 5 to 10 cents on the dollar per item"
            delay={0.3}
          />
          <FrictionCard
            icon={Repeat}
            title="Inconsistent calls"
            detail="Two workers can inspect the same item and send it to two different places. Same item, different result."
            impact="Uneven outcomes, hard to audit later"
            delay={0.4}
          />
          <FrictionCard
            icon={Gauge}
            title="Speed over quality"
            detail="When volume is high, workers pick the fastest option. That is almost always liquidate or markdown."
            impact="Higher-value options quietly get skipped"
            delay={0.5}
          />
          <FrictionCard
            icon={Waves}
            title="Peak overload"
            detail="Holiday and season-change spikes flood the desk. The manual process cannot keep up."
            impact="Items age for weeks and lose more value"
            delay={0.6}
          />
        </div>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] gap-4">
          {/* Baseline metrics */}
          <FadeUp className="min-h-0">
            <div className="flex h-full min-h-0 flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-3.5 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-purple-300" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                  Numbers a returns manager already tracks
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <MetricPill label="Main goal" value="Recovery rate" />
                <MetricPill label="Quality" value="% resold at full price" />
                <MetricPill label="Speed" value="Seconds per item" />
                <MetricPill label="Consistency" value="Rework and reversals" />
              </div>
              <p className="mt-auto pt-4 text-[12px] leading-snug text-white/55">
                AI's job is to move all four in the right direction, with recovery rate
                as the number we point at.
              </p>
            </div>
          </FadeUp>

          {/* Bridge into solution */}
          <FadeUp className="min-h-0">
            <div className="flex h-full min-h-0 flex-col rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 p-5">
              <div className="mb-3.5 flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-fuchsia-200" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                  So the solution has to…
                </p>
              </div>
              <ul className="space-y-2.5">
                {REQUIREMENTS.map((r, i) => (
                  <motion.li
                    key={r}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.75 + i * 0.06 }}
                    className="flex gap-2.5 text-[12.5px] leading-snug text-white/85"
                  >
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-fuchsia-300" />
                    <span>{r}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-auto pt-4 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200/70">
                → The next slide is exactly that.
              </p>
            </div>
          </FadeUp>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
