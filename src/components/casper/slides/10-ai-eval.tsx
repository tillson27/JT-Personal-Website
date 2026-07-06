import { motion } from "framer-motion";
import {
  Activity,
  BeakerIcon,
  Database,
  GitBranch,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

function EvalCard({
  icon: Icon,
  title,
  tag,
  bullets,
  delay,
  accent,
}: {
  icon: LucideIcon;
  title: string;
  tag: string;
  bullets: ReadonlyArray<string>;
  delay: number;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={
        accent
          ? "flex h-full flex-col rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 p-5"
          : "flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5"
      }
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            accent
              ? "bg-fuchsia-500/25 text-fuchsia-200"
              : "bg-purple-500/20 text-purple-200"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p
            className={`text-[9.5px] font-semibold uppercase tracking-[0.22em] ${
              accent ? "text-fuchsia-200" : "text-purple-300/80"
            }`}
          >
            {tag}
          </p>
          <p className="text-[14px] font-semibold text-white">{title}</p>
        </div>
      </div>
      <ul className="mt-1 space-y-2.5">
        {bullets.map((b) => (
          <li
            key={b}
            className="flex gap-2 text-[12px] leading-relaxed text-white/85"
          >
            <span
              className={`mt-1.5 h-1 w-1 flex-shrink-0 rounded-full ${
                accent ? "bg-fuchsia-400" : "bg-purple-400"
              }`}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

type Improvement = {
  when: string;
  action: string;
  detail: string;
  delay: number;
};

const IMPROVEMENTS: ReadonlyArray<Improvement> = [
  {
    when: "Weekly",
    action: "Review overrides",
    detail: "Any category >30% overrides in a week hits the retrain shortlist.",
    delay: 0.85,
  },
  {
    when: "Every two weeks",
    action: "Prune features",
    detail: "Drop signals that stopped moving the call. Add new ones that do.",
    delay: 0.95,
  },
  {
    when: "Monthly",
    action: "Label the hard ones",
    detail: "Low-confidence items go to a human review queue — next training set.",
    delay: 1.05,
  },
  {
    when: "Quarterly",
    action: "Retrain & shadow-test",
    detail: "Retrain on last 90 days. Ship only if it clearly beats the champion.",
    delay: 1.15,
  },
];

export const aiEvalSlide: Slide = {
  id: "ai-eval",
  title: "AI evaluation plan",
  section: "prd",
  render: () => (
    <SlideShell eyebrow="Evaluation · How we ship it, and keep it good">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            How we know it is working, and{" "}
            <GradientText>how we make it better</GradientText> on a set rhythm.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[13.5px] leading-snug text-white/60">
            An AI product decays without a watcher. Four checkpoints across the
            lifecycle, plus a set rhythm to keep improving it.
          </p>
        </FadeUp>

        {/* 4 lifecycle cards */}
        <div className="mt-6 grid grid-cols-4 gap-3">
          <EvalCard
            icon={Database}
            tag="Before we launch"
            title="Backtest on history"
            bullets={[
              "Replay 6 months of returns with known outcomes",
              "Model must beat the human baseline on recovered $",
            ]}
            delay={0.3}
          />
          <EvalCard
            icon={BeakerIcon}
            tag="At launch"
            title="Live A/B"
            bullets={[
              "50/50 split — recovery rate lift is the primary metric",
              "Guardrail: no worse on speed or throughput",
            ]}
            delay={0.4}
            accent
          />
          <EvalCard
            icon={Activity}
            tag="Ongoing"
            title="Watch every day"
            bullets={[
              "Override rate + prediction accuracy, per category and warehouse",
              "Weekly review with the returns manager",
            ]}
            delay={0.5}
          />
          <EvalCard
            icon={ShieldAlert}
            tag="Safety net"
            title="Catch the bad calls"
            bullets={[
              "Alerts on 'destroy vs. sellable' and sustainability breaks",
              "Drift threshold triggers a shadow retrain",
            ]}
            delay={0.6}
          />
        </div>

        {/* How we tune it */}
        <FadeUp>
          <div className="mt-6 rounded-2xl border border-purple-400/30 bg-white/[0.02] p-5">
            <div className="mb-3 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-purple-300" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                The rhythm for making it better
              </p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {IMPROVEMENTS.map((imp) => (
                <motion.div
                  key={imp.when}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: imp.delay }}
                  className="rounded-xl border border-white/10 bg-black/30 p-4"
                >
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300/80">
                    {imp.when}
                  </p>
                  <p className="mt-1.5 text-[13.5px] font-semibold text-white">
                    {imp.action}
                  </p>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/65">
                    {imp.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-purple-500/10 px-5 py-3.5">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/25 text-purple-200">
              <GitBranch className="h-5 w-5" aria-hidden />
            </span>
            <p className="flex-1 text-[13.5px] leading-snug text-white/90">
              <span className="font-semibold text-purple-200">
                Overrides are our highest-quality training signal
              </span>{" "}
              — every "no" comes with a reason, and that closes the loop between what
              the model thinks and what actually works on the floor.
            </p>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
