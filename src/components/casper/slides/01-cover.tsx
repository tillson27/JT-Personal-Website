import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { Slide } from "../_shell";
import { CountUp, FadeUp, GradientText, Stagger } from "./_helpers";

export const coverSlide: Slide = {
  id: "cover",
  title: "Cover · A case study",
  section: "intro",
  render: () => (
    <div
      className="relative flex h-full w-full overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(1400px 700px at 100% 0%, rgba(168,85,247,0.28), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(217,70,239,0.20), transparent 60%), linear-gradient(180deg, #0d0817 0%, #05030b 100%)",
      }}
    >
      {/* Grid dot texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Soft gradient orbs */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.8, 0.55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 top-8 h-96 w-96 rounded-full bg-purple-500/25 blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -left-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl"
      />

      {/* LEFT: title block */}
      <div className="relative flex w-[62%] flex-col justify-center px-16 py-14">
        <Stagger gap={0.12}>
          <FadeUp>
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-purple-300/60" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-purple-200">
                Casper Studios · PM Challenge · 2026
              </p>
            </div>
          </FadeUp>

          <FadeUp>
            <h1 className="mt-8 text-[96px] font-semibold leading-[0.9] tracking-[-0.03em] text-white">
              A case
              <br />
              <span className="italic">study.</span>
            </h1>
          </FadeUp>

          <FadeUp>
            <p className="mt-8 max-w-xl text-[19px] leading-snug text-white/70">
              Applying AI to <GradientText>apparel returns disposition</GradientText> — the
              single, repeated decision quietly costing retailers more than the stockouts
              making headlines.
            </p>
          </FadeUp>

          <FadeUp>
            <div className="mt-10 flex items-center gap-4 text-[12px] text-white/60">
              <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono">
                Prepared by Josh Tillson
              </span>
              <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 font-mono">
                For Casper Studios
              </span>
              <span className="rounded-full border border-purple-400/40 bg-purple-500/15 px-3 py-1 font-semibold uppercase tracking-[0.22em] text-purple-200">
                <ArrowRight className="mr-1 inline-block h-3 w-3" aria-hidden />
                Press → to begin
              </span>
            </div>
          </FadeUp>
        </Stagger>
      </div>

      {/* RIGHT: teaser stat card */}
      <div className="relative flex w-[38%] items-center justify-center pr-16">
        <motion.div
          initial={{ opacity: 0, x: 40, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            aria-hidden
            className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 blur-2xl"
          />
          <div className="relative w-[320px] rounded-3xl border border-purple-400/40 bg-gradient-to-br from-white/[0.06] to-purple-500/[0.08] p-6 shadow-[0_30px_80px_-20px_rgba(147,51,234,0.6)] backdrop-blur">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-200">
              <Sparkles className="h-3 w-3" aria-hidden />
              The number behind the case
            </div>
            <div className="mt-5 flex items-baseline gap-1">
              <CountUp
                to={52}
                suffix="%"
                duration={2.2}
                className="text-[92px] font-semibold leading-none tracking-[-0.03em] text-white"
              />
            </div>
            <p className="mt-4 text-[13px] leading-snug text-white/75">
              of returned apparel is <span className="font-semibold text-white">not</span> resold
              at full price. That gap is measured in billions — and it's the gap this case aims
              at.
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.22em] text-white/40">
              <span>Recovery gap</span>
              <span className="text-purple-300">Eightx · NRF · 2025</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-16 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-white/45">
        <span className="font-semibold text-white/70">Josh Tillson</span>
        <span className="h-3 w-px bg-white/20" />
        <span>Product Manager · Caylent</span>
      </div>
      <div className="absolute bottom-8 right-16 text-[11px] uppercase tracking-[0.24em] text-white/40">
        Confidential · For evaluation only
      </div>
    </div>
  ),
};
