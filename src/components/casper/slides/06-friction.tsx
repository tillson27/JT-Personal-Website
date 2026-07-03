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
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-200">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <p className="text-[13px] font-semibold text-white">{title}</p>
      </div>
      <p className="text-[12px] leading-snug text-white/70">{detail}</p>
      <div className="mt-auto pt-3">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-fuchsia-300/70">
          Where it hurts
        </p>
        <p className="mt-0.5 text-[11px] font-medium text-fuchsia-100">{impact}</p>
      </div>
    </motion.div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
      <span className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-purple-300/70">
        {label}
      </span>
      <span className="mt-0.5 text-[12.5px] font-semibold text-white">{value}</span>
    </div>
  );
}

const REQUIREMENTS: ReadonlyArray<string> = [
  "Live per-channel recovery value at the moment of decision",
  "Consistency: same item, same call, regardless of who's on shift",
  "Speed: recommendation in under a second, no keystroke overhead",
  "Overridable: the associate is still the final decision-maker",
];

export const frictionSlide: Slide = {
  id: "friction",
  title: "Where the friction lives",
  section: "discovery",
  render: () => (
    <SlideShell eyebrow="Friction points · The gap between the process and the value">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            The fast path and the{" "}
            <GradientText>valuable path</GradientText> are rarely the same.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-3xl text-[13.5px] text-white/60">
            Four failure modes compound at scale — and the default answer becomes the
            least-value one.
          </p>
        </FadeUp>

        <div className="mt-4 grid grid-cols-4 gap-3">
          <FrictionCard
            icon={EyeOff}
            title="Value blindness"
            detail="No real-time view of which channel maximizes recovery for this specific item, right now."
            impact="Missed 5–10 pts of recovery per unit"
            delay={0.3}
          />
          <FrictionCard
            icon={Repeat}
            title="Inconsistency"
            detail="Two associates grade and route the same item differently. Same SKU, different outcomes."
            impact="High decision variance, low audit trail"
            delay={0.4}
          />
          <FrictionCard
            icon={Gauge}
            title="Speed vs. quality"
            detail="Volume forces low-information decisions. Default becomes liquidate or markdown."
            impact="Highest-value paths quietly abandoned"
            delay={0.5}
          />
          <FrictionCard
            icon={Waves}
            title="Surge fragility"
            detail="Seasonal peaks and post-holiday returns overwhelm the manual process."
            impact="Weeks of aged stock → deeper markdown"
            delay={0.6}
          />
        </div>

        <div className="mt-4 grid flex-1 grid-cols-[1.15fr_1fr] gap-3">
          {/* Baseline metrics */}
          <FadeUp>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-purple-300" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                  Baseline metrics · what a reverse-logistics manager already stares at
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <MetricPill label="North star" value="Recovery rate" />
                <MetricPill label="Quality" value="% resold at full price" />
                <MetricPill label="Speed" value="Dispositioning cycle time" />
                <MetricPill label="Consistency" value="Decision variance / rework" />
              </div>
              <p className="mt-auto pt-3 text-[11.5px] leading-snug text-white/50">
                AI's job is to move each of them — with recovery rate as the pointed-at
                metric.
              </p>
            </div>
          </FadeUp>

          {/* Bridge into solution */}
          <FadeUp>
            <div className="flex h-full flex-col rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 p-4">
              <div className="mb-3 flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-fuchsia-200" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                  So the solution has to…
                </p>
              </div>
              <ul className="space-y-1.5">
                {REQUIREMENTS.map((r, i) => (
                  <motion.li
                    key={r}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.75 + i * 0.06 }}
                    className="flex gap-2 text-[12px] leading-snug text-white/85"
                  >
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-fuchsia-300" />
                    <span>{r}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-auto pt-3 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200/70">
                → The next slide is exactly that.
              </p>
            </div>
          </FadeUp>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
