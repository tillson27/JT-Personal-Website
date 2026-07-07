import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  FileText,
  PlayCircle,
  Presentation,
  Sparkles,
  Terminal,
  User,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CasperMark from "./CasperMark";
import casperLogo from "@/assets/casper/casper-logo.png";
import posthog from "@/lib/posthog";

type Destination = {
  to: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
  featured?: boolean;
  chip: string;
};

const TOP_ROW: ReadonlyArray<Destination> = [
  {
    to: "/casper/deck",
    label: "The case",
    title: "The Casper PM Challenge deck",
    description:
      "17 slides, live and interactive. The quieter, more solvable half of the apparel supply-chain story.",
    icon: Presentation,
    featured: true,
    chip: "Main event",
  },
  {
    to: "/casper/profile",
    label: "Meet Josh",
    title: "About me",
    description:
      "The longer version. Who I am, how I work, and what I've been shipping.",
    icon: User,
    chip: "Bonus",
  },
];

const CASE_STUDIES: ReadonlyArray<Destination> = [
  {
    to: "/casper/prompt",
    label: "Prompt",
    title: "A package manager for AI skills",
    description:
      "Node-style CLI that publishes, installs, and updates AI skill packs across teams and clients.",
    icon: Terminal,
    chip: "Case study",
  },
  {
    to: "/casper/mcp",
    label: "Data Model MCP",
    title: "MISMO translation, via MCP",
    description:
      "An MCP that exposes source-to-target field mappings with JSON query logic for a mortgage-servicer client.",
    icon: Blocks,
    chip: "Case study",
  },
];

/* ------------------------------------------------------------------ */
/* Background: parallax ghosts + mouse-tracking spotlight              */
/* ------------------------------------------------------------------ */

