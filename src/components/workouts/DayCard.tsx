import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Day, Finisher, Session } from "@/lib/workouts";
import {
  Dumbbell,
  Footprints,
  Activity,
  Zap,
  Coffee,
  Bed,
  Check,
  ChevronDown,
  Flame,
} from "lucide-react";

const kindMeta: Record<
  Session["kind"],
  { label: string; Icon: typeof Dumbbell; tint: string; ring: string }
> = {
  lift: {
    label: "Lift",
    Icon: Dumbbell,
    tint: "text-amber-300",
    ring: "ring-amber-400/20 bg-amber-400/[0.03]",
  },
  run: {
    label: "Run",
    Icon: Footprints,
    tint: "text-emerald-300",
    ring: "ring-emerald-400/20 bg-emerald-400/[0.03]",
  },
  erg: {
    label: "Erg",
    Icon: Activity,
    tint: "text-sky-300",
    ring: "ring-sky-400/20 bg-sky-400/[0.03]",
  },
  hyrox: {
    label: "Hyrox",
    Icon: Zap,
    tint: "text-red-300",
    ring: "ring-red-400/20 bg-red-400/[0.03]",
  },
  recovery: {
    label: "Recovery",
    Icon: Coffee,
    tint: "text-white/60",
    ring: "ring-white/10 bg-white/[0.02]",
  },
  rest: {
    label: "Rest",
    Icon: Bed,
    tint: "text-white/40",
    ring: "ring-white/5 bg-white/[0.01]",
  },
};

function FinisherBlock({ finisher }: { finisher: Finisher }) {
  return (
    <div className="mt-3 rounded-lg border border-red-400/25 bg-red-400/[0.05] p-3">
      <div className="mb-2 flex items-center gap-1.5">
        <Flame size={11} className="text-red-300" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-300 font-mono">
          Hyrox finisher · {finisher.label}
        </p>
      </div>
      <ul className="space-y-1.5">
        {finisher.exercises.map((ex, i) => (
          <li key={i} className="flex items-baseline justify-between gap-3 text-xs">
            <span className="text-white/85">{ex.name}</span>
            <span className="shrink-0 text-white/60 font-mono">{ex.sets}</span>
          </li>
        ))}
      </ul>
      {finisher.exercises.some((e) => e.notes) ? (
        <div className="mt-2 space-y-0.5 border-t border-red-400/10 pt-2">
          {finisher.exercises
            .filter((e) => e.notes)
            .map((e, i) => (
              <p key={i} className="text-[10.5px] text-white/50 leading-snug">
                <span className="text-white/70">{e.name}:</span> {e.notes}
              </p>
            ))}
        </div>
      ) : null}
      {finisher.notes ? (
        <p className="mt-2 text-[11px] italic text-red-200/70 leading-relaxed">
          {finisher.notes}
        </p>
      ) : null}
    </div>
  );
}

