import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileDown,
  Flag,
  Handshake,
  Home,
  Lightbulb,
  ListTree,
  Maximize2,
  Minimize2,
  RotateCcw,
  Search,
  Wrench,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import CasperMark from "./CasperMark";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import type { Slide, SlideSectionKey } from "./_shell";
import { CANVAS_HEIGHT, CANVAS_WIDTH, slideSections } from "./_shell";
import { slides } from "./slides";

export default function CasperDeck() {
  return <Deck slides={slides} sections={slideSections} />;
}

type SlideEntry = {
  index: number;
  id: string;
  title: string;
  section: SlideSectionKey;
};

function Deck({
  slides,
  sections,
}: {
  slides: ReadonlyArray<Slide>;
  sections: ReadonlyArray<{ key: SlideSectionKey; label: string }>;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const total = slides.length;

  const handleExportPdf = useCallback(() => {
    setIsPrinting(true);
    // Let the portal mount + framer-motion enter animations settle before printing.
    window.setTimeout(() => {
      window.print();
      window.setTimeout(() => setIsPrinting(false), 400);
    }, 1600);
  }, []);

  useEffect(() => {
    const onAfter = () => setIsPrinting(false);
    window.addEventListener("afterprint", onAfter);
    return () => window.removeEventListener("afterprint", onAfter);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(total - 1, next));
      setActiveIndex((cur) => {
        if (clamped === cur) return cur;
        setDirection(clamped > cur ? 1 : -1);
        return clamped;
      });
    },
    [total],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isTocOpen) {
        e.preventDefault();
        setIsTocOpen(false);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goNext();
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, goTo, isTocOpen, total]);

  useEffect(() => {
    const handler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    const node = containerRef.current;
    if (!node) return;
    if (!document.fullscreenElement) {
      void node.requestFullscreen?.();
    } else {
      void document.exitFullscreen?.();
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const sx = touchStartX.current;
      const sy = touchStartY.current;
      touchStartX.current = null;
      touchStartY.current = null;
      if (sx === null || sy === null) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx;
      const dy = t.clientY - sy;
      if (Math.abs(dx) < 48) return;
      if (Math.abs(dy) > Math.abs(dx)) return;
      if (dx < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev],
  );

  const entriesBySection = useMemo(() => {
    return sections.map((section) => ({
      key: section.key,
      label: section.label,
      entries: slides
        .map(
          (s, i): SlideEntry => ({
            index: i,
            id: s.id,
            title: s.title,
            section: s.section,
          }),
        )
        .filter((e) => e.section === section.key),
    }));
  }, [sections, slides]);

  const activeSlide = slides[activeIndex];
  const progress = ((activeIndex + 1) / total) * 100;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="deck-live relative flex h-dvh w-full flex-col overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(1200px 600px at 100% 0%, rgba(147,51,234,0.18), transparent 60%), radial-gradient(1000px 500px at 0% 100%, rgba(217,70,239,0.12), transparent 60%), linear-gradient(180deg, #0a0714 0%, #05030b 100%)",
      }}
    >
      <div className="absolute inset-x-0 top-0 z-30 h-0.5 bg-white/5 lg:h-1">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-400 to-fuchsia-400"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      <header className="relative z-20 flex items-center justify-between gap-3 px-4 pt-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2.5">
          <Link
            to="/casper"
            aria-label="Back to hub"
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-white/85 backdrop-blur transition hover:border-purple-400/40 hover:bg-purple-500/10"
          >
            <Home className="h-4 w-4 transition group-hover:text-purple-200" aria-hidden />
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:inline">
              Hub
            </span>
          </Link>
          <CasperMark size="sm" className="hidden sm:inline-block" />
          <div className="hidden flex-col leading-tight sm:flex">
            <span className="text-[13px] font-semibold text-white">
              Josh Tillson · Casper PM Challenge
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-purple-300/80">
              Live deck · use ← → to navigate
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-white/70">
          <span className="hidden text-xs font-medium tabular-nums text-white/70 lg:inline">
            {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => setIsTocOpen(true)}
            aria-label="Open sections"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur transition hover:bg-white/10"
          >
            <ListTree className="h-4 w-4" aria-hidden />
            <span className="hidden lg:inline">Sections</span>
          </button>
          <button
            type="button"
            onClick={handleExportPdf}
            aria-label="Export deck to PDF"
            disabled={isPrinting}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur transition hover:bg-white/10 disabled:pointer-events-none disabled:opacity-60"
          >
            <FileDown className={`h-4 w-4 ${isPrinting ? "animate-pulse" : ""}`} aria-hidden />
            <span className="hidden lg:inline">
              {isPrinting ? "Preparing…" : "Export PDF"}
            </span>
          </button>
          <button
            type="button"
            onClick={handleToggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="hidden rounded-lg border border-white/10 bg-white/[0.04] p-1.5 text-white/85 backdrop-blur transition hover:bg-white/10 lg:inline-flex"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </header>

      <main className="relative z-0 flex flex-1 items-center justify-center overflow-hidden px-4 py-4 sm:px-6 lg:gap-4 lg:px-8 lg:py-6">
        <button
          type="button"
          onClick={goPrev}
          disabled={activeIndex === 0}
          aria-label="Previous slide"
          className="hidden h-12 w-12 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-20 lg:inline-flex"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <div className="relative w-full max-w-[min(100%,calc((100dvh-9rem)*16/9))] lg:max-w-[min(1280px,calc((100dvh-13rem)*16/9))]">
          <SlideCanvas activeSlide={activeSlide} direction={direction} />
          <MobilePortraitHint />
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={activeIndex === total - 1}
          aria-label="Next slide"
          className="hidden h-12 w-12 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-20 lg:inline-flex"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </main>

      <footer className="relative z-20 flex flex-col items-stretch gap-2 px-4 pb-4 sm:px-8 lg:px-12">
        <div className="hidden sm:block">
          <SupplyChainBreadcrumb
            slides={slides}
            sections={sections}
            activeIndex={activeIndex}
            onSelect={goTo}
          />
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous slide"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/85 backdrop-blur transition hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === total - 1}
              aria-label="Next slide"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/85 backdrop-blur transition hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="hidden flex-1 truncate text-[11px] uppercase tracking-[0.24em] text-white/40 lg:block">
            {activeSlide.title}
          </div>
          <div className="hidden text-[11px] tabular-nums text-white/50 lg:block">
            {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      </footer>

      <TableOfContents
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        sections={entriesBySection}
        active={activeIndex}
        onSelect={(i) => {
          goTo(i);
          setIsTocOpen(false);
        }}
      />

      {isPrinting ? <PrintDeckPortal slides={slides} /> : null}
      <PrintStyles />
    </div>
  );
}

