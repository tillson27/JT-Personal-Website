export type SessionKind = "lift" | "run" | "erg" | "hyrox" | "recovery" | "rest";

export interface Exercise {
  name: string;
  sets: string;
  notes?: string;
}

export interface Finisher {
  label: string;
  exercises: Exercise[];
  notes?: string;
}

export interface Session {
  kind: SessionKind;
  title: string;
  duration?: string;
  distance?: string;
  zone?: string;
  rpe?: string;
  intervals?: string;
  exercises?: Exercise[];
  finisher?: Finisher;
  notes?: string;
}

export interface Day {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  date: string;
  focus: string;
  am?: Session;
  pm?: Session;
}

export interface Week {
  number: number;
  dateRange: string;
  mileage: string;
  focus: string;
  notes: string;
  days: Day[];
}

/* -------------------------------------------------------------------------- */
/* Reference paces & zones                                                    */
/* -------------------------------------------------------------------------- */

export const paceReference = {
  easyZ2: "5:15 – 5:40 /km",
  steady: "4:50 – 5:00 /km",
  threshold: "4:15 – 4:30 /km",
  vo2: "3:50 – 4:05 /km",
  hyroxRunGoal: "≤ 4:15 /km fresh · ≤ 4:30 /km compromised",
};

export const goals = {
  hyrox: "Sub-60:00 Pro (early-to-mid December)",
  half: "1:18 half marathon",
  block: "8-week base + engine build (Aug 4 → Sep 28). Ramps to a 60 km peak in Week 7. Sharpening block follows.",
};

/* -------------------------------------------------------------------------- */
/* Core / accessory blocks                                                    */
/* -------------------------------------------------------------------------- */

const CORE_A: Exercise[] = [
  { name: "Hollow hold", sets: "3 × 30s" },
  { name: "Pallof press", sets: "3 × 10 / side" },
];

const CORE_B: Exercise[] = [
  { name: "Dead bug", sets: "3 × 10 / side" },
  { name: "Side plank", sets: "3 × 30s / side" },
];

const CORE_C: Exercise[] = [
  { name: "Bird dog", sets: "3 × 8 / side" },
  { name: "Weighted plank", sets: "3 × 45s" },
];

const CORE_D: Exercise[] = [
  { name: "Hanging knee raise", sets: "3 × 10" },
  { name: "Cable woodchop", sets: "3 × 10 / side" },
];

const CORE_E: Exercise[] = [
  { name: "Ab wheel rollout", sets: "3 × 8", notes: "Slow eccentric — protect low back" },
  { name: "L-sit hold (bar or parallettes)", sets: "3 × 20s" },
];

/* -------------------------------------------------------------------------- */
/* Hyrox finishers — 4–8 min blocks appended to every lift                    */
/* -------------------------------------------------------------------------- */

const FIN_PUSH_A: Finisher = {
  label: "SkiErg engine",
  exercises: [
    { name: "SkiErg", sets: "3 × 400m @ RPE 8", notes: "60s rest. Race the last one." },
  ],
  notes: "Station #1 on already-taxed shoulders and lats — the highest-transfer finisher for pressing days.",
};

const FIN_PUSH_B: Finisher = {
  label: "Wall ball ladder",
  exercises: [
    { name: "Wall balls (9kg)", sets: "3 × 20", notes: "60s rest. Full ROM every rep — no cheating depth." },
  ],
  notes: "Squat-throw rhythm for station #5 — most people leak 30–60s here on race day.",
};

const FIN_PULL_A: Finisher = {
  label: "Sled push burst",
  exercises: [
    { name: "Sled push", sets: "4 × 20m (moderate-heavy)", notes: "Walk-back rest (~60s)." },
  ],
  notes: "Total-body power on a taxed posterior chain — direct carryover to station #3.",
};