function SessionBlock({ session, slot }: { session: Session; slot: "AM" | "PM" }) {
  const meta = kindMeta[session.kind];
  const Icon = meta.Icon;

  return (
    <div className={`rounded-xl p-4 ring-1 ${meta.ring}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md bg-black/40 ${meta.tint}`}>
            <Icon size={13} />
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 font-mono">
            {slot}
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-[0.2em] font-mono ${meta.tint}`}>
            · {meta.label}
          </span>
        </div>
        {session.duration ? (
          <span className="text-[11px] text-white/40 font-mono">{session.duration}</span>
        ) : null}
      </div>

      <p className="text-sm font-medium text-white">{session.title}</p>

      {(session.distance || session.zone || session.rpe) && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/60 font-mono">
          {session.distance ? <span>DIST · {session.distance}</span> : null}
          {session.zone ? <span>ZONE · {session.zone}</span> : null}
          {session.rpe ? <span>RPE · {session.rpe}</span> : null}
        </div>
      )}

      {session.intervals ? (
        <div className="mt-2 rounded-md border border-white/10 bg-black/30 px-3 py-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40 font-mono">
            Intervals
          </p>
          <p className="mt-1 text-xs text-white/80 font-mono leading-relaxed">
            {session.intervals}
          </p>
        </div>
      ) : null}

      {session.exercises && session.exercises.length > 0 ? (
        <ul className="mt-3 space-y-1.5">
          {session.exercises.map((ex, i) => (
            <li key={i} className="flex items-baseline justify-between gap-3 text-xs">
              <span className="text-white/85">{ex.name}</span>
              <span className="shrink-0 text-white/50 font-mono">{ex.sets}</span>
            </li>
          ))}
          {session.exercises.some((e) => e.notes) ? (
            <li className="pt-1.5 space-y-0.5 border-t border-white/5 mt-2">
              {session.exercises
                .filter((e) => e.notes)
                .map((e, i) => (
                  <p key={i} className="text-[10.5px] text-white/40 leading-snug">
                    <span className="text-white/60">{e.name}:</span> {e.notes}
                  </p>
                ))}
            </li>
          ) : null}
        </ul>
      ) : null}

      {session.notes ? (
        <p className="mt-3 text-[11px] text-white/50 leading-relaxed">{session.notes}</p>
      ) : null}

      {session.finisher ? <FinisherBlock finisher={session.finisher} /> : null}
    </div>
  );
}

function sessionSummaryLine(session?: Session): string | null {
  if (!session) return null;
  return session.title;
}

interface Props {
  day: Day;
  isToday: boolean;
  completed: boolean;
  onToggleComplete: () => void;
}

export default function DayCard({ day, isToday, completed, onToggleComplete }: Props) {
  const [expanded, setExpanded] = useState<boolean>(!completed || isToday);

  useEffect(() => {
    setExpanded(!completed || isToday);
  }, [completed, isToday]);

  const summary = [
    day.am ? `AM ${sessionSummaryLine(day.am)}` : null,
    day.pm ? `PM ${sessionSummaryLine(day.pm)}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  const outerClass = isToday
    ? "border-red-400/40 bg-white/[0.04] shadow-[0_0_0_1px_rgba(248,113,113,0.18),0_20px_60px_-30px_rgba(248,113,113,0.5)]"
    : completed
      ? "border-white/[0.06] bg-white/[0.01]"
      : "border-white/10 bg-white/[0.015]";

  const dayNameClass = completed && !isToday ? "text-white/70" : "text-white";

  const toggleExpanded = () => setExpanded((v) => !v);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`overflow-hidden rounded-2xl border transition-colors ${outerClass} ${
        completed && !isToday ? "opacity-80" : ""
      }`}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={toggleExpanded}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleExpanded();
          }
        }}
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-start justify-between gap-3 p-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-lg font-medium ${dayNameClass}`}>{day.day}</span>
            <span className="text-xs text-white/50 font-mono">{day.date}</span>
            {isToday ? (
              <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-red-200 font-mono">
                Today
              </span>
            ) : null}
            {completed ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-emerald-300 font-mono">
                <Check size={9} strokeWidth={3} /> Done
              </span>
            ) : null}
          </div>
          <p className="mt-1 truncate text-xs text-white/50">
            {expanded ? day.focus : summary || day.focus}
          </p>
        </div>

        <div className="mt-0.5 flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete();
            }}
            className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${
              completed
                ? "border-emerald-400/30 text-emerald-300 hover:border-emerald-400/50 hover:bg-emerald-400/[0.05]"
                : "border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
            }`}
            aria-label={completed ? "Mark as not done" : "Mark as done"}
          >
            <Check size={10} strokeWidth={3} />
            {completed ? "Done" : "Mark done"}
          </button>
          <ChevronDown
            size={16}
            className={`text-white/40 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {expanded ? (
        <div className="px-5 pb-5">
          <div className="grid gap-3 md:grid-cols-2">
            {day.am ? (
              <SessionBlock session={day.am} slot="AM" />
            ) : (
              <div className="rounded-xl border border-dashed border-white/5 p-4 text-center text-[11px] text-white/25 font-mono">
                — AM open —
              </div>
            )}
            {day.pm ? (
              <SessionBlock session={day.pm} slot="PM" />
            ) : (
              <div className="rounded-xl border border-dashed border-white/5 p-4 text-center text-[11px] text-white/25 font-mono">
                — PM open —
              </div>
            )}
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}
