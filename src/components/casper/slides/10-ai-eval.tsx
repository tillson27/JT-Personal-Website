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
          ? "flex h-full flex-col rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 p-3.5"
          : "flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
      }
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${
            accent
              ? "bg-fuchsia-500/25 text-fuchsia-200"
              : "bg-purple-500/20 text-purple-200"
          }`}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </span>
        <div>
          <p
            className={`text-[9px] font-semibold uppercase tracking-[0.2em] ${
              accent ? "text-fuchsia-200" : "text-purple-300/80"
            }`}
          >
            {tag}
          </p>
          <p className="text-[12.5px] font-semibold text-white">{title}</p>
        </div>
      </div>
      <ul className="mt-0.5 space-y-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2 text-[11px] leading-snug text-white/80">
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
    action: "Review the overrides",
    detail:
      "Sort overrides by reason and by product category. Any category with more than 30% overrides in a week goes on the retrain shortlist.",
    delay: 0.85,
  },
  {
    when: "Every two weeks",
    action: "Check which signals matter",
    detail:
      "Which pieces of information are actually changing the recommendation? Drop the ones that no longer help, and add the ones that do.",
    delay: 0.95,
  },
  {
    when: "Monthly",
    action: "Learn from the hard ones",
    detail:
      "Send low-confidence items to a review queue. A human labels them, and those become the training set for the next round.",
    delay: 1.05,
  },
  {
    when: "Quarterly",
    action: "Retrain and test",
    detail:
      "Retrain a fresh model on the last 90 days of data. Run it side by side with the current one. Only ship the new one if it clearly does better.",
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
          <h2 className="text-[32px] font-semibold leading-[1.1] tracking-tight text-white">
            How we know it is working, and{" "}
            <GradientText>how we make it better</GradientText> on a set rhythm.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[13px] text-white/60">
            An AI product gets worse over time if no one is watching it. Here is what we
            measure before we launch, right when we launch, and every week after. And the
            rhythm we use to keep improving it.
          </p>
        </FadeUp>

        {/* 4 lifecycle cards */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          <EvalCard
            icon={Database}
            tag="Before we launch"
            title="Test against past data"
            bullets={[
              "Take six months of past returns where we know how they ended up",
              "Ask the model to make the call, then compare with what actually happened",
              "Also compare against the calls the workers made at the time",
            ]}
            delay={0.3}
          />
          <EvalCard
            icon={BeakerIcon}
            tag="At launch"
            title="Live side-by-side test"
            bullets={[
              "Half the items get the recommendation, half do not",
              "The number we watch: recovery rate lift",
              "The line we cannot cross: speed and volume cannot get worse",
            ]}
            delay={0.4}
            accent
          />
          <EvalCard
            icon={Activity}
            tag="Ongoing"
            title="Watch it every day"
            bullets={[
              "How often workers override, and why",
              "Did we predict the right recovery amount for each item?",
              "Break it out by category, condition, and warehouse",
            ]}
            delay={0.5}
          />
          <EvalCard
            icon={ShieldAlert}
            tag="Safety net"
            title="Catch the bad calls"
            bullets={[
              "Alert if we ever recommend destroying an item we could sell",
              "Catch anything that would break sustainability rules",
              "Watch for changes over time and retrain automatically",
            ]}
            delay={0.6}
          />
        </div>

        {/* How we tune it */}
        <FadeUp>
          <div className="mt-4 rounded-2xl border border-purple-400/30 bg-white/[0.02] p-4">
            <div className="mb-2 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-purple-300" aria-hidden />
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-purple-300">
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
                  className="rounded-xl border border-white/10 bg-black/30 p-3"
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-fuchsia-300/80">
                    {imp.when}
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-white">
                    {imp.action}
                  </p>
                  <p className="mt-1 text-[10.5px] leading-snug text-white/60">
                    {imp.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp>
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-purple-500/10 px-4 py-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/25 text-purple-200">
              <GitBranch className="h-4 w-4" aria-hidden />
            </span>
            <p className="flex-1 text-[12.5px] leading-snug text-white/90">
              <span className="font-semibold text-purple-200">
                Overrides are our best training data.
              </span>{" "}
              Every time a worker says "no", we save the reason. That feeds the weekly
              review and closes the gap between what the model thinks and what actually
              works on the floor.
            </p>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
