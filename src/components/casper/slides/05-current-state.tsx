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
  { icon: Package, label: "Warehouse worker", tone: "purple" },
  { icon: Zap, label: "Warehouse + inventory systems", tone: "fuchsia" },
  { icon: Boxes, label: "Where the item can go", tone: "amber" },
];

type Step = {
  lane: number;
  label: string;
  x: number;
  isDecision?: boolean;
};

const STEPS: ReadonlyArray<Step> = [
  { lane: 0, label: "Return\nstarted", x: 6 },
  { lane: 1, label: "Receive\n& inspect", x: 24 },
  { lane: 2, label: "Look up\nthe item", x: 42 },
  { lane: 1, label: "Manual\ndecision", x: 60, isDecision: true },
  { lane: 3, label: "Send it\nsomewhere", x: 78 },
  { lane: 2, label: "Log the\ndecision", x: 92 },
];

const CHANNEL_TAGS: ReadonlyArray<string> = [
  "Resell as new",
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

// Constants for layout so arrows match step positions perfectly.
const LANE_COUNT = LANES.length;
const STEP_BOX_WIDTH = 82; // px
const STEP_BOX_HEIGHT = 44; // px

export const currentStateSlide: Slide = {
  id: "current-state",
  title: "Who does this today",
  section: "discovery",
  render: () => (
    <SlideShell eyebrow="Current state · Returns disposition at a distribution centre">
      <Stagger gap={0.1}>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            One decision, made <GradientText>hundreds of times a day,</GradientText> by hand.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-3 max-w-4xl text-[14px] leading-snug text-white/70">
            Returned items land at a distribution centre, the large warehouse where a
            retailer receives and re-routes inventory. A worker picks up each item and
            chooses one of six paths: put it back on shelf as new, send it to an outlet
            store, refurbish, sell it in bulk to a liquidator, donate, or destroy. That
            call, called <span className="font-semibold text-white">returns disposition</span>,
            is the one this deck is about. It should depend on the item's condition,
            whether it is still in the current season, how much of it is already selling,
            and what each channel would pay for it right now.{" "}
            <span className="italic">Almost none of that is in front of the worker.</span>
          </p>
        </FadeUp>

        {/* Swimlane */}
        <div className="relative mt-4 flex-1 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
          <div
            className="relative grid h-full gap-2"
            style={{
              gridTemplateColumns: "150px 1fr",
              gridTemplateRows: `repeat(${LANE_COUNT}, minmax(0, 1fr))`,
            }}
          >
            {/* Track column background: spans all rows */}
            <div
              className="pointer-events-none relative rounded-xl"
              style={{
                gridColumn: "2",
                gridRow: `1 / span ${LANE_COUNT}`,
              }}
            >
              {/* Lane row backgrounds */}
              <div className="absolute inset-0 flex flex-col gap-2">
                {LANES.map((lane) => (
                  <div
                    key={lane.label}
                    className="flex-1 rounded-xl border border-white/5 bg-black/20"
                  />
                ))}
              </div>

              {/* Arrows SVG: spans full track */}
              <svg
                aria-hidden
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full overflow-visible"
              >
                <defs>
                  <marker
                    id="arrowhead"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M0 0 L10 5 L0 10 Z" fill="rgb(192,132,252)" />
                  </marker>
                </defs>
                {STEPS.slice(0, -1).map((step, i) => {
                  const next = STEPS[i + 1];
                  const x1 = step.x;
                  const y1 = ((step.lane + 0.5) / LANE_COUNT) * 100;
                  const x2 = next.x;
                  const y2 = ((next.lane + 0.5) / LANE_COUNT) * 100;
                  // Trim endpoints so line doesn't overlap the boxes; approx.
                  const trim = 6;
                  const dx = x2 - x1;
                  const dy = y2 - y1;
                  const len = Math.sqrt(dx * dx + dy * dy);
                  const ux = dx / len;
                  const uy = dy / len;
                  const sx = x1 + ux * trim;
                  const sy = y1 + uy * trim;
                  const ex = x2 - ux * trim;
                  const ey = y2 - uy * trim;
                  return (
                    <motion.line
                      key={i}
                      x1={sx}
                      y1={sy}
                      x2={ex}
                      y2={ey}
                      stroke="rgb(192,132,252)"
                      strokeOpacity="0.55"
                      strokeWidth="0.35"
                      strokeDasharray="1.2 0.8"
                      markerEnd="url(#arrowhead)"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.6 + i * 0.18,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </svg>

              {/* Steps */}
              {STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.5 + i * 0.14,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`absolute flex items-center justify-center ${
                    step.isDecision
                      ? "rounded-xl border-2 shadow-[0_0_20px_rgba(217,70,239,0.4)]"
                      : "rounded-lg border"
                  } ${stepBg[LANES[step.lane].tone]}`}
                  style={{
                    width: STEP_BOX_WIDTH,
                    height: STEP_BOX_HEIGHT,
                    left: `calc(${step.x}% - ${STEP_BOX_WIDTH / 2}px)`,
                    top: `calc(${((step.lane + 0.5) / LANE_COUNT) * 100}% - ${STEP_BOX_HEIGHT / 2}px)`,
                  }}
                >
                  <p className="whitespace-pre-line text-center text-[10px] font-semibold leading-tight">
                    {step.label}
                  </p>
                </motion.div>
              ))}

              {/* Channel tags: anchored to the destinations lane */}
              <div
                className="absolute right-2 flex flex-wrap justify-end gap-1"
                style={{
                  top: `calc(${((3 + 0.5) / LANE_COUNT) * 100}% + ${STEP_BOX_HEIGHT / 2 + 4}px)`,
                }}
              >
                {CHANNEL_TAGS.map((tag, ti) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + ti * 0.06, duration: 0.35 }}
                    className="rounded-md border border-amber-400/40 bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-amber-200"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Lane labels: column 1 */}
            {LANES.map((lane, laneIndex) => (
              <div
                key={lane.label}
                className={`flex items-center gap-2 rounded-xl border bg-gradient-to-r ${toneToBg[lane.tone]} px-3 py-2`}
                style={{
                  gridColumn: "1",
                  gridRow: `${laneIndex + 1}`,
                }}
              >
                <lane.icon className="h-4 w-4" aria-hidden />
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em]">
                  {lane.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <FadeUp>
          <div className="mt-3 rounded-2xl border border-fuchsia-400/40 bg-gradient-to-r from-fuchsia-500/15 to-purple-500/15 px-5 py-3">
            <p className="text-[13.5px] leading-snug text-white">
              <span className="font-semibold text-fuchsia-200">The takeaway:</span> the
              highest-value step in this whole flow is the one made by a person in a
              few seconds, using gut feel and old rules, while more items pile up behind
              them.
            </p>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
