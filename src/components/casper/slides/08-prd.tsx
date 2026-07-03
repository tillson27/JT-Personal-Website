import { motion } from "framer-motion";
import { Check, ClipboardList, Target, Users, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

function JobCard({
  icon: Icon,
  actor,
  job,
  delay,
}: {
  icon: LucideIcon;
  actor: string;
  job: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-200">
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </span>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-300/80">
          {actor}
        </p>
      </div>
      <p className="text-[12.5px] leading-snug text-white/85">{job}</p>
    </motion.div>
  );
}

export const prdSlide: Slide = {
  id: "prd",
  title: "PRD in one slide",
  section: "prd",
  render: () => (
    <SlideShell eyebrow="PRD · Problem, users, MVP">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[38px] font-semibold leading-[1.1] tracking-tight text-white">
            <GradientText>Recommend the right disposition</GradientText>
            <br /> at the moment of decision.
          </h2>
        </FadeUp>

        <div className="mt-6 grid flex-1 grid-cols-3 gap-5">
          {/* Problem */}
          <FadeUp>
            <div className="flex h-full flex-col rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-white/[0.02] p-5">
              <div className="mb-3 flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-300" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                  Problem
                </p>
              </div>
              <p className="text-[13.5px] leading-relaxed text-white/85">
                Apparel returns are routed by humans without live value data,{" "}
                <span className="font-semibold text-white">leaving recovery on the table at scale</span>
                , silently, thousands of times a day.
              </p>
              <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
                <div className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-2">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    Blind
                  </p>
                  <p className="text-[11px] font-medium text-white">to per-channel value</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-2">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/50">
                    Under pressure
                  </p>
                  <p className="text-[11px] font-medium text-white">on speed, not value</p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Users / JTBD */}
          <FadeUp>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-fuchsia-300" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
                  Users · Jobs-to-be-done
                </p>
              </div>
              <JobCard
                icon={ClipboardList}
                actor="Returns Associate"
                job='"Route this item to the highest-value path, without slowing me down."'
                delay={0.35}
              />
              <JobCard
                icon={Target}
                actor="Reverse-logistics Manager"
                job='"Maximize recovery and stay compliant while keeping throughput up during surges."'
                delay={0.45}
              />
              <JobCard
                icon={Users}
                actor="Merchandising · Planning"
                job='"Give me returned inventory as a live, usable supply source, not an afterthought."'
                delay={0.55}
              />
            </div>
          </FadeUp>

          {/* MVP */}
          <FadeUp>
            <div className="flex h-full flex-col rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 p-5">
              <div className="mb-3 flex items-center gap-2">
                <ClipboardList className="h-4 w-4 text-fuchsia-200" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                  MVP scope
                </p>
              </div>
              <div className="space-y-2 text-[12.5px]">
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" aria-hidden />
                  <span className="text-white/90">
                    Recommendation engine at <span className="font-semibold">one high-volume DC</span>
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" aria-hidden />
                  <span className="text-white/90">
                    <span className="font-semibold">One product category</span> (apparel), one flow
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" aria-hidden />
                  <span className="text-white/90">
                    Resell vs. refurbish vs. liquidate, with <span className="font-semibold">human confirmation</span>
                  </span>
                </div>
              </div>
              <div className="my-4 h-px w-full bg-white/10" />
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-300/80">
                Out of scope for v1
              </p>
              <div className="space-y-1.5 text-[11.5px] text-white/60">
                <div className="flex items-start gap-2">
                  <X className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-red-300/70" aria-hidden />
                  <span>Automated actioning (no human confirm)</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-red-300/70" aria-hidden />
                  <span>Multi-node rollout</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-red-300/70" aria-hidden />
                  <span>Condition grading from photo alone</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
