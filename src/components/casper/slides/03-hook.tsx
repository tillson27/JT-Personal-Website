import { motion } from "framer-motion";
import { AlertTriangle, PackageX, TrendingDown, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

type Failure = {
  icon: LucideIcon;
  event: string;
  location: string;
  headline: string;
  detail: string;
  tag: string;
  tone: "stockout" | "returns";
  source: string;
  sourceHref: string;
};

const FAILURES: ReadonlyArray<Failure> = [
  {
    icon: Trophy,
    event: "FIFA World Cup 2026",
    location: "North America · June 2026",
    headline: "USMNT jerseys sold out at every major retailer.",
    detail:
      "Four years of lead time. Retailers report Nike repeatedly declined to increase runs. Fans stood at empty racks the week of kickoff.",
    tag: "Nike stockout",
    tone: "stockout",
    source: "Front Office Sports · 2026",
    sourceHref: "https://frontofficesports.com/nike-usmnt-jersey-shortage-world-cup/",
  },
  {
    icon: Trophy,
    event: "Milan-Cortina Winter Olympics",
    location: "Italy · February 2026",
    headline: "Nike bet on Canada gold. Underproduced Team USA.",
    detail:
      "USA took two golds. Nike was caught flat-footed. Fans looking for gear in that podium moment could not find any across North America. Same pattern, second time this year.",
    tag: "Nike stockout",
    tone: "stockout",
    source: "Reuters · Retail Dive · 2026",
    sourceHref: "https://www.retaildive.com/",
  },
  {
    icon: PackageX,
    event: "ASOS · returns squeeze",
    location: "UK / EU · 2024 – 2025",
    headline: "Returns quietly wiped out the profit.",
    detail:
      "Over 30% of orders came back. ASOS added a £3.95 return fee, banned serial returners, and told investors returns were one of the top three reasons their profit was shrinking.",
    tag: "Returns pain",
    tone: "returns",
    source: "Reuters · The Guardian · 2024",
    sourceHref: "https://www.reuters.com/business/retail-consumer/asos-returns-policy-serial-returners-2024/",
  },
];

const toneStyles: Record<Failure["tone"], string> = {
  stockout:
    "border-red-400/30 bg-red-500/10 text-red-300",
  returns:
    "border-fuchsia-400/40 bg-fuchsia-500/15 text-fuchsia-200",
};

function FailureCard({ item, delay }: { item: Failure; delay: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-1 overflow-hidden rounded-2xl border border-purple-400/25 bg-gradient-to-br from-white/[0.04] to-purple-500/[0.06] p-5"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="relative flex items-center gap-2">
        <Icon className="h-4 w-4 text-purple-300" aria-hidden />
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.24em] text-purple-300">
          {item.event}
        </p>
      </div>
      <p className="mt-1 text-[12px] text-white/55">{item.location}</p>
      <h3 className="mt-4 text-[22px] font-semibold leading-[1.15] text-white">
        {item.headline}
      </h3>
      <p className="mt-3 text-[12.5px] leading-relaxed text-white/70">{item.detail}</p>
      <div className="mt-4 flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${toneStyles[item.tone]}`}
        >
          {item.tone === "stockout" ? (
            <AlertTriangle className="h-3 w-3" aria-hidden />
          ) : (
            <TrendingDown className="h-3 w-3" aria-hidden />
          )}
          {item.tag}
        </span>
        <a
          href={item.sourceHref}
          target="_blank"
          rel="noreferrer noopener"
          className="text-[9.5px] uppercase tracking-[0.18em] text-white/40 underline-offset-4 transition hover:text-purple-200 hover:underline"
        >
          {item.source}
        </a>
      </div>
    </motion.div>
  );
}

export const hookSlide: Slide = {
  id: "hook",
  title: "The hook: apparel supply chains are failing",
  section: "discovery",
  render: () => (
    <SlideShell eyebrow="The hook · Apparel supply chains, 2026">
      <Stagger gap={0.1}>
        <FadeUp>
          <h2 className="text-[42px] font-semibold leading-[1.05] tracking-tight text-white">
            Empty shelves and vanishing profit,{" "}
            <GradientText>same root cause:</GradientText>
            <br />
            big decisions made months in advance without current information.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-3 max-w-3xl text-[14px] text-white/60">
            Two Nike stockouts made the news this year. A quieter one has been running
            all year at ASOS. That quieter one is what this case is about.
          </p>
        </FadeUp>

        <div className="mt-6 flex flex-1 gap-4">
          {FAILURES.map((f, i) => (
            <FailureCard key={f.event} item={f} delay={0.35 + i * 0.12} />
          ))}
        </div>

        <FadeUp>
          <div className="mt-5 rounded-2xl border border-purple-400/40 bg-gradient-to-r from-purple-500/15 via-fuchsia-500/10 to-purple-500/15 px-6 py-3.5">
            <p className="text-[14px] leading-snug text-white">
              <span className="font-semibold text-purple-200">Common thread:</span>{" "}
              inventory calls are locked in months ahead of time, then never adjusted
              when what customers actually want changes. Stockouts get headlines. Returns
              quietly take the profit. The rest of this deck focuses on the returns half.
            </p>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
