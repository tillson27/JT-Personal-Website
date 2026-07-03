import { motion } from "framer-motion";
import { Activity, BeakerIcon, Database, GitBranch, ShieldAlert } from "lucide-react";
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
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={
        accent
          ? "flex h-full flex-col rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 p-4"
          : "flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4"
      }
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
            accent
              ? "bg-fuchsia-500/25 text-fuchsia-200"
              : "bg-purple-500/20 text-purple-200"
          }`}
        >
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div>
          <p
            className={`text-[9.5px] font-semibold uppercase tracking-[0.2em] ${
              accent ? "text-fuchsia-200" : "text-purple-300/80"
            }`}
          >
            {tag}
          </p>
          <p className="text-[13px] font-semibold text-white">{title}</p>
        </div>
      </div>
      <ul className="mt-1 space-y-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2 text-[11.5px] leading-snug text-white/80">
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

export const aiEvalSlide: Slide = {
  id: "ai-eval",
  title: "AI evaluation plan",
  section: "prd",
  render: () => (
    <SlideShell eyebrow="AI evaluation plan · The feedback loop">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            Ship the model, ship the{" "}
            <GradientText>feedback loop.</GradientText>
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-3 max-w-4xl text-[13.5px] text-white/60">
            Every AI product decays without one. Here's how we'd know it's working: before, at,
            and after launch.
          </p>
        </FadeUp>

        <div className="mt-6 grid flex-1 grid-cols-4 gap-4">
          <EvalCard
            icon={Database}
            tag="Pre-launch"
            title="Offline eval"
            bullets={[
              "Golden dataset of historical returns with realized outcomes",
              "Measure recommendation accuracy vs. realized-optimal disposition",
              "Baseline against current human decisions on the same items",
            ]}
            delay={0.3}
          />
          <EvalCard
            icon={BeakerIcon}
            tag="At launch"
            title="Online eval · A/B"
            bullets={[
              "Holdout: AI-recommended vs. human baseline",
              "Primary: recovery-rate lift (pts)",
              "Guardrails: cycle time, throughput must not regress",
            ]}
            delay={0.42}
            accent
          />
          <EvalCard
            icon={Activity}
            tag="Ongoing"
            title="Continuous quality"
            bullets={[
              "Override rate + reason codes per segment (weak-spot detector)",
              "Predicted-vs-actual recovery calibration",
              "Segment slicing: category, condition grade, DC",
            ]}
            delay={0.54}
          />
          <EvalCard
            icon={ShieldAlert}
            tag="Safety net"
            title="Guardrails & drift"
            bullets={[
              "Alert on value-destroying recs (destroy when resell viable)",
              "Sustainability-constraint violation catch",
              "Seasonal + category drift monitoring, retrain triggers",
            ]}
            delay={0.66}
          />
        </div>

        <FadeUp>
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/10 via-fuchsia-500/10 to-purple-500/10 px-5 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/25 text-purple-200">
              <GitBranch className="h-4 w-4" aria-hidden />
            </span>
            <p className="flex-1 text-[13px] leading-snug text-white/90">
              <span className="font-semibold text-purple-200">Overrides are training data.</span>{" "}
              Every human "no" gets a reason code, feeds the loop, and closes the gap between the
              model and reality.
            </p>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
