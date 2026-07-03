import { motion } from "framer-motion";
import { AlertTriangle, HelpCircle, Rocket } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

function RoadmapStop({
  version,
  title,
  detail,
  delay,
  featured,
}: {
  version: string;
  title: string;
  detail: string;
  delay: number;
  featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={
        featured
          ? "relative flex-1 rounded-2xl border border-purple-400/50 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/15 p-4"
          : "relative flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
      }
    >
      <p
        className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${
          featured ? "text-purple-200" : "text-white/50"
        }`}
      >
        {version}
      </p>
      <p className="mt-1 text-[15px] font-semibold text-white">{title}</p>
      <p className="mt-2 text-[11.5px] leading-snug text-white/70">{detail}</p>
    </motion.div>
  );
}

export const risksSlide: Slide = {
  id: "risks",
  title: "Risks, questions, roadmap",
  section: "execution",
  render: () => (
    <SlideShell eyebrow="Risks · Open questions · Roadmap">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            Where I'd want to <GradientText>pressure-test</GradientText> the plan.
          </h2>
        </FadeUp>

        <div className="mt-6 grid grid-cols-2 gap-5">
          {/* Risks */}
          <FadeUp>
            <div className="rounded-2xl border border-red-400/30 bg-red-500/[0.05] p-5">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-300" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-300">
                  Key risks
                </p>
              </div>
              <ul className="space-y-2.5 text-[12.5px] leading-snug text-white/85">
                <li className="flex gap-2.5">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[10px] font-semibold text-red-200">
                    R1
                  </span>
                  <span>
                    <span className="font-semibold text-white">Data availability.</span> Live
                    per-channel value isn't there today at some retailers, and the signal we most
                    need is the signal that's hardest to guarantee.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[10px] font-semibold text-red-200">
                    R2
                  </span>
                  <span>
                    <span className="font-semibold text-white">Associate trust + adoption.</span>{" "}
                    If the first month of recs feels dumb, the workflow gets abandoned. Confidence
                    thresholds and clear rationale carry a lot of the weight here.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[10px] font-semibold text-red-200">
                    R3
                  </span>
                  <span>
                    <span className="font-semibold text-white">Cold-start</span> on recovery-value
                    prediction for SKUs with limited history.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[10px] font-semibold text-red-200">
                    R4
                  </span>
                  <span>
                    <span className="font-semibold text-white">WMS / ERP integration.</span>{" "}
                    Real-time reads at inspection are non-trivial, and the wrong retailer partner
                    stalls the pilot.
                  </span>
                </li>
              </ul>
            </div>
          </FadeUp>

          {/* Open questions */}
          <FadeUp>
            <div className="rounded-2xl border border-purple-400/30 bg-purple-500/[0.05] p-5">
              <div className="mb-3 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-300" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                  Open questions (the ones I'd want answered by discovery)
                </p>
              </div>
              <ul className="space-y-2.5 text-[12.5px] leading-snug text-white/85">
                <li className="flex gap-2.5">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[10px] font-semibold text-purple-200">
                    Q1
                  </span>
                  <span>How do we price recovery value per channel reliably enough to trust as a training signal?</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[10px] font-semibold text-purple-200">
                    Q2
                  </span>
                  <span>How do we handle the long tail of unusual items: carve-out or catch-all fallback?</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[10px] font-semibold text-purple-200">
                    Q3
                  </span>
                  <span>Is photo-based grading a v1 accelerator or v2 upgrade? Depends on associate keystroke count today.</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[10px] font-semibold text-purple-200">
                    Q4
                  </span>
                  <span>What's the right override-rate ceiling before we treat the model as untrusted for that segment?</span>
                </li>
              </ul>
            </div>
          </FadeUp>
        </div>

        <FadeUp>
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <Rocket className="h-4 w-4 text-fuchsia-300" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
                Roadmap
              </p>
            </div>
            <div className="flex items-stretch gap-4">
              <RoadmapStop
                version="v1"
                title="Recommend-and-confirm"
                detail="One DC. One category. Human confirms. Prove the recovery lift and grow trust."
                delay={0.55}
                featured
              />
              <RoadmapStop
                version="v2"
                title="Auto-action high-confidence"
                detail="Retire the confirm step for the routine, high-confidence cases. Human only sees edge cases."
                delay={0.65}
              />
              <RoadmapStop
                version="v3"
                title="Returns as live supply"
                detail="Feed dispositioned inventory into planning + merchandising as real supply signal. Close the loop end-to-end."
                delay={0.75}
              />
            </div>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
