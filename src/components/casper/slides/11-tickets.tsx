import { motion } from "framer-motion";
import { Circle, User } from "lucide-react";
import { useState } from "react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, Stagger } from "./_helpers";

type Ticket = {
  id: string;
  title: string;
  status: "Backlog" | "Todo" | "In Progress";
  priority: "Urgent" | "High" | "Medium";
  estimate: 1 | 2 | 3 | 5 | 8;
  labels: ReadonlyArray<string>;
  description: string;
  ac: ReadonlyArray<string>;
  featured?: boolean;
};

const TICKETS: ReadonlyArray<Ticket> = [
  {
    id: "DIS-101",
    title: "Capture item condition at inspection station",
    status: "Todo",
    priority: "High",
    estimate: 3,
    labels: ["frontend", "inspection"],
    description:
      "Associate scans SKU, selects a condition grade, and optionally attaches a photo. This is the trigger for the recommendation call.",
    ac: [
      "Given a scanned SKU, when the inspector selects a grade (A/B/C/D), then the item enters the recommendation flow",
      "Photo attach is optional in v1; upload is async, non-blocking",
      "Bad scans fall back to manual SKU entry with typo protection",
    ],
  },
  {
    id: "DIS-102",
    title: "Fetch live channel signals for a candidate item",
    status: "Todo",
    priority: "Urgent",
    estimate: 5,
    labels: ["backend", "data"],
    description:
      "Aggregate per-channel recovery value, refurb cost, capacity, and current demand from WMS + planning systems and expose to the model service.",
    ac: [
      "SLA: signal bundle returned in <200ms p95",
      "Missing signals degrade gracefully with a confidence penalty rather than failing hard",
      "Freshness: demand signal must be <15 min old or flagged stale",
    ],
  },
  {
    id: "DIS-103",
    title: "Generate ranked disposition recommendation with rationale + confidence",
    status: "In Progress",
    priority: "Urgent",
    estimate: 8,
    labels: ["ml", "core"],
    featured: true,
    description:
      "The core of the MVP. Given a scanned item with a condition grade, the system returns a ranked disposition with rationale and a confidence score. Alternatives are pre-computed so overrides are one tap.",
    ac: [
      "Given a scanned item with a condition grade, when live channel values are available, then the system displays a ranked disposition with rationale and a confidence score",
      "Top recommendation renders in <400ms p95 end-to-end",
      "Confidence <0.6 shows a soft warning and expands the alternatives list by default",
      "Rationale references at least 2 named live signals (e.g., 'outlet demand up + refurb cost low')",
    ],
  },
  {
    id: "DIS-104",
    title: "Confirm or override with reason capture",
    status: "Todo",
    priority: "High",
    estimate: 3,
    labels: ["frontend", "feedback-loop"],
    description:
      "Associate confirms the recommendation with one tap, or overrides. Overrides require a reason code (from a short curated list), the primary training signal.",
    ac: [
      "One-tap confirm on the primary recommendation",
      "Override requires selecting a reason code from a fixed taxonomy (v1: 7 codes)",
      "Override with a chosen alternative logs both the original rec and the new selection",
      "Reason codes are configurable per DC without a deploy",
    ],
  },
  {
    id: "DIS-105",
    title: "Log outcome + close the feedback loop",
    status: "Backlog",
    priority: "Medium",
    estimate: 2,
    labels: ["backend", "analytics"],
    description:
      "Persist decision, override, realized recovery when it comes back, and expose it to the eval pipeline.",
    ac: [
      "Every decision is stored with rec, confirmed action, and reason code if overridden",
      "Realized recovery back-fills the record when the channel settles (async job)",
      "Data lands in the eval warehouse within 24h SLO",
    ],
  },
];

const statusColor: Record<Ticket["status"], string> = {
  Backlog: "bg-white/10 text-white/70",
  Todo: "bg-purple-500/25 text-purple-200",
  "In Progress": "bg-fuchsia-500/25 text-fuchsia-200",
};

const priorityColor: Record<Ticket["priority"], string> = {
  Urgent: "text-red-300",
  High: "text-amber-300",
  Medium: "text-cyan-300",
};

