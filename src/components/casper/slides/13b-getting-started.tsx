import { motion } from "framer-motion";
import {
  CalendarDays,
  ClipboardCheck,
  Database,
  Handshake,
  Rocket,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

type Step = {
  week: string;
  title: string;
  icon: LucideIcon;
  bullets: ReadonlyArray<string>;
  delay: number;
  accent?: boolean;
};

const STEPS: ReadonlyArray<Step> = [
  {
    week: "Week 1",
    title: "Discovery kickoff",
    icon: Handshake,
    bullets: [
      "Three-day workshop with your returns, operations, and planning leads",
      "Map how returns actually flow end to end, today",
      "Agree on the main metric and measure today's recovery rate",
    ],
    delay: 0.35,
    accent: true,
  },
  {
    week: "Week 2",
    title: "Data and systems audit",
    icon: Database,
    bullets: [
      "Confirm which data is available: channel prices, capacity, demand",
      "Scope the work to connect your warehouse and inventory systems",
      "Find gaps in the online return form and fix the easy ones",
    ],
    delay: 0.5,
  },
  {
    week: "Week 3",
    title: "Scope and design the pilot",
    icon: ClipboardCheck,
    bullets: [
      "Pick the pilot warehouse and category (highest-volume apparel line)",
      "Design the screen with an actual worker from the floor",
      "Sign off on the list of options and the reasons for override",
    ],
    delay: 0.65,
  },
  {
    week: "Week 4+",
    title: "Build the first version",
    icon: Rocket,
    bullets: [
      "Cycle one: the six tickets on the previous slide",
      "Launch as a side-by-side test: with the tool, and without",
      "Review every override, every week, from day one",
    ],
    delay: 0.8,
  },
];

const NEEDS: ReadonlyArray<{ icon: LucideIcon; label: string; detail: string }> = [
  {
    icon: Users,
    label: "One returns lead",
    detail: "Someone who can make scope calls in the room, without checking upstairs.",
  },
  {
    icon: Users,
    label: "One IT and data lead",
    detail: "Owns access to your warehouse and inventory systems, and the return-form data.",
  },
  {
    icon: Users,
    label: "One warehouse worker",
    detail: "Helps design the screen. Brings the voice of the person actually using it.",
  },
];

export const gettingStartedSlide: Slide = {
  id: "getting-started",
  title: "Getting started",
  section: "close",
  render: () => (
    <SlideShell eyebrow="Getting started · The first four weeks">
      <Stagger gap={0.08} fill>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            The first thing we do is{" "}
            <GradientText>not build anything.</GradientText>
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[13px] text-white/60">
            Discovery first, then design, then build. Here is the four-week path from a
            signed contract to a working first version in your warehouse.
          </p>
        </FadeUp>

        {/* Timeline */}
        <div className="mt-5 grid min-h-0 flex-1 grid-cols-4 gap-3">
          {STEPS.map((s) => (
            <motion.div
              key={s.week}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: s.delay, ease: [0.22, 1, 0.36, 1] }}
              className={
                s.accent
                  ? "flex flex-col rounded-2xl border border-purple-400/50 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/15 p-4"
                  : "flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              }
            >
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.22em] ${
                    s.accent
                      ? "border border-purple-400/40 bg-purple-500/20 text-purple-100"
                      : "border border-white/15 bg-white/[0.04] text-white/70"
                  }`}
                >
                  <CalendarDays className="h-3 w-3" aria-hidden />
                  {s.week}
                </span>
                <span
                  className={
                    s.accent
                      ? "flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/25 text-purple-100"
                      : "flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05] text-white/70"
                  }
                >
                  <s.icon className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
              <p className="mt-3 text-[16px] font-semibold text-white">{s.title}</p>
              <ul className="mt-2 space-y-1.5">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-[11.5px] leading-snug text-white/80">
                    <span
                      className={`mt-1.5 h-1 w-1 flex-shrink-0 rounded-full ${
                        s.accent ? "bg-purple-200" : "bg-purple-400"
                      }`}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* What we need from you */}
        <FadeUp>
          <div className="mt-4 rounded-2xl border border-fuchsia-400/30 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-fuchsia-500/10 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Users className="h-4 w-4 text-fuchsia-200" aria-hidden />
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-200">
                What we would need on your side for week one to work
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {NEEDS.map((n) => (
                <div
                  key={n.label}
                  className="flex gap-2.5 rounded-xl border border-white/10 bg-black/25 px-3 py-2"
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-fuchsia-500/20 text-fuchsia-200">
                    <n.icon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-[11.5px] font-semibold text-white">{n.label}</p>
                    <p className="text-[10.5px] leading-snug text-white/60">
                      {n.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
