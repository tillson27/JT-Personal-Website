import { motion } from "framer-motion";
import {
  AlertTriangle,
  Compass,
  HelpCircle,
  Rocket,
  ShieldCheck,
} from "lucide-react";
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
          ? "relative flex-1 rounded-2xl border border-purple-400/50 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/15 p-3"
          : "relative flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
      }
    >
      <p
        className={`text-[9.5px] font-semibold uppercase tracking-[0.24em] ${
          featured ? "text-purple-200" : "text-white/50"
        }`}
      >
        {version}
      </p>
      <p className="mt-1 text-[13.5px] font-semibold text-white">{title}</p>
      <p className="mt-1.5 text-[11px] leading-snug text-white/70">{detail}</p>
    </motion.div>
  );
}

const REQUIREMENTS: ReadonlyArray<{ label: string; detail: string }> = [
  {
    label: "Data availability",
    detail:
      "Per-channel recovery value + demand + capacity, exposed as APIs with <15 min freshness.",
  },
  {
    label: "WMS / ERP access",
    detail:
      "Read access at the inspection station; write-back for confirmed disposition + reason code.",
  },
  {
    label: "Return-flow instrumentation",
    detail:
      "Reason code + photo + SKU captured at return initiation, tied to the return record.",
  },
  {
    label: "Ops partnership",
    detail:
      "A DC lead + reverse-logistics manager who can co-own the pilot for one full cycle.",
  },
];

export const risksSlide: Slide = {
  id: "risks",
  title: "Discovery, risks, and roadmap",
  section: "execution",
  render: () => (
    <SlideShell eyebrow="Pressure-test · What we'd validate first">
      <Stagger gap={0.06}>
        <FadeUp>
          <h2 className="text-[30px] font-semibold leading-[1.1] tracking-tight text-white">
            Everything above is <GradientText>an informed baseline.</GradientText>
            <br />
            A real engagement starts with a discovery.
          </h2>
        </FadeUp>

        {/* Discovery disclaimer + requirements */}
        <FadeUp>
          <div className="mt-3 rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/[0.06] p-3.5">
            <div className="grid grid-cols-[1.15fr_1fr] gap-4">
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <Compass className="h-4 w-4 text-purple-300" aria-hidden />
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                    Disclaimer · this plan needs a discovery session
                  </p>
                </div>
                <p className="text-[12px] leading-snug text-white/80">
                  The baseline in this deck comes from public retail data and prior work
                  with{" "}
                  <span className="font-semibold text-white">
                    Arc'teryx- and Lululemon-shaped
                  </span>{" "}
                  apparel clients. For any specific customer, week 1 is a{" "}
                  <span className="font-semibold text-white">discovery sprint</span>:
                  current-state map, data-availability audit, and a short list of pilot
                  DCs.{" "}
                  <span className="italic text-white/60">
                    Nothing here should be treated as final without that.
                  </span>
                </p>
              </div>
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-fuchsia-300" aria-hidden />
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
                    High-level requirements to hit "go"
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {REQUIREMENTS.map((r) => (
                    <div
                      key={r.label}
                      className="rounded-lg border border-white/10 bg-black/25 p-2"
                    >
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300/70">
                        {r.label}
                      </p>
                      <p className="mt-0.5 text-[10.5px] leading-snug text-white/80">
                        {r.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Risks + open questions */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <FadeUp>
            <div className="rounded-2xl border border-red-400/30 bg-red-500/[0.05] p-3.5">
              <div className="mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-300" aria-hidden />
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-red-300">
                  Key risks
                </p>
              </div>
              <ul className="space-y-1.5 text-[11.5px] leading-snug text-white/85">
                <li className="flex gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[9px] font-semibold text-red-200">
                    R1
                  </span>
                  <span>
                    <span className="font-semibold text-white">Data availability.</span>{" "}
                    Live per-channel value isn't there today at some retailers — the
                    signal we most need is the hardest to guarantee.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[9px] font-semibold text-red-200">
                    R2
                  </span>
                  <span>
                    <span className="font-semibold text-white">
                      Associate trust + adoption.
                    </span>{" "}
                    If the first month feels dumb, the workflow gets abandoned. Confidence
                    thresholds and clear rationale carry the weight.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[9px] font-semibold text-red-200">
                    R3
                  </span>
                  <span>
                    <span className="font-semibold text-white">Cold-start</span> on
                    recovery-value prediction for SKUs with limited history.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[9px] font-semibold text-red-200">
                    R4
                  </span>
                  <span>
                    <span className="font-semibold text-white">
                      WMS / ERP integration.
                    </span>{" "}
                    Real-time reads at inspection are non-trivial. Wrong pilot partner
                    stalls the launch.
                  </span>
                </li>
              </ul>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="rounded-2xl border border-purple-400/30 bg-purple-500/[0.05] p-3.5">
              <div className="mb-2 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-300" aria-hidden />
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                  Open questions (the discovery answers)
                </p>
              </div>
              <ul className="space-y-1.5 text-[11.5px] leading-snug text-white/85">
                <li className="flex gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[9px] font-semibold text-purple-200">
                    Q1
                  </span>
                  <span>
                    How do we price recovery value per channel reliably enough to trust as
                    a training signal?
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[9px] font-semibold text-purple-200">
                    Q2
                  </span>
                  <span>
                    How do we handle the long tail of unusual items: carve-out or
                    catch-all fallback?
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[9px] font-semibold text-purple-200">
                    Q3
                  </span>
                  <span>
                    Is photo-based grading a v1 accelerator or a v2 upgrade? Depends on
                    associate keystroke count today.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[9px] font-semibold text-purple-200">
                    Q4
                  </span>
                  <span>
                    What's the override-rate ceiling before we treat the model as
                    untrusted for that segment?
                  </span>
                </li>
              </ul>
            </div>
          </FadeUp>
        </div>

        {/* Roadmap */}
        <FadeUp>
          <div className="mt-3">
            <div className="mb-2 flex items-center gap-2">
              <Rocket className="h-4 w-4 text-fuchsia-300" aria-hidden />
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
                Roadmap
              </p>
            </div>
            <div className="flex items-stretch gap-3">
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
                detail="Retire the confirm step for routine, high-confidence cases. Human only sees edge cases."
                delay={0.65}
              />
              <RoadmapStop
                version="v3"
                title="Returns as live supply"
                detail="Feed dispositioned inventory into planning + merchandising as a real supply signal. Close the loop end-to-end."
                delay={0.75}
              />
            </div>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
