import { motion } from "framer-motion";
import { Mail, Star } from "lucide-react";
import type { Slide } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";
import casperLogo from "@/assets/casper/casper-logo.png";

export const closeSlide: Slide = {
  id: "close",
  title: "Close · Thanks!",
  section: "close",
  render: () => (
    <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-16 text-white"
      style={{
        background:
          "radial-gradient(1400px 700px at 50% -10%, rgba(168,85,247,0.35), transparent 60%), radial-gradient(900px 500px at 50% 110%, rgba(217,70,239,0.28), transparent 60%), linear-gradient(180deg, #0d0817 0%, #05030b 100%)",
      }}
    >
      {/* Floating Casper marks */}
      {Array.from({ length: 6 }).map((_, i) => {
        const left = 8 + i * 15;
        const top = 10 + ((i * 19) % 70);
        const size = 32 + (i % 3) * 10;
        return (
          <motion.img
            key={i}
            src={casperLogo}
            alt=""
            aria-hidden
            animate={{
              opacity: [0, 0.35, 0.12, 0.3, 0],
              y: [-8, -40, -12, -44, -8],
              rotate: [-4, 4, -4],
            }}
            transition={{
              duration: 6 + (i % 3),
              delay: i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute rounded-xl object-cover"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
          />
        );
      })}

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <Stagger gap={0.12}>
          <FadeUp>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-purple-200">
              <Star className="h-3 w-3" aria-hidden /> Thank you
            </p>
          </FadeUp>

          <FadeUp>
            <h1 className="text-[54px] font-semibold leading-[1.05] tracking-tight text-white">
              Empty shelves made the headlines.
              <br />
              <GradientText>Returns are where the money is,</GradientText>
              <br />
              and they are the easier half to fix.
            </h1>
          </FadeUp>

          <FadeUp>
            <p className="mt-4 max-w-2xl text-[14px] leading-snug text-white/70">
              Five points of extra recovery is $5 more back on every $100 item. At the
              scale of a mid-size apparel retailer, that is around $25M a year, without
              touching marketing spend or stockout risk.
            </p>
          </FadeUp>

          <FadeUp>
            <div className="mt-6 flex items-center justify-center gap-6">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0, type: "spring", stiffness: 180 }}
                className="rounded-2xl border border-purple-400/40 bg-purple-500/10 px-5 py-3 backdrop-blur"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-300">
                  What we move
                </p>
                <p className="mt-1 text-[18px] font-semibold text-white">Recovery rate</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 180 }}
                className="rounded-2xl border border-fuchsia-400/40 bg-fuchsia-500/10 px-5 py-3 backdrop-blur"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                  What we ship
                </p>
                <p className="mt-1 text-[18px] font-semibold text-white">Recommend, worker confirms</p>
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, type: "spring", stiffness: 180 }}
                className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 backdrop-blur"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
                  How it gets better
                </p>
                <p className="mt-1 text-[18px] font-semibold text-white">Overrides train it</p>
              </motion.div>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="mt-12 flex items-center justify-center gap-3">
              <motion.img
                src={casperLogo}
                alt=""
                aria-hidden
                animate={{ y: [0, -6, 0], rotate: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="h-10 w-10 rounded-xl object-cover shadow-[0_8px_20px_-4px_rgba(168,85,247,0.6)]"
              />
              <p className="text-[15px] text-white/80">
                Boo. And thanks for making it to the end.
              </p>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="mt-6 inline-flex items-center gap-2 text-[13px] text-white/50">
              <Mail className="h-4 w-4" aria-hidden />
              <a
                href="mailto:tillson27@gmail.com"
                className="text-purple-300 transition hover:text-purple-200 hover:underline"
              >
                tillson27@gmail.com
              </a>
              <span className="text-white/25">·</span>
              <span>Loom walkthrough attached in the submission email.</span>
            </div>
          </FadeUp>
        </Stagger>
      </div>

      <div className="absolute bottom-8 left-14 text-[11px] uppercase tracking-[0.24em] text-white/40">
        Josh Tillson · 2026
      </div>
      <div className="absolute bottom-8 right-14 text-[11px] uppercase tracking-[0.24em] text-white/40">
        Casper Studios · PM Challenge
      </div>
    </div>
  ),
};