function TicketRow({
  ticket,
  isSelected,
  onSelect,
  index,
}: {
  ticket: Ticket;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.06 }}
      className={`group flex w-full items-center gap-3 border-b border-white/5 px-3 py-2.5 text-left transition ${
        isSelected
          ? "bg-purple-500/10"
          : "hover:bg-white/[0.03]"
      }`}
    >
      <span className={`inline-flex items-center gap-1 ${priorityColor[ticket.priority]}`}>
        <Circle className="h-3 w-3 fill-current" />
      </span>
      <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-white/50">
        {ticket.id}
      </span>
      <span className="flex-1 truncate text-[12.5px] font-medium text-white">
        {ticket.title}
      </span>
      <span
        className={`rounded-md px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] ${statusColor[ticket.status]}`}
      >
        {ticket.status}
      </span>
      <span className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[10px] text-white/70">
        {ticket.estimate}pt
      </span>
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-[9px] font-semibold text-white">
        JT
      </span>
    </motion.button>
  );
}

export const ticketsSlide: Slide = {
  id: "tickets",
  title: "Feature decomposed into tickets",
  section: "execution",
  render: () => <TicketsView />,
};

function TicketsView() {
  const [selected, setSelected] = useState<string>("DIS-103");
  const active = TICKETS.find((t) => t.id === selected) ?? TICKETS[2];

  return (
    <SlideShell eyebrow="Execution · Linear-style tickets">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[32px] font-semibold leading-[1.1] tracking-tight text-white">
            Feature: <span className="text-purple-300">Disposition Recommendation at Inspection</span>
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[13px] text-white/60">
            Tap any ticket to open it. The flagged one is fully specified for kick-off tomorrow.
          </p>
        </FadeUp>

        {/* Linear-ish workspace */}
        <div className="mt-5 grid flex-1 grid-cols-[1.35fr_1fr] gap-4 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          {/* Ticket list */}
          <div className="flex flex-col">
            {/* Column header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-fuchsia-400" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
                  Disposition · MVP · 5 issues
                </p>
              </div>
              <p className="text-[10px] text-white/40">Cycle 1 · Josh Tillson</p>
            </div>
            {/* Rows */}
            <div className="flex-1 overflow-y-auto">
              {TICKETS.map((t, i) => (
                <TicketRow
                  key={t.id}
                  ticket={t}
                  isSelected={selected === t.id}
                  onSelect={() => setSelected(t.id)}
                  index={i}
                />
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                21 total story points
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-purple-300/70">
                Target: cycle end + demo
              </p>
            </div>
          </div>

          {/* Ticket detail */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col overflow-y-auto border-l border-white/10 bg-[#0a0714]"
          >
            <div className="border-b border-white/10 px-5 py-3">
              <div className="flex items-center gap-2 text-[10px]">
                <span className="font-mono uppercase tracking-widest text-white/50">
                  {active.id}
                </span>
                <span
                  className={`rounded-md px-1.5 py-0.5 font-semibold uppercase tracking-[0.14em] ${statusColor[active.status]}`}
                >
                  {active.status}
                </span>
                <span className={`font-semibold uppercase tracking-[0.14em] ${priorityColor[active.priority]}`}>
                  {active.priority}
                </span>
                {active.featured ? (
                  <span className="ml-auto rounded-md border border-fuchsia-400/40 bg-fuchsia-500/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-200">
                    ★ Fully-written example
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-[16px] font-semibold leading-tight text-white">
                {active.title}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px]">
                {active.labels.map((l) => (
                  <span
                    key={l}
                    className="rounded-md border border-purple-400/25 bg-purple-500/10 px-1.5 py-0.5 font-medium text-purple-200"
                  >
                    {l}
                  </span>
                ))}
                <span className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 font-mono text-white/70">
                  Estimate · {active.estimate}pt
                </span>
                <span className="ml-auto inline-flex items-center gap-1 text-white/50">
                  <User className="h-3 w-3" aria-hidden />
                  josh.tillson
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-3 px-5 py-4">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Description
                </p>
                <p className="text-[12.5px] leading-relaxed text-white/85">
                  {active.description}
                </p>
              </div>

              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Acceptance criteria
                </p>
                <ul className="space-y-1.5">
                  {active.ac.map((c) => (
                    <li key={c} className="flex gap-2 text-[12px] leading-snug text-white/85">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-400" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </Stagger>
    </SlideShell>
  );
}
