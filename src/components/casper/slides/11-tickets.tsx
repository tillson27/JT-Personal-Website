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
    title: "Make a first-guess recommendation from the online return form",
    status: "Todo",
    priority: "Urgent",
    estimate: 5,
    labels: ["backend", "ml", "pre-DC"],
    description:
      "When a customer starts a return, the online form already tells us the reason, the item, and often a photo. Combine that with account history and current channel prices to make a first-guess recommendation before the item even ships. It gets sharpened later at the warehouse. The hard part is pulling the return event, the account, and the planning numbers into one call.",
    ac: [
      "When a return is started with a reason and item, the first-guess recommendation is saved on the return record within 30 seconds",
      "The first guess includes the predicted channel, confidence, expected recovered value, and a short reason that references at least one data point",
      "Missing data lowers confidence instead of failing the call",
      "The worker sees the first guess as a starting point when the item is inspected, and can see how it changed",
    ],
  },
  {
    id: "DIS-101",
    title: "At the warehouse: capture the condition and get the final recommendation",
    status: "Todo",
    priority: "High",
    estimate: 3,
    labels: ["frontend", "inspection"],
    description:
      "The worker scans the item at the inspection station, picks a condition grade (A, B, C, or D), and can attach a photo. That triggers the final recommendation, using the condition on top of the first guess.",
    ac: [
      "When a scanned item has an existing first guess, and the worker confirms a condition grade, the final recommendation call runs",
      "Attaching a photo is optional in version one, and the upload does not slow the recommendation down",
      "If the scan fails, the worker can type the item ID manually, with a confirm dialog to catch typos",
      "If there is no first guess (a walk-in, or no online return), the call still works. Condition becomes the main signal",
    ],
  },
  {
    id: "DIS-102",
    title: "The live-data service: what each channel would pay, capacity, and demand",
    status: "Todo",
    priority: "Urgent",
    estimate: 5,
    labels: ["backend", "data", "integration"],
    description:
      "Pull together, for each channel, what it would pay for the item, what it costs to refurbish, how full it is right now, and the last seven days of demand. Sources: the warehouse system, planning, and finance. Send it to the model as one bundle. Speed matters because the worker is waiting.",
    ac: [
      "The bundle returns in under 200 milliseconds for 95% of calls, and under 500 milliseconds for 99% of calls",
      "Missing pieces are shown in the response, so the model can lower confidence instead of failing",
      "The demand number must be under 15 minutes old, and anything older is flagged",
      "The shape of the bundle is versioned, so any breaking change to callers fails the build early",
    ],
  },
  {
    id: "DIS-103",
    title: "Generate the ranked recommendation with a plain-English reason and confidence",
    status: "Todo",
    priority: "Urgent",
    estimate: 8,
    labels: ["ml", "core"],
    featured: true,
    description:
      "The core of the first version. Given a scanned item, a confirmed condition grade, and the current channel numbers, the system returns a ranked list of options (Send to outlet, Refurbish, Resell as new, Liquidate, Donate, Destroy) with a short reason and a confidence score. The other options are ready in advance so overriding takes one tap. The reason must reference at least two data points, in plain English, so the worker can trust the call.",
    ac: [
      "When the model is called with a scanned item, a condition grade, and current channel numbers, it returns a ranked list with a reason, confidence, and dollar estimate",
      "The top recommendation shows up on the monitor within 400 milliseconds of the scan, for 95% of calls",
      "If confidence is under 60%, the screen shows an amber 'ask a person' state, and expands the other options by default",
      "The reason names at least two data points in plain English, for example: 'outlet demand up 18% this week, and refurbish is expensive'",
      "The other options are ready in advance, so an override is a click, not a second model call",
    ],
  },
  {
    id: "DIS-104",
    title: "Confirm or override, with a reason we can learn from",
    status: "Todo",
    priority: "High",
    estimate: 3,
    labels: ["frontend", "feedback-loop"],
    description:
      "The worker confirms the top recommendation with one tap (Enter), or picks a different option. If they pick a different one, they choose a reason from a short list. That reason is our best training data for the next version of the model. Each warehouse can have its own reasons, without a code release.",
    ac: [
      "The worker can confirm the top recommendation with a single tap or the Enter key",
      "Overrides require picking a reason from a fixed list (7 reasons in version one)",
      "When they override, we log both the original recommendation and the new choice",
      "Free-text 'Other' is allowed, capped at 200 characters, and does not train the model unless a reviewer approves it",
      "Reasons are managed as config, so a warehouse can add or change one without a code deploy",
    ],
  },
  {
    id: "DIS-105",
    title: "Save the outcome and feed it into the review warehouse",
    status: "Todo",
    priority: "Medium",
    estimate: 3,
    labels: ["backend", "analytics"],
    description:
      "Save every decision: the recommendation, the confirmed action, the reason (if overridden), the condition grade, and the data used at the time. Later, once the item actually sells or gets processed, fill in the money we actually got back. That way the weekly reviews and the retrain candidates work off clean data.",
    ac: [
      "Every decision is stored with the recommendation, confirmed action, reason (if overridden), and a snapshot of the data used",
      "Actual recovery is filled in once the channel finalizes, as an async job that retries on failure",
      "Data lands in the analytics warehouse within 24 hours",
      "The shape supports breaking down by warehouse, category, condition, and reason from day one",
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
    <SlideShell eyebrow="Execution · Tickets · First-release cycle">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[30px] font-semibold leading-[1.1] tracking-tight text-white">
            Feature:{" "}
            <span className="text-purple-300">the recommendation, first online, then at the warehouse</span>
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[12.5px] text-white/60">
            Tap any ticket to open it. Each one is scoped to fit inside a single planning
            cycle. The starred one is the core of the first release.
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
                  Returns recommendation · First release · {TICKETS.length} tickets
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
