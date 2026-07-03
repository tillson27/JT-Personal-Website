import { motion } from "framer-motion";
import { AlertTriangle, Camera, CheckCircle2, Loader2, Sparkles } from "lucide-react";
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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <div className="mb-2 flex items-center gap-2 text-[10px]">
        <span className="rounded-md bg-purple-500/25 px-1.5 py-0.5 font-mono font-semibold uppercase tracking-widest text-purple-200">
          {index}
        </span>
        <span className="font-semibold uppercase tracking-[0.22em] text-white/70">{label}</span>
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
  render: () => (
    <SlideShell eyebrow="Wireframes · Low-fi flow states">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[34px] font-semibold leading-[1.1] tracking-tight text-white">
            One screen, <GradientText>four states</GradientText>. That's the flow.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-3xl text-[13px] text-white/60">
            Low-fi is explicitly fine per the brief. What matters is the state graph and where the
            human enters the loop.
          </p>
        </FadeUp>

        <div className="mt-5 grid flex-1 grid-cols-4 gap-4">
          {/* State 1: Loading */}
          <Frame index="01" label="Loading" delay={0.3}>
            <div className="flex h-full flex-col gap-3">
              <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                <p className="mb-1 text-[9px] uppercase tracking-widest text-white/40">SKU</p>
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
                    <p className="text-[10px]">Checking live channel signals…</p>
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
            <div className="flex h-full flex-col gap-3">
              <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                <p className="mb-1 text-[9px] uppercase tracking-widest text-white/40">SKU · 7734911</p>
                <p className="text-[10px] font-mono text-white/80">Grade B · photo attached</p>
              </div>
              <div className="flex-1 rounded-xl border border-purple-400/50 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/20 p-3">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-purple-200" />
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-purple-200">
                    Recommended
                  </p>
                </div>
                <p className="mt-1 text-[13px] font-semibold text-white">Route to outlet</p>
                <div className="mt-2 space-y-1">
                  <Bar w="100%" tone="accent" />
                  <p className="font-mono text-[9px] text-purple-200">confidence 0.87</p>
                </div>
                <p className="mt-2 text-[9px] leading-tight text-white/70">
                  Outlet demand +18% · refurb cost high · A-stock capacity full
                </p>
              </div>
              <div className="rounded-md border border-white/10 bg-black/20 p-1.5">
                <p className="text-[8px] uppercase tracking-widest text-white/40">Alternatives</p>
                <div className="mt-1 flex gap-1">
                  <div className="flex-1 rounded bg-white/[0.06] px-1.5 py-1 text-[9px] text-white/70">
                    Refurb · $28
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
            <div className="flex h-full flex-col gap-3">
              <div className="rounded-lg border border-white/10 bg-black/30 p-2">
                <p className="mb-1 text-[9px] uppercase tracking-widest text-white/40">SKU · 4429021</p>
                <p className="text-[10px] font-mono text-white/80">Grade C · unusual pattern</p>
              </div>
              <div className="flex-1 rounded-xl border border-amber-400/50 bg-amber-500/10 p-3">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="h-3 w-3 text-amber-200" />
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-amber-200">
                    Defer to human
                  </p>
                </div>
                <p className="mt-1 text-[13px] font-semibold text-white">
                  Tentative: refurbish
                </p>
                <div className="mt-2 space-y-1">
                  <Bar w="45%" tone="accent" />
                  <p className="font-mono text-[9px] text-amber-200">confidence 0.42 · below 0.6</p>
                </div>
                <p className="mt-2 text-[9px] leading-tight text-white/75">
                  Missing signal: refurb cost stale (last update 4h ago)
                </p>
                <div className="mt-2 rounded-md border border-white/15 bg-black/30 p-1.5 text-[9px] text-white/70">
                  Alternatives expanded by default →
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
            <div className="relative flex h-full flex-col gap-3">
              {/* Faded background */}
              <div className="pointer-events-none absolute inset-0 flex flex-col gap-3 opacity-30">
                <div className="rounded-lg bg-white/[0.04] p-2 h-8" />
                <div className="flex-1 rounded-xl bg-white/[0.04]" />
              </div>
              {/* Modal */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 180 }}
                className="relative z-10 my-auto rounded-xl border border-fuchsia-400/40 bg-[#12081e] p-3 shadow-[0_20px_60px_-10px_rgba(217,70,239,0.4)]"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-fuchsia-300" />
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-fuchsia-200">
                    Override · pick reason
                  </p>
                </div>
                <p className="mt-2 text-[10.5px] leading-tight text-white/80">
                  You chose <span className="font-semibold text-white">Liquidate</span> instead of{" "}
                  <span className="font-semibold text-white">Outlet</span>. Why?
                </p>
                <div className="mt-2 space-y-1">
                  {[
                    "Visible defect not in condition grade",
                    "Local demand different from model",
                    "SKU flagged for jobber contract",
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
          <div className="mt-4 text-center text-[11px] uppercase tracking-[0.28em] text-white/40">
            Loading → Recommendation → Low confidence → Override capture · loops back to feedback
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
