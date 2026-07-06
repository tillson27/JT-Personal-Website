import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Clock,
  ExternalLink,
  Loader2,
  Maximize2,
  MousePointer2,
  Package,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

function Frame({
  label,
  index,
  children,
  delay,
}: {
  label: string;
  index: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <div className="mb-1.5 flex items-center gap-2 text-[10px]">
        <span className="rounded-md bg-purple-500/25 px-1.5 py-0.5 font-mono font-semibold uppercase tracking-widest text-purple-200">
          {index}
        </span>
        <span className="font-semibold uppercase tracking-[0.22em] text-white/70">
          {label}
        </span>
      </div>
      <div className="flex-1 rounded-2xl border-2 border-dashed border-purple-400/30 bg-[#0e0a1a] p-3">
        {children}
      </div>
    </motion.div>
  );
}

function Bar({ w, tone = "muted" }: { w: string; tone?: "muted" | "accent" | "line" }) {
  const cls =
    tone === "accent"
      ? "bg-gradient-to-r from-purple-400 to-fuchsia-400"
      : tone === "line"
        ? "bg-white/20"
        : "bg-white/12";
  return <div className={`h-2 rounded-md ${cls}`} style={{ width: w }} />;
}

export const wireframeSlide: Slide = {
  id: "wireframe",
  title: "Wireframe · Inspection station",
  section: "execution",
  render: () => <WireframeView />,
};