const FIN_PULL_B: Finisher = {
  label: "Farmer carry + row",
  exercises: [
    { name: "Farmer carry (2 × 24kg)", sets: "3 × 40m", notes: "45s rest. Tall posture, don't lean." },
    { name: "Row", sets: "1 × 500m easy", notes: "Cool-down piece — station #4 pattern." },
  ],
  notes: "Grip + posture endurance for the late-race farmer carry when your hands are gone.",
};

const FIN_LEGS: Finisher = {
  label: "Sandbag lunges",
  exercises: [
    { name: "Sandbag lunge (20kg)", sets: "3 × 20m", notes: "Brace hard on every step. 60s rest." },
  ],
  notes: "Station #8 in a controlled setting — the most brutal transfer after front squats.",
};

const FIN_DELOAD: Finisher = {
  label: "Light SkiErg",
  exercises: [
    { name: "SkiErg", sets: "2 × 300m @ RPE 6", notes: "Movement quality only." },
  ],
  notes: "Keep the pattern alive without loading the deload week.",
};

/* -------------------------------------------------------------------------- */
/* Lift day blocks                                                            */
/* -------------------------------------------------------------------------- */

const PUSH_A: Exercise[] = [
  { name: "Bench press", sets: "4 × 6 @ RPE 7" },
  { name: "Overhead press", sets: "3 × 8" },
  { name: "Incline DB press", sets: "3 × 10" },
  { name: "Lateral raise", sets: "3 × 12" },
  { name: "Tricep pressdown", sets: "3 × 12" },
  ...CORE_A,
];

const PUSH_B: Exercise[] = [
  { name: "Landmine press", sets: "3 × 10 / side", notes: "Shoulder-friendly, sport-carryover" },
  { name: "Weighted dip (or DB bench)", sets: "3 × 8" },
  { name: "Cable fly", sets: "3 × 12" },
  { name: "DB skullcrusher", sets: "3 × 10" },
  { name: "Rear delt fly", sets: "3 × 15" },
  ...CORE_D,
];

const PULL_A: Exercise[] = [
  { name: "Trap bar RDL", sets: "4 × 6 @ RPE 7", notes: "Trap bar > barbell for your back. Wk 1–2 stay conservative." },
  { name: "Weighted pull-up", sets: "4 × 6" },
  { name: "Chest-supported row", sets: "3 × 10" },
  { name: "Face pull", sets: "3 × 15" },
  { name: "Barbell curl", sets: "3 × 10" },
  ...CORE_C,
];

const PULL_B: Exercise[] = [
  { name: "1-arm DB row", sets: "3 × 10 / side" },
  { name: "Lat pulldown", sets: "3 × 12" },
  { name: "Cable row (neutral grip)", sets: "3 × 10" },
  { name: "Hammer curl", sets: "3 × 10" },
  { name: "Rear delt cable", sets: "3 × 15" },
  ...CORE_E,
];

const LEGS: Exercise[] = [
  { name: "Front squat", sets: "4 × 5 @ RPE 7", notes: "Front > back squat given lower-back caution" },
  { name: "Bulgarian split squat", sets: "3 × 8 / leg" },
  { name: "Nordic curl (or seated leg curl)", sets: "3 × 8" },
  { name: "Standing calf raise", sets: "3 × 15" },
  { name: "Tibialis raise", sets: "2 × 20", notes: "Insurance for the shins — daily habit" },
  ...CORE_B,
];

const HYROX_STATIONS: Exercise[] = [
  { name: "SkiErg", sets: "3 × 500m", notes: "Race pace" },
  { name: "Sled push", sets: "4 × 25m", notes: "Moderate load — build up" },
  { name: "Sled pull (rope or harness)", sets: "4 × 25m" },
  { name: "Farmer carry (2 × 24kg)", sets: "4 × 50m" },
  { name: "Wall balls (9kg)", sets: "3 × 30" },
  { name: "Sandbag lunges (20kg)", sets: "3 × 20m", notes: "Brace hard on every step" },
];

