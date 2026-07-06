import { motion } from "framer-motion";
import { AlertTriangle, HelpCircle } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell } from "../_shell";
import { FadeUp, GradientText, Stagger } from "./_helpers";

type Risk = {
  id: string;
  headline: string;
  detail: string;
  mitigation: string;
};

const RISKS: ReadonlyArray<Risk> = [
  {
    id: "R1",
    headline: "Data may not be there.",
    detail:
      "Live channel prices are the highest-value input and the hardest to guarantee.",
    mitigation: "Fall back to last-known + confidence penalty; flag stale bundles.",
  },
  {
    id: "R2",
    headline: "Workers have to trust it.",
    detail:
      "Trust is earned by knowing when to say \"ask a person\" and explaining every call.",
    mitigation: "Confidence-gated UI, plain-English reasons, override always in one tap.",
  },
  {
    id: "R3",
    headline: "New items lack history.",
    detail:
      "Cold-start SKUs have no signal for recovered $ predictions.",
    mitigation: "Category-level priors + human review queue until history builds.",
  },
  {
    id: "R4",
    headline: "Integration is real work.",
    detail:
      "Real-time reads on warehouse + inventory systems are hard. Wrong first partner slows launch.",
    mitigation: "Pick pilot on integration readiness first, volume second.",
  },
];

type Question = {
  id: string;
  text: string;
};

const QUESTIONS: ReadonlyArray<Question> = [
  {
    id: "Q1",
    text: "How do we price each channel accurately enough for the model to trust and learn from?",
  },
  {
    id: "Q2",
    text: "Unusual items: separate process, or safe default recommendation?",
  },
  {
    id: "Q3",
    text: "Photo-based condition grading in v1, or wait for v2?",
  },
  {
    id: "Q4",
    text: "At what override rate do we call a category stale and retrain?",
  },
];

export const risksSlide: Slide = {
  id: "risks",
  title: "PRD · Key risks and open questions",
  section: "prd",
  render: () => (
    <SlideShell eyebrow="PRD · What we would validate first">
      <Stagger gap={0.08} fill>
        <FadeUp>
          <h2 className="text-[36px] font-semibold leading-[1.1] tracking-tight text-white">
            The <GradientText>known unknowns</GradientText> — and how we would resolve them.
          </h2>
        </FadeUp>

        <FadeUp>
          <p className="mt-2 max-w-4xl text-[13px] text-white/60">
            Every plan has assumptions. These are the four risks that could sink v1 and
            the four questions discovery has to answer before we commit. The four-week
            path to resolve them is on the next slide.
          </p>
        </FadeUp>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] gap-4">
          {/* Risks */}
          <FadeUp className="min-h-0">
            <div className="flex h-full flex-col rounded-2xl border border-red-400/30 bg-red-500/[0.05] p-5">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-300" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-red-300">
                  Key risks
                </p>
              </div>
              <ul className="space-y-3">
                {RISKS.map((r, i) => (
                  <motion.li
                    key={r.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                    className="flex gap-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-red-500/25 text-[10px] font-semibold text-red-200">
                      {r.id}
                    </span>
                    <div className="text-[12px] leading-snug text-white/85">
                      <span className="font-semibold text-white">{r.headline}</span>{" "}
                      <span className="text-white/70">{r.detail}</span>
                      <p className="mt-0.5 text-[11px] text-red-200/80">
                        <span className="font-semibold uppercase tracking-[0.14em] text-red-300/80">
                          Mitigation ·
                        </span>{" "}
                        {r.mitigation}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeUp>

          {/* Open Questions */}
          <FadeUp className="min-h-0">
            <div className="flex h-full flex-col rounded-2xl border border-purple-400/30 bg-purple-500/[0.05] p-5">
              <div className="mb-3 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-purple-300" aria-hidden />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300">
                  Open questions (discovery answers these)
                </p>
              </div>
              <ul className="space-y-3">
                {QUESTIONS.map((q, i) => (
                  <motion.li
                    key={q.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.55 + i * 0.08 }}
                    className="flex gap-3"
                  >
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/25 text-[10px] font-semibold text-purple-200">
                      {q.id}
                    </span>
                    <p className="text-[12.5px] leading-snug text-white/85">{q.text}</p>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto pt-4 text-[11px] leading-snug text-purple-200/75">
                Week one of any real engagement is a discovery sprint — see the
                four-week plan on slide 14.
              </div>
            </div>
          </FadeUp>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
