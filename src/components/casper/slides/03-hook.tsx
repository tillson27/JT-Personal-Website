import { motion } from "framer-motion";
import { AlertTriangle, Shirt, Trophy } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

function EventCard({
  event,
  location,
  headline,
  detail,
  delay,
}: {
  event: string;
  location: string;
  headline: string;
  detail: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-1 overflow-hidden rounded-2xl border border-purple-400/25 bg-gradient-to-br from-white/[0.04] to-purple-500/[0.06] p-7"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="relative flex items-center gap-2.5">
        <Trophy className="h-5 w-5 text-purple-300" aria-hidden />
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300">
          {event}
        </p>
      </div>
      <p className="mt-1 text-[13px] text-white/60">{location}</p>
      <h3 className="mt-5 text-[26px] font-semibold leading-tight text-white">
        {headline}
      </h3>
      <p className="mt-4 text-[14px] leading-relaxed text-white/70">{detail}</p>
      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-300">
        <AlertTriangle className="h-3 w-3" aria-hidden />
        Nike stockout
      </div>
    </motion.div>
  );
}

export const hookSlide: Slide = {
  id: "hook",
  title: "The hook: apparel supply chains are failing",
  section: "discovery",
  render: () => (
    <SlideShell eyebrow="The hook · Apparel supply chains">
      <Stagger gap={0.1}>
        <FadeUp>
          <h2 className="text-[46px] font-semibold leading-[1.05] tracking-tight text-white">
            2026: two global events,{" "}
            <GradientText>two Nike stockouts,</GradientText>
            <br />
            one root cause.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-3 max-w-3xl text-[15px] text-white/60">
            Apparel supply chains are failing in public right now, and the
            headlines are only the tip of the iceberg.
          </p>
        </FadeUp>

        <div className="mt-8 flex flex-1 gap-6">
          <EventCard
            event="FIFA World Cup 2026"
            location="North America · June 2026"
            headline="USMNT jerseys sold out at every major retailer."
            detail="Four years of lead time. Retailers say Nike repeatedly ignored requests to produce more. Fans stood at empty racks the week of kickoff."
            delay={0.35}
          />
          <div className="my-auto flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-400/40 bg-purple-500/15 text-purple-200"
            >
              <Shirt className="h-5 w-5" aria-hidden />
            </motion.div>
            <div className="mt-3 rotate-90 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
              vs.
            </div>
          </div>
          <EventCard
            event="Milan-Cortina Winter Olympics"
            location="Italy · February 2026"
            headline="Bet on Canada gold. Underproduced Team USA."
            detail="USA took dual golds. Nike caught flat-footed. Podium-moment demand went unmet across North America, again."
            delay={0.5}
          />
        </div>

        <FadeUp>
          <div className="mt-6 rounded-2xl border border-purple-400/40 bg-gradient-to-r from-purple-500/15 via-fuchsia-500/10 to-purple-500/15 px-6 py-4">
            <p className="text-[15px] leading-snug text-white">
              <span className="font-semibold text-purple-200">Both are the same failure:</span>{" "}
              static, human-driven inventory decisions that cannot react to real demand signals.
            </p>
          </div>
        </FadeUp>
      </Stagger>
    </SlideShell>
  ),
};
