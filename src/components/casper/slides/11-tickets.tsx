import { motion } from "framer-motion";
import { Circle, User } from "lucide-react";
import { useState } from "react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, Stagger } from "./_helpers";

type Ticket = {
  id: string;
  title: string;
  status: "Todo";
  priority: "Urgent" | "High" | "Medium";
  estimate: 1 | 2 | 3 | 5 | 8;
  labels: ReadonlyArray<string>;
  description: string;
  ac: ReadonlyArray<string>;
  featured?: boolean;
};

const TICKETS: ReadonlyArray<Ticket> = [
  {
    id: "DIS-100",
    title: "Compute a preliminary rec from the customer's return form",
    status: "Todo",
    priority: "Urgent",
    estimate: 5,
    labels: ["backend", "ml", "pre-DC"],
    description:
      "When a customer initiates a return, the return form already tells us the reason, the SKU, and often a photo. Combine that with account history + live channel value to compute a preliminary disposition rec before the item ever ships. Refined later at inspection. Complexity is in stitching the return-flow event + accounts + planning signals into one call.",
    ac: [
      "Given a return-initiation event, when the reason code + SKU are captured, then a preliminary rec is stored on the return record within 30s",
      "Preliminary rec includes: predicted channel, confidence, estimated recovered value, and a rationale referencing at least one live signal",
      "Missing signals downgrade confidence rather than fail the call",
      "Preliminary rec is exposed to the inspection console as the starting point (associate can see it changed at inspection)",
    ],
  },
  {
    id: "DIS-101",
    title: "Inspection station: capture confirmed condition + trigger final rec",
    status: "Todo",
    priority: "High",
    estimate: 3,
    labels: ["frontend", "inspection"],
    description:
      "The associate scans the SKU at the inspection station, selects a confirmed condition grade (A/B/C/D), and optionally attaches a photo. That combination triggers the final recommendation call, layering condition on top of the preliminary rec.",
    ac: [
      "Given a scanned SKU with an existing preliminary rec, when the associate confirms a condition grade, then the final rec call is triggered",
      "Photo attach is optional in v1; upload is async, non-blocking on the rec call",
      "Bad scans fall back to manual SKU entry with typo protection + confirm dialog",
      "If the return record has no preliminary rec (walk-in, no online return), the call still works — condition is the primary signal",
    ],
  },
  {
    id: "DIS-102",
    title: "Live channel signals service: per-channel value, capacity, demand",
    status: "Todo",
    priority: "Urgent",
    estimate: 5,
    labels: ["backend", "data", "integration"],
    description:
      "Aggregate per-channel recovery value, refurb cost, current capacity, and 7-day demand from WMS + planning + finance sources. Expose to the model service as a single signal bundle. SLA-bound because the associate is waiting.",
    ac: [
      "SLA: signal bundle returned in <200ms p95, <500ms p99",
      "Missing signals degrade gracefully — the response marks which signals are missing and by how much",
      "Freshness: demand signal must be <15 min old; anything older is flagged stale in the response",
      "Signal schema is versioned; consumer contracts break the build on incompatible change",
    ],
  },
  {
    id: "DIS-103",
    title: "Generate ranked disposition recommendation with rationale + confidence",
    status: "Todo",
    priority: "Urgent",
    estimate: 8,
    labels: ["ml", "core"],
    featured: true,
    description:
      "The core of the MVP. Given a scanned item with a confirmed condition grade + live channel signals, the system returns a ranked disposition (Route to outlet / Refurbish / A-stock / Liquidate / Donate / Destroy) with a rationale and a confidence score. Alternatives are pre-computed so overrides are one tap. Rationale must reference at least two named live signals to build trust with the associate.",
    ac: [
      "Given a scanned item with a confirmed condition grade + live channel signals, when the model is called, then a ranked recommendation is returned with rationale + confidence + $ estimate",
      "Top rec renders in <400ms p95 end-to-end (scan → visible on monitor)",
      "Confidence <0.6 shows an amber 'defer to human' state and expands the alternatives list by default",
      "Rationale references at least 2 named live signals in plain English (e.g. 'outlet demand +18% w/w + refurb cost high')",
      "Alternatives are pre-computed and cached so override is a client-side interaction, not a second model call",
    ],
  },
  {
    id: "DIS-104",
    title: "Confirm or override with reason-code capture",
    status: "Todo",
    priority: "High",
    estimate: 3,
    labels: ["frontend", "feedback-loop"],
    description:
      "The associate confirms the primary recommendation with one tap (Enter), or overrides by picking an alternative. Overrides require selecting a reason code from a fixed taxonomy — this is the primary training signal for the next model. Reason codes are configurable per DC without a deploy.",
    ac: [
      "One-tap confirm on the primary recommendation (Enter or button)",
      "Override requires selecting a reason code from a fixed taxonomy (v1: 7 codes)",
      "Override with a chosen alternative logs both the original rec and the new selection",
      "Free-text 'Other' reason is allowed but caps at 200 chars and does not train the model unless a reviewer promotes it",
      "Reason codes are managed via a config service; a per-DC change ships without a deploy",
    ],
  },
  {
    id: "DIS-105",
    title: "Persist outcome + close the feedback loop into the eval warehouse",
    status: "Todo",
    priority: "Medium",
    estimate: 3,
    labels: ["backend", "analytics"],
    description:
      "Persist every decision (rec, confirmed action, reason code, condition grade, active signals used). Back-fill the record with realized recovery when the channel settles. Land in the eval warehouse so the weekly retrain candidate + override-taxonomy review has clean data.",
    ac: [
      "Every decision is stored with rec, confirmed action, reason code (if overridden), and full signal snapshot",
      "Realized recovery back-fills the record when the channel settles (async job, retryable)",
      "Data lands in the eval warehouse within 24h SLO",
      "Schema supports segmentation by DC, category, condition grade, and reason code out of the box",
    ],
  },
];

