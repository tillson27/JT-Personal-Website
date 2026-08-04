import { motion } from "framer-motion";
import type { Day, Session } from "@/lib/workouts";
import { Dumbbell, Footprints, Activity, Zap, Coffee, Bed } from "lucide-react";

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
    </div>
  );
}

export default function DayCard({ day, isToday }: { day: Day; isToday: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl border p-5 ${
        isToday
          ? "border-white/25 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_60px_-30px_rgba(255,255,255,0.15)]"
          : "border-white/10 bg-white/[0.015]"
      }`}
    >
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-white">{day.day}</span>
            <span className="text-xs text-white/50 font-mono">{day.date}</span>
            {isToday ? (
              <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-red-300 font-mono">
                Today
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-white/50">{day.focus}</p>
        </div>
      </div>

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
    </motion.div>
  );
}