const HYROX_SIM_SHORT: Exercise[] = [
  { name: "SkiErg", sets: "500m @ race pace" },
  { name: "Wall balls", sets: "30 @ race pace" },
  { name: "Sled push", sets: "25m heavy" },
  { name: "Row", sets: "500m @ race pace" },
  { name: "BBJO", sets: "20", notes: "Broad jump over — controlled landing" },
];

const DELOAD_PUSH: Exercise[] = [
  { name: "Bench press", sets: "3 × 5 @ RPE 6", notes: "Deload — leave 4 in tank" },
  { name: "DB shoulder press", sets: "3 × 8" },
  { name: "Cable fly", sets: "2 × 12" },
  { name: "Tricep pressdown", sets: "2 × 12" },
  ...CORE_A,
];

const DELOAD_PULL: Exercise[] = [
  { name: "Trap bar RDL", sets: "3 × 5 @ RPE 6" },
  { name: "Pull-up (bodyweight)", sets: "3 × 6" },
  { name: "Chest-supported row", sets: "2 × 10" },
  { name: "Face pull", sets: "2 × 15" },
  ...CORE_C,
];

const DELOAD_LEGS: Exercise[] = [
  { name: "Front squat", sets: "3 × 5 @ RPE 6" },
  { name: "Reverse lunge", sets: "2 × 8 / leg" },
  { name: "Leg curl", sets: "2 × 10" },
  { name: "Tibialis raise", sets: "2 × 20" },
  ...CORE_B,
];

/* -------------------------------------------------------------------------- */
/* Session helpers                                                            */
/* -------------------------------------------------------------------------- */

const easyRun = (km: number, notes?: string): Session => ({
  kind: "run",
  title: "Easy Z2 run",
  distance: `${km} km`,
  zone: paceReference.easyZ2,
  duration: `${Math.round(km * 5.5)} min`,
  notes: notes ?? "Nose-breathing pace. Conversational or slower — this is not where fitness is built, it's where it's absorbed.",
});

const stridesRun = (km: number, strides = 4): Session => ({
  kind: "run",
  title: `Easy Z2 + ${strides} strides`,
  distance: `${km} km`,
  zone: paceReference.easyZ2,
  duration: `${Math.round(km * 5.5)} min`,
  notes: `Easy pace, then ${strides} × 20s strides on grass or track — build to ~5k pace, full walk recovery. Wakes up leg speed without loading the shins.`,
});

const shakeoutRun = (km: number): Session => ({
  kind: "run",
  title: "Easy shakeout",
  distance: `${km} km`,
  zone: paceReference.easyZ2,
  duration: `${Math.round(km * 5.5)} min`,
  notes: "Loose and easy. Purpose is blood flow, not fitness.",
});

const recoveryCardio = (mins: number): Session => ({
  kind: "recovery",
  title: "Recovery cardio",
  duration: `${mins} min`,
  zone: "Z1 (very easy)",
  notes: "Bike, ski erg, or easy walk. Restorative, not depleting. Add 10 min mobility after.",
});

const ergIntervals = (label: string, intervals: string, notes?: string): Session => ({
  kind: "erg",
  title: label,
  duration: "40–50 min",
  intervals,
  notes: notes ?? "Engine work — pairs with the run intensity on Tue/Thu, doesn't replace it. Ski erg preferred for hyrox carryover; rotate row/bike weekly.",
});

const liftSession = (
  title: string,
  exercises: Exercise[],
  opts?: { duration?: string; finisher?: Finisher },
): Session => ({
  kind: "lift",
  title,
  duration: opts?.duration ?? "60 min",
  exercises,
  finisher: opts?.finisher,
});

const hyroxSession = (
  title: string,
  duration: string,
  exercises: Exercise[],
  notes?: string,
): Session => ({
  kind: "hyrox",
  title,
  duration,
  exercises,
  notes,
});

