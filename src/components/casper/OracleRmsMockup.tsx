import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Circle,
  ClipboardCheck,
  Compass,
  Info,
  Lightbulb,
  Link2,
  MapPin,
  Package,
  PlayCircle,
  Plug,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import casperLogo from "@/assets/casper/casper-logo.png";
import SubPageShell from "./SubPageShell";

/* ------------------------------------------------------------------ */
/* Reusable Oracle-Alta styled bits                                    */
/* ------------------------------------------------------------------ */

// A pulsing highlight ring drawn around a "click me" target
function Spotlight({ children, active }: { children: ReactNode; active: boolean }) {
  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {active ? (
          <>
            <motion.div
              key="ring"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="pointer-events-none absolute -inset-1 rounded-[10px] ring-2 ring-fuchsia-500/70"
            />
            <motion.div
              key="halo"
              initial={{ opacity: 0.4, scale: 1 }}
              animate={{ opacity: [0.45, 0.9, 0.45], scale: [1, 1.02, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -inset-2 rounded-[12px] bg-fuchsia-500/[0.14] blur-md"
            />
          </>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

// Small "powered by Casper" ghost mark, subtle
function CasperInsideChip() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-300/60 bg-white px-2 py-[3px] text-[9px] font-semibold uppercase tracking-[0.2em] text-fuchsia-600 shadow-[0_2px_6px_-2px_rgba(217,70,239,0.35)]">
      <img src={casperLogo} alt="" className="h-3 w-3 rounded-sm object-cover" />
      Casper inside
    </div>
  );
}

// The Oracle RMS browser chrome + top nav + left rail — the constant shell
function RmsChrome({
  breadcrumbs,
  children,
}: {
  breadcrumbs: ReadonlyArray<string>;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d0a17] shadow-[0_30px_100px_-30px_rgba(147,51,234,0.55)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#141026] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6058]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="ml-2 flex flex-1 items-center gap-2 rounded-md border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] text-white/60">
          <ShieldCheck className="h-3 w-3 text-emerald-400" aria-hidden />
          <span className="font-mono">retail.lululemon.oraclecloud.com/rms</span>
        </div>
        <span className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40 sm:inline">
          Live · illustrative
        </span>
      </div>

      {/* Light-theme Oracle Alta app */}
      <div className="bg-[#f6f7fa] text-[#2e353d]">
        {/* Oracle app top bar */}
        <div className="flex items-center justify-between border-b border-[#e1e4e8] bg-white px-3 py-1.5 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-black tracking-tight text-[#c74634]">
                ORACLE
              </span>
              <span className="text-[10px] font-semibold text-[#5f6b7a]">
                Retail Merchandising
              </span>
            </div>
            <div className="hidden h-4 w-px bg-[#e1e4e8] sm:block" />
            <div className="hidden items-center gap-1 text-[10px] text-[#5f6b7a] sm:flex">
              {breadcrumbs.map((b, i) => (
                <span key={b} className="flex items-center gap-1">
                  {i > 0 ? <ChevronRight className="h-3 w-3 text-[#a1a8b0]" /> : null}
                  <span
                    className={
                      i === breadcrumbs.length - 1
                        ? "font-semibold text-[#2e353d]"
                        : ""
                    }
                  >
                    {b}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-1 rounded-md border border-[#e1e4e8] bg-white px-2 py-1 text-[10px] text-[#5f6b7a] sm:flex">
              <Search className="h-3 w-3" />
              <span>Search</span>
            </div>
            <Bell className="h-3.5 w-3.5 text-[#5f6b7a]" aria-hidden />
            <Settings className="h-3.5 w-3.5 text-[#5f6b7a]" aria-hidden />
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0572CE] text-[9px] font-semibold text-white">
              AR
            </div>
          </div>
        </div>

        <div className="grid min-h-[420px] grid-cols-[36px_1fr] sm:min-h-[460px] sm:grid-cols-[52px_1fr] lg:grid-cols-[190px_1fr]">
          {/* Left tasks rail */}
          <aside className="border-r border-[#e1e4e8] bg-white">
            <div className="hidden border-b border-[#e1e4e8] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5f6b7a] lg:block">
              Tasks
            </div>
            <nav className="flex flex-col gap-0.5 p-1.5 lg:p-2 text-[10.5px] text-[#2e353d]">
              {[
                { i: Compass, l: "Home" },
                { i: Package, l: "Items" },
                { i: MapPin, l: "Inventory" },
                { i: ClipboardCheck, l: "Returns", active: true },
                { i: TrendingUp, l: "Reports" },
                { i: ShieldCheck, l: "Foundation Data" },
              ].map((t) => (
                <div
                  key={t.l}
                  className={`flex items-center gap-2 rounded-md px-1.5 py-1.5 lg:px-2 ${
                    t.active
                      ? "bg-[#e6f0fb] font-semibold text-[#0572CE]"
                      : "text-[#5f6b7a] hover:bg-[#f1f2f4]"
                  }`}
                >
                  <t.i className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="hidden lg:inline">{t.l}</span>
                </div>
              ))}
            </nav>
          </aside>

          {/* Content area */}
          <div className="p-2.5 sm:p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

// STEP 1: Home dashboard with a Casper widget quietly added
function ScreenHome({ highlight }: { highlight: string }) {
  const highlightCasper = highlight === "casper-tile";
  return (
    <RmsChrome breadcrumbs={["Home", "Dashboard"]}>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#5f6b7a]">
            Good morning, Andrea
          </p>
          <p className="text-[15px] font-semibold text-[#2e353d]">Returns dashboard · IB-04</p>
        </div>
        <span className="rounded-md border border-[#e1e4e8] bg-white px-2 py-0.5 font-mono text-[10px] text-[#5f6b7a]">
          14:22 · Shift 3h 41m
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <StatTile label="Awaiting inspection" value="247" tone="neutral" />
        <StatTile label="Processed today" value="142" tone="neutral" />
        <StatTile label="Value recovered" value="$8,142" tone="up" />
        <StatTile label="Overrides" value="4.1%" tone="neutral" />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[1.15fr_1fr]">
        {/* Traditional queue card */}
        <div className="rounded-lg border border-[#e1e4e8] bg-white p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5f6b7a]">
              Returns awaiting disposition
            </p>
            <span className="text-[10px] text-[#0572CE]">View all →</span>
          </div>
          <div className="space-y-1.5">
            {["7734911 · SS26 Tee", "4429021 · Align Legging", "8821337 · Scuba Hoodie"].map(
              (row) => (
                <div
                  key={row}
                  className="flex items-center justify-between rounded-md border border-[#e1e4e8] px-2 py-1.5 text-[10.5px]"
                >
                  <span className="font-mono text-[#2e353d]">{row}</span>
                  <span className="rounded-full border border-[#f0d68d] bg-[#fdf6e0] px-1.5 py-[1px] text-[9px] font-semibold uppercase text-[#8a6d1c]">
                    Pending
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* NEW Casper widget */}
        <Spotlight active={highlightCasper}>
          <div className="rounded-lg border border-fuchsia-300/60 bg-gradient-to-br from-white via-fuchsia-50 to-purple-50 p-3 shadow-[0_8px_28px_-16px_rgba(217,70,239,0.6)]">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={casperLogo} alt="" className="h-5 w-5 rounded-md object-cover" />
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-fuchsia-600">
                    Casper · Disposition assistant
                  </p>
                  <p className="text-[11.5px] font-semibold text-[#2e353d]">Ready when you are</p>
                </div>
              </div>
              <CasperInsideChip />
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <div className="rounded-md border border-fuchsia-200 bg-white/80 px-2 py-1.5">
                <p className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-[#5f6b7a]">
                  Queued recommendations
                </p>
                <p className="mt-0.5 text-[13px] font-semibold text-[#2e353d]">247</p>
              </div>
              <div className="rounded-md border border-fuchsia-200 bg-white/80 px-2 py-1.5">
                <p className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-[#5f6b7a]">
                  Avg. confidence
                </p>
                <p className="mt-0.5 text-[13px] font-semibold text-emerald-600">96%</p>
              </div>
            </div>
            <button
              type="button"
              className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-md bg-[#0572CE] px-2 py-1.5 text-[10.5px] font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              Open returns queue
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </Spotlight>
      </div>
    </RmsChrome>
  );
}

function StatTile({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "neutral" | "up";
}) {
  return (
    <div className="rounded-lg border border-[#e1e4e8] bg-white p-2.5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#5f6b7a]">
        {label}
      </p>
      <p
        className={`mt-0.5 text-[15px] font-semibold ${
          tone === "up" ? "text-emerald-600" : "text-[#2e353d]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// STEP 2: Returns queue with new "Casper Priority" column
function ScreenQueue({ highlight }: { highlight: string }) {
  const highlightCol = highlight === "casper-col";
  const highlightRow = highlight === "casper-row";
  const rows = [
    {
      id: "7734911",
      item: "SS26 Tee · Black · M",
      grade: "B",
      reason: "Wrong size",
      priority: "Send to outlet",
      conf: 87,
      pop: true,
    },
    {
      id: "4429021",
      item: "Align Legging · Navy · 6",
      grade: "C",
      reason: "Defect",
      priority: "Ask a person",
      conf: 42,
      pop: false,
    },
    {
      id: "8821337",
      item: "Scuba Hoodie · Grey · L",
      grade: "A",
      reason: "Didn't like fit",
      priority: "Resell as new",
      conf: 92,
      pop: false,
    },
    {
      id: "1102055",
      item: "Wunder Under · Black · 8",
      grade: "B",
      reason: "Wrong color",
      priority: "Send to outlet",
      conf: 84,
      pop: false,
    },
  ];
  return (
    <RmsChrome breadcrumbs={["Returns", "Manage Returns"]}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5f6b7a]">
            Returns · Manage
          </p>
          <p className="text-[14px] font-semibold text-[#2e353d]">Inbound queue · 247 items</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="hidden items-center gap-1 rounded-md border border-[#e1e4e8] bg-white px-2 py-1 text-[10px] text-[#5f6b7a] sm:flex">
            <Search className="h-3 w-3" /> Filter
          </div>
          <button className="rounded-md border border-[#e1e4e8] bg-white px-2 py-1 text-[10px] font-semibold text-[#0572CE]">
            More actions
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#e1e4e8] bg-white">
        <div className="grid grid-cols-[60px_1fr_1.2fr] gap-2 border-b border-[#e1e4e8] bg-[#fafbfc] px-2.5 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#5f6b7a] sm:grid-cols-[80px_1.6fr_60px_1fr_1.4fr] sm:px-3 sm:tracking-[0.16em]">
          <span>Item</span>
          <span>Description</span>
          <span className="hidden sm:inline">Grade</span>
          <span className="hidden sm:inline">Return reason</span>
          <Spotlight active={highlightCol}>
            <div className="-my-1 -mx-1 flex items-center gap-1 rounded-md px-1 py-1">
              <img src={casperLogo} alt="" className="h-3 w-3 rounded-sm object-cover" />
              <span className="truncate text-fuchsia-600">Casper priority</span>
            </div>
          </Spotlight>
        </div>
        {rows.map((r) => {
          const isTargetRow = highlightRow && r.id === "7734911";
          const rowBody = (
            <div
              className={`grid grid-cols-[60px_1fr_1.2fr] items-center gap-2 border-b border-[#f0f2f4] px-2.5 py-2 text-[10.5px] last:border-b-0 sm:grid-cols-[80px_1.6fr_60px_1fr_1.4fr] sm:px-3 ${
                r.pop ? "bg-fuchsia-50/60" : ""
              }`}
            >
              <span className="font-mono text-[#2e353d]">{r.id}</span>
              <span className="truncate text-[#2e353d]">{r.item}</span>
              <span className="hidden font-mono text-[#5f6b7a] sm:inline">{r.grade}</span>
              <span className="hidden truncate text-[#5f6b7a] sm:inline">{r.reason}</span>
              <div className="flex min-w-0 items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                    r.conf >= 60 ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                <span
                  className={`truncate font-semibold ${
                    r.conf >= 60 ? "text-[#2e353d]" : "text-amber-700"
                  }`}
                >
                  {r.priority}
                </span>
                <span className="ml-auto flex-shrink-0 font-mono text-[9.5px] text-[#8a94a0]">
                  {r.conf}%
                </span>
              </div>
            </div>
          );
          return (
            <div key={r.id}>
              {isTargetRow ? <Spotlight active>{rowBody}</Spotlight> : rowBody}
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex items-start gap-1.5 text-[9.5px] leading-snug text-[#8a94a0]">
        <Info className="mt-0.5 h-3 w-3 flex-shrink-0" />
        <span>
          "Casper priority" is a Custom Flex Attribute on the return record. This view is a
          Casper task-flow registered under Oracle's Returns menu.
        </span>
      </div>
    </RmsChrome>
  );
}

// STEP 3-4: Item detail with Casper panel embedded
function ScreenItemDetail({
  highlight,
  showReason,
}: {
  highlight: string;
  showReason: boolean;
}) {
  const highlightPanel = highlight === "casper-panel";
  const highlightWhy = highlight === "why-button";
  return (
    <RmsChrome breadcrumbs={["Returns", "Manage Returns", "Item · 7734911"]}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#5f6b7a]">
            SKU · 7734911
          </p>
          <p className="text-[14.5px] font-semibold text-[#2e353d]">
            SS26 Tee · Black · M{" "}
            <span className="ml-1 rounded border border-[#e1e4e8] bg-[#fafbfc] px-1 py-[1px] font-mono text-[9.5px] text-[#5f6b7a]">
              Grade B
            </span>
          </p>
        </div>
        <div className="flex gap-1.5">
          <button className="rounded-md border border-[#e1e4e8] bg-white px-2 py-1 text-[10px] font-semibold text-[#5f6b7a]">
            Cancel
          </button>
          <button className="rounded-md bg-[#0572CE] px-2 py-1 text-[10px] font-semibold text-white">
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1.15fr]">
        {/* Left column — Oracle-native item panels */}
        <div className="space-y-2">
          <RmsPanel title="Item overview">
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10.5px]">
              <Field label="Style" value="ST-77349" />
              <Field label="Class" value="Mens · Tops" />
              <Field label="Cost" value="$32.10" />
              <Field label="Retail" value="$100.00" />
              <Field label="Return date" value="Nov 12" />
              <Field label="Origin" value="lululemon.com" />
            </div>
          </RmsPanel>

          <RmsPanel title="Inspection">
            <div className="space-y-1 text-[10.5px]">
              <Field label="Condition" value="Grade B · minor pilling" />
              <Field label="Reason code" value='"Wrong size"' />
              <Field label="Photo" value="attached · 1.2 MB" />
            </div>
          </RmsPanel>

          <RmsPanel title="Disposition" required>
            <div className="rounded-md border border-dashed border-[#c9cfd6] bg-[#fafbfc] p-2 text-[10.5px] text-[#5f6b7a]">
              <div className="flex items-center gap-1.5">
                <Circle className="h-3 w-3" />
                <span>Awaiting decision. See Casper recommendation →</span>
              </div>
            </div>
          </RmsPanel>
        </div>

        {/* Right column — CASPER PANEL */}
        <Spotlight active={highlightPanel}>
          <div className="min-w-0 overflow-hidden rounded-lg border border-fuchsia-300/60 bg-gradient-to-br from-white to-fuchsia-50/60 p-3 shadow-[0_10px_36px_-18px_rgba(217,70,239,0.5)] sm:p-3.5">
            <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <img src={casperLogo} alt="" className="h-5 w-5 flex-shrink-0 rounded-md object-cover" />
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-fuchsia-600">
                    Casper · Recommendation
                  </p>
                  <p className="text-[10px] text-[#5f6b7a]">
                    Embedded ADF task-flow
                  </p>
                </div>
              </div>
              <span className="flex-shrink-0 rounded-full border border-emerald-500/40 bg-emerald-50 px-1.5 py-[1px] text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                High confidence
              </span>
            </div>

            <div className="rounded-md bg-white p-3 shadow-inner">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-fuchsia-600">
                Send to
              </p>
              <p className="mt-1 break-words text-[15px] font-semibold leading-tight text-[#2e353d] sm:text-[17px]">
                Outlet · Cross Iron Mills
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10.5px]">
                <span className="font-mono text-fuchsia-700">87% confident</span>
                <span className="text-[#c9cfd6]">·</span>
                <span className="font-mono text-emerald-600">+$34 recovered</span>
                <span className="text-[#c9cfd6]">·</span>
                <span className="text-[#5f6b7a]">vs. $12 liquidate</span>
              </div>
            </div>

            <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#8a94a0]">
              Alternatives considered
            </p>
            <div className="mt-1 grid grid-cols-2 gap-1.5 text-[9.5px] sm:grid-cols-4">
              {[
                { l: "Refurbish", v: "$28" },
                { l: "Resell new", v: "$40" },
                { l: "Liquidate", v: "$12" },
                { l: "Donate", v: "$0" },
              ].map((a) => (
                <div
                  key={a.l}
                  className="rounded-md border border-[#e1e4e8] bg-white px-2 py-1.5 text-center"
                >
                  <p className="truncate text-[#5f6b7a]">{a.l}</p>
                  <p className="font-mono text-[9.5px] text-[#8a94a0]">{a.v}</p>
                </div>
              ))}
            </div>

            {/* Why panel — appears in step 4 */}
            <AnimatePresence>
              {showReason ? (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 10 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden rounded-md border border-fuchsia-200 bg-white p-2.5"
                >
                  <div className="mb-1 flex items-center gap-1.5">
                    <Lightbulb className="h-3 w-3 text-fuchsia-600" />
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-fuchsia-600">
                      Why · signals used
                    </p>
                  </div>
                  <ul className="space-y-1 text-[10px] text-[#2e353d]">
                    <li className="flex justify-between">
                      <span>Outlet demand · this category</span>
                      <span className="font-mono text-emerald-600">↑ 18% wk-over-wk</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Main store capacity · YYC region</span>
                      <span className="font-mono text-amber-600">Full · 102%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Refurbish cost · Grade B tee</span>
                      <span className="font-mono text-amber-600">$22 (high)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Bulk-sale contract</span>
                      <span className="font-mono text-[#5f6b7a]">None</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sustainability policy · resell</span>
                      <span className="font-mono text-emerald-600">OK</span>
                    </li>
                  </ul>
                  <p className="mt-1.5 rounded bg-fuchsia-50 px-1.5 py-1 text-[9.5px] italic text-fuchsia-700">
                    Pulled from Oracle Inventory · Merchandising Analytics · Store Ops SOR at
                    14:22:07.
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="mt-3 grid grid-cols-[auto_auto_1fr] gap-1.5">
              <Spotlight active={highlightWhy}>
                <button className="w-full rounded-md border border-fuchsia-300 bg-white px-2 py-1.5 text-[10px] font-semibold text-fuchsia-700">
                  Why?
                </button>
              </Spotlight>
              <button className="rounded-md border border-[#e1e4e8] bg-white px-2 py-1.5 text-[10px] font-semibold text-[#5f6b7a]">
                Override
              </button>
              <button className="rounded-md bg-emerald-600 px-2 py-1.5 text-[10px] font-semibold text-white">
                Confirm ⏎
              </button>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-1.5 text-[9px] text-[#8a94a0]">
              <span className="flex items-center gap-1">
                <Plug className="h-2.5 w-2.5" /> Served via ADF task-flow slot
              </span>
              <CasperInsideChip />
            </div>
          </div>
        </Spotlight>
      </div>
    </RmsChrome>
  );
}

function RmsPanel({
  title,
  required,
  children,
}: {
  title: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e1e4e8] bg-white">
      <div className="flex items-center justify-between border-b border-[#e1e4e8] bg-[#fafbfc] px-2.5 py-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5f6b7a]">
          {title}
          {required ? <span className="ml-1 text-[#c74634]">*</span> : null}
        </p>
        <ChevronDown className="h-3 w-3 text-[#8a94a0]" />
      </div>
      <div className="p-2.5">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-[#8a94a0]">
        {label}
      </span>
      <span className="text-[#2e353d]">{value}</span>
    </div>
  );
}

// STEP 5: Confirm — toast + Oracle disposition field populated + audit
function ScreenConfirm({ highlight }: { highlight: string }) {
  const highlightAudit = highlight === "audit";
  return (
    <RmsChrome breadcrumbs={["Returns", "Manage Returns", "Item · 7734911"]}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#5f6b7a]">
            SKU · 7734911
          </p>
          <p className="text-[14.5px] font-semibold text-[#2e353d]">
            SS26 Tee · Black · M
          </p>
        </div>
        <div className="flex gap-1.5">
          <span className="rounded-full border border-emerald-500/40 bg-emerald-50 px-2 py-[3px] text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
            Saved
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-2">
          <RmsPanel title="Disposition · written back to Oracle">
            <div className="space-y-2 text-[10.5px]">
              {[
                {
                  k: "Route",
                  v: (
                    <span className="text-right font-semibold text-[#2e353d]">
                      Outlet · Cross Iron Mills
                    </span>
                  ),
                },
                {
                  k: "Transfer document",
                  v: (
                    <span className="font-mono text-[#0572CE]">TSF-2026-11418</span>
                  ),
                },
                {
                  k: "Recovered value",
                  v: (
                    <span className="font-mono text-emerald-600">+$34.00</span>
                  ),
                },
                {
                  k: "Decision source",
                  v: (
                    <span className="flex items-center gap-1">
                      <img src={casperLogo} alt="" className="h-3 w-3 rounded-sm object-cover" />
                      <span className="font-mono text-fuchsia-700">CASPER v1.4.2</span>
                    </span>
                  ),
                },
              ].map((r) => (
                <div key={r.k} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <span className="text-[8.5px] font-semibold uppercase tracking-[0.16em] text-[#8a94a0]">
                    {r.k}
                  </span>
                  {r.v}
                </div>
              ))}
            </div>
          </RmsPanel>

          <Spotlight active={highlightAudit}>
            <RmsPanel title="Audit trail">
              <ul className="space-y-1.5 text-[10px]">
                {[
                  { t: "14:22:14", a: "A. Ramirez confirmed Casper recommendation", tone: "text-emerald-700" },
                  { t: "14:22:11", a: "Casper wrote DISP_CD=OUTLET_CIM to RMS_RETURN_HEAD", tone: "text-fuchsia-700" },
                  { t: "14:22:11", a: "Transfer TSF-2026-11418 auto-generated", tone: "text-[#0572CE]" },
                  { t: "14:22:09", a: "Casper explanation logged to feedback store", tone: "text-fuchsia-700" },
                ].map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="flex-shrink-0 font-mono text-[#8a94a0]">{r.t}</span>
                    <span className={`min-w-0 break-words ${r.tone}`}>{r.a}</span>
                  </li>
                ))}
              </ul>
            </RmsPanel>
          </Spotlight>
        </div>

        {/* Right side: the Casper "next up" panel */}
        <div className="rounded-lg border border-fuchsia-300/60 bg-gradient-to-br from-white to-fuchsia-50/60 p-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={casperLogo} alt="" className="h-5 w-5 rounded-md object-cover" />
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-fuchsia-600">
                Casper · Next up
              </p>
            </div>
            <CasperInsideChip />
          </div>
          <div className="rounded-md bg-white p-2.5">
            <p className="text-[10.5px] text-[#5f6b7a]">Item</p>
            <p className="text-[13px] font-semibold text-[#2e353d]">
              4429021 · Align Legging · Navy · 6
            </p>
            <div className="mt-2 flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 p-2 text-[10px] text-amber-800">
              <Info className="h-3.5 w-3.5 flex-shrink-0" />
              <span>
                42% confident, below the 60% line. Flagged for human review.
              </span>
            </div>
            <button className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-md bg-[#0572CE] px-2 py-1.5 text-[10.5px] font-semibold text-white">
              Open next return
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Success toast */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.2 }}
        className="mt-3 flex items-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-50 px-3 py-2 text-[11px] text-emerald-800"
      >
        <CheckCircle2 className="h-4 w-4" />
        <span>
          <span className="font-semibold">Confirmed.</span> Oracle RMS updated. Transfer
          document created. $34 booked to recovered value.
        </span>
      </motion.div>
    </RmsChrome>
  );
}

// STEP 6: Impact rollup - back on dashboard with delta
function ScreenImpact({ highlight }: { highlight: string }) {
  const highlightRollup = highlight === "rollup";
  return (
    <RmsChrome breadcrumbs={["Home", "Dashboard"]}>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#5f6b7a]">
            End of shift · Andrea Ramirez
          </p>
          <p className="text-[15px] font-semibold text-[#2e353d]">Casper impact · today</p>
        </div>
        <span className="rounded-md border border-[#e1e4e8] bg-white px-2 py-0.5 font-mono text-[10px] text-[#5f6b7a]">
          18:00 · Shift closed
        </span>
      </div>

      <Spotlight active={highlightRollup}>
        <div className="rounded-lg border border-fuchsia-300/60 bg-gradient-to-br from-white via-fuchsia-50 to-purple-50 p-3.5">
          <div className="mb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={casperLogo} alt="" className="h-6 w-6 rounded-md object-cover" />
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-fuchsia-600">
                  Casper · Impact rollup
                </p>
                <p className="text-[12px] font-semibold text-[#2e353d]">
                  Compared to last month's same-shift baseline
                </p>
              </div>
            </div>
            <CasperInsideChip />
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <ImpactTile label="Items processed" val="247" delta="+12" />
            <ImpactTile label="Value recovered" val="$8,142" delta="+$1,204" tone="up" />
            <ImpactTile label="Override rate" val="4.1%" delta="target < 8%" tone="neutral" />
            <ImpactTile label="Avg confidence" val="96%" delta="+3.4 pts" tone="up" />
          </div>
          <div className="mt-3 rounded-md border border-fuchsia-200 bg-white p-2.5 text-[10.5px] text-[#2e353d]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-fuchsia-600">
              Where the lift came from
            </p>
            <ul className="mt-1 space-y-0.5 text-[10.5px]">
              <li>· 78 items sent to outlet instead of liquidation · +$1,872</li>
              <li>· 12 refurbish-avoided decisions · +$264 net after cost</li>
              <li>· 4 overrides captured with reason · loops into next training run</li>
            </ul>
          </div>
        </div>
      </Spotlight>

      <div className="mt-2 flex items-center gap-1.5 text-[9.5px] text-[#8a94a0]">
        <Link2 className="h-3 w-3" />
        <span>
          Rollup writes daily to Oracle Retail Merchandising Analytics · planning & buying teams
          see it in RMFCS reports the next morning.
        </span>
      </div>
    </RmsChrome>
  );
}

function ImpactTile({
  label,
  val,
  delta,
  tone = "neutral",
}: {
  label: string;
  val: string;
  delta: string;
  tone?: "up" | "neutral";
}) {
  return (
    <div className="rounded-md border border-fuchsia-200 bg-white p-2.5">
      <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#5f6b7a]">
        {label}
      </p>
      <p className="mt-0.5 text-[16px] font-semibold text-[#2e353d]">{val}</p>
      <p
        className={`mt-0.5 font-mono text-[9.5px] ${
          tone === "up" ? "text-emerald-600" : "text-[#8a94a0]"
        }`}
      >
        {delta}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tour steps table                                                    */
/* ------------------------------------------------------------------ */

type Step = {
  id: string;
  chapter: string;
  title: string;
  guide: string;
  surface: string; // the specific Oracle extension point being used
  focus: string; // maps to Spotlight target
  action: string; // what "click Next" simulates
  render: (highlight: string) => ReactNode;
};

const STEPS: ReadonlyArray<Step> = [
  {
    id: "home",
    chapter: "Chapter 1 · Morning check-in",
    title: "Andrea logs into Oracle Retail Home.",
    guide:
      "Andrea, warehouse lead at Lululemon's Balzac DC. Same Retail Home dashboard she uses every morning. One new tile.",
    surface: "Oracle Retail Home · custom tile state report",
    focus: "casper-tile",
    action: "Open the returns queue",
    render: (h) => <ScreenHome highlight={h} />,
  },
  {
    id: "queue",
    chapter: "Chapter 2 · The queue",
    title: "A Casper-prioritized view of the same data.",
    guide:
      "A Casper task-flow view sits alongside standard Manage Returns. The priority signal is a Custom Flex Attribute on the return record, so it flows through Oracle's own pipelines.",
    surface: "CFAS attribute + ADF task-flow menu item",
    focus: "casper-col",
    action: "Open item 7734911",
    render: (h) => <ScreenQueue highlight={h} />,
  },
  {
    id: "item",
    chapter: "Chapter 3 · The recommendation",
    title: "Casper appears inside the standard item page.",
    guide:
      "Standard Oracle Item page. A Casper task-flow is embedded on the right, surfacing the recommendation, confidence, and alternatives.",
    surface: "ADF task-flow slot on the Item page",
    focus: "casper-panel",
    action: "See why Casper picked outlet",
    render: (h) => <ScreenItemDetail highlight={h} showReason={false} />,
  },
  {
    id: "why",
    chapter: "Chapter 4 · The reasoning",
    title: "Every recommendation is explainable.",
    guide:
      "Andrea taps 'Why'. Casper shows the signals it used: outlet demand, store capacity, refurbish cost, contracts, sustainability policy. Sourced live from RMS REST services and Merchandising Analytics.",
    surface: "RMS REST services · Merchandising Analytics",
    focus: "why-button",
    action: "Confirm the recommendation",
    render: (h) => <ScreenItemDetail highlight={h} showReason={true} />,
  },
  {
    id: "confirm",
    chapter: "Chapter 5 · The write-back",
    title: "Oracle stays the source of truth.",
    guide:
      "On confirm, Casper POSTs the disposition through Oracle's RMS Returns REST service. Oracle's own transfer-document workflow takes over.",
    surface: "RMS Returns REST service · native transfer flow",
    focus: "audit",
    action: "See the shift rollup",
    render: (h) => <ScreenConfirm highlight={h} />,
  },
  {
    id: "impact",
    chapter: "Chapter 6 · The result",
    title: "Value recovered, rolled into Oracle reports.",
    guide:
      "End of shift. Casper's rollup writes to Merchandising Analytics via a Retail Home contextual report. Planning and buying see it in RMFCS the next morning.",
    surface: "Retail Home contextual report · Merchandising Analytics feed",
    focus: "rollup",
    action: "Restart the tour",
    render: (h) => <ScreenImpact highlight={h} />,
  },
];

/* ------------------------------------------------------------------ */
/* Intro splash                                                        */
/* ------------------------------------------------------------------ */

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <section className="mt-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-wrap items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-purple-300/80 sm:gap-2 sm:text-[11px] sm:tracking-[0.24em]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Companion to the deck · guided tour
          <span className="text-white/25">·</span>
          <span className="text-fuchsia-200">Lululemon-shaped example</span>
        </div>
        <h1 className="mt-2 text-[30px] font-semibold leading-[1.05] tracking-tight text-white sm:mt-3 sm:text-[42px] lg:text-[52px]">
          Casper,{" "}
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
            inside Oracle RMS.
          </span>
        </h1>
        <p className="mt-3 max-w-3xl text-[13.5px] leading-snug text-white/70 sm:mt-4 sm:text-[15px] lg:text-[16.5px]">
          Casper works better inside the system a warehouse already uses. Lululemon runs on
          Oracle Retail Merchandising (RMFCS). This mockup shows what Casper looks like there.
        </p>
      </motion.div>

      {/* Feasibility callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="mt-5 overflow-hidden rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/[0.08] to-purple-500/[0.05] p-4 sm:mt-6 sm:p-5"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
            <ShieldCheck className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300 sm:text-[11px]">
              Feasible today. Documented Oracle surfaces.
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/85 sm:text-[13.5px]">
              No fork of Oracle. Four extension points do the work.
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                {
                  name: "Oracle Retail Home tiles",
                  detail: "Admin-configurable dashboard tiles. Delivers the Casper home widget.",
                },
                {
                  name: "Custom Flex Attributes (CFAS)",
                  detail:
                    "Metadata framework for adding attributes to Merchandising entities. Holds the Casper priority signal.",
                },
                {
                  name: "ADF task-flow slots",
                  detail:
                    "Same embed points Oracle uses for its own reports. Delivers the item-detail Casper panel.",
                },
                {
                  name: "RMS REST + RIB/BDI",
                  detail:
                    "Read returns and inventory data. Write disposition decisions back to Oracle.",
                },
              ].map((s) => (
                <div
                  key={s.name}
                  className="rounded-lg border border-emerald-400/20 bg-black/25 p-2.5"
                >
                  <p className="text-[10.5px] font-semibold text-emerald-200">{s.name}</p>
                  <p className="mt-0.5 text-[11px] leading-snug text-white/70">{s.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Start button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-5 flex flex-col items-start gap-3 rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-500/15 to-fuchsia-500/10 p-4 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:p-5"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-200 sm:text-[11px]">
            The guided tour
          </p>
          <p className="mt-1 text-[13.5px] leading-snug text-white/85 sm:text-[15px]">
            Six chapters. Two minutes. One disposition decision, end to end, inside Oracle RMS.
          </p>
        </div>
        <button
          type="button"
          onClick={onStart}
          className="group inline-flex flex-shrink-0 items-center gap-2 rounded-xl border border-fuchsia-400/60 bg-gradient-to-br from-fuchsia-500/30 to-purple-500/25 px-5 py-2.5 text-[12.5px] font-semibold uppercase tracking-[0.18em] text-fuchsia-100 shadow-[0_16px_50px_-16px_rgba(217,70,239,0.7)] transition hover:brightness-110"
        >
          <PlayCircle className="h-4 w-4" aria-hidden />
          Start the tour
        </button>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Tour view                                                           */
/* ------------------------------------------------------------------ */

function Tour({ onReset }: { onReset: () => void }) {
  const [index, setIndex] = useState(0);
  const step = STEPS[index];
  const total = STEPS.length;
  const isLast = index === total - 1;
  const tourRef = useRef<HTMLDivElement>(null);

  const goNext = useCallback(() => {
    if (isLast) {
      onReset();
      return;
    }
    setIndex((i) => Math.min(total - 1, i + 1));
  }, [isLast, onReset, total]);
  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
      }
      if (e.key === "ArrowRight" || e.key === "Enter") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return (
    <section ref={tourRef} className="mt-8 sm:mt-10">
      {/* Progress bar */}
      <div className="mb-4 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setIndex(i)}
            className="group flex flex-1 flex-col gap-1 text-left"
            aria-label={`Jump to ${s.chapter}`}
          >
            <div
              className={`h-1 w-full rounded-full transition ${
                i < index
                  ? "bg-fuchsia-400"
                  : i === index
                    ? "bg-gradient-to-r from-purple-400 to-fuchsia-400"
                    : "bg-white/10 group-hover:bg-white/20"
              }`}
            />
            <span
              className={`hidden text-[9px] font-semibold uppercase tracking-[0.16em] transition sm:block ${
                i === index ? "text-fuchsia-200" : "text-white/40"
              }`}
            >
              {i + 1} · {s.id}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr] lg:gap-5">
        {/* Guide sidebar */}
        <AnimatePresence mode="wait">
          <motion.aside
            key={step.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/[0.05] p-4 lg:sticky lg:top-6 lg:h-fit"
          >
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.24em] text-fuchsia-300">
              {step.chapter}
            </p>
            <h2 className="mt-1.5 text-[19px] font-semibold leading-tight text-white sm:text-[21px]">
              {step.title}
            </h2>
            <p className="mt-2.5 text-[12.5px] leading-relaxed text-white/75 sm:text-[13px]">
              {step.guide}
            </p>

            {/* Oracle integration surface */}
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-fuchsia-400/30 bg-black/25 p-2.5">
              <Plug className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-fuchsia-300" aria-hidden />
              <div className="min-w-0">
                <p className="text-[8.5px] font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
                  Oracle surface used
                </p>
                <p className="mt-0.5 break-words text-[11px] font-medium text-white/85">
                  {step.surface}
                </p>
              </div>
            </div>

            {/* Nav controls */}
            <div className="mt-4 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={goPrev}
                disabled={index === 0}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/70 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-1.5 rounded-lg border border-fuchsia-400/50 bg-gradient-to-br from-fuchsia-500/30 to-purple-500/20 px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-fuchsia-100 shadow-[0_10px_30px_-14px_rgba(217,70,239,0.6)] transition hover:brightness-110"
              >
                {isLast ? "Restart" : step.action}
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between text-[9.5px] uppercase tracking-[0.2em] text-white/40">
              <span>
                Step {index + 1} of {total}
              </span>
              <span className="hidden lg:inline">← → to move</span>
            </div>

            {/* Persistent context */}
            <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-2.5">
              <div className="mb-1 flex items-center gap-1.5">
                <User className="h-3 w-3 text-purple-200" />
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-purple-200">
                  In the tour
                </p>
              </div>
              <ul className="space-y-0.5 text-[10.5px] text-white/70">
                <li>· Andrea Ramirez · Warehouse lead · Balzac DC</li>
                <li>· Item · SS26 Tee · Black · M · Grade B</li>
                <li>· Return reason · "Wrong size"</li>
              </ul>
            </div>
          </motion.aside>
        </AnimatePresence>

        {/* Mockup viewport */}
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {step.render(step.focus)}
            </motion.div>
          </AnimatePresence>

          {/* Below-mockup hint */}
          <motion.div
            key={`hint-${step.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-[10.5px] text-white/60"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_10px_2px_rgba(217,70,239,0.6)]" />
              <span>
                Highlighted area shows what a user would click or read next.
              </span>
            </div>
            <span className="hidden text-[9.5px] uppercase tracking-[0.2em] text-white/40 sm:inline">
              Oracle RMS mock · Casper integrated
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function OracleRmsMockup() {
  const [started, setStarted] = useState(false);
  const tourAnchor = useRef<HTMLDivElement>(null);

  const start = useCallback(() => {
    setStarted(true);
    // scroll into view once painted
    setTimeout(() => {
      tourAnchor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }, []);

  return (
    <SubPageShell
      eyebrow="Standalone mockup · Casper × Oracle RMS"
      chip="Companion to the Casper deck"
    >
      <Intro onStart={start} />
      <div ref={tourAnchor} />
      <AnimatePresence>
        {started ? (
          <motion.div
            key="tour"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Tour onReset={() => setStarted(false)} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Footer note */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-200 sm:text-[11px]">
          A note on fidelity
        </p>
        <p className="mt-2 max-w-3xl text-[12px] leading-snug text-white/60">
          Mid-fidelity mockup. Oracle chrome is approximated, not pixel-perfect. The integration
          surfaces (Retail Home tiles, CFAS attributes, ADF task-flow embeds, RMS REST
          write-backs) are documented in the Retail Home Admin Guide, CFAS Implementation Guide,
          and RMFCS Extension Guide. A production build would be validated with Oracle.
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
          <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2 py-0.5 font-semibold uppercase tracking-[0.18em] text-purple-200">
            Retail Home tiles
          </span>
          <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2 py-0.5 font-semibold uppercase tracking-[0.18em] text-purple-200">
            CFAS custom attributes
          </span>
          <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2 py-0.5 font-semibold uppercase tracking-[0.18em] text-purple-200">
            ADF task-flow injection
          </span>
          <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2 py-0.5 font-semibold uppercase tracking-[0.18em] text-purple-200">
            RMS REST + RIB/BDI
          </span>
        </div>
      </motion.section>
    </SubPageShell>
  );
}
