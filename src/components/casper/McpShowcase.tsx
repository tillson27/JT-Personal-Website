import { motion } from "framer-motion";
import {
  ArrowRight,
  Blocks,
  Braces,
  Code2,
  Database,
  Layers,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SubPageShell from "./SubPageShell";

type MappingRow = {
  source: string;
  target: string;
  transform: string;
  note: string;
};

const MAPPINGS: ReadonlyArray<MappingRow> = [
  {
    source: "borrower.first_nm",
    target: "PARTY/INDIVIDUAL/NAME/FirstName",
    transform: "titleCase(x)",
    note: "Clean casing, keep hyphenated names",
  },
  {
    source: "loan.orig_amt_cents",
    target: "LOAN/TERMS_OF_LOAN/NoteAmount",
    transform: "cents → decimal(2)",
    note: "USD only in v1",
  },
  {
    source: "property.zip5",
    target: "ADDRESS/PostalCode",
    transform: "padStart(5,'0')",
    note: "Preserve leading zeros",
  },
  {
    source: "loan.rate_type",
    target: "LOAN/AMORTIZATION/AmortizationType",
    transform: "enum(FIXED→Fixed, VAR→AdjustableRate)",
    note: "Documented enum in mismo v3.5",
  },
];

const TOOLS: ReadonlyArray<{
  icon: LucideIcon;
  name: string;
  desc: string;
}> = [
  {
    icon: Database,
    name: "list_source_fields",
    desc: "Return the source schema with descriptions, types, and sample values.",
  },
  {
    icon: Layers,
    name: "get_mapping",
    desc: "Return the target field and transform for a given source field path.",
  },
  {
    icon: Braces,
    name: "query_mappings",
    desc: "JSONPath-style filter across mappings, e.g., 'find every field that maps to LOAN/.*'.",
  },
  {
    icon: Code2,
    name: "suggest_mapping",
    desc: "Given an unmapped source field, propose a MISMO target with reasoning + confidence.",
  },
  {
    icon: Sparkles,
    name: "validate_translation",
    desc: "Run a source record through mappings + transforms, return MISMO XML + validation report.",
  },
];

export default function McpShowcase() {
  return (
    <SubPageShell
      eyebrow="Case study · Data Model MCP · MISMO alignment"
      chip="AI Forward Deployed Product Management · Client work"
    >
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-4"
      >
        <div className="flex flex-wrap items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-purple-300/80 sm:gap-2 sm:text-[11px] sm:tracking-[0.24em]">
          <Blocks className="h-3.5 w-3.5" aria-hidden />
          Model Context Protocol
          <span className="text-white/25">·</span>
          <span className="text-fuchsia-200">Scoped, built & shipped on a client engagement</span>
        </div>
        <h1 className="mt-2 text-[30px] font-semibold leading-[1.05] tracking-tight text-white sm:mt-3 sm:text-[42px] lg:text-[52px]">
          A{" "}
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
            translation layer
          </span>{" "}
          that builds itself.
        </h1>
        <p className="mt-3 max-w-3xl text-[13.5px] leading-snug text-white/70 sm:mt-4 sm:text-[15px] lg:text-[17px]">
          A recent AI product I owned end-to-end as an AI Forward Deployed Product Manager. A
          mortgage-servicer client was translating a proprietary loan-origination data model to{" "}
          <span className="font-semibold text-white">MISMO v3.5</span>, with thousands of fields
          discovered, mapped, transformed, and validated by hand. I scoped the opportunity,
          wrote the PRD, and shipped an MCP that exposes source and target models with JSON query
          logic so the agent doing the work has full context at every step.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2.5 py-1 font-semibold uppercase tracking-[0.2em] text-purple-200">
            Discovery → PRD → shipped
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 uppercase tracking-[0.2em] text-white/60">
            AI-native product management
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 uppercase tracking-[0.2em] text-white/60">
            Deployed on client engagement
          </span>
        </div>
      </motion.section>

      {/* Before / After */}
      <section className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-red-300/80 sm:text-[11px] sm:tracking-[0.24em]">
            Before the MCP
          </p>
          <ul className="mt-2 space-y-1.5 text-[12px] leading-snug text-white/80 sm:mt-3 sm:text-[13px]">
            <li>· Engineer opens the MISMO reference Excel, again</li>
            <li>· Greps the source schema, finds three plausible candidates</li>
            <li>· Guesses the transform, ships it, waits for QA</li>
            <li>· Regressions when the source or target schema changes</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-500/15 to-fuchsia-500/10 p-4 sm:p-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-200 sm:text-[11px] sm:tracking-[0.24em]">
            With the MCP
          </p>
          <ul className="mt-2 space-y-1.5 text-[12px] leading-snug text-white/90 sm:mt-3 sm:text-[13px]">
            <li>· Agent asks the MCP for the source model, gets typed fields + docs</li>
            <li>· Filters existing mappings with a JSONPath query, avoids duplicates</li>
            <li>· Requests a suggestion for the unmapped one, gets a MISMO path + transform + confidence</li>
            <li>· Validates end-to-end against a sample record before commit</li>
          </ul>
        </motion.div>
      </section>

      {/* Tools */}
      <section className="mt-10 sm:mt-12">
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <Zap className="h-4 w-4 text-fuchsia-300" aria-hidden />
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200 sm:text-[11px] sm:tracking-[0.24em]">
            MCP tools exposed
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4"
            >
              <div className="mb-2.5 flex items-center gap-2 sm:mb-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-purple-200 sm:h-8 sm:w-8">
                  <t.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                </span>
                <p className="font-mono text-[12px] font-semibold text-white sm:text-[13px]">{t.name}</p>
              </div>
              <p className="text-[11.5px] leading-snug text-white/65 sm:text-[12px]">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Chat + Mapping demo */}
      <section className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-[1fr_1.1fr]">
        {/* Chat */}
        <div>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:mb-3 sm:text-[11px] sm:tracking-[0.24em]">
            How the MCP shows up in agent chat
          </p>
          <div className="space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="rounded-xl bg-white/[0.04] p-3"
            >
              <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-300">
                <MessageSquare className="h-3 w-3" aria-hidden /> engineer
              </p>
              <p className="text-[12.5px] leading-snug text-white/85">
                map <span className="font-mono text-purple-200">borrower.first_nm</span> to MISMO
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="rounded-xl border border-purple-400/30 bg-purple-500/10 p-3"
            >
              <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-200">
                <Sparkles className="h-3 w-3" aria-hidden /> agent
              </p>
              <p className="text-[12.5px] leading-snug text-white/85">
                Calling{" "}
                <span className="rounded bg-black/50 px-1 py-0.5 font-mono text-[11px] text-purple-200">
                  query_mappings
                </span>{" "}
                to check for duplicates…{" "}
                <span className="text-white/50">no match found</span>
              </p>
              <p className="mt-1.5 text-[12.5px] leading-snug text-white/85">
                Calling{" "}
                <span className="rounded bg-black/50 px-1 py-0.5 font-mono text-[11px] text-purple-200">
                  suggest_mapping
                </span>
                :
              </p>
              <div className="mt-1.5 rounded-lg border border-white/10 bg-black/40 p-2 font-mono text-[11px] text-white/85">
                <p>
                  <span className="text-purple-300">target</span>:
                  PARTY/INDIVIDUAL/NAME/FirstName
                </p>
                <p>
                  <span className="text-purple-300">transform</span>: titleCase(x)
                </p>
                <p>
                  <span className="text-purple-300">confidence</span>: 0.92
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="rounded-xl bg-white/[0.04] p-3"
            >
              <p className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-300">
                <MessageSquare className="h-3 w-3" aria-hidden /> engineer
              </p>
              <p className="text-[12.5px] leading-snug text-white/85">
                ✓ accept · run{" "}
                <span className="font-mono text-purple-200">validate_translation</span>{" "}
                on last night's records
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mapping table */}
        <div>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:mb-3 sm:text-[11px] sm:tracking-[0.24em]">
            Sample mappings the MCP returns
          </p>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-white/10 bg-white/[0.02] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
              <span>Source</span>
              <span className="text-center">→</span>
              <span>MISMO target</span>
            </div>
            {MAPPINGS.map((m, i) => (
              <motion.div
                key={m.source}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.25 + i * 0.1 }}
                className="border-b border-white/5 px-4 py-3 last:border-b-0"
              >
                <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2 sm:gap-3">
                  <div>
                    <p className="break-all font-mono text-[10.5px] text-white/90 sm:text-[12px]">{m.source}</p>
                  </div>
                  <div className="pt-0.5">
                    <ArrowRight className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                  </div>
                  <div>
                    <p className="break-all font-mono text-[10.5px] text-fuchsia-200 sm:text-[12px]">{m.target}</p>
                  </div>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 pl-0 text-[10.5px]">
                  <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-white/70">
                    {m.transform}
                  </span>
                  <span className="text-white/40">·</span>
                  <span className="text-white/50">{m.note}</span>
                </div>
              </motion.div>
            ))}
            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2 text-[10px] text-white/40">
              <span className="uppercase tracking-[0.2em]">4 of 1,842 mappings</span>
              <span className="font-mono">mismo v3.5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/15 to-transparent p-4 sm:p-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-200 sm:text-[11px] sm:tracking-[0.22em]">
            PM decision · why an MCP, not a script
          </p>
          <p className="mt-2 text-[13px] leading-snug text-white/80">
            The mapping context lives where the agent is. Every subsequent question, like "does
            this source field already have a mapping?", becomes a tool call, not a rediscovery.
            That framing came out of discovery, not code.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-[11px] sm:tracking-[0.22em]">
            What it accelerates
          </p>
          <ul className="mt-2 space-y-1 text-[12.5px] text-white/80">
            <li>· Field discovery + duplicate detection</li>
            <li>· MISMO path lookup</li>
            <li>· Transform authoring (JS + JSONPath)</li>
            <li>· End-to-end record validation</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-[11px] sm:tracking-[0.22em]">
            Roadmap
          </p>
          <ul className="mt-2 space-y-1 text-[12.5px] text-white/80">
            <li>· LOS-side schema auto-refresh</li>
            <li>· Confidence-weighted diff review</li>
            <li>· Multi-standard target (MISMO, ULDD)</li>
            <li>· Continuous validation in CI</li>
          </ul>
        </motion.div>
      </section>
    </SubPageShell>
  );
}
