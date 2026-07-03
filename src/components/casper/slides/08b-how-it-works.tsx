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
    <SlideShell eyebrow="Solution · How this actually shows up at the inspection station">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[34px] font-semibold leading-[1.1] tracking-tight text-white">
            No new hardware.{" "}
            <GradientText>An existing monitor, an existing shift.</GradientText>
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[13px] text-white/60">
            Signals feed into a service. The associate sees a ranked rec on the monitor
            they already have. One tap to confirm, one tap to override. The associate is
            still the decision-maker.
          </p>
        </FadeUp>

        <div className="mt-4 grid flex-1 grid-cols-[0.9fr_1.4fr_0.9fr] gap-3">
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
                What the service sees
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
                label="SKU + variant"
                value="SS26 tee · black · M"
                delay={0.58}
              />
              <DataChip
                icon={Database}
                label="Live channel value"
                value="Outlet $34 · Refurb $28"
                delay={0.66}
              />
              <DataChip
                icon={Database}
                label="A-stock demand"
                value="+18% w/w · in-assortment"
                delay={0.74}
              />
              <DataChip
                icon={ShieldCheck}
                label="Condition (entered)"
                value="Grade B · tags on"
                delay={0.82}
              />
              <DataChip
                icon={Database}
                label="Channel capacity"
                value="Outlet OK · A-stock full"
                delay={0.9}
              />
            </div>
            <p className="mt-3 text-[10px] italic leading-snug text-white/40">
              First 4 arrive with the return form. Last 2 arrive when the associate scans
              the tag.
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
                  What the associate sees on-screen
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
                    Disposition Console · SKU 7734911
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
                    Route to outlet
                  </p>
                  <div className="mt-1.5 flex items-center gap-2 text-[9.5px] text-white/70">
                    <span className="font-mono text-purple-200">conf. 0.87</span>
                    <span>·</span>
                    <span>est. $34 recovered</span>
                  </div>
                  <p className="mt-2 text-[9.5px] leading-tight text-white/70">
                    Outlet demand +18% w/w · refurb cost high · A-stock capacity full.
                  </p>
                </div>

                {/* Alternatives */}
                <div className="flex flex-col gap-1.5">
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-white/45">
                    Alternatives
                  </p>
                  {[
                    { label: "Refurbish", value: "$28", tone: "text-white/85" },
                    { label: "A-stock", value: "$40 · queued", tone: "text-white/50" },
                    { label: "Liquidate", value: "$12", tone: "text-white/85" },
                    { label: "Donate", value: "$0 · tax cred.", tone: "text-white/85" },
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
                What we're not doing
              </p>
            </div>
            <ul className="space-y-2 text-[11.5px] leading-snug text-white/85">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>
                  <span className="font-semibold text-white">No physical scanning
                  hardware.</span> The associate uses their existing scanner + keyboard.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>
                  <span className="font-semibold text-white">No auto-actioning.</span>{" "}
                  The system suggests; the associate confirms.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>
                  <span className="font-semibold text-white">No AI-only condition
                  grading in v1.</span> Condition is entered by the associate; a photo
                  can inform but does not decide.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>
                  <span className="font-semibold text-white">No job displacement.</span>{" "}
                  This tool exists to remove judgement cost, not to remove the associate.
                </span>
              </li>
            </ul>
            <p className="mt-auto pt-3 text-[10px] italic leading-snug text-white/40">
              Every override is captured with a reason code — the primary training signal
              for v2.
            </p>
          </motion.div>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
