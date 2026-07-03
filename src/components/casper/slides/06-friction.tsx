import { motion } from "framer-motion";
import { AlertCircle, EyeOff, Gauge, Repeat, Waves } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

function FrictionCard({
  icon: Icon,
  title,
  detail,
  delay,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-purple-400/25 bg-gradient-to-br from-purple-500/[0.07] to-white/[0.02] p-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-200">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <p className="text-[13px] font-semibold text-white">{title}</p>
      </div>
      <p className="text-[12.5px] leading-snug text-white/70">{detail}</p>
    </motion.div>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-purple-300/70">
        {label}
      </span>
      <span className="mt-0.5 text-[13px] font-semibold text-white">{value}</span>
    </div>
  );
}

export const frictionSlide: Slide = {
  id: "friction",
  title: "Where the friction lives",
  section: "discovery",
  render: () => (
    <SlideShell eyebrow="Friction points">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[40px] font-semibold leading-[1.1] tracking-tight text-white">
            The fast path and the{" "}
            <GradientText>valuable path</GradientText> are rarely the same.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-3 max-w-3xl text-[14px] text-white/60">
            Four failure modes compound at scale, and the default answer becomes the least-value
            one.
          </p>
        </FadeUp>

        <div className="mt-6 grid grid-cols-4 gap-4">
          <FrictionCard
            icon={EyeOff}
            title="Value blindness"
            detail="No real-time view of which channel maximizes recovery for this specific item, right now."
            delay={0.35}
          />
          <FrictionCard
            icon={Repeat}
            title="Inconsistency"
            detail="Two associates grade and route the same item differently. Same SKU, different outcomes."
            delay={0.45}
          />
          <FrictionCard
            icon={Gauge}
            title="Speed vs. quality"
            detail="Volume forces low-information decisions. Default becomes liquidate or markdown."
            delay={0.55}
          />
          <FrictionCard
            icon={Waves}
            title="Surge fragility"
            detail="Seasonal peaks and post-holiday returns overwhelm the manual process."
            delay={0.65}
          />
        </div>

        <FadeUp>
          <div className="mt-6 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-purple-300" aria-hidden />
              <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                Baseline metrics · what we'd measure today
              </p>
            </div>
            <div className="grid grid-cols-5 gap-3">
              <MetricPill label="North star" value="Recovery rate" />
              <MetricPill label="Quality" value="% resold at full price" />
              <MetricPill label="Speed" value="Dispositioning cycle time" />
              <MetricPill label="Consistency" value="Decision variance / rework rate" />
              <MetricPill label="Throughput" value="Units / associate-hour" />
            </div>
            <p className="mt-4 text-[12px] leading-snug text-white/50">
              These are the numbers a reverse-logistics manager already stares at. AI's job is to
              move each of them, with recovery rate as the pointed-at metric.
            </p>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
