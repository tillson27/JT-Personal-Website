import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import SubPageShell from "./SubPageShell";
import casperLogo from "@/assets/casper/casper-logo.png";

const VIDEO_ID = "10wMGjJnowM";

function FloatingGhosts() {
  const ghosts = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        id: i,
        left: `${6 + i * 13}%`,
        top: `${12 + (i * 19) % 70}%`,
        size: 22 + (i % 3) * 10,
        delay: i * 0.4,
        duration: 5 + (i % 3) * 1.8,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {ghosts.map((g) => (
        <motion.img
          key={g.id}
          src={casperLogo}
          alt=""
          style={{ left: g.left, top: g.top, width: g.size, height: g.size }}
          className="absolute rounded-lg object-cover"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.22, 0.1, 0.22, 0],
            y: [-6, -22, -8, -22, -6],
            rotate: [-4, 4, -4],
          }}
          transition={{
            duration: g.duration,
            delay: g.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Walkthrough() {
  const frameRef = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotX = useSpring(useTransform(py, [0, 1], [3, -3]), {
    stiffness: 180,
    damping: 22,
  });
  const rotY = useSpring(useTransform(px, [0, 1], [-3, 3]), {
    stiffness: 180,
    damping: 22,
  });
  const glow = useTransform(
    [px, py],
    ([x, y]) =>
      `radial-gradient(600px 320px at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(217,70,239,0.28), transparent 70%)`,
  );

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const node = frameRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
    },
    [px, py],
  );

  const onLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return (
    <SubPageShell eyebrow="Walkthrough · Video companion">
      <FloatingGhosts />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mt-2 flex flex-col items-start gap-3 sm:mt-4"
      >
        <h1 className="text-[32px] font-semibold leading-[1.02] tracking-tight text-white sm:text-[46px] lg:text-[54px]">
          The{" "}
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
            walkthrough
          </span>
          .
        </h1>
        <p className="max-w-2xl text-[13px] leading-snug text-white/70 sm:text-[15px]">
          A guided tour through the deck, the thinking behind it, and how the pieces fit
          together. Same story as the slides, with a voice and a little more colour.
        </p>
      </motion.div>

      {/* Video frame */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ perspective: 1200 }}
        className="relative z-10 mt-6 sm:mt-8"
      >
        <motion.div
          ref={frameRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className="group relative overflow-hidden rounded-3xl border border-purple-400/35 bg-gradient-to-br from-purple-500/15 via-fuchsia-500/10 to-transparent p-2 shadow-[0_40px_100px_-30px_rgba(147,51,234,0.6)] sm:p-3"
        >
          {/* Cursor-follow glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: glow }}
          />

          {/* Pulsing halo top-right */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.06, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Pulsing halo bottom-left */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-purple-500/25 blur-3xl"
            animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.05, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />

          {/* Inner iframe wrapper */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="relative w-full pb-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
                title="Casper PM Challenge walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.5 }}
        className="relative z-10 mt-5 flex flex-col items-start justify-between gap-2.5 rounded-xl border border-purple-400/30 bg-gradient-to-r from-purple-500/15 via-fuchsia-500/10 to-purple-500/15 p-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4 sm:rounded-2xl sm:p-5"
      >
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-purple-200 sm:text-[10px]">
            Done watching?
          </p>
          <p className="mt-0.5 text-[12.5px] font-semibold leading-snug text-white sm:mt-1 sm:text-[16px]">
            Head back to the hub and pick your next stop.
          </p>
        </div>
        <Link
          to="/casper"
          className="group inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-500 px-3 py-1.5 text-[12px] font-semibold text-white shadow-[0_8px_24px_-10px_rgba(168,85,247,0.8)] transition hover:from-purple-400 hover:to-fuchsia-400 sm:gap-2 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-sm"
        >
          Back to the hub
          <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 sm:h-4 sm:w-4" aria-hidden />
        </Link>
      </motion.section>
    </SubPageShell>
  );
}
