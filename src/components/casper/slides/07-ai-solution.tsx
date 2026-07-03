import { motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  DollarSign,
  Leaf,
  Sparkles,
  TrendingUp,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

function Signal({
  icon: Icon,
  label,
  delay,
}: {
  icon: LucideIcon;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/20 text-purple-200">
        <Icon className="h-3.5 w-3.5" aria-hidden />
      </span>
      <span className="text-[12px] font-medium text-white/85">{label}</span>
    </motion.div>
  );
}

export const aiSolutionSlide: Slide = {
  id: "ai-solution",
  title: "The AI step-change",
  section: "solution",
  render: () => (
    <SlideShell eyebrow="Solution · The AI step-change">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[38px] font-semibold leading-[1.1] tracking-tight text-white">
            A recommendation at{" "}
            <GradientText>the moment of decision</GradientText>
            <br />
            not a report after the fact.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-3 max-w-3xl text-[14px] text-white/60">
            At inspection, the associate captures condition. An agent returns a ranked,
            value-maximizing disposition with rationale and confidence, pulling live signals the
            human never had. Human confirms or overrides. Overrides train the model.
          </p>
        </FadeUp>

        {/* Flow diagram */}
        <div className="mt-6 flex flex-1 items-stretch gap-4">
          {/* Signals in */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="w-[240px] rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-300/80">
              Live signals in
            </p>
            <div className="space-y-2">
              <Signal icon={TrendingUp} label="Real-time demand" delay={0.5} />
              <Signal icon={DollarSign} label="Per-channel recovery value" delay={0.6} />
              <Signal icon={Camera} label="Condition + photo" delay={0.7} />
              <Signal icon={Warehouse} label="Channel capacity" delay={0.8} />
              <Signal icon={Leaf} label="Sustainability constraints" delay={0.9} />
            </div>
          </motion.div>

          {/* Center: Agent */}
          <div className="relative flex flex-1 flex-col items-center justify-center gap-3">
            {/* Arrow in */}
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.9 }}
              viewBox="0 0 100 20"
              className="absolute left-[-30px] top-[45%] h-4 w-32"
            >
              <motion.path
                d="M0 10 L90 10 L85 5 M90 10 L85 15"
                fill="none"
                stroke="rgb(192,132,252)"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              />
            </motion.svg>

            <motion.div
              initial={{ scale: 0, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 180, damping: 14 }}
              className="relative rounded-3xl border-2 border-purple-400/50 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/25 px-6 py-5 shadow-[0_20px_60px_-10px_rgba(168,85,247,0.5)]"
            >
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20 blur-xl"
              />
              <div className="relative flex items-center gap-3">
                <Sparkles className="h-6 w-6 text-purple-200" aria-hidden />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-200">
                    Disposition Agent
                  </p>
                  <p className="text-[18px] font-semibold text-white">
                    Ranked recommendation
                  </p>
                </div>
              </div>
              <p className="relative mt-3 text-[12px] leading-snug text-white/80">
                Rationale · confidence score · alternatives ready if overridden.
              </p>
            </motion.div>

            {/* Arrow out */}
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1.4 }}
              viewBox="0 0 100 20"
              className="absolute right-[-30px] top-[45%] h-4 w-32"
            >
              <motion.path
                d="M0 10 L90 10 L85 5 M90 10 L85 15"
                fill="none"
                stroke="rgb(232,121,249)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.svg>
          </div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="w-[240px] rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 p-4"
          >
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
              Human-in-the-loop
            </p>
            <div className="space-y-3">
              <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  Recommended
                </p>
                <p className="text-[13px] font-semibold text-white">Route to outlet</p>
                <p className="mt-0.5 text-[10px] text-white/60">
                  Confidence 0.87 · Est. $34 recovered
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden />
                <span className="text-[12px] font-medium text-white">Confirm or override</span>
              </div>
              <p className="text-[10.5px] italic leading-snug text-white/50">
                Overrides feed the training loop. They are a feature, not a failure.
              </p>
            </div>
          </motion.div>
        </div>

        <FadeUp>
          <div className="mt-4 rounded-xl border border-purple-400/30 bg-purple-500/10 px-4 py-2.5">
            <p className="text-[13px] leading-snug text-white/85">
              <span className="font-semibold text-purple-200">Why now:</span> the data to make this
              decision well finally exists in real time. The cost of not using it is quantified two
              slides back.
            </p>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