function WireframeView() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <SlideShell eyebrow="Wireframes · Screens the worker sees, and the live dashboard">
      <Stagger gap={0.08} fill>
        <FadeUp>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
                One screen, <GradientText>four moments.</GradientText> That is the whole flow.
              </h2>
              <p className="mt-2 max-w-3xl text-[12.5px] text-white/60">
                Rough frames below show what the worker sees at each moment. Click the button
                on the right for a higher-fidelity mockup of the live dashboard.
              </p>
            </div>
            <div className="flex flex-shrink-0 flex-col items-end gap-2">
              <motion.button
                type="button"
                onClick={() => setShowDashboard(true)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="group inline-flex items-center gap-2 rounded-xl border border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-500/25 to-purple-500/20 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-fuchsia-100 shadow-[0_12px_40px_-14px_rgba(217,70,239,0.6)] transition hover:brightness-110"
              >
                <Maximize2 className="h-4 w-4" aria-hidden />
                See the live dashboard
              </motion.button>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <Link
                  to="/casper/mockup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl border border-purple-400/40 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-purple-100 transition hover:border-purple-300/60 hover:bg-purple-500/15"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  Bonus · See it inside Oracle RMS
                </Link>
              </motion.div>
            </div>
          </div>
        </FadeUp>

        <div className="mt-4 grid min-h-0 flex-1 grid-cols-4 gap-3">
          {/* State 1: Loading */}
          <Frame index="01" label="Loading" delay={0.3}>
            <div className="flex h-full flex-col gap-2">
              <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                <p className="mb-1 text-[9px] uppercase tracking-widest text-white/40">Item</p>
                <Bar w="80%" tone="line" />
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/30 p-2">
                <Camera className="h-3 w-3 text-white/40" />
                <Bar w="60%" tone="line" />
              </div>
              <div className="flex-1 rounded-lg border border-white/10 bg-black/30 p-3">
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-white/50">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="h-5 w-5 text-purple-300" />
                    </motion.div>
                    <p className="text-[10px]">Checking the latest channel numbers…</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <div className="h-6 flex-1 rounded-md bg-white/[0.04]" />
                <div className="h-6 flex-1 rounded-md bg-white/[0.04]" />
              </div>
            </div>
          </Frame>

          {/* State 2: Recommendation shown */}
          <Frame index="02" label="Recommendation" delay={0.42}>
            <div className="flex h-full flex-col gap-2">
              <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                <p className="mb-1 text-[9px] uppercase tracking-widest text-white/40">
                  Item · 7734911
                </p>
                <p className="font-mono text-[10px] text-white/80">
                  Grade B · photo attached
                </p>
              </div>
              <div className="flex-1 rounded-xl border border-purple-400/50 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/20 p-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-purple-200" />
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-purple-200">
                    Recommended
                  </p>
                </div>
                <p className="mt-1 text-[13px] font-semibold text-white">Send to outlet</p>
                <div className="mt-2 space-y-1">
                  <Bar w="100%" tone="accent" />
                  <p className="font-mono text-[9px] text-purple-200">87% confident</p>
                </div>
                <p className="mt-2 text-[9px] leading-tight text-white/70">
                  Outlet demand up 18% · refurbish is expensive · main store full
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-1.5">
                <p className="text-[8px] uppercase tracking-widest text-white/40">
                  Other options
                </p>
                <div className="mt-1 flex gap-1">
                  <div className="flex-1 rounded bg-white/[0.06] px-1.5 py-1 text-[9px] text-white/70">
                    Refurbish · $28
                  </div>
                  <div className="flex-1 rounded bg-white/[0.06] px-1.5 py-1 text-[9px] text-white/70">
                    Liquidate · $12
                  </div>
                </div>
              </div>
              <div className="flex gap-1.5">
                <div className="h-6 flex-1 rounded-md bg-emerald-500/30 text-center text-[9px] font-semibold leading-6 text-emerald-200">
                  Confirm
                </div>
                <div className="h-6 flex-1 rounded-md bg-white/[0.08] text-center text-[9px] font-semibold leading-6 text-white/70">
                  Override
                </div>
              </div>
            </div>
          </Frame>

          {/* State 3: Low confidence */}
          <Frame index="03" label="Low confidence" delay={0.54}>
            <div className="flex h-full flex-col gap-2">
              <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                <p className="mb-1 text-[9px] uppercase tracking-widest text-white/40">
                  Item · 4429021
                </p>
                <p className="font-mono text-[10px] text-white/80">
                  Grade C · unusual pattern
                </p>
              </div>
              <div className="flex-1 rounded-xl border border-amber-400/50 bg-amber-500/10 p-3">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3 text-amber-200" />
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-amber-200">
                    Ask a person
                  </p>
                </div>
                <p className="mt-1 text-[13px] font-semibold text-white">
                  Best guess: refurbish
                </p>
                <div className="mt-2 space-y-1">
                  <Bar w="45%" tone="accent" />
                  <p className="font-mono text-[9px] text-amber-200">
                    42% confident · below our 60% line
                  </p>
                </div>
                <p className="mt-2 text-[9px] leading-tight text-white/75">
                  Missing data: refurbish cost is 4 hours old
                </p>
                <div className="mt-2 rounded-md border border-white/15 bg-black/30 p-1.5 text-[9px] text-white/70">
                  Other options shown by default →
                </div>
              </div>
              <div className="flex gap-1.5">
                <div className="h-6 flex-1 rounded-md bg-amber-500/25 text-center text-[9px] font-semibold leading-6 text-amber-100">
                  Pick manually
                </div>
              </div>
            </div>
          </Frame>

          {/* State 4: Override modal */}
          <Frame index="04" label="Override reason" delay={0.66}>
            <div className="relative flex h-full flex-col gap-2">
              <div className="pointer-events-none absolute inset-0 flex flex-col gap-2 opacity-30">
                <div className="h-8 rounded-lg bg-white/[0.04] p-2" />
                <div className="flex-1 rounded-xl bg-white/[0.04]" />
              </div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 180 }}
                className="relative z-10 my-auto rounded-xl border border-fuchsia-400/40 bg-[#12081e] p-3 shadow-[0_20px_60px_-10px_rgba(217,70,239,0.4)]"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-fuchsia-300" />
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-fuchsia-200">
                    Override · pick a reason
                  </p>
                </div>
                <p className="mt-2 text-[10.5px] leading-tight text-white/80">
                  You chose{" "}
                  <span className="font-semibold text-white">Liquidate</span> instead of{" "}
                  <span className="font-semibold text-white">Outlet</span>. Why?
                </p>
                <div className="mt-2 space-y-1">
                  {[
                    "Visible defect the grade missed",
                    "Local demand looks different than the model thinks",
                    "This item is under a bulk-sale contract",
                    "Other · free text",
                  ].map((r, i) => (
                    <div
                      key={r}
                      className={`rounded-md border px-2 py-1 text-[9.5px] ${
                        i === 0
                          ? "border-fuchsia-400/50 bg-fuchsia-500/15 text-fuchsia-100"
                          : "border-white/10 bg-white/[0.03] text-white/75"
                      }`}
                    >
                      {r}
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-1.5">
                  <div className="h-6 flex-1 rounded-md bg-fuchsia-500/40 text-center text-[9px] font-semibold leading-6 text-white">
                    Submit
                  </div>
                  <div className="h-6 flex-1 rounded-md bg-white/[0.06] text-center text-[9px] font-semibold leading-6 text-white/70">
                    Cancel
                  </div>
                </div>
              </motion.div>
            </div>
          </Frame>
        </div>

        <FadeUp>
          <div className="mt-3 text-center text-[11px] uppercase tracking-[0.28em] text-white/40">
            Loading → recommendation → low confidence → override reason · loops back into
            training
          </div>
        </FadeUp>
      </Stagger>

      <AnimatePresence>
        {showDashboard ? <DashboardMock onClose={() => setShowDashboard(false)} /> : null}
      </AnimatePresence>
    </SlideShell>
  );
}

function DashboardMock({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="dashboard-mock"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 z-40 flex items-center justify-center bg-black/70 p-6 backdrop-blur"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-purple-400/40 bg-[#0a0714] shadow-[0_40px_120px_-20px_rgba(147,51,234,0.7)]"
      >
        {/* Chrome */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-400/70" />
            <div className="h-2 w-2 rounded-full bg-amber-300/70" />
            <div className="h-2 w-2 rounded-full bg-emerald-400/70" />
            <span className="ml-2 text-[10px] font-semibold uppercase tracking-widest text-white/50">
              Returns Console · Live
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close mockup"
            className="rounded-md border border-white/10 bg-white/[0.04] p-1 text-white/70 transition hover:bg-white/10"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Header row */}
        <div className="grid grid-cols-4 border-b border-white/10 bg-white/[0.02] px-4 py-2 text-[10px]">
          <div>
            <p className="uppercase tracking-widest text-white/40">Station</p>
            <p className="font-mono text-white">IB-04 · A. Ramirez</p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-white/40">Shift</p>
            <p className="font-mono text-white">14:22 · 3h 41m in</p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-white/40">Items today</p>
            <p className="font-mono text-white">247 · 96% confidence</p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-white/40">Value recovered</p>
            <p className="font-mono text-emerald-300">$8,142 · +6.1 pts</p>
          </div>
        </div>

        {/* Body */}
        <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-3 p-4">
          {/* Item card */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-white/40">
              Current item
            </p>
            <div className="mt-2 aspect-square rounded-lg border border-white/10 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10">
              <div className="flex h-full items-center justify-center">
                <Package className="h-10 w-10 text-white/30" aria-hidden />
              </div>
            </div>
            <p className="mt-2 text-[11px] font-semibold text-white">
              SS26 Tee · Black · M
            </p>
            <p className="text-[9.5px] font-mono text-white/50">Item 7734911 · $100 retail</p>
            <div className="mt-2 space-y-1 text-[10px]">
              <div className="flex justify-between text-white/70">
                <span>Grade</span>
                <span className="font-mono text-white">B</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Reason</span>
                <span className="text-white/85">"wrong size"</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Returned</span>
                <span>3 days ago</span>
              </div>
            </div>
          </div>

          {/* Recommendation panel */}
          <div className="rounded-xl border border-purple-400/50 bg-gradient-to-br from-purple-500/20 to-fuchsia-500/10 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-200" aria-hidden />
                <p className="text-[10px] font-semibold uppercase tracking-widest text-purple-200">
                  Recommendation
                </p>
              </div>
              <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-emerald-200">
                High confidence
              </span>
            </div>
            <p className="mt-2 text-[24px] font-semibold text-white">Send to outlet</p>
            <div className="mt-1 flex items-center gap-3 text-[10.5px]">
              <span className="font-mono text-purple-200">87% confident</span>
              <span className="text-white/40">·</span>
              <span className="font-mono text-emerald-300">+$34 recovered</span>
              <span className="text-white/40">·</span>
              <span className="text-white/60">vs. $12 if we liquidated</span>
            </div>

            <div className="mt-3 rounded-lg border border-white/10 bg-black/30 p-2">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-white/50">
                Why
              </p>
              <ul className="mt-1 space-y-0.5 text-[10.5px] text-white/85">
                <li>• Outlet demand up 18% this week for this category</li>
                <li>• Item is still in the current lineup, but the main store is full</li>
                <li>• Refurbishing costs $22, more than we would gain</li>
              </ul>
            </div>

            <div className="mt-3">
              <p className="text-[9px] font-semibold uppercase tracking-widest text-white/50">
                Other options
              </p>
              <div className="mt-1 grid grid-cols-4 gap-1.5">
                {[
                  { l: "Refurbish", v: "$28" },
                  { l: "Resell as new", v: "$40·q" },
                  { l: "Liquidate", v: "$12" },
                  { l: "Donate", v: "$0" },
                ].map((a) => (
                  <div
                    key={a.l}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-1 text-center"
                  >
                    <p className="text-[9px] text-white/70">{a.l}</p>
                    <p className="font-mono text-[9px] text-white/50">{a.v}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="flex items-center justify-center gap-2 rounded-md border border-emerald-400/40 bg-emerald-500/25 py-2 text-[11px] font-semibold text-emerald-100">
                <CheckCircle2 className="h-3.5 w-3.5" /> Confirm · Enter
              </div>
              <div className="flex items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.08] py-2 text-[11px] font-semibold text-white/85">
                <MousePointer2 className="h-3.5 w-3.5" /> Override · →
              </div>
            </div>
          </div>

          {/* Live signals + activity */}
          <div className="flex flex-col gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="mb-2 flex items-center gap-1.5">
                <TrendingUp className="h-3 w-3 text-purple-300" aria-hidden />
                <p className="text-[9px] font-semibold uppercase tracking-widest text-purple-300/80">
                  Latest numbers
                </p>
              </div>
              <div className="space-y-1.5 text-[10px]">
                {[
                  { l: "Outlet demand", v: "up 18% this week", tone: "text-emerald-300" },
                  { l: "Main store capacity", v: "full", tone: "text-amber-300" },
                  { l: "Refurbish cost", v: "$22 (high)", tone: "text-amber-300" },
                  { l: "Bulk-sale contract", v: "none", tone: "text-white/60" },
                  { l: "Sustainability", v: "OK to resell", tone: "text-emerald-300" },
                ].map((s) => (
                  <div key={s.l} className="flex justify-between">
                    <span className="text-white/70">{s.l}</span>
                    <span className={`font-mono ${s.tone}`}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <div className="mb-2 flex items-center gap-1.5">
                <Clock className="h-3 w-3 text-purple-300" aria-hidden />
                <p className="text-[9px] font-semibold uppercase tracking-widest text-purple-300/80">
                  Recent · this station
                </p>
              </div>
              <div className="space-y-1 text-[9.5px]">
                {[
                  { t: "14:19", act: "Outlet · confirmed", tone: "text-emerald-300" },
                  { t: "14:17", act: "Refurbish · override", tone: "text-fuchsia-300" },
                  { t: "14:14", act: "Outlet · confirmed", tone: "text-emerald-300" },
                  { t: "14:12", act: "Liquidate · confirmed", tone: "text-emerald-300" },
                  { t: "14:10", act: "Resell as new · override", tone: "text-fuchsia-300" },
                ].map((r, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="font-mono text-white/40">{r.t}</span>
                    <span className={`${r.tone}`}>{r.act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-white/[0.02] px-4 py-2 text-center text-[10px] uppercase tracking-[0.24em] text-white/40">
          Mid-fidelity mockup · not final styling · click X to go back to the wireframes
        </div>
      </motion.div>
    </motion.div>
  );
}
