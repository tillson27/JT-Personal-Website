import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Gift,
  Package,
  Quote,
  RefreshCw,
  RotateCcw,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  Trash2,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

type ActorTone = "cyan" | "purple" | "fuchsia";

const actorTone: Record<
  ActorTone,
  { pill: string; badge: string; card: string }
> = {
  cyan: {
    pill: "border-cyan-400/40 bg-cyan-500/10 text-cyan-200",
    badge: "border-cyan-400/50 bg-cyan-500/20 text-cyan-100",
    card: "border-cyan-400/20 bg-gradient-to-b from-cyan-500/[0.07] to-transparent",
  },
  purple: {
    pill: "border-purple-400/40 bg-purple-500/10 text-purple-200",
    badge: "border-purple-400/50 bg-purple-500/20 text-purple-100",
    card: "border-purple-400/20 bg-gradient-to-b from-purple-500/[0.07] to-transparent",
  },
  fuchsia: {
    pill: "border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-200",
    badge: "border-fuchsia-400/50 bg-fuchsia-500/20 text-fuchsia-100",
    card: "border-fuchsia-400/20 bg-gradient-to-b from-fuchsia-500/[0.07] to-transparent",
  },
};

type SetupStep = {
  n: string;
  actor: string;
  actorIcon: LucideIcon;
  title: string;
  hint: string;
  tone: ActorTone;
};

const SETUP_STEPS: ReadonlyArray<SetupStep> = [
  {
    n: "1",
    actor: "Customer",
    actorIcon: User,
    title: "Return started",
    hint: "Online or in store",
    tone: "cyan",
  },
  {
    n: "2",
    actor: "Warehouse worker",
    actorIcon: Package,
    title: "Receive & inspect",
    hint: "Sight and touch",
    tone: "purple",
  },
  {
    n: "3",
    actor: "System",
    actorIcon: Search,
    title: "Look up the item",
    hint: "Inventory basics only",
    tone: "fuchsia",
  },
];

const CHANNELS: ReadonlyArray<{
  label: string;
  icon: LucideIcon;
  caption: string;
}> = [
  { label: "Resell as new", icon: ShoppingBag, caption: "Highest recovery" },
  { label: "Outlet", icon: Store, caption: "Discounted store" },
  { label: "Refurbish", icon: RefreshCw, caption: "Restore & resell" },
  { label: "Liquidate", icon: RotateCcw, caption: "Sold in bulk" },
  { label: "Donate", icon: Gift, caption: "Written off" },
  { label: "Destroy", icon: Trash2, caption: "Lowest recovery" },
];

