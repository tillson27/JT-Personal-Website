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
          ? "relative flex-1 rounded-2xl border border-purple-400/50 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/15 p-2.5"
          : "relative flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-2.5"
      }
    >
      <p
        className={`text-[9px] font-semibold uppercase tracking-[0.24em] ${
          featured ? "text-purple-200" : "text-white/50"
        }`}
      >
        {version}
      </p>
      <p className="mt-0.5 text-[12.5px] font-semibold text-white">{title}</p>
      <p className="mt-1 text-[10.5px] leading-snug text-white/70">{detail}</p>
    </motion.div>
  );
}

const REQUIREMENTS: ReadonlyArray<{ label: string; detail: string }> = [
  {
    label: "The data we need",
    detail:
      "What each channel would pay, current demand, and how full each channel is. All accessible through an API, refreshed at least every 15 minutes.",
  },
  {
    label: "Access to your systems",
    detail:
      "Read access to your warehouse and inventory systems, and permission to write back the confirmed action and the reason.",
  },
  {
    label: "The right data on the return form",
    detail:
      "Reason, photo, and item captured when the customer starts a return online, and tied to the return record.",
  },
  {
    label: "A partner on your side",
    detail:
      "A warehouse lead and a returns manager who can co-own the pilot for a full cycle with us.",
  },
];

export const risksSlide: Slide = {
  id: "risks",
  title: "Discovery, risks, and roadmap",
  section: "execution",
  render: () => (
    <SlideShell eyebrow="Pressure test · What we would validate first">
      <Stagger gap={0.05}>
        <FadeUp>
          <h2 className="text-[26px] font-semibold leading-[1.1] tracking-tight text-white">
            Everything above is <GradientText>an informed starting point.</GradientText>
            <br />
            A real engagement starts with a discovery.
          </h2>
        </FadeUp>

        {/* Discovery disclaimer + requirements */}
        <FadeUp>
          <div className="mt-2.5 rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/[0.06] p-3">
            <div className="grid grid-cols-[1.15fr_1fr] gap-3">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Compass className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                    A note · this plan needs a discovery session
                  </p>
                </div>
                <p className="text-[11px] leading-snug text-white/80">
                  The numbers here come from public retail research and prior work with{" "}
                  <span className="font-semibold text-white">
                    Arc'teryx- and Lululemon-sized
                  </span>{" "}
                  apparel clients. For any specific customer, week one is a{" "}
                  <span className="font-semibold text-white">discovery sprint</span>: a
                  map of how returns work today, a check on what data is actually
                  available, and a short list of warehouses to pilot in.{" "}
                  <span className="italic text-white/60">
                    Nothing here should be treated as final without that.
                  </span>
                </p>
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-fuchsia-300" aria-hidden />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
                    What we would need to say "go"
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {REQUIREMENTS.map((r) => (
                    <div
                      key={r.label}
                      className="rounded-lg border border-white/10 bg-black/25 p-1.5"
                    >
                      <p className="text-[8.5px] font-semibold uppercase tracking-[0.18em] text-fuchsia-300/70">
                        {r.label}
                      </p>
                      <p className="mt-0.5 text-[9.5px] leading-snug text-white/80">
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
        <div className="mt-2.5 grid grid-cols-2 gap-3">
          <FadeUp>
            <div className="rounded-2xl border border-red-400/30 bg-red-500/[0.05] p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <AlertTriangle className="h-3.5 w-3.5 text-red-300" aria-hidden />
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-red-300">
                  Key risks
                </p>
              </div>
              <ul className="space-y-1 text-[10.5px] leading-snug text-white/85">
                <li className="flex gap-1.5">
                  <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[8.5px] font-semibold text-red-200">
                    R1
                  </span>
                  <span>
                    <span className="font-semibold text-white">The data may not be there.</span>{" "}
                    Some retailers do not have live channel prices today. That is the
                    single most useful piece of information, and the hardest to guarantee.
                  </span>
                </li>
                <li className="flex gap-1.5">
                  <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[8.5px] font-semibold text-red-200">
                    R2
                  </span>
                  <span>
                    <span className="font-semibold text-white">
                      The workers have to trust it.
                    </span>{" "}
                    If the first month feels off, the tool gets ignored. We earn that
                    trust by knowing when to say "ask a person" and by explaining every
                    recommendation.
                  </span>
                </li>
                <li className="flex gap-1.5">
                  <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[8.5px] font-semibold text-red-200">
                    R3
                  </span>
                  <span>
                    <span className="font-semibold text-white">Brand new items</span>{" "}
                    will not have a track record. We need a plan for how to price
                    recovery when the item is new.
                  </span>
                </li>
                <li className="flex gap-1.5">
                  <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-md bg-red-500/20 text-[8.5px] font-semibold text-red-200">
                    R4
                  </span>
                  <span>
                    <span className="font-semibold text-white">
                      System integration is real work.
                    </span>{" "}
                    Reading warehouse and inventory systems in real time is not easy.
                    Picking the wrong first partner slows the whole launch down.
                  </span>
                </li>
              </ul>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="rounded-2xl border border-purple-400/30 bg-purple-500/[0.05] p-3">
              <div className="mb-1.5 flex items-center gap-2">
                <HelpCircle className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                  Open questions (that discovery answers)
                </p>
              </div>
              <ul className="space-y-1 text-[10.5px] leading-snug text-white/85">
                <li className="flex gap-1.5">
                  <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[8.5px] font-semibold text-purple-200">
                    Q1
                  </span>
                  <span>
                    How do we price each channel accurately enough that the model can
                    trust the number and learn from it?
                  </span>
                </li>
                <li className="flex gap-1.5">
                  <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[8.5px] font-semibold text-purple-200">
                    Q2
                  </span>
                  <span>
                    What do we do with the small share of unusual items? A separate
                    process, or a safe default recommendation?
                  </span>
                </li>
                <li className="flex gap-1.5">
                  <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[8.5px] font-semibold text-purple-200">
                    Q3
                  </span>
                  <span>
                    Should we grade condition from the photo in version one, or wait
                    until version two? The answer depends on how many keystrokes we can
                    save the worker.
                  </span>
                </li>
                <li className="flex gap-1.5">
                  <span className="mt-0.5 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[8.5px] font-semibold text-purple-200">
                    Q4
                  </span>
                  <span>
                    At what override rate do we decide the model has stopped being
                    useful for a given category and needs a retrain?
                  </span>
                </li>
              </ul>
            </div>
          </FadeUp>
        </div>

        {/* Roadmap */}
        <FadeUp>
          <div className="mt-2.5">
            <div className="mb-1.5 flex items-center gap-2">
              <Rocket className="h-3.5 w-3.5 text-fuchsia-300" aria-hidden />
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
                Roadmap
              </p>
            </div>
            <div className="flex items-stretch gap-3">
              <RoadmapStop
                version="v1"
                title="Recommend, and a person confirms"
                detail="One warehouse, one category, a person confirms every call. Prove the recovery lift and earn trust."
                delay={0.55}
                featured
              />
              <RoadmapStop
                version="v2"
                title="Auto-approve the easy calls"
                detail="Remove the confirm step for routine, high-confidence items. The worker only sees the tricky ones."
                delay={0.65}
              />
              <RoadmapStop
                version="v3"
                title="Returned stock as live supply"
                detail="Feed returned inventory into planning and buying in real time. Now the whole company benefits from a return, not just the warehouse."
                delay={0.75}
              />
            </div>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
