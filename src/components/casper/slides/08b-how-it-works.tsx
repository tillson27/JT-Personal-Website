import { motion } from "framer-motion";
import {
  Boxes,
  CheckCircle2,
  Database,
  Monitor,
  MousePointer2,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

function DataChip({
  icon: Icon,
  label,
  value,
  delay,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay }}
      className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/20 text-purple-200">
        <Icon className="h-3 w-3" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-purple-300/70">
          {label}
        </p>
        <p className="truncate text-[10.5px] text-white/85">{value}</p>
      </div>
    </motion.div>
  );
}

export const howItWorksSlide: Slide = {
  id: "how-it-works",
  title: "How it works in practice",
  section: "solution",
  render: () => (
    <SlideShell eyebrow="Solution · What this looks like on the warehouse floor">
      <Stagger gap={0.08} fill>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            No new hardware.{" "}
            <GradientText>Same monitor, same shift.</GradientText>
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[13px] text-white/60">
            The system pulls in the information it needs and shows the worker a ranked
            recommendation on the monitor they already use. One tap to confirm, one tap to
            override. The worker still makes the call.
          </p>
        </FadeUp>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-[0.9fr_1.4fr_0.9fr] gap-3">
          {/* Left: data feeding in */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
          >
            <div className="mb-2 flex items-center gap-2">
              <Database className="h-4 w-4 text-purple-300" aria-hidden />
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-purple-300/80">
                What the system pulls in
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-1.5">
              <DataChip
                icon={User}
                label="Return reason"
                value='"Wrong size"'
                delay={0.5}
              />
              <DataChip
                icon={Boxes}
                label="Item and variant"
                value="SS26 tee · black · size M"
                delay={0.58}
              />
              <DataChip
                icon={Database}
                label="What each channel would pay"
                value="Outlet $34 · Refurbish $28"
                delay={0.66}
              />
              <DataChip
                icon={Database}
                label="Current demand"
                value="Up 18% this week"
                delay={0.74}
              />
              <DataChip
                icon={ShieldCheck}
                label="Condition (worker checks)"
                value="Grade B · tags still on"
                delay={0.82}
              />
              <DataChip
                icon={Database}
                label="Channel capacity"
                value="Outlet OK · main store full"
                delay={0.9}
              />
            </div>
            <p className="mt-3 text-[10px] italic leading-snug text-white/40">
              The first four arrive with the online return. The last two arrive when the
              worker scans the tag.
            </p>
          </motion.div>

          {/* Center: on-screen mock */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="flex flex-col rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 p-3.5"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-fuchsia-200" aria-hidden />
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                  What the worker sees on screen
                </p>
              </div>
              <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-fuchsia-100">
                Live
              </span>
            </div>

            {/* Monitor frame */}
            <div className="flex-1 overflow-hidden rounded-xl border border-white/15 bg-[#0a0714]">
              {/* Fake title bar */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-3 py-1.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400/70" />
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-300/70" />
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                  <span className="ml-2 text-[9px] uppercase tracking-widest text-white/40">
                    Returns Console · Item 7734911
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-widest text-white/40">
                  Station · IB-04
                </span>
              </div>

              {/* Screen body */}
              <div className="grid grid-cols-[1.2fr_1fr] gap-3 p-3">
                {/* Rec card */}
                <div className="rounded-lg border border-purple-400/50 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/15 p-3">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-purple-200" aria-hidden />
                    <p className="text-[9px] font-semibold uppercase tracking-widest text-purple-200">
                      Recommended
                    </p>
                  </div>
                  <p className="mt-1 text-[15px] font-semibold text-white">
                    Send to outlet
                  </p>
                  <div className="mt-1.5 flex items-center gap-2 text-[9.5px] text-white/70">
                    <span className="font-mono text-purple-200">87% confident</span>
                    <span>·</span>
                    <span>about $34 recovered</span>
                  </div>
                  <p className="mt-2 text-[9.5px] leading-tight text-white/70">
                    Outlet demand up 18% this week · refurbish is expensive · main store shelves full.
                  </p>
                </div>

                {/* Alternatives */}
                <div className="flex flex-col gap-1.5">
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-white/45">
                    Other options
                  </p>
                  {[
                    { label: "Refurbish", value: "$28", tone: "text-white/85" },
                    { label: "Resell as new", value: "$40 · queue", tone: "text-white/50" },
                    { label: "Liquidate", value: "$12", tone: "text-white/85" },
                    { label: "Donate", value: "$0 · tax credit", tone: "text-white/85" },
                  ].map((a) => (
                    <div
                      key={a.label}
                      className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-2 py-1"
                    >
                      <span className={`text-[10px] ${a.tone}`}>{a.label}</span>
                      <span className="font-mono text-[9.5px] text-white/60">
                        {a.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 border-t border-white/10 bg-white/[0.02] px-3 py-2">
                <div className="flex items-center justify-center gap-1.5 rounded-md bg-emerald-500/30 py-1.5 text-[10px] font-semibold text-emerald-100">
                  <CheckCircle2 className="h-3 w-3" aria-hidden /> Confirm ⏎
                </div>
                <div className="flex items-center justify-center gap-1.5 rounded-md bg-white/[0.08] py-1.5 text-[10px] font-semibold text-white/80">
                  <MousePointer2 className="h-3 w-3" aria-hidden /> Override →
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: guarantees */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-transparent p-3.5"
          >
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-purple-300" aria-hidden />
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-purple-300/80">
                What we are not doing
              </p>
            </div>
            <ul className="space-y-2 text-[11.5px] leading-snug text-white/85">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>
                  <span className="font-semibold text-white">No new hardware.</span> The
                  worker uses the scanner and keyboard they already have.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>
                  <span className="font-semibold text-white">No auto-action.</span>{" "}
                  The system suggests, the worker confirms.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>
                  <span className="font-semibold text-white">No condition grading by
                  AI alone in version one.</span> The worker enters the condition. A
                  photo can help, but does not decide.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>
                  <span className="font-semibold text-white">No layoffs.</span>{" "}
                  This tool takes the guesswork out of the call. The worker still
                  runs the floor.
                </span>
              </li>
            </ul>
            <p className="mt-auto pt-3 text-[10px] italic leading-snug text-white/40">
              Every override is saved with a reason. That is the main way the model
              gets smarter for version two.
            </p>
          </motion.div>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