function SetupStepCard({ step, index }: { step: SetupStep; index: number }) {
  const tone = actorTone[step.tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.4 + index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative flex h-full flex-col rounded-2xl border p-3 ${tone.card}`}
    >
      <div
        className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${tone.pill}`}
      >
        <step.actorIcon className="h-3 w-3" aria-hidden />
        {step.actor}
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        <span
          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold ${tone.badge}`}
        >
          {step.n}
        </span>
        <span className="text-[13px] font-semibold leading-tight text-white">
          {step.title}
        </span>
      </div>

      <p className="mt-1.5 text-[11px] leading-snug text-white/55">
        {step.hint}
      </p>
    </motion.div>
  );
}

function DecisionHub() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex w-full max-w-md items-center gap-3 rounded-2xl border-2 border-fuchsia-400/60 bg-gradient-to-r from-fuchsia-500/25 via-purple-500/15 to-fuchsia-500/25 px-4 py-3 shadow-[0_0_44px_rgba(217,70,239,0.35)]"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -left-4 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-fuchsia-500/30 blur-2xl"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -right-4 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-purple-500/25 blur-2xl"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
      />

      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full border border-fuchsia-400/70 bg-gradient-to-r from-fuchsia-500 to-purple-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-white shadow-[0_0_16px_rgba(217,70,239,0.5)]">
        The call
      </span>

      <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-fuchsia-400/60 bg-gradient-to-br from-fuchsia-500/40 to-purple-500/30 text-fuchsia-100">
        <Sparkles className="h-5 w-5" aria-hidden />
      </span>

      <div className="relative flex flex-col">
        <span className="text-[9.5px] font-bold uppercase tracking-[0.22em] text-fuchsia-200">
          Step 4 · Warehouse worker
        </span>
        <span className="text-[17px] font-semibold leading-tight text-white">
          Manual decision
        </span>
        <span className="text-[11px] leading-snug text-fuchsia-100/75">
          Seconds. Gut feel. No data at hand.
        </span>
      </div>
    </motion.div>
  );
}

function FanConnector() {
  return (
    <svg
      aria-hidden
      className="h-full w-full overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {CHANNELS.map((_, i) => {
        const x2 = ((i + 0.5) / CHANNELS.length) * 100;
        return (
          <motion.line
            key={i}
            x1={50}
            y1={0}
            x2={x2}
            y2={100}
            stroke="rgb(217,70,239)"
            strokeOpacity="0.55"
            strokeWidth="0.35"
            strokeDasharray="1.2 0.9"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: 1.0 + i * 0.05,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </svg>
  );
}

function ChannelCard({
  channel,
  index,
}: {
  channel: (typeof CHANNELS)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: 1.15 + index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="flex flex-col items-center gap-1 rounded-xl border border-amber-400/30 bg-gradient-to-b from-amber-500/[0.14] to-amber-500/[0.02] px-2 py-2"
    >
      <channel.icon className="h-4 w-4 text-amber-200" aria-hidden />
      <p className="text-center text-[11px] font-semibold leading-tight text-amber-50">
        {channel.label}
      </p>
      <p className="text-center text-[9px] leading-tight text-amber-200/70">
        {channel.caption}
      </p>
    </motion.div>
  );
}

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
          <p className="mt-3 max-w-4xl text-[13.5px] leading-snug text-white/70">
            Returned items land at a distribution centre, the large warehouse where a
            retailer receives and re-routes inventory. A worker picks up each item and
            chooses one of six paths. That call, called{" "}
            <span className="font-semibold text-white">returns disposition</span>, is the
            one this deck is about. It should depend on the item's condition, the
            season, current stock, and what each channel would pay for it right now.{" "}
            <span className="italic">Almost none of that is in front of the worker.</span>
          </p>
        </FadeUp>

        {/* Flow diagram */}
        <div className="relative mt-3 flex flex-1 flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          {/* Setup steps (1-3) */}
          <div className="relative grid grid-cols-3 gap-3">
            {SETUP_STEPS.map((step, i) => (
              <div key={step.n} className="relative">
                <SetupStepCard step={step} index={i} />
                {i < SETUP_STEPS.length - 1 ? (
                  <motion.span
                    aria-hidden
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.12, duration: 0.35 }}
                    className="pointer-events-none absolute -right-2.5 top-1/2 z-10 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-purple-500/25 text-purple-200"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </motion.span>
                ) : null}
              </div>
            ))}
          </div>

          {/* Arrow down to decision hub */}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.78, duration: 0.35 }}
            className="mx-auto my-2 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/25 text-purple-200"
          >
            <ChevronDown className="h-3.5 w-3.5" aria-hidden />
          </motion.div>

          {/* Decision hub */}
          <DecisionHub />

          {/* Fan connector + "1 of 6 outcomes" label */}
          <div className="relative mt-2 h-8">
            <div className="absolute inset-0">
              <FanConnector />
            </div>
            <motion.span
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.35 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-400/40 bg-[#120820] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200"
            >
              1 of 6 outcomes
            </motion.span>
          </div>

          {/* Channels */}
          <div className="grid grid-cols-6 gap-2">
            {CHANNELS.map((channel, i) => (
              <ChannelCard channel={channel} index={i} key={channel.label} />
            ))}
          </div>

          {/* Then logged */}
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.4 }}
            className="mt-3 flex items-center justify-center gap-2 text-[10.5px] text-white/45"
          >
            <span className="inline-flex items-center gap-1 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-2 py-0.5 font-semibold uppercase tracking-[0.18em] text-fuchsia-200/80">
              <ClipboardList className="h-3 w-3" aria-hidden />
              Step 5
            </span>
            <span>System logs the decision and updates inventory.</span>
          </motion.div>
        </div>

        <FadeUp>
          <div className="mt-3 grid grid-cols-[1.15fr_1fr] gap-3">
            <div className="rounded-2xl border border-fuchsia-400/40 bg-gradient-to-r from-fuchsia-500/15 to-purple-500/15 px-5 py-3">
              <p className="text-[13.5px] leading-snug text-white">
                <span className="font-semibold text-fuchsia-200">The takeaway:</span> the
                highest-value step in this whole flow is the one made by a person in a
                few seconds, using gut feel and old rules, while more items pile up
                behind them.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <Quote className="mt-0.5 h-4 w-4 flex-shrink-0 text-purple-300" aria-hidden />
              <div>
                <p className="text-[12.5px] italic leading-snug text-white/90">
                  "By 2pm I stop reading tags. If it looks worn, it goes to liquidation.
                  I'll take the hit on value over falling behind."
                </p>
                <p className="mt-1.5 text-[9.5px] uppercase tracking-[0.22em] text-white/40">
                  Composite · returns floor leads, apparel DC engagements
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
