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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/20 text-purple-200">
          <Icon className="h-3 w-3" aria-hidden />
        </span>
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-purple-300/80">
          {actor}
        </p>
      </div>
      <p className="text-[12px] leading-snug text-white/85">{job}</p>
    </motion.div>
  );
}

export const prdSlide: Slide = {
  id: "prd",
  title: "PRD in one slide",
  section: "prd",
  render: () => (
    <SlideShell eyebrow="Product plan · Problem · Users · First release">
      <Stagger gap={0.08} fill>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            <GradientText>Recommend the right place to send it,</GradientText>
            <br /> in the moment the worker has to decide.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-3xl text-[13px] text-white/60">
            One problem, three people who benefit, and a first version we can ship in a
            single planning cycle.
          </p>
        </FadeUp>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-3 gap-4">
          {/* Problem */}
          <FadeUp>
            <div className="flex h-full flex-col rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-white/[0.02] p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/25 text-purple-200">
                  <Target className="h-3.5 w-3.5" aria-hidden />
                </span>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                  Problem
                </p>
              </div>
              <p className="text-[15px] font-semibold leading-snug text-white">
                Apparel returns get routed by people who cannot see what each channel would pay.
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-white/70">
                Money gets left on the table at scale, quietly, thousands of times a day,
                because the worker cannot see what the item is worth in each channel at
                that moment.
              </p>
              <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
                <div className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    Blind
                  </p>
                  <p className="text-[10.5px] font-medium text-white">
                    to what each channel pays
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/30 px-2.5 py-1.5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/45">
                    Rushed
                  </p>
                  <p className="text-[10.5px] font-medium text-white">
                    on speed, not value
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Users / JTBD */}
          <FadeUp>
            <div className="flex h-full flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-fuchsia-500/20 text-fuchsia-200">
                  <Users className="h-3.5 w-3.5" aria-hidden />
                </span>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
                  Who benefits · What they want
                </p>
              </div>
              <JobCard
                icon={ClipboardList}
                actor="Warehouse worker"
                job='"Tell me where this item makes the most money, without slowing me down."'
                delay={0.35}
              />
              <JobCard
                icon={Target}
                actor="Returns manager"
                job='"Recover more value, stay on the right side of the rules, and keep the line moving during peaks."'
                delay={0.45}
              />
              <JobCard
                icon={Users}
                actor="Planning and buying"
                job='"Show me returned inventory I can actually use, not something I find out about weeks late."'
                delay={0.55}
              />
            </div>
          </FadeUp>

          {/* MVP */}
          <FadeUp>
            <div className="flex h-full flex-col rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-fuchsia-500/25 text-fuchsia-200">
                  <ClipboardList className="h-3.5 w-3.5" aria-hidden />
                </span>
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                  Scope of the first version
                </p>
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fuchsia-200/70">
                In version one
              </p>
              <div className="mt-1.5 space-y-1.5 text-[12px]">
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-300" aria-hidden />
                  <span className="text-white/90">
                    One busy warehouse, one product category (apparel)
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-300" aria-hidden />
                  <span className="text-white/90">
                    First guess from the online return, sharpened when the item arrives
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-300" aria-hidden />
                  <span className="text-white/90">
                    Resell, outlet, refurbish, or liquidate, with a person confirming
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-300" aria-hidden />
                  <span className="text-white/90">
                    Every override saved with a reason, so the model learns
                  </span>
                </div>
              </div>
              <div className="my-3 h-px w-full bg-white/10" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-300/80">
                Not in version one
              </p>
              <div className="mt-1.5 space-y-1 text-[11px] text-white/60">
                <div className="flex items-start gap-2">
                  <X className="mt-0.5 h-3 w-3 flex-shrink-0 text-red-300/70" aria-hidden />
                  <span>Auto-action with no person in the loop</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="mt-0.5 h-3 w-3 flex-shrink-0 text-red-300/70" aria-hidden />
                  <span>Rollout to multiple warehouses at once</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="mt-0.5 h-3 w-3 flex-shrink-0 text-red-300/70" aria-hidden />
                  <span>Condition grading from a photo alone</span>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
