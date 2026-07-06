import type { Slide } from "../_shell";
import { coverSlide } from "./01-cover";
import { introSlide } from "./02-intro";
import { statsSlide } from "./04-stats";
import { currentStateSlide } from "./05-current-state";
import { frictionSlide } from "./06-friction";
import { aiSolutionSlide } from "./07-ai-solution";
import { howItWorksSlide } from "./08b-how-it-works";
import { proofSlide } from "./08c-proof";
import { prdSlide } from "./08-prd";
import { metricsSlide } from "./09-metrics";
import { aiEvalSlide } from "./10-ai-eval";
import { ticketsSlide } from "./11-tickets";
import { wireframeSlide } from "./12-wireframe";
import { risksSlide } from "./13-risks";
import { gettingStartedSlide } from "./13b-getting-started";
import { closeSlide } from "./14-close";

export const slides: ReadonlyArray<Slide> = [
  coverSlide,
  introSlide,
  statsSlide,
  currentStateSlide,
  frictionSlide,
  aiSolutionSlide,
  howItWorksSlide,
  prdSlide,
  risksSlide,
  metricsSlide,
  aiEvalSlide,
  ticketsSlide,
  wireframeSlide,
  gettingStartedSlide,
  closeSlide,
  proofSlide,
];
