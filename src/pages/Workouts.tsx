import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronDown, LogOut, Target } from "lucide-react";
import WorkoutsGate from "@/components/workouts/WorkoutsGate";
import DayCard from "@/components/workouts/DayCard";
import {
  isAuthenticated as checkAuth,
  persistAuth,
  SESSION_KEY,
} from "@/components/workouts/auth";
import { weeks, paceReference, goals, principles } from "@/lib/workouts";
import posthog from "@/lib/posthog";

const LAST_WEEK_KEY = "workouts:lastWeek:v1";
const COMPLETED_KEY = "workouts:completed:v1";
const GOALS_OPEN_KEY = "workouts:goalsOpen:v1";
const BLOCK_YEAR = 2026;

// Map "Aug 4" style date strings to actual Date objects (assumes BLOCK_YEAR).
function parseBlockDate(label: string): Date | null {
  const m = label.match(/^([A-Za-z]+)\s+(\d+)$/);
  if (!m) return null;
  const monthIdx = [
    "jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec",
  ].indexOf(m[1].slice(0, 3).toLowerCase());
  if (monthIdx < 0) return null;
  return new Date(BLOCK_YEAR, monthIdx, parseInt(m[2], 10));
}

function detectCurrentWeek(): number {
  const now = new Date();
  for (let i = 0; i < weeks.length; i++) {
    const [startStr, endStr] = weeks[i].dateRange.split(" – ").map((s) => s.trim());
    const start = parseBlockDate(startStr);
    const end = parseBlockDate(endStr);
    if (!start || !end) continue;
    const endInclusive = new Date(end);
    endInclusive.setHours(23, 59, 59, 999);
    if (now >= start && now <= endInclusive) return i;
  }
  // Before the block: show week 1. After: show last week.
  const firstStart = parseBlockDate(weeks[0].dateRange.split(" – ")[0]);
  if (firstStart && now < firstStart) return 0;
  return weeks.length - 1;
}

function todayLabel(): string | null {
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "short" });
  return `${month} ${now.getDate()}`;
}

