import { motion } from "framer-motion";
import { Activity, GaugeCircle, MousePointerClick, Star, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { CountUp, FadeUp, GradientText, Stagger } from "./_helpers";

type Supporting = {
  label: string;
  metric: string;
  definition: string;
  target: string;
  role: "driver" | "guardrail";
  delay: number;
};

const SUPPORTING: ReadonlyArray<Supporting> = [
  {
    label: "Quality",
    metric: "% resold at full price",
    definition: "Items put back on the shelf and sold at full price within 30 days.",
    target: "+3 points vs. today",
    role: "driver",
    delay: 0.4,
  },
  {
    label: "Trust",
    metric: "Override rate",
    definition: "How often the worker picks a different option than the one we suggest.",
    target: "Stays at or under 25% and trends down",
    role: "driver",
    delay: 0.5,
  },
  {
    label: "Speed",
    metric: "Seconds per item",
    definition: "How long it takes from scanning an item to confirming where it goes.",
    target: "No slower than today",
    role: "guardrail",
    delay: 0.6,
  },
  {
    label: "Throughput",
    metric: "Items per hour, per worker",
    definition: "How many items a worker handles in an hour.",
    target: "Same or better, up to 5% higher",
    role: "guardrail",
    delay: 0.7,
  },
];

type LeadingIndicator = {
  icon: LucideIcon;
  label: string;
  definition: string;
  delay: number;
};

const LEADING: ReadonlyArray<LeadingIndicator> = [
  {
    icon: GaugeCircle,
    label: "Prediction accuracy",
    definition: "Predicted recovered $ vs. actual, per item.",
    delay: 0.45,
  },
  {
    icon: MousePointerClick,
    label: "Override rate",
    definition: "Trending down means workers trust the call.",
    delay: 0.55,
  },
  {
    icon: Activity,
    label: "Worker adoption",
    definition: "% of shifts running through the tool.",
    delay: 0.65,
  },
];

export const metricsSlide: Slide = {
  id: "metrics",
  title: "Metrics & value logic",
  section: "prd",
  render: () => (
    <SlideShell eyebrow="Metrics · What we measure and why">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            <GradientText>Recovery rate</GradientText> is the number we're moving.
            Everything else either supports it or protects it.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-1.5 max-w-4xl text-[12.5px] leading-snug text-white/60">
            Recovery rate is how much of the item's original price we get back after a
            return, no matter which channel it ended up in. It rolls up quality, speed,
            and where the item went, into one number.
          </p>
        </FadeUp>

        <div className="mb-2 mt-3 grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] gap-4">
          {/* Left column: north star + supporting metrics table */}
          <div className="flex flex-col gap-3">
            {/* North star card */}
            <FadeUp>
              <div className="relative overflow-hidden rounded-2xl border border-purple-400/50 bg-gradient-to-br from-purple-500/25 via-fuchsia-500/15 to-transparent p-3">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-fuchsia-500/25 blur-3xl" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-purple-200" aria-hidden />
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-200">
                        Main metric
                      </p>
                    </div>
                    <p className="mt-1 text-[22px] font-semibold leading-tight text-white">
                      Recovery rate
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-white/70">
                      = value recovered ÷ original retail price
                    </p>
                    <p className="mt-1.5 max-w-md text-[11px] leading-snug text-white/70">
                      The one number that tells us whether we made the right call, no
                      matter where the item ended up.
                    </p>
                  </div>
                  <div className="rounded-xl border border-purple-400/50 bg-black/30 px-3 py-2 text-center">
                    <p className="text-[8.5px] font-semibold uppercase tracking-[0.22em] text-purple-200/80">
                      First-version goal
                    </p>
                    <p className="mt-0.5 font-mono text-[20px] font-semibold text-white">
                      +5 pts
                    </p>
                    <p className="text-[9px] text-white/50">90 days after launch</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Supporting metrics table */}
            <FadeUp>
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="mb-1.5 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                    Supporting metrics
                  </p>
                  <div className="flex items-center gap-2 text-[8.5px] uppercase tracking-[0.18em]">
                    <span className="inline-flex items-center gap-1 text-purple-200">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-300" />
                      Driver
                    </span>
                    <span className="inline-flex items-center gap-1 text-white/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      Guardrail
                    </span>
                  </div>
                </div>
                <div className="grid gap-1.5">
                  {SUPPORTING.map((s) => (
                    <motion.div
                      key={s.metric}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: s.delay }}
                      className={`grid grid-cols-[12px_84px_1fr_130px] items-center gap-2.5 rounded-lg border px-2.5 py-1.5 ${
                        s.role === "driver"
                          ? "border-purple-400/25 bg-purple-500/[0.06]"
                          : "border-white/5 bg-black/20"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          s.role === "driver" ? "bg-purple-300" : "bg-white/40"
                        }`}
                      />
                      <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-purple-300/70">
                        {s.label}
                      </span>
                      <p className="text-[11.5px] font-semibold text-white">
                        {s.metric}
                      </p>
                      <span className="text-right font-mono text-[10px] text-purple-200">
                        {s.target}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right: value logic */}
          <FadeUp>
            <div className="flex h-full min-h-0 flex-col rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-white/[0.04] to-fuchsia-500/[0.06] p-3.5">
              <div className="mb-1.5 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-fuchsia-200" aria-hidden />
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                  Why % · one metric that scales with item value
                </p>
              </div>

              <p className="text-[10.5px] leading-snug text-white/65">
                A $30 tee and a $650 Arc'teryx jacket both get "+5 pts of recovery" —
                but the dollars back look very different. That is why the metric is a
                percentage of retail, not a flat number.
              </p>

              {/* Baseline % vs With agent % */}
              <div className="mt-2.5 grid grid-cols-2 gap-2">
                <div>
                  <div className="mb-1 flex items-center justify-between text-[9.5px]">
                    <span className="uppercase tracking-[0.16em] text-white/50">
                      Today
                    </span>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/30 p-2.5">
                    <p className="text-[9.5px] uppercase tracking-[0.16em] text-white/50">
                      Recovery rate
                    </p>
                    <p className="mt-0.5 font-mono text-[22px] font-semibold text-white">
                      <CountUp to={35} suffix="%" duration={1.6} />
                    </p>
                    <p className="mt-0.5 text-[9.5px] text-white/45">
                      PM estimate · Eightx apparel recovery band
                    </p>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-[9.5px]">
                    <span className="uppercase tracking-[0.16em] text-purple-200">
                      With agent
                    </span>
                    <span className="font-mono text-purple-200">+5 pts</span>
                  </div>
                  <div className="rounded-lg border border-purple-400/50 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 p-2.5">
                    <p className="text-[9.5px] uppercase tracking-[0.16em] text-purple-200/80">
                      Recovery rate
                    </p>
                    <p className="mt-0.5 font-mono text-[22px] font-semibold text-white">
                      <CountUp to={40} suffix="%" duration={1.8} />
                    </p>
                    <p className="mt-0.5 text-[9.5px] text-purple-200/80">
                      floor of Optoro's 10–30% lift band
                    </p>
                  </div>
                </div>
              </div>

              {/* Leading indicators */}
              <div className="mt-2.5 rounded-lg border border-fuchsia-400/30 bg-fuchsia-500/[0.06] p-2.5">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-fuchsia-200/85">
                    Leading indicators · first 90 days
                  </p>
                  <p className="text-[8px] uppercase tracking-[0.18em] text-white/40">
                    Confirms at 30 / 60 / 90 days
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {LEADING.map((l) => (
                    <motion.div
                      key={l.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: l.delay }}
                      className="rounded-md border border-white/10 bg-black/25 px-2 py-1"
                    >
                      <div className="flex items-center gap-1.5">
                        <l.icon className="h-3 w-3 text-fuchsia-200" aria-hidden />
                        <p className="text-[9.5px] font-semibold text-white">
                          {l.label}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-2">
                <div className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-2">
                  <p className="text-[8.5px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    At 5M items / yr · ~$80 avg retail
                  </p>
                  <p className="mt-0.5 text-[11.5px] leading-snug text-white">
                    <span className="font-semibold text-purple-200">~$20M / yr</span>{" "}
                    in extra recovered value — +5 pts is $1.50 on a $30 tee, $32.50 on a
                    $650 jacket.
                  </p>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
