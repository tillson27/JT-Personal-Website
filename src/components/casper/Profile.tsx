import { motion } from "framer-motion";
import {
  Briefcase,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Presentation,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import SubPageShell from "./SubPageShell";
import centralPark from "@/assets/casper/central-park.jpeg";
import killarney from "@/assets/casper/killarney.jpg";
import gradMom from "@/assets/casper/grad-mom.jpg";
import summit from "@/assets/casper/summit.jpeg";

const PHOTOS: ReadonlyArray<{ src: string; alt: string }> = [
  { src: centralPark, alt: "Josh in New York City" },
  { src: killarney, alt: "Josh in Killarney, Ontario" },
  { src: gradMom, alt: "Josh at UBC graduation" },
  { src: summit, alt: "Josh at a Rockies summit" },
];

const RECENT_ROLES: ReadonlyArray<{
  period: string;
  role: string;
  org: string;
  detail: string;
  now?: boolean;
}> = [
  {
    period: "2026 → now",
    role: "Founder",
    org: "emlyai",
    detail:
      "AI voice receptionist platform serving 50+ businesses across real estate, home services, and healthcare.",
    now: true,
  },
  {
    period: "2025 → now",
    role: "Product Manager",
    org: "Caylent",
    detail:
      "Leading an integration platform for a $100B+ mortgage servicer commercializing their loan-servicing software into a multi-tenant SaaS product.",
    now: true,
  },
  {
    period: "2024 – 25",
    role: "Technology Strategy Consultant",
    org: "Accenture",
    detail:
      "Tech-strategy engagements for Fortune 500 clients across retail, mining, and energy: global system architectures and roadmaps.",
  },
  {
    period: "2023 – 24",
    role: "Senior Systems Analyst",
    org: "Fraser Health",
    detail:
      "Digital transformation for a major Canadian health authority: application rationalization across AWS and Azure.",
  },
  {
    period: "2022 – 23",
    role: "Technical Specialist",
    org: "Microsoft",
    detail:
      "Helped enterprise customers adopt cloud identity and endpoint security solutions.",
  },
];

export default function Profile() {
  return (
    <SubPageShell eyebrow="Meet Josh · The longer version" chip="Bonus track">
      {/* Hero — balanced 2 cols */}
      <section className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300/80">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Product Manager · AI-first builder
          </div>
          <h1 className="mt-3 text-[52px] font-semibold leading-[1] tracking-tight text-white sm:text-[64px]">
            Josh Tillson
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-snug text-white/70">
            I sit at the intersection of business and technology, building AI products and helping
            large clients rationalize enterprise software while designing what comes next.
          </p>

          <div className="mt-5 grid grid-cols-3 gap-2.5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                <Briefcase className="h-3 w-3" aria-hidden /> Now
              </div>
              <p className="mt-1 text-[12.5px] font-semibold text-white">
                Product Manager @ Caylent
              </p>
              <p className="mt-0.5 text-[10.5px] text-white/50">
                Founder @ emlyai on the side
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                <GraduationCap className="h-3 w-3" aria-hidden /> Education
              </div>
              <p className="mt-1 text-[12.5px] font-semibold text-white">CS + Business</p>
              <p className="mt-0.5 text-[10.5px] text-white/50">UBC · Vancouver</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                <MapPin className="h-3 w-3" aria-hidden /> Base
              </div>
              <p className="mt-1 text-[12.5px] font-semibold text-white">Calgary, AB</p>
              <p className="mt-0.5 text-[10.5px] text-white/50">Sudbury-born</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px]">
            <a
              href="mailto:tillson27@gmail.com"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/85 transition hover:border-purple-400/40 hover:bg-purple-500/10"
            >
              <Mail className="h-3.5 w-3.5 text-purple-300" aria-hidden /> tillson27@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/joshtillson/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/85 transition hover:border-purple-400/40 hover:bg-purple-500/10"
            >
              <Linkedin className="h-3.5 w-3.5 text-purple-300" aria-hidden /> LinkedIn
            </a>
            <a
              href="https://github.com/tillson27"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/85 transition hover:border-purple-400/40 hover:bg-purple-500/10"
            >
              <Github className="h-3.5 w-3.5 text-purple-300" aria-hidden /> GitHub
            </a>
          </div>

          {/* Style bullets — the "thriving at intersection" content */}
          <div className="mt-6 rounded-2xl border border-purple-400/25 bg-gradient-to-br from-purple-500/10 to-transparent p-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-200">
              What I bring
            </p>
            <ul className="space-y-1.5 text-[12.5px] leading-snug text-white/85">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>Thrives at the intersection of technology and business strategy</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>
                  Experience across tech strategy, product management, software development, and
                  cybersecurity
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>
                  Currently partnering with a major mortgage-servicing client to commercialize an
                  internal platform, owning the data layer between external customers and the
                  application supporting their commercialized product
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-purple-300" />
                <span>
                  Also acting in a forward-deployed capacity, enabling new AI practices across the
                  organization through both tooling and knowledge sharing with product peers
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Right — compact photo grid, matches left column height */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 grid-rows-2 gap-3"
        >
          {PHOTOS.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
              className="relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-purple-400/20 shadow-[0_18px_50px_-18px_rgba(147,51,234,0.45)]"
            >
              <img src={p.src} alt={p.alt} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
            </motion.figure>
          ))}
        </motion.div>
      </section>

      {/* Experience + supporting cards — 2 cols so no full-width scroll gap */}
      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Recent experience timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="h-px w-8 bg-purple-300/60" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300/80">
              Recent experience
            </p>
          </div>
          <div className="relative pl-6">
            <div
              aria-hidden
              className="absolute bottom-3 left-1.5 top-2 w-px bg-gradient-to-b from-purple-400/60 via-purple-400/25 to-transparent"
            />
            <div className="space-y-4">
              {RECENT_ROLES.map((r, i) => (
                <motion.div
                  key={`${r.role}-${r.org}`}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                  className="relative grid grid-cols-[130px_1fr] gap-5"
                >
                  <span
                    className={
                      r.now
                        ? "absolute -left-[19px] top-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-400 shadow-[0_0_14px_rgba(217,70,239,0.8)]"
                        : "absolute -left-[17px] top-2 h-1.5 w-1.5 rounded-full bg-white/35"
                    }
                  />
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/45">
                    {r.period}
                  </p>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="text-[14px] font-semibold text-white">{r.role}</h3>
                      <p className="text-[12.5px] text-purple-200/80">· {r.org}</p>
                      {r.now ? (
                        <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/15 px-1.5 py-[1px] text-[8.5px] font-semibold uppercase tracking-[0.2em] text-fuchsia-200">
                          Now
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-white/60">
                      {r.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Supporting cards stacked in right col */}
        <div className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/15 to-transparent p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-purple-200">
              How I work
            </p>
            <p className="mt-2 text-[12.5px] leading-snug text-white/80">
              Fast to ideas, faster to prototypes. PRD → wireframes → scrappy build to prove the
              thing before we scale. AI is the accelerant, not the theme.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
              What I've been shipping
            </p>
            <ul className="mt-2 space-y-0.5 text-[12px] text-white/80">
              <li>· AI voice receptionists (emlyai)</li>
              <li>· Enterprise arch reviews at retail + energy</li>
              <li>· Prompt, a package manager for AI skills</li>
              <li>· A data-model mapping MCP for standards</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
              Off the clock
            </p>
            <ul className="mt-2 space-y-0.5 text-[12px] text-white/80">
              <li>· Favourite season is winter</li>
              <li>· Irrationally afraid of birds (but not bears)</li>
              <li>· Podcasts + audiobooks, ask me for a rec</li>
              <li>· Running, XC skiing, proud plant dad</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/15 via-fuchsia-500/10 to-purple-500/15 p-5 sm:flex-row sm:items-center"
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-200">
            The main event
          </p>
          <p className="mt-1 text-[16px] font-semibold text-white">
            Ready when you are. The Casper case is a click away.
          </p>
        </div>
        <Link
          to="/casper/deck"
          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(168,85,247,0.8)] transition hover:from-purple-400 hover:to-fuchsia-400"
        >
          <Presentation className="h-4 w-4" aria-hidden /> Open the deck
        </Link>
      </motion.section>
    </SubPageShell>
  );
}