function BackgroundLayer({
  mouseX,
  mouseY,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const marks = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        left: `${8 + i * 15}%`,
        top: `${8 + (i * 17) % 75}%`,
        size: 26 + (i % 3) * 10,
        delay: i * 0.5,
        duration: 6 + (i % 3) * 2,
        parallax: 30 + (i % 3) * 10,
      })),
    [],
  );

  const spotX = useTransform(mouseX, (v) => `${v * 100}%`);
  const spotY = useTransform(mouseY, (v) => `${v * 100}%`);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 100% 0%, rgba(168,85,247,0.24), transparent 60%), radial-gradient(1000px 500px at 0% 100%, rgba(217,70,239,0.18), transparent 60%), linear-gradient(180deg, #0d0817 0%, #05030b 100%)",
        }}
      />
      {/* Mouse spotlight */}
      <motion.div
        className="absolute -inset-32 opacity-70"
        style={{
          background: useTransform(
            [spotX, spotY],
            ([x, y]) =>
              `radial-gradient(400px 400px at ${x} ${y}, rgba(217,70,239,0.18), transparent 70%)`,
          ),
        }}
      />
      {/* Floating Casper marks with mouse parallax */}
      {marks.map((g) => {
        const dx = useTransform(mouseX, (v) => (v - 0.5) * g.parallax);
        const dy = useTransform(mouseY, (v) => (v - 0.5) * g.parallax);
        return (
          <motion.div
            key={g.id}
            style={{ left: g.left, top: g.top, x: dx, y: dy }}
            className="absolute"
          >
            <motion.img
              src={casperLogo}
              alt=""
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.28, 0.12, 0.28, 0],
                y: [-6, -28, -10, -28, -6],
                rotate: [-4, 4, -4],
              }}
              transition={{
                duration: g.duration,
                delay: g.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="rounded-xl object-cover"
              style={{ width: g.size, height: g.size }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Card: 3D tilt + cursor-following highlight                          */
/* ------------------------------------------------------------------ */

function DestinationCard({
  dest,
  index,
  compact = false,
  focused = false,
  onFocusHover,
}: {
  dest: Destination;
  index: number;
  compact?: boolean;
  focused?: boolean;
  onFocusHover?: () => void;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);
  const isActive = hover || focused;

  const localX = useMotionValue(0.5);
  const localY = useMotionValue(0.5);
  const rotX = useSpring(useTransform(localY, [0, 1], [6, -6]), { stiffness: 220, damping: 20 });
  const rotY = useSpring(useTransform(localX, [0, 1], [-6, 6]), { stiffness: 220, damping: 20 });
  const glowBg = useTransform(
    [localX, localY],
    ([x, y]) =>
      `radial-gradient(280px 200px at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(217,70,239,0.28), transparent 70%)`,
  );

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const node = cardRef.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      localX.set((e.clientX - rect.left) / rect.width);
      localY.set((e.clientY - rect.top) / rect.height);
    },
    [localX, localY],
  );

  const onLeave = useCallback(() => {
    setHover(false);
    localX.set(0.5);
    localY.set(0.5);
  }, [localX, localY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.55,
        delay: 0.25 + index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1000 }}
      className="min-h-0"
    >
      {/* Link is the outer click target : never wrapped in a transform */}
      <Link
        ref={cardRef}
        to={dest.to}
        onMouseMove={onMove}
        onMouseEnter={() => {
          setHover(true);
          onFocusHover?.();
        }}
        onMouseLeave={onLeave}
        onClick={() => posthog.capture("casper hub card clicked", { destination: dest.to, label: dest.label, title: dest.title })}
        data-focused={focused ? "true" : undefined}
        className="group relative block h-full min-h-0 outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60"
      >
        <motion.div
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className={
            dest.featured
              ? `relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border bg-gradient-to-br from-purple-500/20 via-fuchsia-500/12 to-transparent shadow-[0_20px_60px_-20px_rgba(147,51,234,0.45)] transition-colors group-hover:border-purple-300/70 ${focused ? "border-fuchsia-300 ring-2 ring-fuchsia-400/60" : "border-purple-400/40"} ${compact ? "p-3 sm:p-3.5" : "p-3 sm:p-4 xl:p-5"}`
              : `relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border transition-colors group-hover:border-purple-400/50 group-hover:bg-white/[0.055] ${focused ? "border-fuchsia-300 bg-white/[0.06] ring-2 ring-fuchsia-400/60" : "border-white/10 bg-white/[0.035]"} ${compact ? "p-3 sm:p-3.5" : "p-3 sm:p-4 xl:p-5"}`
          }
        >
          {/* Cursor-follow glow */}
          <motion.div
            aria-hidden
            className={`pointer-events-none absolute inset-0 transition-opacity duration-200 group-hover:opacity-100 ${focused ? "opacity-100" : "opacity-0"}`}
            style={{ background: glowBg }}
          />

          {/* Featured pulsing halo */}
          {dest.featured ? (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full bg-fuchsia-500/25 blur-3xl"
              animate={{ opacity: [0.35, 0.65, 0.35], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-purple-500/10 blur-3xl transition group-hover:bg-purple-500/25"
            />
          )}

          {/* Shimmer sweep on hover */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-[40%] w-[40%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent"
            animate={isActive ? { x: ["0%", "320%"] } : { x: "0%" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <div className="relative flex flex-1 flex-col">
            <div className="flex items-center justify-between gap-2">
              <motion.span
                animate={isActive ? { rotate: [-2, 2, -2, 0], scale: 1.06 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={
                  dest.featured
                    ? `flex ${compact ? "h-8 w-8" : "h-10 w-10"} items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-[0_8px_20px_-4px_rgba(168,85,247,0.65)]`
                    : `flex ${compact ? "h-8 w-8" : "h-9 w-9"} items-center justify-center rounded-xl border border-purple-400/30 bg-purple-500/15`
                }
              >
                <dest.icon
                  className={
                    dest.featured
                      ? `${compact ? "h-4 w-4" : "h-5 w-5"} text-white`
                      : `${compact ? "h-4 w-4" : "h-4.5 w-4.5"} text-purple-200`
                  }
                  aria-hidden
                />
              </motion.span>
              <span
                className={
                  dest.featured
                    ? "rounded-full border border-fuchsia-300/40 bg-fuchsia-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200"
                    : "rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/60"
                }
              >
                {dest.chip}
              </span>
            </div>

            <p
              className={`mt-2.5 font-semibold uppercase tracking-[0.24em] text-purple-300/85 ${
                compact ? "text-[9px]" : "text-[10px]"
              }`}
            >
              {dest.label}
            </p>
            <h3
              className={
                compact
                  ? "mt-0.5 text-[14px] font-semibold leading-tight tracking-tight text-white sm:text-[15px] xl:text-[16px]"
                  : dest.featured
                    ? "mt-0.5 text-[18px] font-semibold leading-[1.08] tracking-tight text-white sm:text-[22px] xl:text-[26px]"
                    : "mt-0.5 text-[15px] font-semibold leading-tight tracking-tight text-white sm:text-[17px] xl:text-[19px]"
              }
            >
              {dest.title}
            </h3>
            <p
              className={
                compact
                  ? "mt-1 line-clamp-2 text-[10.5px] leading-snug text-white/60 sm:text-[11px]"
                  : dest.featured
                    ? "mt-1.5 line-clamp-2 max-w-xl text-[11.5px] leading-snug text-white/75 sm:line-clamp-3 sm:text-[12.5px]"
                    : "mt-1 line-clamp-2 text-[11px] leading-snug text-white/60 sm:text-[11.5px]"
              }
            >
              {dest.description}
            </p>

            <div
              className={`mt-auto flex items-center gap-1.5 font-semibold uppercase tracking-[0.22em] text-purple-200 ${
                compact ? "pt-2 text-[9.5px]" : "pt-3 text-[10.5px]"
              }`}
            >
              {dest.featured ? "Open the deck" : compact ? "See how it works" : "Take a look"}
              <motion.span
                animate={isActive ? { x: 4 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                <ArrowRight className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
              </motion.span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Confetti-ghost burst on hero click                                  */
/* ------------------------------------------------------------------ */

function BooBurst({
  trigger,
  origin,
}: {
  trigger: number;
  origin: { x: number; y: number };
}) {
  if (!trigger) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * Math.PI * 2;
        const dx = Math.cos(angle) * 140 + (Math.random() - 0.5) * 40;
        const dy = Math.sin(angle) * 100 + (Math.random() - 0.5) * 40 - 40;
        const size = 22 + (i % 3) * 8;
        return (
          <motion.img
            key={`${trigger}-${i}`}
            src={casperLogo}
            alt=""
            aria-hidden
            initial={{ opacity: 1, x: 0, y: 0, scale: 0.6, rotate: 0 }}
            animate={{
              opacity: 0,
              x: dx,
              y: dy,
              scale: 1.1,
              rotate: (Math.random() - 0.5) * 180,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute rounded-lg object-cover"
            style={{ left: origin.x, top: origin.y, width: size, height: size }}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Hub                                                             */
/* ------------------------------------------------------------------ */

export default function Hub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const orderedCards = useMemo(
    () => [...TOP_ROW, ...CASE_STUDIES],
    [],
  );

  const [burst, setBurst] = useState<{ n: number; origin: { x: number; y: number } }>({
    n: 0,
    origin: { x: 0, y: 0 },
  });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || e.target.isContentEditable) return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedIndex((i) => (i % 2 === 0 ? i + 1 : i));
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedIndex((i) => (i % 2 === 1 ? i - 1 : i));
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((i) => (i < 2 ? i + 2 : i));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((i) => (i >= 2 ? i - 2 : i));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const dest = orderedCards[focusedIndex];
        if (dest) navigate(dest.to);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [focusedIndex, navigate, orderedCards]);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const onMove = (e: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };
    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  const handleBoo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parent = containerRef.current?.getBoundingClientRect();
    if (!parent) return;
    setBurst({
      n: burst.n + 1,
      origin: {
        x: rect.left + rect.width / 2 - parent.left,
        y: rect.top + rect.height / 2 - parent.top,
      },
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-dvh w-full flex-col overflow-y-auto overflow-x-hidden px-4 py-4 text-white sm:h-dvh sm:overflow-hidden sm:px-8 sm:py-5 lg:px-10 lg:py-6"
    >
      <BackgroundLayer mouseX={mouseX} mouseY={mouseY} />
      <BooBurst trigger={burst.n} origin={burst.origin} />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 sm:gap-2.5">
          <CasperMark size="sm" animated />
          <div className="min-w-0">
            <p className="text-[8.5px] font-semibold uppercase tracking-[0.22em] text-purple-300 sm:text-[9.5px] sm:tracking-[0.28em]">
              Casper Studios · PM Challenge
            </p>
            <p className="text-[12px] font-semibold text-white sm:text-[13px]">
              You're in. Pick your adventure.
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-200 sm:inline-flex">
          <Sparkles className="h-3 w-3" aria-hidden />
          Built for Kelly, Derek, Jay & Talent
        </div>
      </motion.header>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative z-10 mt-4 flex items-end justify-between gap-6"
      >
        <div>
          <h1 className="text-[30px] font-semibold leading-[1.02] tracking-tight text-white sm:text-[46px] lg:text-[54px]">
            <button
              type="button"
              onClick={handleBoo}
              className="group relative inline-block cursor-pointer bg-transparent align-baseline outline-none"
              aria-label="Boo!"
            >
              <motion.span
                className="inline-block"
                whileHover={{
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.4 },
                }}
              >
                Boo.
              </motion.span>
            </button>{" "}
            <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
              You made it.
            </span>
          </h1>
          <p className="mt-2 text-[12px] leading-snug text-white/65 sm:text-[14px]">
            The case is the main event, plus two AI-native products I recently scoped, built, and
            shipped on client engagements as an AI Forward Deployed Product Manager. Case studies
            for the role.
            <span className="ml-1 hidden text-purple-300/80 sm:inline">
              (Click "Boo." for a surprise.)
            </span>
          </p>

          {/* Executive PDF companion + video walkthrough. Kept as inline P.S.
              cards so the deck stays the star. Pills on mobile, richer cards on desktop. */}
          <div className="mt-2.5 flex max-w-3xl flex-wrap items-center gap-1.5 sm:mt-3 sm:items-stretch sm:gap-2.5">
            <motion.a
              href="/Josh%20Tillson%20-%20Casper%20PM%20Challenge.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture("casper executive pdf opened")}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-500/[0.12] px-2.5 py-1 backdrop-blur transition-colors hover:border-fuchsia-300/50 hover:bg-purple-500/[0.18] sm:min-w-0 sm:flex-1 sm:gap-3 sm:rounded-xl sm:border-purple-400/25 sm:bg-gradient-to-r sm:from-purple-500/[0.09] sm:via-fuchsia-500/[0.06] sm:to-transparent sm:px-3 sm:py-2 sm:hover:from-purple-500/[0.14]"
              aria-label="Open the executive PDF companion in a new tab"
            >
              {/* Sweep on hover */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 -left-[30%] w-[25%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 group-hover:opacity-100"
                initial={false}
                whileHover={{ x: ["0%", "400%"] }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
              <span className="flex flex-shrink-0 items-center justify-center text-purple-200 sm:h-9 sm:w-9 sm:rounded-lg sm:border sm:border-purple-400/30 sm:bg-gradient-to-br sm:from-purple-500/25 sm:to-fuchsia-500/20 sm:text-purple-100">
                <FileText className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden />
              </span>
              <div className="flex min-w-0 flex-col text-left">
                <span className="text-[10px] font-semibold leading-none text-white sm:text-[13px] sm:leading-tight">
                  <span className="sm:hidden">Executive PDF</span>
                  <span className="hidden sm:inline">P.S. There's also an executive PDF companion</span>
                </span>
                <span className="mt-0.5 hidden text-[11px] leading-snug text-white/55 sm:block">
                  6 pages · discovery, PRD, eval plan, and tickets.
                </span>
              </div>
              <ArrowRight
                className="ml-0.5 h-2.5 w-2.5 flex-shrink-0 text-purple-200 transition-transform group-hover:translate-x-0.5 sm:ml-auto sm:h-3.5 sm:w-3.5"
                aria-hidden
              />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.5, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex"
            >
              <Link
                to="/casper/walkthrough"
                onClick={() => posthog.capture("casper walkthrough opened")}
                className="group relative flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-2.5 py-1 backdrop-blur transition-colors hover:border-purple-400/40 hover:bg-white/[0.08] sm:gap-2.5 sm:rounded-xl sm:border-white/10 sm:bg-white/[0.03] sm:px-3 sm:py-2 sm:hover:border-purple-400/30 sm:hover:bg-purple-500/[0.06]"
                aria-label="Watch the video walkthrough"
              >
                <span className="flex flex-shrink-0 items-center justify-center text-white/70 group-hover:text-purple-100 sm:h-9 sm:w-9 sm:rounded-lg sm:border sm:border-white/10 sm:bg-white/[0.06]">
                  <PlayCircle className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden />
                </span>
                <div className="flex min-w-0 flex-col text-left">
                  <span className="text-[10px] font-semibold leading-none text-white/85 sm:text-[13px] sm:leading-tight sm:text-white/80">
                    <span className="sm:hidden">Walkthrough</span>
                    <span className="hidden sm:inline">Or watch the walkthrough</span>
                  </span>
                  <span className="mt-0.5 hidden text-[11px] leading-snug text-white/40 sm:block">
                    Video · guided tour of the deck.
                  </span>
                </div>
                <ArrowRight
                  className="ml-0.5 h-2.5 w-2.5 flex-shrink-0 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:text-purple-200 sm:ml-1.5 sm:h-3.5 sm:w-3.5"
                  aria-hidden
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Cards - two rows with a spanning label between */}
      <div className="relative z-10 mt-4 flex min-h-0 flex-1 flex-col gap-3">
        {/* Top row: The Deck + About Me (larger) */}
        <div className="grid min-h-0 flex-[1.35] grid-cols-1 gap-4 sm:grid-cols-2">
          {TOP_ROW.map((d, i) => (
            <DestinationCard
              key={d.to}
              dest={d}
              index={i}
              focused={focusedIndex === i}
              onFocusHover={() => setFocusedIndex(i)}
            />
          ))}
        </div>

        {/* Spanning label between the rows */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="relative z-10 flex items-center gap-2 sm:gap-3"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/40 to-purple-400/60" />
          <div className="flex items-center gap-1.5 rounded-full border border-purple-400/30 bg-purple-500/10 px-2 py-0.5 shadow-[0_6px_20px_-8px_rgba(168,85,247,0.5)] backdrop-blur sm:gap-2 sm:px-3 sm:py-1">
            <Sparkles className="h-3 w-3 text-purple-200" aria-hidden />
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-purple-200 sm:text-[10px] sm:tracking-[0.24em]">
              Recent PM case studies
            </span>
            <span className="hidden text-white/25 sm:inline">·</span>
            <span className="hidden text-[10px] uppercase tracking-[0.22em] text-white/60 sm:inline">
              AI Forward Deployed Product Management
            </span>
          </div>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-fuchsia-400/40 to-fuchsia-400/60" />
        </motion.div>

        {/* Bottom row: Prompt + MCP (smaller) */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
          {CASE_STUDIES.map((d, i) => (
            <DestinationCard
              key={d.to}
              dest={d}
              index={i + 2}
              compact
              focused={focusedIndex === i + 2}
              onFocusHover={() => setFocusedIndex(i + 2)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="relative z-10 mt-3 flex flex-wrap items-center justify-between gap-2 text-[9px] uppercase tracking-[0.2em] text-white/40 sm:gap-3 sm:text-[10px] sm:tracking-[0.24em]"
      >
        <span>Josh Tillson · 2026 · Calgary</span>
        <span className="hidden sm:inline">tillson27@gmail.com</span>
        <span className="hidden text-purple-300/70 sm:inline">
          ← ↑ → ↓ to move · enter or click to open
        </span>
      </motion.footer>
    </div>
  );
}
