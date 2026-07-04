import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import type { Slide } from "../_shell";
import { FadeUp, Stagger } from "./_helpers";
import centralPark from "@/assets/casper/central-park.jpeg";
import killarney from "@/assets/casper/killarney.jpg";
import gradMom from "@/assets/casper/grad-mom.jpg";
import summit from "@/assets/casper/summit.jpeg";

const INTRO_BULLETS: ReadonlyArray<string> = [
  "Thrives at the intersection of technology and business strategy",
  "Experience across tech strategy, product management, software development, and cybersecurity",
  "Currently leading the integration platform for a $100B+ mortgage servicer commercializing their loan-servicing software into a multi-tenant SaaS product",
  "Prior work with major retail and energy clients rationalizing enterprise software and designing future-state architecture",
];

const RECENT_ROLES: ReadonlyArray<{
  period: string;
  role: string;
  org: string;
  now?: boolean;
}> = [
  { period: "2026 → now", role: "Founder", org: "emlyai", now: true },
  { period: "2025 → now", role: "Product Manager", org: "Caylent", now: true },
  { period: "2024 – 25", role: "Tech Strategy Consultant", org: "Accenture" },
  { period: "2023 – 24", role: "Senior Systems Analyst", org: "Fraser Health" },
  { period: "2022 – 23", role: "Technical Program Manager", org: "Microsoft" },
  { period: "2021 – 22", role: "Tech Strategy Consultant", org: "KPMG" },
  { period: "2021", role: "Product Manager", org: "RBC" },
  { period: "2016 – 20", role: "Founder", org: "Unbreakable Run" },
];

const FUN_FACTS: ReadonlyArray<string> = [
  "Favourite season is winter",
  "Irrationally afraid of birds (but not bears)",
  "Big fan of podcasts + audiobooks, ask me for a rec",
  "Outside of work: running, XC skiing, and being a proud plant dad",
];

const CURRENT_FOCUS: ReadonlyArray<{ label: string; value: string }> = [
  { label: "Currently shipping", value: "The integration platform for a $100B+ mortgage servicer at Caylent" },
  { label: "Currently building", value: "emlyai, an AI voice receptionist for real estate, home services, and healthcare" },
  { label: "Currently learning", value: "How the money actually adds up on returned inventory" },
];

function PhotoTile({
  src,
  alt,
  delay,
  tilt,
}: {
  src: string;
  alt: string;
  delay: number;
  tilt: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, rotate: tilt * 2, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-xl border border-purple-400/25 shadow-[0_14px_40px_-14px_rgba(147,51,234,0.5)]"
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <span className="h-px w-5 bg-purple-300/60" />
      <p className="text-[9.5px] font-semibold uppercase tracking-[0.28em] text-purple-300/80">
        {children}
      </p>
    </div>
  );
}

export const introSlide: Slide = {
  id: "intro",
  title: "About Josh",
  section: "intro",
  render: () => (
    <div
      className="relative flex h-full w-full flex-col overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(1200px 600px at 100% 0%, rgba(168,85,247,0.20), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(217,70,239,0.14), transparent 60%), linear-gradient(180deg, #0d0817 0%, #05030b 100%)",
      }}
    >
      {/* Top strip: title + meta */}
      <div className="relative px-12 pb-2 pt-6">
        <Stagger gap={0.08}>
          <FadeUp>
            <div className="flex items-center gap-2">
              <span className="h-px w-8 bg-purple-300/60" />
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.32em] text-purple-200">
                But first, hi, I'm Josh
              </p>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="mt-2 flex items-baseline gap-3">
              <h1 className="text-[52px] font-semibold leading-[0.95] tracking-[-0.03em] text-white">
                Josh Tillson
              </h1>
              <span className="text-[15px] font-medium text-purple-200/90">
                Product Manager · AI-first builder
              </span>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-white/55">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-purple-300/80" aria-hidden />
                Calgary, AB
              </span>
              <span className="h-3 w-px bg-white/15" />
              <span>Computer Science + Business · UBC</span>
              <span className="h-3 w-px bg-white/15" />
              <span>Sudbury-born</span>
            </div>
          </FadeUp>
        </Stagger>
      </div>

      {/* Body: 3 columns */}
      <div className="relative grid flex-1 grid-cols-[1.2fr_0.9fr_0.9fr] gap-4 px-12 pb-6 pt-2">
        {/* Column 1: Intro + Fun facts + Currently */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="flex flex-col gap-2.5"
        >
          <div className="flex-1 rounded-2xl border border-purple-400/25 bg-gradient-to-br from-purple-500/10 to-transparent p-3.5">
            <SectionLabel>Intro</SectionLabel>
            <ul className="space-y-2">
              {INTRO_BULLETS.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
                  className="flex gap-2 text-[12.5px] leading-snug text-white/85"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-300" />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex-1 rounded-2xl border border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-500/10 to-transparent p-3.5">
            <SectionLabel>Fun facts</SectionLabel>
            <ul className="space-y-2">
              {FUN_FACTS.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.55 + i * 0.06 }}
                  className="flex gap-2 text-[12.5px] leading-snug text-white/85"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-fuchsia-400" />
                  <span>{f}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
            <SectionLabel>Currently</SectionLabel>
            <div className="space-y-2">
              {CURRENT_FOCUS.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.75 + i * 0.06 }}
                  className="flex gap-2 text-[11.5px] leading-snug"
                >
                  <span className="w-[96px] flex-shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-purple-300/70">
                    {c.label}
                  </span>
                  <span className="text-white/85">{c.value}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Column 2: Recent experience */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="flex flex-col pl-6"
        >
          <SectionLabel>Recent experience</SectionLabel>
          <div className="relative flex-1 pl-4">
            <div
              aria-hidden
              className="absolute bottom-1 left-1 top-1 w-px bg-gradient-to-b from-purple-400/60 via-purple-400/25 to-transparent"
            />
            <div className="flex flex-col gap-5">
              {RECENT_ROLES.map((r, i) => (
                <motion.div
                  key={`${r.role}-${r.org}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.06 }}
                  className="relative"
                >
                  <span
                    className={
                      r.now
                        ? "absolute -left-[14px] top-2 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.7)]"
                        : "absolute -left-[12px] top-2.5 h-1.5 w-1.5 rounded-full bg-white/30"
                    }
                  />
                  <div className="flex flex-wrap items-baseline gap-1.5">
                    <p className="text-[14px] font-semibold text-white">{r.role}</p>
                    <p className="text-[13px] text-purple-200/85">· {r.org}</p>
                    {r.now ? (
                      <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/15 px-1.5 py-[1px] text-[9px] font-semibold uppercase tracking-[0.18em] text-fuchsia-200">
                        Now
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">
                    {r.period}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Column 3: Photo grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="relative flex flex-col"
        >
          <div
            aria-hidden
            className="absolute -right-8 top-6 h-52 w-52 rounded-full bg-purple-500/20 blur-3xl"
          />
          <div className="relative grid flex-1 grid-cols-2 grid-rows-2 gap-2.5">
            <PhotoTile src={centralPark} alt="Central Park" delay={0.45} tilt={-2} />
            <PhotoTile src={killarney} alt="Killarney" delay={0.52} tilt={2} />
            <PhotoTile src={gradMom} alt="UBC Grad" delay={0.59} tilt={-1.5} />
            <PhotoTile src={summit} alt="Mist Mountain summit" delay={0.66} tilt={1.5} />
          </div>
        </motion.div>
      </div>
    </div>
  ),
};
