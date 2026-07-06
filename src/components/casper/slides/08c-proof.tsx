import { motion } from "framer-motion";
import {
  Building2,
  CheckCircle2,
  Package,
  Recycle,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell, SourceLine } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

type Stat = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const STATS: ReadonlyArray<Stat> = [
  {
    value: "10-30%",
    label: "Recovery lift vs. traditional liquidation",
    icon: TrendingUp,
  },
  {
    value: "100M+",
    label: "Return items routed by their engine",
    icon: Package,
  },
  {
    value: "3×",
    label: "Faster receiving on returns",
    icon: Sparkles,
  },
  {
    value: "95%",
    label: "Of returns kept out of landfill",
    icon: Recycle,
  },
];

const CUSTOMERS: ReadonlyArray<string> = [
  "IKEA",
  "Best Buy",
  "Staples",
  "GameStop",
  "American Eagle",
];

const PROVES: ReadonlyArray<string> = [
  "AI-driven dispositioning delivers material recovery lift over traditional routing — repeatably, across categories.",
  "A single case study reported a 150% net-recovery increase in year two, with 91% of returns resold via recommerce rather than liquidated.",
  "The economics work at Fortune-500 scale: IKEA, Best Buy, Staples all run production volume through it.",
];

const DIFFERS: ReadonlyArray<{ title: string; body: string }> = [
  {
    title: "In-flow, not outsourced",
    body: "Optoro is a service the retailer ships to. Ours runs at the worker's inspection screen — the retailer keeps the item, the margin, and the channel relationship.",
  },
  {
    title: "Explained, not routed",
    body: "The worker sees a reason with the call ('outlet demand up 18%, refurb is expensive'), not a black-box routing decision. Trust compounds.",
  },
  {
    title: "Every override trains it",
    body: "The tightest feedback loop in the reverse-logistics stack: each override is a labelled disagreement, feeding the next version within days.",
  },
];

export const proofSlide: Slide = {
  id: "proof",
  title: "Appendix · Industry precedent · Optoro",
  section: "appendix",
  render: () => (
    <SlideShell eyebrow="Proof · The recovery-lift math is already working elsewhere">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            <GradientText>Optoro</GradientText> already runs this playbook — proof the recovery-lift math holds.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[13px] leading-snug text-white/65">
            For reference: the model behind this proposal is not speculative. Optoro
            has been operating AI-driven returns disposition at enterprise scale for
            years. The question is not{" "}
            <span className="italic">does this work</span>; it is{" "}
            <span className="italic">where do we run it, and how do we go further.</span>
          </p>
        </FadeUp>

        {/* Stat strip */}
        <div className="mt-4 grid grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-purple-400/30 bg-gradient-to-b from-purple-500/[0.12] to-white/[0.02] p-3"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/25 text-purple-200">
                  <s.icon className="h-3.5 w-3.5" aria-hidden />
                </span>
              </div>
              <p className="font-mono text-[26px] font-semibold leading-none text-white">
                {s.value}
              </p>
              <p className="mt-1.5 text-[10.5px] leading-snug text-white/60">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Customers strip */}
        <FadeUp>
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-2.5">
            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              In production with
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {CUSTOMERS.map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[11px] font-semibold text-white/85"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Proves vs. Differs */}
        <div className="mt-3 grid flex-1 grid-cols-2 gap-3">
          <FadeUp className="min-h-0">
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                What Optoro proves
              </p>
              <ul className="space-y-2">
                {PROVES.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.75 + i * 0.08, duration: 0.4 }}
                    className="flex gap-2 text-[11.5px] leading-snug text-white/80"
                  >
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-purple-300" aria-hidden />
                    <span>{p}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeUp>

          <FadeUp className="min-h-0">
            <div className="flex h-full flex-col rounded-2xl border border-fuchsia-400/40 bg-gradient-to-br from-fuchsia-500/15 to-purple-500/10 p-4">
              <p className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-fuchsia-200">
                Where we go further
              </p>
              <ul className="space-y-2">
                {DIFFERS.map((d, i) => (
                  <motion.li
                    key={d.title}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.95 + i * 0.08, duration: 0.4 }}
                    className="text-[11.5px] leading-snug text-white/85"
                  >
                    <p className="font-semibold text-white">{d.title}</p>
                    <p className="text-white/70">{d.body}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>

        <SourceLine>
          Optoro Impact Report 2023; Optoro customer stories (optoro.com);
          case-studies.ai retail returns optimization write-up. Metrics reflect
          Optoro's public claims, not audited third-party figures.
        </SourceLine>
      </Stagger>
    </SlideShell>
  ),
};