function PrintDeckPortal({ slides }: { slides: ReadonlyArray<Slide> }) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <div className="deck-print" aria-hidden>
      {slides.map((slide) => (
        <div key={slide.id} className="deck-print-page">
          <div className="deck-print-canvas">{slide.render()}</div>
        </div>
      ))}
    </div>,
    document.body,
  );
}

function PrintStyles() {
  return (
    <style>{`
      .deck-print { display: none; }
      @media print {
        @page { size: 13.333in 7.5in; margin: 0; }
        html, body {
          background: #05030b !important;
          margin: 0 !important;
          padding: 0 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        body > *:not(.deck-print) { display: none !important; }
        .deck-print {
          display: block !important;
          position: static !important;
          background: #05030b !important;
        }
        .deck-print * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        .deck-print-page {
          width: 13.333in;
          height: 7.5in;
          overflow: hidden;
          page-break-after: always;
          break-after: page;
          background: #05030b;
          position: relative;
        }
        .deck-print-page:last-child {
          page-break-after: auto;
          break-after: auto;
        }
        .deck-print-canvas {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
    `}</style>
  );
}

function SlideCanvas({
  activeSlide,
  direction,
}: {
  activeSlide: Slide;
  direction: 1 | -1;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const update = () => {
      const scale = node.clientWidth / CANVAS_WIDTH;
      node.style.setProperty("--slide-scale", String(scale));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-2xl border border-purple-400/20 bg-[#0d0817] shadow-[0_30px_120px_-30px_rgba(147,51,234,0.5),0_0_0_1px_rgba(168,85,247,0.15)] lg:rounded-3xl"
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          transform: "scale(var(--slide-scale, 1))",
        }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeSlide.id}
            custom={direction}
            initial={{
              opacity: 0,
              x: direction === 1 ? 120 : -120,
              scale: 0.96,
              filter: "blur(8px)",
            }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              x: direction === 1 ? -120 : 120,
              scale: 0.96,
              filter: "blur(8px)",
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-hidden"
          >
            {activeSlide.render()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobilePortraitHint() {
  const [dismissed, setDismissed] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px) and (orientation: portrait)");
    const update = () => setShow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!show || dismissed) return null;

  return (
    <div className="pointer-events-none absolute inset-x-2 -bottom-2 z-20 flex translate-y-full justify-center">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-purple-400/40 bg-[#12081e]/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-purple-100 shadow-[0_10px_30px_-8px_rgba(147,51,234,0.6)] backdrop-blur">
        <RotateCcw className="h-3 w-3" aria-hidden />
        <span>Rotate for a bigger view</span>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="ml-1 rounded-full p-0.5 text-purple-200/70 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

const SECTION_ICONS: Record<SlideSectionKey, LucideIcon> = {
  intro: Home,
  discovery: Search,
  solution: Lightbulb,
  prd: ClipboardList,
  execution: Wrench,
  close: Flag,
};

const SECTION_SHORT: Record<SlideSectionKey, string> = {
  intro: "Kickoff",
  discovery: "Problem",
  solution: "Solution",
  prd: "The Plan",
  execution: "Build",
  close: "Next Steps",
};

const SECTION_ACTIVE_ICONS: Partial<Record<SlideSectionKey, LucideIcon>> = {
  close: Handshake,
};

function SupplyChainBreadcrumb({
  slides,
  sections,
  activeIndex,
  onSelect,
}: {
  slides: ReadonlyArray<Slide>;
  sections: ReadonlyArray<{ key: SlideSectionKey; label: string }>;
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const stops = useMemo(() => {
    return sections
      .map((section) => {
        const start = slides.findIndex((s) => s.section === section.key);
        if (start === -1) return null;
        let end = start;
        for (let i = start; i < slides.length; i++) {
          if (slides[i].section === section.key) end = i;
        }
        const count = end - start + 1;
        const inSection = activeIndex >= start && activeIndex <= end;
        const past = activeIndex > end;
        const localProgress = inSection
          ? (activeIndex - start + 1) / count
          : past
            ? 1
            : 0;
        return {
          key: section.key,
          label: section.label,
          short: SECTION_SHORT[section.key],
          icon: SECTION_ICONS[section.key],
          activeIcon: SECTION_ACTIVE_ICONS[section.key],
          start,
          end,
          count,
          state: past ? "past" : inSection ? "active" : "future",
          localProgress,
        } as const;
      })
      .filter(<T,>(x: T | null): x is T => x !== null);
  }, [slides, sections, activeIndex]);

  return (
    <nav
      aria-label="Deck progress"
      className="mx-auto flex w-full max-w-3xl items-center gap-1.5 sm:gap-2"
    >
      {stops.map((stop, idx) => {
        const isActive = stop.state === "active";
        const isPast = stop.state === "past";
        const IconToRender =
          isActive && stop.activeIcon ? stop.activeIcon : stop.icon;
        const isLast = idx === stops.length - 1;
        return (
          <div
            key={stop.key}
            className={`flex items-center gap-1.5 sm:gap-2 ${isLast ? "" : "flex-1"}`}
          >
            <button
              type="button"
              onClick={() => onSelect(stop.start)}
              aria-label={`Jump to ${stop.label} section`}
              aria-current={isActive ? "true" : undefined}
              className="group flex flex-shrink-0 items-center gap-1.5 outline-none"
            >
              <IconToRender
                className={`h-3.5 w-3.5 transition ${
                  isActive
                    ? "text-fuchsia-200"
                    : isPast
                      ? "text-purple-300/80"
                      : "text-white/35 group-hover:text-white/70"
                }`}
                aria-hidden
              />
              <span
                className={`hidden text-[9.5px] font-medium uppercase tracking-[0.18em] transition sm:inline ${
                  isActive
                    ? "text-fuchsia-200"
                    : isPast
                      ? "text-purple-300/70"
                      : "text-white/40 group-hover:text-white/70"
                }`}
              >
                {stop.short}
              </span>
            </button>

            {isLast ? null : (
              <div className="relative h-px flex-1 overflow-hidden bg-white/10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-400/80 to-fuchsia-400/80"
                  initial={false}
                  animate={{ width: `${stop.localProgress * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function TableOfContents({
  isOpen,
  onClose,
  sections,
  active,
  onSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  sections: ReadonlyArray<{
    key: SlideSectionKey;
    label: string;
    entries: ReadonlyArray<SlideEntry>;
  }>;
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="toc"
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close sections"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-label="Sections"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-dvh w-full max-w-sm flex-col overflow-y-auto border-l border-purple-400/20 bg-[#0a0714] text-white shadow-2xl"
          >
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0a0714] px-5 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300/80">
                  Sections
                </p>
                <p className="text-base font-semibold text-white">Jump to a slide</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg border border-white/10 bg-white/[0.04] p-2 text-white/80 transition hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <nav className="flex flex-col gap-6 px-5 py-6">
              {sections.map((section) => {
                if (section.entries.length === 0) return null;
                return (
                  <div key={section.key}>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-300/70">
                      {section.label}
                    </p>
                    <ul className="space-y-1">
                      {section.entries.map((entry) => {
                        const isActive = entry.index === active;
                        return (
                          <li key={entry.id}>
                            <button
                              type="button"
                              onClick={() => onSelect(entry.index)}
                              aria-current={isActive ? "true" : undefined}
                              className={
                                isActive
                                  ? "flex w-full items-center gap-3 rounded-xl border border-purple-400/40 bg-purple-500/15 px-3 py-2.5 text-left text-sm text-white transition"
                                  : "flex w-full items-center gap-3 rounded-xl border border-transparent bg-white/[0.02] px-3 py-2.5 text-left text-sm text-white/80 transition hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                              }
                            >
                              <span
                                className={
                                  isActive
                                    ? "flex h-6 w-9 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-purple-500 to-fuchsia-500 text-[11px] font-semibold text-white"
                                    : "flex h-6 w-9 flex-shrink-0 items-center justify-center rounded-md bg-white/10 text-[11px] font-semibold text-white/70"
                                }
                              >
                                {String(entry.index + 1).padStart(2, "0")}
                              </span>
                              <span className="truncate">{entry.title}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