const statusColor: Record<Ticket["status"], string> = {
  Todo: "bg-purple-500/25 text-purple-200",
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
        isSelected ? "bg-purple-500/10" : "hover:bg-white/[0.03]"
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
  const active = TICKETS.find((t) => t.id === selected) ?? TICKETS[3];
  const totalPoints = TICKETS.reduce((sum, t) => sum + t.estimate, 0);

  return (
    <SlideShell eyebrow="Execution · Linear-style tickets · MVP cycle 1">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[30px] font-semibold leading-[1.1] tracking-tight text-white">
            Feature:{" "}
            <span className="text-purple-300">Disposition rec — pre-DC + at inspection</span>
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[12.5px] text-white/60">
            Tap any ticket to open it. Each is scoped to be a self-contained cycle 1 issue.
            The starred one is the core of the MVP.
          </p>
        </FadeUp>

        {/* Linear-ish workspace */}
        <div className="mt-4 grid flex-1 grid-cols-[1.3fr_1fr] gap-3 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          {/* Ticket list */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-fuchsia-400" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
                  Disposition · MVP · {TICKETS.length} issues
                </p>
              </div>
              <p className="text-[10px] text-white/40">Cycle 1 · Josh Tillson</p>
            </div>
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
                {totalPoints} total story points · all Todo
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-purple-300/70">
                Target: cycle end + demo
              </p>
            </div>
          </div>

          {/* Ticket detail */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col overflow-y-auto border-l border-white/10 bg-[#0a0714]"
          >
            <div className="border-b border-white/10 px-5 py-3">
              <div className="flex flex-wrap items-center gap-2 text-[10px]">
                <span className="font-mono uppercase tracking-widest text-white/50">
                  {active.id}
                </span>
                <span
                  className={`rounded-md px-1.5 py-0.5 font-semibold uppercase tracking-[0.14em] ${statusColor[active.status]}`}
                >
                  {active.status}
                </span>
                <span
                  className={`font-semibold uppercase tracking-[0.14em] ${priorityColor[active.priority]}`}
                >
                  {active.priority}
                </span>
                {active.featured ? (
                  <span className="ml-auto rounded-md border border-fuchsia-400/40 bg-fuchsia-500/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-fuchsia-200">
                    ★ MVP core
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-[15px] font-semibold leading-tight text-white">
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

            <div className="flex-1 space-y-3 px-5 py-3">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Description
                </p>
                <p className="text-[12px] leading-relaxed text-white/85">
                  {active.description}
                </p>
              </div>

              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
                  Acceptance criteria
                </p>
                <ul className="space-y-1.5">
                  {active.ac.map((c) => (
                    <li key={c} className="flex gap-2 text-[11.5px] leading-snug text-white/85">
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
