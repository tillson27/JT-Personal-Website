import { motion } from "framer-motion";
import { Boxes, Package, User, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

const LANES: ReadonlyArray<{
  icon: LucideIcon;
  label: string;
  tone: "cyan" | "purple" | "fuchsia" | "amber";
}> = [
  { icon: User, label: "Customer", tone: "cyan" },
  { icon: Package, label: "Returns Associate", tone: "purple" },
  { icon: Zap, label: "Systems · WMS/ERP", tone: "fuchsia" },
  { icon: Boxes, label: "Disposition Channels", tone: "amber" },
];

type Step = {
  lane: number;
  label: string;
  x: number;
  isDecision?: boolean;
};

const STEPS: ReadonlyArray<Step> = [
  { lane: 0, label: "Return\ninitiated", x: 4 },
  { lane: 1, label: "Receive &\ngrade", x: 20 },
  { lane: 2, label: "SKU\nlookup", x: 36 },
  { lane: 1, label: "Manual\ndecision", x: 52, isDecision: true },
  { lane: 3, label: "Route to\nchannel", x: 72 },
  { lane: 2, label: "Log\ndisposition", x: 88 },
];

const CHANNEL_TAGS: ReadonlyArray<string> = [
  "A-stock",
  "Outlet",
  "Refurbish",
  "Liquidate",
  "Donate",
  "Destroy",
];

const toneToBg: Record<"cyan" | "purple" | "fuchsia" | "amber", string> = {
  cyan: "from-cyan-500/25 to-cyan-500/5 border-cyan-400/40 text-cyan-200",
  purple: "from-purple-500/25 to-purple-500/5 border-purple-400/40 text-purple-200",
  fuchsia: "from-fuchsia-500/25 to-fuchsia-500/5 border-fuchsia-400/40 text-fuchsia-200",
  amber: "from-amber-500/25 to-amber-500/5 border-amber-400/40 text-amber-200",
};

const stepBg: Record<"cyan" | "purple" | "fuchsia" | "amber", string> = {
  cyan: "bg-cyan-500/20 border-cyan-400/50 text-white",
  purple: "bg-purple-500/25 border-purple-400/50 text-white",
  fuchsia: "bg-fuchsia-500/20 border-fuchsia-400/50 text-white",
  amber: "bg-amber-500/20 border-amber-400/50 text-white",
};

export const currentStateSlide: Slide = {
  id: "current-state",
  title: "Who does this today",
  section: "discovery",
  render: () => (
    <SlideShell eyebrow="Current state">
      <Stagger gap={0.1}>
        <FadeUp>
          <h2 className="text-[38px] font-semibold leading-[1.1] tracking-tight text-white">
            One decision, made <GradientText>hundreds of times a day,</GradientText> by hand.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-3 max-w-4xl text-[15px] leading-snug text-white/70">
            A returns associate at a DC receives an item and manually chooses a path: restock as
            A-stock, route to outlet, refurbish, liquidate to a jobber, donate, or destroy. The
            decision depends on condition grade, active-assortment status, current demand, and
            recovery value per channel, <span className="italic">almost none of which is in front
            of them.</span>
          </p>
        </FadeUp>

        {/* Swimlane */}
        <div className="relative mt-5 flex-1 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="grid h-full grid-cols-[160px_1fr] gap-3">
            {LANES.map((lane, laneIndex) => {
              const laneSteps = STEPS.filter((s) => s.lane === laneIndex);
              return (
                <div key={lane.label} className="contents">
                  {/* Lane label */}
                  <div
                    className={`flex items-center gap-2 rounded-xl border bg-gradient-to-r ${
                      toneToBg[lane.tone]
                    } px-3 py-2`}
                  >
                    <lane.icon className="h-4 w-4" aria-hidden />
                    <span className="text-[12px] font-semibold uppercase tracking-[0.14em]">
                      {lane.label}
                    </span>
                  </div>
                  {/* Lane track */}
                  <div className="relative rounded-xl border border-white/5 bg-black/20">
                    {/* Animated flow line */}
                    {laneIndex === 1 ? (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.4, delay: 0.6, ease: "easeInOut" }}
                        style={{ transformOrigin: "left" }}
                        className="absolute left-3 right-3 top-1/2 h-px bg-gradient-to-r from-purple-400/60 via-fuchsia-400/60 to-purple-400/60"
                      />
                    ) : null}
                    {laneSteps.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.6 + step.x * 0.008,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`absolute top-1/2 -translate-y-1/2 ${
                          step.isDecision
                            ? "rounded-full border-2 px-3 py-2 shadow-[0_0_20px_rgba(217,70,239,0.4)]"
                            : "rounded-lg border px-2.5 py-1.5"
                        } ${stepBg[lane.tone]}`}
                        style={{ left: `calc(${step.x}% - 40px)` }}
                      >
                        <p className="whitespace-pre-line text-center text-[10px] font-semibold leading-tight">
                          {step.label}
                        </p>
                      </motion.div>
                    ))}
                    {/* Channel tags for the last lane */}
                    {laneIndex === 3 ? (
                      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-wrap justify-end gap-1">
                        {CHANNEL_TAGS.map((tag, ti) => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 + ti * 0.08, duration: 0.4 }}
                            className="rounded-md border border-amber-400/40 bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-amber-200"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <FadeUp>
          <div className="mt-4 rounded-2xl border border-fuchsia-400/40 bg-gradient-to-r from-fuchsia-500/15 to-purple-500/15 px-5 py-3">
            <p className="text-[14px] leading-snug text-white">
              <span className="font-semibold text-fuchsia-200">The callout:</span> this decision is
              made on tribal knowledge and static rules, in seconds, under volume pressure.
            </p>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
