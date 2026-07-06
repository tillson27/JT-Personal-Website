import { motion } from "framer-motion";
import { Circle, Star, User } from "lucide-react";
import { useState } from "react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, Stagger } from "./_helpers";

type Ticket = {
  id: string;
  title: string;
  userStory: {
    as: string;
    want: string;
    so: string;
  };
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
    title: "First-guess recommendation from the online return form",
    userStory: {
      as: "returns operations lead",
      want: "a first-guess disposition attached to every return the moment it is initiated online",
      so: "warehouse workers walk up to each item with a starting point, not a blank slate",
    },
    status: "Todo",
    priority: "Urgent",
    estimate: 5,
    labels: ["backend", "ml", "pre-DC"],
    description:
      "The online return form already captures reason, item, and often a photo. Combine that with account history and current channel prices to produce a first-guess recommendation before the item ships. The warehouse call later sharpens it with condition.",
    ac: [
      "Given a return is started with a reason and item, a first-guess recommendation is saved to the return record within 30 seconds",
      "The record includes predicted channel, confidence, expected recovered value, and a short reason referencing at least one data point",
      "Missing data lowers confidence rather than failing the call",
      "The worker sees the first guess as the starting state at inspection, plus a delta once condition is captured",
    ],
  },
  {
    id: "DIS-101",
    title: "Capture condition at the warehouse and trigger the final recommendation",
    userStory: {
      as: "warehouse worker at the inspection station",
      want: "to scan an item, grade its condition, and see the routing recommendation on the same screen",
      so: "I never transcribe or re-enter anything between inspection and decision",
    },
    status: "Todo",
    priority: "High",
    estimate: 3,
    labels: ["frontend", "inspection"],
    description:
      "At the inspection station the worker scans the item, picks a condition grade (A/B/C/D), and optionally attaches a photo. That triggers the final recommendation, layering condition on top of the first guess.",
    ac: [
      "Given a scanned item with an existing first guess, confirming a condition grade fires the final recommendation call",
      "Attaching a photo is optional in v1, and the upload runs async so it does not slow the recommendation",
      "If the scan fails, the worker can type the item ID with a confirm dialog to catch typos",
      "Walk-ins with no online return still work — condition becomes the primary signal",
    ],
  },
  {
    id: "DIS-102",
    title: "Live-data service · per-channel price, capacity, cost, demand",
    userStory: {
      as: "warehouse worker relying on the recommendation",
      want: "each call to reflect the last 15 minutes of channel prices, capacity, and demand",
      so: "the tool never sends me toward a channel that is already full, or priced last week",
    },
    status: "Todo",
    priority: "Urgent",
    estimate: 5,
    labels: ["backend", "data", "integration"],
    description:
      "One call returns, for each channel, what it would pay for the item, refurb cost, current fill level, and the last seven days of demand. Sources: warehouse system, planning, and finance. The bundle is what the model consumes.",
    ac: [
      "The bundle returns under 200ms at p95 and under 500ms at p99",
      "Missing pieces are surfaced in the response so the model can lower confidence rather than error",
      "Demand data must be under 15 minutes old; anything older is flagged",
      "The bundle shape is versioned, and any breaking change fails the build for callers",
    ],
  },
  {
    id: "DIS-103",
    title: "Generate the ranked recommendation with plain-English reason and confidence",
    userStory: {
      as: "warehouse worker at the moment of decision",
      want: "the top recommendation on-screen within 400ms of scanning, with a reason I can trust",
      so: "I confirm the call in flow instead of second-guessing or falling back to gut feel",
    },
    status: "Todo",
    priority: "Urgent",
    estimate: 8,
    labels: ["ml", "core"],
    featured: true,
    description:
      "Given a scanned item, condition grade, and current channel numbers, return a ranked list of the six options with a plain-English reason and confidence score. Alternates are pre-computed so an override is one tap.",
    ac: [
      "Given a scan, condition grade, and channel numbers, the model returns a ranked list with reason, confidence, and $ estimate — with alternates pre-fetched for one-tap override",
      "Top recommendation renders on the monitor within 400ms of scan at p95",
      "Below 60% confidence, the screen shows an amber 'ask a person' state and expands alternates by default",
      "The reason names ≥2 data points in plain English (e.g. 'outlet demand up 18% this week, refurbish is expensive')",
    ],
  },
  {
    id: "DIS-104",
    title: "Confirm or override with a reason we can learn from",
    userStory: {
      as: "warehouse worker who knows this item better than the model does",
      want: "to confirm with one tap or pick a different option and briefly say why",
      so: "my expertise trains the next version of the model without adding paperwork to my shift",
    },
    status: "Todo",
    priority: "High",
    estimate: 3,
    labels: ["frontend", "feedback-loop"],
    description:
      "One tap (or Enter) confirms the top recommendation. If the worker picks a different option, they pick a reason from a short list. That override reason becomes the highest-quality training signal for the next model version.",
    ac: [
      "Top recommendation can be confirmed with a single tap or the Enter key",
      "Overrides require selecting a reason from a fixed list (7 reasons in v1)",
      "Overrides log both the original recommendation and the new choice, with the data snapshot",
      "Free-text 'Other' is capped at 200 chars and only feeds training after reviewer approval",
      "Reasons are config-driven — a warehouse can add or edit one without a code deploy",
    ],
  },
  {
    id: "DIS-105",
    title: "Persist every decision with its input snapshot",
    userStory: {
      as: "returns operations lead reviewing performance weekly",
      want: "every decision — recommended, confirmed, and overridden — landing in analytics within 24 hours",
      so: "weekly reviews and model retrains work off trustworthy data from day one",
    },
    status: "Todo",
    priority: "Medium",
    estimate: 3,
    labels: ["backend", "analytics"],
    description:
      "Persist recommendation, confirmed action, override reason, condition grade, and the data snapshot used at the time of the call. Schema is versioned so breaking changes fail the build for callers.",
    ac: [
      "Every decision is stored with recommendation, confirmed action, reason (if any), and the input snapshot used at call time",
      "Data lands in the analytics warehouse within 24 hours",
      "Schema supports breakdown by warehouse, category, condition, and override reason from day one",
      "Schema is versioned; a breaking change fails the build for downstream callers",
    ],
  },
  {
    id: "DIS-106",
    title: "Back-fill realized recovery dollars from channel settlements",
    userStory: {
      as: "returns operations lead",
      want: "each decision joined to what actually happened (settlement price, resale event, or write-off)",
      so: "recovery rate reflects reality, not intent, and the model learns from real outcomes",
    },
    status: "Todo",
    priority: "High",
    estimate: 3,
    labels: ["backend", "analytics", "feedback-loop"],
    description:
      "Once a channel finalizes the outcome, join the settlement record back to the decision. Sources: outlet POS, refurb resale price, liquidator invoice. Closes the loop between what we predicted and what actually came back.",
    ac: [
      "Async job retries on failure and never drops a record",
      "Settlements missing after 90 days are flagged for manual investigation",
      "Joined records include source system, timestamp, and delta between predicted and actual $",
      "Analytics can distinguish predicted-only, awaiting-settlement, and settled records",
    ],
  },
  {
    id: "DIS-107",
    title: "Training pipeline for the disposition ranker",
    userStory: {
      as: "ML lead",
      want: "a reproducible pipeline that trains the ranker on labeled historical dispositions and gates every release on offline eval",
      so: "we retrain on demand and never ship a model that fails the eval gates",
    },
    status: "Todo",
    priority: "High",
    estimate: 5,
    labels: ["ml", "pipeline"],
    description:
      "Turn labeled historical returns (with settlements from DIS-106) into a versioned model artifact. Every retrain runs the same eval suite before promotion; a failed gate blocks the release.",
    ac: [
      "Training pipeline reproducible from labeled data with a single command",
      "Artifact is versioned with training data hash, feature list, and eval scores",
      "Offline gates: recovery-$ lift vs. current champion, calibration, per-category performance",
      "Failed gate blocks promotion; passing artifact is promoted to shadow for the next side-by-side test",
    ],
  },
  {
    id: "DIS-108",
    title: "Observability, safety alerts, and drift monitoring",
    userStory: {
      as: "returns operations lead",
      want: "the tool to page us the moment it starts misbehaving",
      so: "a bad model does not run in the warehouse for a day before anyone notices",
    },
    status: "Todo",
    priority: "Medium",
    estimate: 5,
    labels: ["backend", "observability", "safety"],
    description:
      "Dashboards for recommendation quality, override rate, latency, and safety events, broken down by warehouse and category. Alerts fire for the four safety-net cases on the eval slide: destroy-vs-sellable, sustainability rule break, drift over threshold, and stale live-data bundle.",
    ac: [
      "Live dashboards for recommendation, override rate, prediction accuracy, and safety events, filterable by warehouse and category",
      "Safety-net alerts fire within 5 minutes, with a link to the offending decision and its input snapshot",
      "Drift alert (override rate >30% or prediction error >15% in any category) triggers the shadow retrain per the eval rhythm",
      "Dashboards accessible to returns manager, warehouse lead, and ML on-call",
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
      <span className="flex flex-1 items-center gap-1.5 truncate text-[12.5px] font-medium text-white">
        {ticket.featured ? (
          <Star
            className="h-3 w-3 flex-shrink-0 fill-fuchsia-300 text-fuchsia-300"
            aria-label="MVP core"
          />
        ) : null}
        <span className="truncate">{ticket.title}</span>
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
      <Stagger gap={0.08} fill>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            Feature:{" "}
            <span className="text-purple-300">AI disposition recommendation at the inspection station (v1)</span>
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[12.5px] text-white/60">
            One shippable feature. The worker sees a call, confirms or overrides with a
            reason, and every decision becomes training data. All 9 tickets ship together
            so v1 launches with the learning loop already wired. Tap any ticket to open
            it — the starred one is the model call itself.
          </p>
        </FadeUp>

        {/* Linear-ish workspace */}
        <div className="mb-2 mt-4 grid min-h-0 flex-1 grid-cols-[1.3fr_1fr] gap-3 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
          {/* Ticket list */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-fuchsia-400" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
                  Returns recommendation · Release plan · {TICKETS.length} tickets
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
                Target: v1 demo · learning loop live
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
              <div className="rounded-xl border border-purple-400/30 bg-purple-500/[0.08] p-3">
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-300">
                  User story
                </p>
                <p className="text-[12px] leading-relaxed text-white/90">
                  <span className="text-white/55">As a</span>{" "}
                  <span className="font-semibold text-white">{active.userStory.as}</span>,{" "}
                  <span className="text-white/55">I want</span>{" "}
                  <span className="font-semibold text-white">{active.userStory.want}</span>,{" "}
                  <span className="text-white/55">so that</span>{" "}
                  <span className="font-semibold text-white">{active.userStory.so}</span>.
                </p>
              </div>

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