const longRun = (km: number, addStations = true): Session => ({
  kind: "run",
  title: `Long run + ${addStations ? "hyrox stations" : "mobility"}`,
  distance: `${km} km`,
  zone: paceReference.easyZ2,
  duration: `${Math.round(km * 5.5)} min + ${addStations ? "25–30" : "10"} min stations/mobility`,
  notes: addStations
    ? "Long run FIRST (fresh legs, aerobic focus). Fuel with 30g carbs/hr after 60 min. Take a snack + 10 min break, then hit 25–30 min of stations at moderate effort — hyrox work on tired legs."
    : "Just the long run today. Cool down + full mobility routine.",
});

/* -------------------------------------------------------------------------- */
/* Run quality helpers                                                        */
/* -------------------------------------------------------------------------- */

const tempoRun = (
  totalKm: number,
  blockKm: number,
  wuKm = 2,
  cdKm = 2,
  notes?: string,
): Session => ({
  kind: "run",
  title: "Tempo run",
  distance: `${totalKm} km`,
  intervals: `${wuKm} km WU · ${blockKm} km @ threshold · ${cdKm} km CD`,
  zone: paceReference.threshold,
  duration: `${Math.round(totalKm * 5)} min`,
  notes:
    notes ??
    "Comfortably hard — 3 words at a time. Run it on grass, dirt, or track where you can; keep the pounding down while the legs re-adapt to intensity.",
});

const kmRepeats = (
  reps: number,
  targetPace: "threshold" | "vo2" = "threshold",
  notes?: string,
): Session => {
  const workKm = reps;
  const jogKm = Math.round(0.4 * (reps - 1) * 10) / 10;
  const wuCd = 4;
  const total = Math.round(workKm + jogKm + wuCd);
  const paceLabel = targetPace === "threshold" ? paceReference.threshold : paceReference.vo2;
  const paceTarget = targetPace === "threshold" ? "~4:20/km" : "~3:55/km";
  const paceName = targetPace === "threshold" ? "threshold" : "5k pace";
  return {
    kind: "run",
    title: `${reps} × 1 km repeats`,
    distance: `~${total} km`,
    intervals: `2 km WU · ${reps} × 1000 m @ ${paceName} / 400 m jog · 2 km CD`,
    zone: paceLabel,
    duration: `${Math.round(total * 5)} min`,
    notes:
      notes ??
      `Even splits — target ${paceTarget}. Track or grass loop if you can find one. If anything sharp shows up in the shin during warm-up, abort and swap to ski erg intervals for the same time.`,
  };
};

/* -------------------------------------------------------------------------- */
/* Weeks                                                                       */
/* -------------------------------------------------------------------------- */