export default function Workouts() {
  const [authed, setAuthed] = useState<boolean>(() => checkAuth());
  const [selected, setSelected] = useState<number>(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem(LAST_WEEK_KEY) : null;
    if (stored != null) {
      const n = parseInt(stored, 10);
      if (!isNaN(n) && n >= 0 && n < weeks.length) return n;
    }
    return detectCurrentWeek();
  });

  const [completed, setCompleted] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    try {
      const raw = window.localStorage.getItem(COMPLETED_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set();
    }
  });

  const [goalsOpen, setGoalsOpen] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(GOALS_OPEN_KEY) === "1";
  });

  useEffect(() => {
    document.title = "Josh Tillson – Training";
    const prevBg = document.body.style.background;
    document.body.style.background = "#050505";
    return () => {
      document.body.style.background = prevBg;
    };
  }, []);

  useEffect(() => {
    if (authed) {
      window.localStorage.setItem(LAST_WEEK_KEY, String(selected));
    }
  }, [selected, authed]);

  useEffect(() => {
    window.localStorage.setItem(GOALS_OPEN_KEY, goalsOpen ? "1" : "0");
  }, [goalsOpen]);

  const handleAuthenticated = useCallback(() => {
    persistAuth();
    setAuthed(true);
    posthog.capture("workouts access granted");
  }, []);

  const handleLogout = useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  }, []);

  const toggleCompleted = useCallback((date: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      window.localStorage.setItem(COMPLETED_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const currentWeekIdx = useMemo(() => detectCurrentWeek(), []);
  const today = useMemo(() => todayLabel(), []);
  const week = weeks[selected];

  const todayRef = useRef<HTMLDivElement | null>(null);
  const scrolledToTodayRef = useRef(false);

  useEffect(() => {
    if (!authed) return;
    if (scrolledToTodayRef.current) return;
    if (selected !== currentWeekIdx) return;
    if (!todayRef.current) return;
    todayRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    scrolledToTodayRef.current = true;
  }, [authed, selected, currentWeekIdx]);

  if (!authed) {
    return <WorkoutsGate onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="min-h-dvh bg-[#050505] text-white">
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[11px] text-white/40 hover:text-white/70 transition-colors font-mono uppercase tracking-widest"
            >
              <ArrowLeft size={12} /> Back
            </Link>
            <h1 className="mt-3 text-2xl sm:text-3xl font-medium tracking-tight">
              Training Log
            </h1>
            <p className="mt-1 text-sm text-white/50">
              Hyrox + Half Marathon build · 8 weeks
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors font-mono uppercase tracking-widest"
            aria-label="Lock"
          >
            <LogOut size={12} /> Lock
          </button>
        </div>

        {/* Goals strip (collapsible) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent"
        >
          <button
            type="button"
            onClick={() => setGoalsOpen((v) => !v)}
            aria-expanded={goalsOpen}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 sm:px-6"
          >
            <div className="flex min-w-0 items-center gap-3">
              <Target size={13} className="shrink-0 text-red-400" />
              <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50 font-mono">
                December Goals
              </p>
              {!goalsOpen ? (
                <p className="hidden truncate text-xs text-white/60 sm:block">
                  Sub-60 Hyrox · 1:18 Half
                </p>
              ) : null}
            </div>
            <ChevronDown
              size={14}
              className={`shrink-0 text-white/40 transition-transform duration-200 ${goalsOpen ? "rotate-180" : ""}`}
            />
          </button>
          {goalsOpen ? (
            <div className="px-5 pb-5 sm:px-6 sm:pb-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-1">
                    Hyrox
                  </p>
                  <p className="text-base font-medium">{goals.hyrox}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-1">
                    Half Marathon
                  </p>
                  <p className="text-base font-medium">{goals.half}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono mb-1">
                    This Block
                  </p>
                  <p className="text-sm text-white/70 leading-snug">{goals.block}</p>
                </div>
              </div>
            </div>
          ) : null}
        </motion.div>

        {/* Week tabs */}
        <div className="mb-8">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40 font-mono">
            Select Week
          </p>
          <div className="flex flex-wrap gap-2">
            {weeks.map((w, i) => {
              const isActive = i === selected;
              const isCurrent = i === currentWeekIdx;
              return (
                <button
                  key={w.number}
                  onClick={() => setSelected(i)}
                  className={`group relative rounded-lg border px-3 py-2 text-left transition-colors ${
                    isActive
                      ? "border-white/40 bg-white/10"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono ${isActive ? "text-white" : "text-white/60"}`}>
                      W{w.number}
                    </span>
                    {isCurrent && !isActive ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" aria-label="current week" />
                    ) : null}
                  </div>
                  <div className={`mt-0.5 text-[10px] font-mono ${isActive ? "text-white/70" : "text-white/40"}`}>
                    {w.mileage}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Week header */}
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <h2 className="text-xl sm:text-2xl font-medium">
              Week {week.number}
              <span className="ml-3 text-white/40 font-mono text-sm">{week.dateRange}</span>
            </h2>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/70 font-mono">
              {week.mileage}
            </span>
          </div>
          <p className="text-sm text-white/60 mb-4">{week.focus}</p>
          <p className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-[13px] text-white/70 leading-relaxed">
            {week.notes}
          </p>
        </motion.div>

        {/* Days */}
        <div className="space-y-4">
          {week.days.map((day) => {
            const isToday = day.date === today && selected === currentWeekIdx;
            return (
              <div key={day.day} ref={isToday ? todayRef : undefined}>
                <DayCard
                  day={day}
                  isToday={isToday}
                  completed={completed.has(day.date)}
                  onToggleComplete={() => toggleCompleted(day.date)}
                />
              </div>
            );
          })}
        </div>

        {/* Pace reference */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
        >
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50 font-mono">
            Pace Reference · calibrated to 1:25–1:32 half fitness
          </p>
          <div className="grid gap-3 sm:grid-cols-2 text-sm">
            {Object.entries({
              "Easy Z2": paceReference.easyZ2,
              "Steady": paceReference.steady,
              "Threshold": paceReference.threshold,
              "VO2 (5k pace)": paceReference.vo2,
              "Hyrox run goal": paceReference.hyroxRunGoal,
            }).map(([label, value]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-2"
              >
                <span className="text-white/70">{label}</span>
                <span className="text-white/90 font-mono text-xs">{value}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Principles */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
        >
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/50 font-mono">
            Guardrails
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title}>
                <p className="text-sm font-medium text-white">{p.title}</p>
                <p className="mt-1 text-[13px] text-white/60 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <p className="mt-10 text-center text-[10px] text-white/25 font-mono">
          Adjust as needed. Listen to the body. Trust the process.
        </p>
      </div>
    </div>
  );
}
