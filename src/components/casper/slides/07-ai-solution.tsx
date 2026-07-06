import { motion } from "framer-motion";
import {
  Camera,
  CheckCircle2,
  DollarSign,
  Leaf,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Truck,
  User,
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
  tone = "purple",
}: {
  icon: LucideIcon;
  label: string;
  delay: number;
  tone?: "purple" | "fuchsia";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5"
    >
      <span
        className={
          tone === "fuchsia"
            ? "flex h-5 w-5 items-center justify-center rounded-md bg-fuchsia-500/20 text-fuchsia-200"
            : "flex h-5 w-5 items-center justify-center rounded-md bg-purple-500/20 text-purple-200"
        }
      >
        <Icon className="h-3 w-3" aria-hidden />
      </span>
      <span className="text-[11px] font-medium text-white/85">{label}</span>
    </motion.div>
  );
}

export const aiSolutionSlide: Slide = {
  id: "ai-solution",
  title: "What AI actually changes",
  section: "solution",
  render: () => (
    <SlideShell eyebrow="Solution · A recommendation, not a report">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            The recommendation starts the moment the customer{" "}
            <GradientText>hits "return",</GradientText> not when the box arrives at
            the warehouse.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[13.5px] text-white/65">
            The moment a customer starts a return online, we make a first-pass
            recommendation using what they entered. When the item lands at the warehouse,
            we sharpen that recommendation using the actual condition and the latest
            channel numbers. The worker confirms or overrides. Overrides teach the
            model what to do next time.
          </p>
        </FadeUp>

        {/* Two-phase flow */}
        <div className="mt-4 grid flex-1 grid-cols-[1fr_1.15fr] gap-3">
          {/* Phase 1: pre-DC */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-col rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-transparent p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/25 text-purple-200">
                  <User className="h-3.5 w-3.5" aria-hidden />
                </span>
                <div>
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.24em] text-purple-300/80">
                    Step 1 · When the customer starts the return
                  </p>
                  <p className="text-[13px] font-semibold text-white">
                    First-pass recommendation, before the box ships
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-purple-400/40 bg-purple-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-purple-200">
                Days before it arrives
              </span>
            </div>

            <p className="mt-3 text-[11.5px] leading-snug text-white/65">
              We already know a lot before the box is in transit. The return form tells us
              the reason, the customer, and the item's history. That is enough for a
              solid first guess.
            </p>

            <div className="mt-3 space-y-1.5">
              <Signal icon={MessageSquare} label="Reason the customer gave" delay={0.55} />
              <Signal icon={Camera} label="Photo attached to the return" delay={0.65} />
              <Signal icon={User} label="Customer type and return history" delay={0.75} />
              <Signal icon={TrendingUp} label="How the item is selling right now" delay={0.85} />
            </div>

            <div className="mt-auto pt-3">
              <div className="flex items-center gap-2 rounded-lg border border-purple-400/40 bg-purple-500/15 px-3 py-2">
                <Sparkles className="h-3.5 w-3.5 text-purple-200" aria-hidden />
                <p className="text-[11.5px] leading-tight text-white">
                  <span className="font-semibold text-purple-200">First guess:</span>{" "}
                  <span className="font-mono">
                    "Likely outlet · 71% confident · pending inspection"
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Phase 2: at DC */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="flex flex-col rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-fuchsia-500/25 text-fuchsia-200">
                  <Warehouse className="h-3.5 w-3.5" aria-hidden />
                </span>
                <div>
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                    Step 2 · When it arrives at the warehouse
                  </p>
                  <p className="text-[13px] font-semibold text-white">
                    Final call, sharpened with the item's condition and the latest channel numbers
                  </p>
                </div>
              </div>
              <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-fuchsia-100">
                Seconds
              </span>
            </div>

            <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              {/* Live signals in */}
              <div>
                <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200/80">
                  Added at the warehouse
                </p>
                <div className="space-y-1.5">
                  <Signal icon={Camera} label="Confirmed condition" delay={0.7} tone="fuchsia" />
                  <Signal icon={DollarSign} label="What each channel would pay" delay={0.78} tone="fuchsia" />
                  <Signal icon={Warehouse} label="How busy each channel is" delay={0.86} tone="fuchsia" />
                  <Signal icon={Leaf} label="Sustainability rules that apply" delay={0.94} tone="fuchsia" />
                </div>
              </div>

              {/* Agent core */}
              <motion.div
                initial={{ scale: 0, rotate: -6 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.0, type: "spring", stiffness: 190, damping: 15 }}
                className="relative rounded-2xl border-2 border-purple-400/50 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/25 px-3 py-3 shadow-[0_18px_50px_-12px_rgba(168,85,247,0.6)]"
              >
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.35, 0.85, 0.35] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20 blur-lg"
                />
                <div className="relative flex flex-col items-center gap-1">
                  <Sparkles className="h-5 w-5 text-purple-200" aria-hidden />
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.24em] text-purple-200">
                    Disposition
                    <br />
                    Agent
                  </p>
                </div>
              </motion.div>

              {/* Output */}
              <div>
                <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200/80">
                  Ranked recommendation + reason
                </p>
                <div className="space-y-1.5">
                  <div className="rounded-lg border border-white/15 bg-black/30 px-2.5 py-1.5">
                    <p className="text-[9px] uppercase tracking-[0.18em] text-white/45">
                      Recommended
                    </p>
                    <p className="text-[12.5px] font-semibold text-white">Send to outlet</p>
                    <p className="mt-0.5 text-[9.5px] text-white/55">
                      87% confident · about $34 recovered
                    </p>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
                    <span className="text-[11px] font-medium text-white">
                      Worker confirms or overrides
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-lg border border-white/10 bg-black/25 px-3 py-2">
              <Truck className="h-3.5 w-3.5 text-purple-300" aria-hidden />
              <p className="text-[11px] leading-tight text-white/70">
                While the box is in transit, we prepare the recommendation. When the
                worker scans, the answer is already there. No waiting.
              </p>
            </div>
          </motion.div>
        </div>

        <FadeUp>
          <div className="mt-3 rounded-xl border border-purple-400/30 bg-purple-500/10 px-4 py-2.5">
            <p className="text-[12.5px] leading-snug text-white/85">
              <span className="font-semibold text-purple-200">The worker is not replaced.</span>{" "}
              They make the final call. When they override us, we learn from it. That is
              how the model gets better every week.
            </p>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