export const weeks: Week[] = [
  /* ------------------------------ WEEK 1 ------------------------------ */
  {
    number: 1,
    dateRange: "Aug 4 – Aug 10",
    mileage: "32 km",
    focus: "Foundation · lift + engine rotation locks in",
    notes:
      "Partial week (no Monday). Runs stay Z2 while the body remembers what daily work feels like. First hyrox finishers attached to each lift — small dose, disproportionate transfer. Thursday adds strides on grass to wake up leg speed without loading intensity.",
    days: [
      {
        day: "Mon",
        date: "Aug 3",
        focus: "Pre-block rest",
        pm: { kind: "rest", title: "Rest day (block starts Tuesday)" },
      },
      {
        day: "Tue",
        date: "Aug 4",
        focus: "AM Pull · PM Easy Z2",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: easyRun(6),
      },
      {
        day: "Wed",
        date: "Aug 5",
        focus: "AM Legs · PM Erg engine",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: ergIntervals(
          "Erg intervals (ski or row)",
          "10 min WU · 6 × 3 min @ RPE 8 / 90s easy · 10 min CD",
          "First quality piece. Ski erg preferred (hyrox carryover). Pull hard but controlled.",
        ),
      },
      {
        day: "Thu",
        date: "Aug 6",
        focus: "AM Push · PM Easy + strides",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: stridesRun(6, 4),
      },
      {
        day: "Fri",
        date: "Aug 7",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Aug 8",
        focus: "Long run + stations (anchor session)",
        am: longRun(15),
      },
      {
        day: "Sun",
        date: "Aug 9",
        focus: "Recovery",
        pm: recoveryCardio(30),
      },
    ],
  },

  /* ------------------------------ WEEK 2 ------------------------------ */
  {
    number: 2,
    dateRange: "Aug 11 – Aug 17",
    mileage: "38 km",
    focus: "Base building · first tempo on the road",
    notes:
      "First full week. Tuesday PM introduces a short tempo — 3 km continuous at threshold. Keep it on grass or track if the option exists; road is fine if not. Add ~5 kg to your main lifts vs Week 1 if RPE was ≤ 7. Hyrox finishers stay after every lift.",
    days: [
      {
        day: "Mon",
        date: "Aug 11",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(5),
      },
      {
        day: "Tue",
        date: "Aug 12",
        focus: "AM Pull · PM TEMPO (short)",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: tempoRun(
          6,
          3,
          1,
          2,
          "First tempo of the block — 3 km at ~4:20/km. Should feel controlled, not race effort. Grass, track, or dirt if you can pick it.",
        ),
      },
      {
        day: "Wed",
        date: "Aug 13",
        focus: "AM Legs · PM Erg engine",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: ergIntervals(
          "Bike intervals",
          "10 min WU · 5 × 4 min @ RPE 8 / 2 min easy · 10 min CD",
          "Longer intervals this week. Assault bike or road trainer — cadence 85+.",
        ),
      },
      {
        day: "Thu",
        date: "Aug 14",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push B", PUSH_B, { duration: "45 min", finisher: FIN_PUSH_B }),
        pm: easyRun(6),
      },
      {
        day: "Fri",
        date: "Aug 15",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(4),
      },
      {
        day: "Sat",
        date: "Aug 16",
        focus: "Long run + stations",
        am: longRun(17),
      },
      {
        day: "Sun",
        date: "Aug 17",
        focus: "Recovery",
        pm: recoveryCardio(40),
      },
    ],
  },

  /* ------------------------------ WEEK 3 ------------------------------ */
  {
    number: 3,
    dateRange: "Aug 18 – Aug 24",
    mileage: "44 km",
    focus: "Volume build · first km repeats · last week before deload",
    notes:
      "Peak of the first sub-block. Tuesday steps up to 4 × 1 km repeats at threshold — the first true 'workout' pace on foot. Do them on grass or a track if possible. Add tib raises + calf/soleus work in the evenings; this is where the extra volume is most felt.",
    days: [
      {
        day: "Mon",
        date: "Aug 18",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Aug 19",
        focus: "AM Pull · PM KM REPEATS",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: kmRepeats(
          4,
          "threshold",
          "4 × 1 km at threshold (~4:20/km) with 400 m jog rest. Even splits — this is the workout that reintroduces run intensity. Soft surface if you can, road if not.",
        ),
      },
      {
        day: "Wed",
        date: "Aug 20",
        focus: "AM Legs · PM Ski erg pyramid",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: ergIntervals(
          "Ski erg pyramid",
          "10 min WU · 200/400/600/800/600/400/200 m @ RPE 8 · equal rest · 10 min CD",
          "Ski erg specifically — maps directly to hyrox station #1. Grip and pace like race day.",
        ),
      },
      {
        day: "Thu",
        date: "Aug 21",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push B", PUSH_B, { duration: "45 min", finisher: FIN_PUSH_B }),
        pm: easyRun(6),
      },
      {
        day: "Fri",
        date: "Aug 22",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(4),
      },
      {
        day: "Sat",
        date: "Aug 23",
        focus: "Long run + stations",
        am: longRun(20),
      },
      {
        day: "Sun",
        date: "Aug 24",
        focus: "Recovery",
        pm: recoveryCardio(45),
      },
    ],
  },

  /* ------------------------------ WEEK 4 ------------------------------ */
  {
    number: 4,
    dateRange: "Aug 25 – Aug 31",
    mileage: "36 km",
    focus: "DELOAD · reset · lifts drop to RPE 6",
    notes:
      "Planned deload. Reduce all lift loads ~15% or drop to RPE 6. Finishers stay in but go light (one set). Runs stay short and easy. Purpose is to let connective tissue catch up so Weeks 5–8 can push. Don't skip the deload because you feel good — that's exactly when it does its job.",
    days: [
      {
        day: "Mon",
        date: "Aug 25",
        focus: "AM Push (deload) · PM Easy Z2",
        am: liftSession("Push (deload)", DELOAD_PUSH, { duration: "45 min", finisher: FIN_DELOAD }),
        pm: easyRun(5),
      },
      {
        day: "Tue",
        date: "Aug 26",
        focus: "AM Pull (deload) · PM Easy Z2",
        am: liftSession("Pull (deload)", DELOAD_PULL, { duration: "45 min", finisher: FIN_DELOAD }),
        pm: easyRun(5),
      },
      {
        day: "Wed",
        date: "Aug 27",
        focus: "AM Legs (deload) · PM Easy bike",
        am: liftSession("Legs (deload)", DELOAD_LEGS, { duration: "45 min", finisher: FIN_DELOAD }),
        pm: recoveryCardio(40),
      },
      {
        day: "Thu",
        date: "Aug 28",
        focus: "AM Push (deload) · PM Easy Z2",
        am: liftSession("Push (deload)", DELOAD_PUSH, { duration: "45 min", finisher: FIN_DELOAD }),
        pm: easyRun(5),
      },
      {
        day: "Fri",
        date: "Aug 29",
        focus: "Mobility + shakeout",
        am: {
          kind: "recovery",
          title: "Mobility only (no lift)",
          duration: "30 min",
          notes: "Full-body mobility flow. Extra calf/soleus/tib work. No loading.",
        },
        pm: shakeoutRun(3),
      },
      {
        day: "Sat",
        date: "Aug 30",
        focus: "Moderate long run (no stations)",
        am: longRun(18, false),
      },
      {
        day: "Sun",
        date: "Aug 31",
        focus: "Recovery",
        pm: recoveryCardio(30),
      },
    ],
  },

  /* ------------------------------ WEEK 5 ------------------------------ */
  {
    number: 5,
    dateRange: "Sep 1 – Sep 7",
    mileage: "48 km",
    focus: "Post-deload push · continuous tempo",
    notes:
      "Loads back to RPE 7. Tuesday tempo stretches to 5 km continuous at threshold — the half-marathon pace piece. Saturday long climbs to 22 km. If both quality days feel too much in the same week, keep Tuesday and downgrade Saturday's stations rather than dropping the run.",
    days: [
      {
        day: "Mon",
        date: "Sep 1",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(5),
      },
      {
        day: "Tue",
        date: "Sep 2",
        focus: "AM Pull · PM TEMPO (5k)",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: tempoRun(
          9,
          5,
          2,
          2,
          "5 km continuous at threshold (~4:20/km). Money workout for the 1:18 half — practice the patience. Grass or track ideal, road fine if not.",
        ),
      },
      {
        day: "Wed",
        date: "Sep 3",
        focus: "AM Legs · PM Cross-training",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: ergIntervals(
          "Mixed cardio",
          "45 min: 15 min bike + 15 min ski erg + 15 min row · all Z2/Z3",
          "Aerobic maintenance — recovery from Tuesday tempo. No impact.",
        ),
      },
      {
        day: "Thu",
        date: "Sep 4",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push B", PUSH_B, { duration: "45 min", finisher: FIN_PUSH_B }),
        pm: easyRun(7),
      },
      {
        day: "Fri",
        date: "Sep 5",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Sep 6",
        focus: "Long run + stations",
        am: longRun(22),
      },
      {
        day: "Sun",
        date: "Sep 7",
        focus: "Recovery",
        pm: recoveryCardio(45),
      },
    ],
  },

  /* ------------------------------ WEEK 6 ------------------------------ */
  {
    number: 6,
    dateRange: "Sep 8 – Sep 14",
    mileage: "54 km",
    focus: "VO2 800s · hyrox specificity ramps",
    notes:
      "First true VO2 session — 800s at 5k pace. This is the pace you need for hyrox running legs and negative-splitting the half. Track or flat road only. Saturday's long climbs to 25 km with 30 min of compromised stations to close.",
    days: [
      {
        day: "Mon",
        date: "Sep 8",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Sep 9",
        focus: "AM Pull · PM VO2 800s",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: {
          kind: "run",
          title: "VO2 intervals",
          distance: "10 km",
          intervals: "2 km WU · 6 × 800 m @ 5k pace / 400 m jog · 2 km CD",
          zone: paceReference.vo2,
          duration: "55 min",
          notes:
            "Target ~3:55/km on the reps. Consistent splits beat blowing out the first rep. Track or grass — hard surface only if there's no other option.",
        },
      },
      {
        day: "Wed",
        date: "Sep 10",
        focus: "AM Legs · PM Erg engine",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: ergIntervals(
          "Ski erg + row combo",
          "10 min WU · 4 × (500 m ski / 500 m row) @ RPE 8 · 2 min rest between rounds · 10 min CD",
          "Alternates two hyrox stations — teaches transitions under fatigue.",
        ),
      },
      {
        day: "Thu",
        date: "Sep 11",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push B", PUSH_B, { duration: "45 min", finisher: FIN_PUSH_B }),
        pm: easyRun(8),
      },
      {
        day: "Fri",
        date: "Sep 12",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Sep 13",
        focus: "Long run + stations",
        am: longRun(25),
      },
      {
        day: "Sun",
        date: "Sep 14",
        focus: "Recovery",
        pm: recoveryCardio(50),
      },
    ],
  },

  /* ------------------------------ WEEK 7 ------------------------------ */
  {
    number: 7,
    dateRange: "Sep 15 – Sep 21",
    mileage: "60 km",
    focus: "PEAK · 60 km · two run quality days",
    notes:
      "Biggest week of the block — 60 km. Two run quality sessions (5 × 1 km VO2 Tuesday, 2 × 4 km threshold Thursday) with Wednesday sitting fully easy between them. Sleep is non-negotiable — 8+ hrs. If either quality piece feels off in the warm-up, drop reps rather than pace.",
    days: [
      {
        day: "Mon",
        date: "Sep 15",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Sep 16",
        focus: "AM Pull · PM VO2 1k repeats",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: kmRepeats(
          5,
          "vo2",
          "5 × 1 km at 5k pace (~3:55/km), 400 m jog rest. Same pace as last week's 800s over longer reps. Feels controlled for reps 1–3, ugly on 4–5. Track only.",
        ),
      },
      {
        day: "Wed",
        date: "Sep 17",
        focus: "AM Legs · PM Easy bike",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: recoveryCardio(50),
      },
      {
        day: "Thu",
        date: "Sep 18",
        focus: "AM Push (lighter) · PM THRESHOLD 2×4k",
        am: liftSession("Push B (lighter)", PUSH_B, { duration: "40 min", finisher: FIN_PUSH_B }),
        pm: tempoRun(
          12,
          8,
          2,
          2,
          "2 × 4 km at threshold (~4:20/km), 3 min jog between. Half-marathon pace piece. Don't run rep 1 faster than rep 2.",
        ),
      },
      {
        day: "Fri",
        date: "Sep 19",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Sep 20",
        focus: "Peak long run + stations",
        am: longRun(26),
      },
      {
        day: "Sun",
        date: "Sep 21",
        focus: "Recovery",
        pm: recoveryCardio(50),
      },
    ],
  },

  /* ------------------------------ WEEK 8 ------------------------------ */
  {
    number: 8,
    dateRange: "Sep 22 – Sep 28",
    mileage: "50 km",
    focus: "Transition · hyrox SIM · fitness check",
    notes:
      "Volume backs off, intensity stays. Wednesday is a hyrox mini-sim — time it against sub-60. You finish this block healthy, sharp, and ready for the sharpening/peak block leading into December.",
    days: [
      {
        day: "Mon",
        date: "Sep 22",
        focus: "AM Push (moderate) · PM Easy Z2",
        am: liftSession("Push A (moderate)", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Sep 23",
        focus: "AM Pull · PM Extended tempo",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: tempoRun(
          12,
          6,
          2,
          4,
          "6 km continuous tempo at ~4:20/km. Longer than Week 7 — practise race-effort patience. Grass or dirt if possible.",
        ),
      },
      {
        day: "Wed",
        date: "Sep 24",
        focus: "AM Legs (lighter) · PM HYROX SIM",
        am: liftSession("Legs (moderate)", LEGS, { duration: "45 min", finisher: FIN_LEGS }),
        pm: hyroxSession(
          "Hyrox mini-sim",
          "45–55 min",
          [
            { name: "1 km run", sets: "@ race pace (~4:15/km)" },
            { name: "SkiErg", sets: "1000 m @ race pace" },
            { name: "1 km run", sets: "@ race pace" },
            { name: "Sled push", sets: "50 m (moderate load)" },
            { name: "1 km run", sets: "@ race pace" },
            { name: "Sled pull", sets: "50 m" },
            { name: "1 km run", sets: "@ race pace" },
            { name: "Burpee broad jump over", sets: "40 reps" },
            { name: "1 km run", sets: "@ race pace" },
          ],
          "Half a hyrox. Time it. This is your fitness benchmark going into the sharpening block. Aim for ~28–30 min total.",
        ),
      },
      {
        day: "Thu",
        date: "Sep 25",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push B", PUSH_B, { duration: "40 min", finisher: FIN_PUSH_B }),
        pm: easyRun(7),
      },
      {
        day: "Fri",
        date: "Sep 26",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Sep 27",
        focus: "Moderate long run",
        am: longRun(20),
      },
      {
        day: "Sun",
        date: "Sep 28",
        focus: "Recovery · block ends",
        pm: recoveryCardio(45),
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Hyrox station reference (for the Sat combined session)                     */
/* -------------------------------------------------------------------------- */

export const stationReference = {
  standard: HYROX_STATIONS,
  short: HYROX_SIM_SHORT,
};

/* -------------------------------------------------------------------------- */
/* Guardrails / principles                                                     */
/* -------------------------------------------------------------------------- */

export const principles = [
  {
    title: "Lift AM · Run PM",
    body: "Preserves running quality. Minimum 6 hrs between the two. 40g carbs + 20g protein within 30 min of the lift.",
  },
  {
    title: "Shin care (post-flare, not paranoia)",
    body: "The flare has cleared and it was a first-time event — treat it as data, not a diagnosis. Keep run intensity in the plan but front-load it on grass, track, or dirt through Week 5. Tib raises + calf/soleus daily as insurance. Only pull back to erg-only if sharp, localized pain returns during a warm-up.",
  },
  {
    title: "Hyrox finishers after every lift",
    body: "4–8 min at the end of each lift trains a station on already-fatigued muscle. Small dose, high transfer — this is what closes the gap between 'strong' and 'strong at hyrox' without adding another full session.",
  },
  {
    title: "Back protocol",
    body: "Trap bar over straight bar. Front squat over back squat. Brace hard on sandbag work. Sled push is spine-friendly — favor it over sled drags when in doubt.",
  },
  {
    title: "Recovery discipline",
    body: "8+ hrs sleep or the plan doesn't work. Sunday is truly easy — Z1 only. If Monday feels heavy, extend recovery rather than push through.",
  },
  {
    title: "Fueling on long runs",
    body: "30g carbs/hr after the first hour. Water + electrolytes always. Underfueling long runs is the fastest way to blunt this block.",
  },
  {
    title: "Deload week is not optional",
    body: "Week 4 lets connective tissue catch up to what muscles and lungs can already do. Skipping it is the fastest path to arriving at the sharpening block already fried.",
  },
];
