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
  easyZ2: "5:00 – 5:20 /km",
  steady: "4:20 – 4:40 /km",
  threshold: "4:00 – 4:15 /km",
  vo2: "3:35 – 3:50 /km",
  hyroxRunGoal: "< 4:00 /km fresh · < 4:15 /km compromised",
};

export const goals = {
  hyrox: "Sub-60:00 Pro (December 18, 2026)",
  half: "1:18 half marathon",
  block: "14-week build (Sep 14 → Dec 18). TFUA aerobic base + hill sprints Wks 1–7, threshold block Wks 9–11, race sharpening + taper. 60 km peak in Wk 7.",
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
/* Hyrox finishers                                                             */
/* -------------------------------------------------------------------------- */

const FIN_PUSH_A: Finisher = {
  label: "SkiErg engine",
  exercises: [
    { name: "SkiErg", sets: "3 × 400m @ RPE 8", notes: "60s rest. Race the last one." },
  ],
  notes: "Station #1 on already-taxed shoulders and lats — highest-transfer finisher for pressing days.",
};

const FIN_PUSH_B: Finisher = {
  label: "Wall ball ladder",
  exercises: [
    { name: "Wall balls (9kg)", sets: "3 × 20", notes: "60s rest. Full ROM every rep." },
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
    { name: "Farmer carry (2 × 24kg)", sets: "3 × 40m", notes: "45s rest. Tall posture." },
    { name: "Row", sets: "1 × 500m easy", notes: "Cool-down — station #4 pattern." },
  ],
  notes: "Grip + posture endurance for late-race farmer carry when your hands are gone.",
};

const FIN_LEGS: Finisher = {
  label: "Sandbag lunges",
  exercises: [
    { name: "Sandbag lunge (20kg)", sets: "3 × 20m", notes: "Brace hard every step. 60s rest." },
  ],
  notes: "Station #8 in a controlled setting — most brutal transfer after front squats.",
};

const FIN_ROW: Finisher = {
  label: "Hyrox row",
  exercises: [
    { name: "Row (erg)", sets: "3 × 500m @ race pace", notes: "90s rest. Target sub-2:05 /500m — settle into it, don't sprint." },
  ],
  notes: "Hyrox row is 1000m total on race day. Three 500m splits here on already-taxed arms trains the exact demand. Pull with lats, not just arms.",
};

const FIN_DELOAD: Finisher = {
  label: "Light SkiErg",
  exercises: [
    { name: "SkiErg", sets: "2 × 300m @ RPE 6", notes: "Movement quality only." },
  ],
  notes: "Keep the pattern alive without loading the deload week.",
};

/* -------------------------------------------------------------------------- */
/* Lift day blocks                                                             */
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
  { name: "Trap bar RDL", sets: "4 × 6 @ RPE 7", notes: "Trap bar > barbell for your back." },
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
  { name: "Tibialis raise", sets: "2 × 20", notes: "Daily insurance for the shins" },
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
/* Session helpers                                                             */
/* -------------------------------------------------------------------------- */

const easyRun = (km: number, notes?: string): Session => ({
  kind: "run",
  title: "Easy Z2 run",
  distance: `${km} km`,
  zone: paceReference.easyZ2,
  duration: `${Math.round(km * 5.5)} min`,
  notes: notes ?? "Nose-breathing pace throughout. If you can't hold a conversation, slow down. This is where aerobic base is absorbed, not built.",
});

const stridesRun = (km: number, strides = 4): Session => ({
  kind: "run",
  title: `Easy Z2 + ${strides} strides`,
  distance: `${km} km`,
  zone: paceReference.easyZ2,
  duration: `${Math.round(km * 5.5)} min`,
  notes: `Easy pace, then ${strides} × 20s strides building to ~mile pace. Full walk recovery between. Wakes up leg speed and neuromuscular patterns without stressing the aerobic system.`,
});

const shakeoutRun = (km: number): Session => ({
  kind: "run",
  title: "Easy shakeout",
  distance: `${km} km`,
  zone: paceReference.easyZ2,
  duration: `${Math.round(km * 5.5)} min`,
  notes: "Loose and easy. Blood flow, not fitness. Stop earlier if anything feels off.",
});

const recoveryCardio = (mins: number): Session => ({
  kind: "recovery",
  title: "Recovery cardio",
  duration: `${mins} min`,
  zone: "Z1 (very easy)",
  notes: "Bike, ski erg, or easy walk. Restorative — not depleting. Add 10 min mobility after.",
});

const ergIntervals = (label: string, intervals: string, notes?: string): Session => ({
  kind: "erg",
  title: label,
  duration: "40–50 min",
  intervals,
  notes: notes ?? "Engine work on the erg — ski erg preferred for hyrox carryover; rotate row/bike weekly.",
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

const longRun = (km: number, addStations = false): Session => ({
  kind: "run",
  title: addStations ? `Long run + hyrox stations` : `Long Z2 run`,
  distance: `${km} km`,
  zone: paceReference.easyZ2,
  duration: `${Math.round(km * 5.5)} min${addStations ? " + 25–30 min stations" : ""}`,
  notes: addStations
    ? "Long run FIRST (fresh legs, aerobic focus). Fuel with 30g carbs/hr after 60 min. Snack + 10 min break, then 25–30 min of stations on tired legs."
    : "Nose-breathing Z2 throughout. The aerobic base session of the week — protect it. Fuel from the start: 30g carbs/hr, electrolytes. Full cool-down + mobility after.",
});

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
    "Comfortably hard — 3-word sentences. Grass, dirt, or track preferred; keep pounding down while the legs re-adapt to intensity.",
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
  const paceTarget = targetPace === "threshold" ? "~4:05/km" : "~3:40/km";
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
      `Even splits — target ${paceTarget}. Track or grass loop if possible. If anything sharp shows up in the shin during warm-up, abort and swap to ski erg intervals.`,
  };
};

/* -------------------------------------------------------------------------- */
/* TFUA-specific session helpers                                               */
/* -------------------------------------------------------------------------- */

const hillSprints = (count = 10, notes?: string): Session => ({
  kind: "run",
  title: `Hill sprints · ${count} × 10s`,
  distance: "3–4 km",
  duration: "45–55 min",
  notes:
    notes ??
    `15 min easy WU to a steep hill. ${count} × 8–10s absolute max-effort uphill — sprint it, don't jog it. Walk fully back to the start (2–3 min). 10 min easy CD. Mileage stays low but neuromuscular output is high. This is the TFUA power-development tool that builds speed without taxing the aerobic system.`,
});

const aerobicHike = (label: string, notes?: string): Session => ({
  kind: "recovery",
  title: `Aerobic hike · ${label}`,
  duration: label,
  zone: "Z1–Z2",
  notes:
    notes ??
    "Nose-breathing pace throughout — if you can't breathe through your nose, slow down. Trail or hills preferred. Full aerobic credit without the impact. Add 10 min mobility at the end.",
});

const hyroxCircuit = (
  phase: "base" | "build" | "race",
  notes?: string,
): Session => {
  const exercises: Exercise[] =
    phase === "base"
      ? [
          { name: "Row (erg)", sets: "2 × 500m @ race pace", notes: "90s rest. Race stroke rate — settle in." },
          { name: "SkiErg", sets: "2 × 500m @ race pace", notes: "Race form — drive with lats." },
          { name: "Sled push", sets: "3 × 20m (moderate load)", notes: "Walk back rest." },
          { name: "Farmer carry (2 × 24kg)", sets: "3 × 30m" },
          { name: "Wall balls (9kg)", sets: "2 × 15", notes: "Full depth, consistent tempo." },
        ]
      : phase === "build"
      ? [
          { name: "Row (erg)", sets: "3 × 500m @ race pace", notes: "90s rest. Build race familiarity." },
          { name: "SkiErg", sets: "3 × 500m @ race pace" },
          { name: "Sled push", sets: "4 × 20m (race-ish load)" },
          { name: "Sled pull (rope or harness)", sets: "4 × 20m" },
          { name: "Farmer carry (2 × 24kg)", sets: "3 × 40m" },
          { name: "Wall balls (9kg)", sets: "2 × 20" },
          { name: "Sandbag lunges (20kg)", sets: "2 × 20m" },
        ]
      : [
          { name: "Row (erg)", sets: "3 × 500m @ race pace", notes: "Full race rhythm. Aim sub-2:00/500m." },
          { name: "SkiErg", sets: "3 × 500m @ race pace" },
          { name: "Sled push", sets: "4 × 25m (race load)" },
          { name: "Sled pull", sets: "4 × 25m" },
          { name: "Farmer carry (2 × 24kg)", sets: "4 × 50m" },
          { name: "Wall balls (9kg)", sets: "3 × 25" },
          { name: "Sandbag lunges (20kg)", sets: "3 × 20m" },
        ];

  const durations = { base: "30–35 min", build: "35–45 min", race: "45–55 min" };
  const defaultNote =
    phase === "base"
      ? "Weekly Hyrox station work. Quality and pace familiarity — not burning out. Row every week: the 1000m erg station is often undervalued in training."
      : phase === "build"
      ? "Building race pace familiarity across all 7 stations. Row and ski erg first while arms are freshest."
      : "Race-pace circuit. Time individual stations if possible — use these numbers to project your full race split.";

  return {
    kind: "hyrox",
    title: `Hyrox station circuit · ${phase}`,
    duration: durations[phase],
    exercises,
    notes: notes ?? defaultNote,
  };
};

const thresholdCruise = (
  reps: number,
  minPerRep: number,
  totalKm: number,
  notes?: string,
): Session => ({
  kind: "run",
  title: `Threshold cruise intervals · ${reps} × ${minPerRep} min`,
  distance: `~${totalKm} km`,
  zone: paceReference.threshold,
  intervals: `2 km WU · ${reps} × ${minPerRep} min @ LT / 2 min jog · 2 km CD`,
  duration: `${Math.round(totalKm * 5)} min`,
  notes:
    notes ??
    "Cruise intervals — comfortably hard but never desperate. Even effort across all reps. If rep 1 felt easy and rep 3 felt hard, you paced it exactly right.",
});

/* -------------------------------------------------------------------------- */
/* Weeks                                                                       */
/* -------------------------------------------------------------------------- */

export const weeks: Week[] = [

  /* ========================== PHASE 1: AEROBIC BASE ======================== */

  /* ------------------------------ WEEK 1 ------------------------------ */
  {
    number: 1,
    dateRange: "Sep 14 – Sep 20",
    mileage: "~32 km",
    focus: "Restart · recovery week · reboot the engine",
    notes:
      "Setback week, not a failure week. Mon (6 km Z2 + upper body) and Wed (14 km Z2 + strength) are already banked. Thu is a light lift + alternate day — no run. Fri and Sat are short easy Z2 efforts to keep the legs moving. Sunday hike completes the week aerobically without the pounding. Back to full programming next week.",
    days: [
      {
        day: "Mon",
        date: "Sep 14",
        focus: "Push A + 6 km easy Z2 ✓",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(6, "Done. Easy Z2, nose breathing throughout."),
      },
      {
        day: "Tue",
        date: "Sep 15",
        focus: "Rest",
        pm: { kind: "rest", title: "Rest day" },
      },
      {
        day: "Wed",
        date: "Sep 16",
        focus: "Pull A + 14 km easy Z2 ✓",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: easyRun(14, "Done. Long easy Z2 effort — great aerobic work banked."),
      },
      {
        day: "Thu",
        date: "Sep 17",
        focus: "Push B lite + light recovery",
        am: liftSession("Push B (lighter)", PUSH_B, { duration: "45 min" }),
        pm: {
          kind: "recovery",
          title: "Light alternate / recovery",
          duration: "25–35 min",
          zone: "Z1",
          notes: "Easy bike, ski erg, or row at Z1. No effort — just movement and blood flow. Optional: 10 min stretching/mobility to close.",
        },
      },
      {
        day: "Fri",
        date: "Sep 18",
        focus: "Easy Z2 run",
        pm: easyRun(6, "Super easy. If legs feel heavy from the week, pull back to 5 km or swap for a walk. No ego."),
      },
      {
        day: "Sat",
        date: "Sep 19",
        focus: "Easy Z2 + strides",
        pm: stridesRun(6, 4),
      },
      {
        day: "Sun",
        date: "Sep 20",
        focus: "Long aerobic hike",
        am: aerobicHike("2 hr", "Long hike to close the week. Terrain with gain preferred. Z1–Z2 nose-breathing throughout — this is active recovery and aerobic base work at the same time. Enjoy it."),
      },
    ],
  },

  /* ------------------------------ WEEK 2 ------------------------------ */
  {
    number: 2,
    dateRange: "Sep 21 – Sep 27",
    mileage: "~37 km",
    focus: "Back to work · hill sprints introduced · TFUA base phase begins",
    notes:
      "Full week of regular programming. Hill sprints land on Tuesday after Pull — 10 × 10s max uphill effort. These are the cornerstone of the TFUA base phase: low mileage, high neuromuscular output, no aerobic fatigue. All other runs stay Z2. Long run hits 15 km — purely aerobic, no stations yet. Build the engine first.",
    days: [
      {
        day: "Mon",
        date: "Sep 21",
        focus: "Push A + Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(5),
      },
      {
        day: "Tue",
        date: "Sep 22",
        focus: "Pull A + Hill sprints",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_ROW }),
        pm: hillSprints(10),
      },
      {
        day: "Wed",
        date: "Sep 23",
        focus: "Legs + Hyrox circuit",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: hyroxCircuit("base"),
      },
      {
        day: "Thu",
        date: "Sep 24",
        focus: "Push B + Easy Z2 + strides",
        am: liftSession("Push B", PUSH_B, { duration: "50 min", finisher: FIN_PUSH_B }),
        pm: stridesRun(6, 4),
      },
      {
        day: "Fri",
        date: "Sep 25",
        focus: "Pull B + Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(3),
      },
      {
        day: "Sat",
        date: "Sep 26",
        focus: "Long Z2 run (anchor session)",
        am: longRun(15),
      },
      {
        day: "Sun",
        date: "Sep 27",
        focus: "Active recovery",
        pm: recoveryCardio(40),
      },
    ],
  },

  /* ------------------------------ WEEK 3 ------------------------------ */
  {
    number: 3,
    dateRange: "Sep 28 – Oct 4",
    mileage: "~40 km",
    focus: "Base build · hill power grows · longer long run",
    notes:
      "Hill sprints step up to 12 reps — max effort still, walk back fully. Everything else stays Z2. Long run climbs to 16 km. This is the core of TFUA base building: boring on paper, transformative over time. Resist the urge to push the easy runs faster.",
    days: [
      {
        day: "Mon",
        date: "Sep 28",
        focus: "Push A + Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(5),
      },
      {
        day: "Tue",
        date: "Sep 29",
        focus: "Pull A + Hill sprints",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: hillSprints(12),
      },
      {
        day: "Wed",
        date: "Sep 30",
        focus: "Legs + Hyrox circuit",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: hyroxCircuit("base"),
      },
      {
        day: "Thu",
        date: "Oct 1",
        focus: "Push B + Easy Z2 + strides",
        am: liftSession("Push B", PUSH_B, { duration: "50 min", finisher: FIN_PUSH_B }),
        pm: stridesRun(6, 5),
      },
      {
        day: "Fri",
        date: "Oct 2",
        focus: "Pull B + Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(4),
      },
      {
        day: "Sat",
        date: "Oct 3",
        focus: "Long Z2 run",
        am: longRun(16),
      },
      {
        day: "Sun",
        date: "Oct 4",
        focus: "Active recovery / hike",
        pm: aerobicHike("1.5 hr", "Easy hike or long walk. Z1 only. Let the week sink in."),
      },
    ],
  },

  /* ------------------------------ WEEK 4 ------------------------------ */
  {
    number: 4,
    dateRange: "Oct 5 – Oct 11",
    mileage: "~44 km",
    focus: "Base build · hill volume + aerobic volume up",
    notes:
      "Fourth week of base work. Hill sprints stay at 12 reps — the goal now is that each rep feels more controlled and explosive than last week. Thursday easy run stretches to 7 km. Long run hits 18 km. Still no threshold work — you're building the furnace, not turning it up yet.",
    days: [
      {
        day: "Mon",
        date: "Oct 5",
        focus: "Push A + Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Oct 6",
        focus: "Pull A + Hill sprints",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_ROW }),
        pm: hillSprints(12, "Same count as last week — focus on explosiveness. Each rep should feel like you're fully switching on, not grinding. If hills aren't available, 10s max sprints on flat work too."),
      },
      {
        day: "Wed",
        date: "Oct 7",
        focus: "Legs + Hyrox circuit",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: hyroxCircuit("base"),
      },
      {
        day: "Thu",
        date: "Oct 8",
        focus: "Push B + Easy Z2 + strides",
        am: liftSession("Push B", PUSH_B, { duration: "50 min", finisher: FIN_PUSH_B }),
        pm: stridesRun(7, 5),
      },
      {
        day: "Fri",
        date: "Oct 9",
        focus: "Pull B + Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(4),
      },
      {
        day: "Sat",
        date: "Oct 10",
        focus: "Long Z2 run",
        am: longRun(18),
      },
      {
        day: "Sun",
        date: "Oct 11",
        focus: "Active recovery",
        pm: recoveryCardio(45),
      },
    ],
  },

  /* ------------------------------ WEEK 5 ------------------------------ */
  {
    number: 5,
    dateRange: "Oct 12 – Oct 18",
    mileage: "~49 km",
    focus: "Base + first light intervals · aerobic volume surges",
    notes:
      "Hill sprints stay but Thursday gets a small upgrade: a short VO2-ish interval session — 6 × 400m at 5k effort. These are short enough to not trash the aerobic base but start waking up the higher end. Long run pushes to 20 km. You're approaching the top of the base phase — two more weeks before the peak.",
    days: [
      {
        day: "Mon",
        date: "Oct 12",
        focus: "Push A + Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Oct 13",
        focus: "Pull A + Hill sprints",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: hillSprints(12, "These should feel familiar now. Focus on arm drive and full hip extension. Max effort means max effort — not 90%."),
      },
      {
        day: "Wed",
        date: "Oct 14",
        focus: "Legs + Hyrox circuit",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: hyroxCircuit("build"),
      },
      {
        day: "Thu",
        date: "Oct 15",
        focus: "Push B + Short VO2 intervals",
        am: liftSession("Push B", PUSH_B, { duration: "50 min", finisher: FIN_PUSH_B }),
        pm: {
          kind: "run",
          title: "Short VO2 intervals · 6 × 400m",
          distance: "~7 km",
          intervals: "2 km WU · 6 × 400m @ 5k effort / 90s walk · 2 km CD",
          zone: paceReference.vo2,
          duration: "38 min",
          notes: "Short reps, sharp effort. These are fast but not destructive — 400m is over quickly. Even splits. Don't make the first two reps a sprint. Track or flat grass if possible.",
        },
      },
      {
        day: "Fri",
        date: "Oct 16",
        focus: "Pull B + Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Oct 17",
        focus: "Long Z2 run",
        am: longRun(20),
      },
      {
        day: "Sun",
        date: "Oct 18",
        focus: "Active recovery / hike",
        pm: aerobicHike("2 hr", "Longer hike this week — good way to add aerobic time without pounding. Z2 cap throughout."),
      },
    ],
  },

  /* ------------------------------ WEEK 6 ------------------------------ */
  {
    number: 6,
    dateRange: "Oct 19 – Oct 25",
    mileage: "~54 km",
    focus: "Pre-peak push · volume surges · strides extend",
    notes:
      "Second-to-last base week. Volume takes a meaningful jump — 54 km. Monday and Thursday easy runs lengthen. Saturday hits 22 km. The aerobic system is deep in adaptation now; trust it. Hill sprints stay, short intervals rotate back Thursday. Don't race the easy runs.",
    days: [
      {
        day: "Mon",
        date: "Oct 19",
        focus: "Push A + Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(7),
      },
      {
        day: "Tue",
        date: "Oct 20",
        focus: "Pull A + Hill sprints",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_ROW }),
        pm: hillSprints(12, "Step up to 12 reps again if any sessions felt like 10 was easy. Otherwise hold 12 and focus on quality. Every rep should feel like a controlled explosion."),
      },
      {
        day: "Wed",
        date: "Oct 21",
        focus: "Legs + Hyrox circuit",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: hyroxCircuit("build"),
      },
      {
        day: "Thu",
        date: "Oct 22",
        focus: "Push B + Easy Z2 + extended strides",
        am: liftSession("Push B", PUSH_B, { duration: "50 min", finisher: FIN_PUSH_B }),
        pm: stridesRun(8, 6),
      },
      {
        day: "Fri",
        date: "Oct 23",
        focus: "Pull B + Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Oct 24",
        focus: "Long Z2 run",
        am: longRun(22),
      },
      {
        day: "Sun",
        date: "Oct 25",
        focus: "Active recovery",
        pm: recoveryCardio(50),
      },
    ],
  },

  /* ------------------------------ WEEK 7 ------------------------------ */
  {
    number: 7,
    dateRange: "Oct 26 – Nov 1",
    mileage: "~60 km",
    focus: "PEAK · 60 km · aerobic base complete",
    notes:
      "Biggest week of the program — 60 km. The aerobic base phase peaks here. Hill sprints are at their sharpest. Long run hits 25 km — the longest run of the block. Sleep 8+ hrs every night this week. Don't add anything extra. After this week, the deload and threshold block begin. This is the last week you should feel purely 'aerobic' — enjoy it.",
    days: [
      {
        day: "Mon",
        date: "Oct 26",
        focus: "Push A + Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(8),
      },
      {
        day: "Tue",
        date: "Oct 27",
        focus: "Pull A + Hill sprints (peak)",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: hillSprints(12, "Peak hill sprint session. These have earned their place — 7 weeks of building to this. Max effort, full recovery. Walk down slow enough that you feel fully recovered before each rep."),
      },
      {
        day: "Wed",
        date: "Oct 28",
        focus: "Legs + Hyrox circuit",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: hyroxCircuit("build"),
      },
      {
        day: "Thu",
        date: "Oct 29",
        focus: "Push B + Easy Z2 + strides",
        am: liftSession("Push B", PUSH_B, { duration: "50 min", finisher: FIN_PUSH_B }),
        pm: stridesRun(8, 6),
      },
      {
        day: "Fri",
        date: "Oct 30",
        focus: "Pull B + Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(6),
      },
      {
        day: "Sat",
        date: "Oct 31",
        focus: "Peak long run (25 km, Z2)",
        am: longRun(25),
      },
      {
        day: "Sun",
        date: "Nov 1",
        focus: "Recovery",
        pm: recoveryCardio(50),
      },
    ],
  },

  /* ====================== PHASE 2: THRESHOLD BLOCK ====================== */

  /* ------------------------------ WEEK 8 ------------------------------ */
  {
    number: 8,
    dateRange: "Nov 2 – Nov 8",
    mileage: "~48 km",
    focus: "DELOAD + transition · lifts drop to RPE 6 · no hill sprints",
    notes:
      "Planned deload after the 60 km peak. Lifts go to RPE 6 — all loads down ~15%. No hill sprints this week. Runs stay short and easy. This lets connective tissue catch up and primes the body for the threshold block starting next week. The deload is not optional — you earned 60 km, now let it land.",
    days: [
      {
        day: "Mon",
        date: "Nov 2",
        focus: "Push (deload) + Easy Z2",
        am: liftSession("Push (deload)", DELOAD_PUSH, { duration: "45 min", finisher: FIN_DELOAD }),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Nov 3",
        focus: "Pull (deload) + Easy Z2",
        am: liftSession("Pull (deload)", DELOAD_PULL, { duration: "45 min", finisher: FIN_DELOAD }),
        pm: easyRun(5),
      },
      {
        day: "Wed",
        date: "Nov 4",
        focus: "Legs (deload) + Hyrox light circuit",
        am: liftSession("Legs (deload)", DELOAD_LEGS, { duration: "45 min", finisher: FIN_DELOAD }),
        pm: hyroxCircuit("base", "Deload week — move the patterns, don't push the intensities. Row + ski erg only. 20 min max."),
      },
      {
        day: "Thu",
        date: "Nov 5",
        focus: "Push (deload) + Easy Z2 + strides",
        am: liftSession("Push (deload)", DELOAD_PUSH, { duration: "45 min", finisher: FIN_DELOAD }),
        pm: stridesRun(7, 4),
      },
      {
        day: "Fri",
        date: "Nov 6",
        focus: "Mobility + Shakeout",
        am: {
          kind: "recovery",
          title: "Mobility only",
          duration: "30 min",
          notes: "Full-body mobility flow. Extra calf/soleus/tib work. No loading.",
        },
        pm: shakeoutRun(4),
      },
      {
        day: "Sat",
        date: "Nov 7",
        focus: "Moderate long run (no stations)",
        am: longRun(20, false),
      },
      {
        day: "Sun",
        date: "Nov 8",
        focus: "Recovery",
        pm: recoveryCardio(35),
      },
    ],
  },

  /* ------------------------------ WEEK 9 ------------------------------ */
  {
    number: 9,
    dateRange: "Nov 9 – Nov 15",
    mileage: "~55 km",
    focus: "Threshold block · cruise intervals begin · quality over volume",
    notes:
      "The transition TFUA prescribes: after the aerobic base is deep, move to lactate threshold work. Tuesday introduces cruise intervals — 3 × 10 min at LT pace, 2 min jog recovery. This is the most effective threshold stimulus: enough time at LT to create adaptation, short enough recovery to not fall apart. All other runs stay Z2. Long run at 23 km.",
    days: [
      {
        day: "Mon",
        date: "Nov 9",
        focus: "Push A + Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(7),
      },
      {
        day: "Tue",
        date: "Nov 10",
        focus: "Pull A + THRESHOLD cruise intervals",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_ROW }),
        pm: thresholdCruise(3, 10, 9),
      },
      {
        day: "Wed",
        date: "Nov 11",
        focus: "Legs + Hyrox race circuit",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: hyroxCircuit("race"),
      },
      {
        day: "Thu",
        date: "Nov 12",
        focus: "Push B + Easy Z2 + strides",
        am: liftSession("Push B", PUSH_B, { duration: "50 min", finisher: FIN_PUSH_B }),
        pm: stridesRun(7, 4),
      },
      {
        day: "Fri",
        date: "Nov 13",
        focus: "Pull B + Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Nov 14",
        focus: "Long Z2 run",
        am: longRun(23),
      },
      {
        day: "Sun",
        date: "Nov 15",
        focus: "Active recovery",
        pm: recoveryCardio(45),
      },
    ],
  },

  /* ------------------------------ WEEK 10 ------------------------------ */
  {
    number: 10,
    dateRange: "Nov 16 – Nov 22",
    mileage: "~60 km",
    focus: "Threshold peak · double quality · 60 km again",
    notes:
      "Two quality sessions this week: Tuesday stretches the cruise intervals to 4 × 10 min, and Thursday adds 5 × 1 km VO2 repeats. That's a big ask — Wednesday must stay truly easy. Don't cut the long run. This is the hardest week in the plan. Sleep is the non-negotiable variable.",
    days: [
      {
        day: "Mon",
        date: "Nov 16",
        focus: "Push A + Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(8),
      },
      {
        day: "Tue",
        date: "Nov 17",
        focus: "Pull A + THRESHOLD extended cruise",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_PULL_A }),
        pm: thresholdCruise(4, 10, 11, "Four reps at LT with 2 min jog. Rep 4 should feel genuinely hard. If you get to rep 3 and can't keep the pace, jog the last rep — don't trash your form for the sake of completing it."),
      },
      {
        day: "Wed",
        date: "Nov 18",
        focus: "Legs + Hyrox circuit (controlled)",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: hyroxCircuit("build", "Buffer between Tue threshold and Thu VO2 — keep intensity moderate, not race pace. Row + ski erg + carries. No sled today."),
      },
      {
        day: "Thu",
        date: "Nov 19",
        focus: "Push B + VO2 1k repeats",
        am: liftSession("Push B (lighter)", PUSH_B, { duration: "45 min", finisher: FIN_PUSH_B }),
        pm: kmRepeats(5, "vo2", "5 × 1 km at 5k pace. Same feel as the 400m reps from Week 5 but now held longer. Reps 4 and 5 are the workout — everything before is just getting there."),
      },
      {
        day: "Fri",
        date: "Nov 20",
        focus: "Pull B + Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Nov 21",
        focus: "Long Z2 run (last big one)",
        am: longRun(24),
      },
      {
        day: "Sun",
        date: "Nov 22",
        focus: "Recovery",
        pm: recoveryCardio(50),
      },
    ],
  },

  /* ------------------------------ WEEK 11 ------------------------------ */
  {
    number: 11,
    dateRange: "Nov 23 – Nov 29",
    mileage: "~52 km",
    focus: "Race specificity · Hyrox stations return · volume starts down",
    notes:
      "Volume dips slightly as race specificity ramps up. Wednesday gets the first real hyrox station circuit back — full run-to-station rotations. Tuesday is race-pace running intervals (hyrox run leg pace, 4:15/km). You're sharpening now, not building. The base and threshold work are done — this week is about translating it.",
    days: [
      {
        day: "Mon",
        date: "Nov 23",
        focus: "Push A + Easy Z2",
        am: liftSession("Push A", PUSH_A, { finisher: FIN_PUSH_A }),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Nov 24",
        focus: "Pull A + Race-pace run intervals",
        am: liftSession("Pull A", PULL_A, { finisher: FIN_ROW }),
        pm: {
          kind: "run",
          title: "Hyrox run pace · 6 × 1 km",
          distance: "~10 km",
          intervals: "2 km WU · 6 × 1 km @ hyrox run pace (sub-4:00/km) / 90s jog · 2 km CD",
          zone: paceReference.hyroxRunGoal,
          duration: "55 min",
          notes: "This is race pace on fresh legs — you'll be doing this on legs that have already done 8 km of running between stations. Sub-4:00/km here; expect ~4:10–4:15 on race day after stations. Track or flat road.",
        },
      },
      {
        day: "Wed",
        date: "Nov 25",
        focus: "Legs + Hyrox station circuit",
        am: liftSession("Legs + Core", LEGS, { finisher: FIN_LEGS }),
        pm: hyroxSession(
          "Hyrox station circuit",
          "35–45 min",
          HYROX_STATIONS,
          "Stations return. Full circuit — take as much rest as needed between each. Aim to execute each with form, not speed. This is not a sim yet — it's a refresher.",
        ),
      },
      {
        day: "Thu",
        date: "Nov 26",
        focus: "Push B + Easy Z2",
        am: liftSession("Push B", PUSH_B, { duration: "50 min", finisher: FIN_PUSH_B }),
        pm: easyRun(7),
      },
      {
        day: "Fri",
        date: "Nov 27",
        focus: "Pull B + Shakeout",
        am: liftSession("Pull B", PULL_B, { finisher: FIN_PULL_B }),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Nov 28",
        focus: "Long run + hyrox stations",
        am: longRun(22, true),
      },
      {
        day: "Sun",
        date: "Nov 29",
        focus: "Recovery",
        pm: recoveryCardio(45),
      },
    ],
  },

  /* =================== PHASE 3: SHARPENING + TAPER =================== */

  /* ------------------------------ WEEK 12 ------------------------------ */
  {
    number: 12,
    dateRange: "Nov 30 – Dec 6",
    mileage: "~40 km",
    focus: "Sharpening · Hyrox mini-sim · taper entry",
    notes:
      "Volume drops to ~40 km — the body needs to feel fresh but sharp. Wednesday is the Hyrox mini-sim: time it against the sub-60 benchmark. Saturday's long run includes a 4 km section at steady/race pace. This is the last week with significant volume before the final taper.",
    days: [
      {
        day: "Mon",
        date: "Nov 30",
        focus: "Push A (moderate) + Easy Z2",
        am: liftSession("Push A (moderate)", PUSH_A, { duration: "50 min", finisher: FIN_PUSH_A }),
        pm: easyRun(5),
      },
      {
        day: "Tue",
        date: "Dec 1",
        focus: "Pull A + Race-pace intervals",
        am: liftSession("Pull A (moderate)", PULL_A, { duration: "55 min", finisher: FIN_PULL_A }),
        pm: {
          kind: "run",
          title: "Race-pace intervals · 5 × 1 km",
          distance: "~9 km",
          intervals: "2 km WU · 5 × 1 km @ sub-4:00/km / 90s jog · 2 km CD",
          zone: paceReference.hyroxRunGoal,
          duration: "50 min",
          notes: "These should feel crisper than Week 11. You're sharper now. Lock into sub-4:00/km — if it feels easier, hold the pace anyway. Race-pace is race-pace.",
        },
      },
      {
        day: "Wed",
        date: "Dec 2",
        focus: "Legs (lighter) + HYROX MINI-SIM",
        am: liftSession("Legs (lighter)", DELOAD_LEGS, { duration: "40 min" }),
        pm: hyroxSession(
          "Hyrox mini-sim — benchmark",
          "45–55 min",
          [
            { name: "1 km run", sets: "@ race pace (sub-4:00/km)" },
            { name: "SkiErg", sets: "1000 m @ race pace" },
            { name: "1 km run", sets: "@ race pace" },
            { name: "Sled push", sets: "50 m (race load)" },
            { name: "1 km run", sets: "@ race pace" },
            { name: "Sled pull", sets: "50 m" },
            { name: "1 km run", sets: "@ race pace" },
            { name: "Burpee broad jump over", sets: "40 reps" },
            { name: "1 km run", sets: "@ race pace" },
          ],
          "Half a hyrox. TIME IT. This is your fitness benchmark — aim for 28–30 min total. Walk away knowing what needs the most attention in the final two weeks.",
        ),
      },
      {
        day: "Thu",
        date: "Dec 3",
        focus: "Push B (light) + Easy Z2",
        am: liftSession("Push B (light)", DELOAD_PUSH, { duration: "40 min", finisher: FIN_DELOAD }),
        pm: easyRun(5),
      },
      {
        day: "Fri",
        date: "Dec 4",
        focus: "Pull B (light) + Shakeout",
        am: liftSession("Pull B (light)", DELOAD_PULL, { duration: "40 min" }),
        pm: shakeoutRun(3),
      },
      {
        day: "Sat",
        date: "Dec 5",
        focus: "Long run with race-pace effort",
        am: {
          kind: "run",
          title: "Long run with race-pace middle",
          distance: "18 km",
          zone: paceReference.easyZ2,
          intervals: "7 km Z2 easy · 4 km @ race pace (sub-4:00/km) · 7 km Z2 easy",
          duration: "95 min",
          notes: "Insert a 4 km block at hyrox run pace in the middle — aim sub-4:00/km. This teaches you to run fast on tired legs and then recover aerobically, exactly what happens in a race.",
        },
      },
      {
        day: "Sun",
        date: "Dec 6",
        focus: "Rest / short walk",
        pm: { kind: "rest", title: "Full rest or 20 min walk", notes: "Legs up. Eat well. Sleep." },
      },
    ],
  },

  /* ------------------------------ WEEK 13 ------------------------------ */
  {
    number: 13,
    dateRange: "Dec 7 – Dec 13",
    mileage: "~26 km",
    focus: "TAPER · stay sharp · no new stimuli",
    notes:
      "Volume drops hard — 26 km. Keep the strides and one short sharpener, nothing else. The fitness is built. Taper anxiety is normal. Don't add workouts because you feel good. Race day is 5 days from the end of this week — everything you do now is for feel, not fitness. Sleep, fuel, and trust the process.",
    days: [
      {
        day: "Mon",
        date: "Dec 7",
        focus: "Deload lift + Easy Z2",
        am: liftSession("Full body (light)", DELOAD_PUSH, { duration: "35 min" }),
        pm: easyRun(4, "Easy and loose. Just moving."),
      },
      {
        day: "Tue",
        date: "Dec 8",
        focus: "Light lift + Race-sharp strides",
        am: liftSession("Pull (light)", DELOAD_PULL, { duration: "35 min" }),
        pm: {
          kind: "run",
          title: "Easy + race-sharp strides",
          distance: "4 km",
          duration: "25 min",
          notes: "2 km easy, then 5 × 20s at race-pace effort with full walk recovery. These are to keep the legs feeling fast, not to train. Done in 25 min.",
        },
      },
      {
        day: "Wed",
        date: "Dec 9",
        focus: "Legs (light) + Brief station touch",
        am: liftSession("Legs (light)", DELOAD_LEGS, { duration: "35 min" }),
        pm: hyroxCircuit("base", "Taper week — two stations only (row + ski erg, 2 × 300m each at race pace). Just to keep the pattern in the legs. 15 min max. Stop before you want to."),
      },
      {
        day: "Thu",
        date: "Dec 10",
        focus: "Push lite + Easy Z2 + strides",
        am: liftSession("Push (light)", DELOAD_PUSH, { duration: "30 min" }),
        pm: stridesRun(5, 4),
      },
      {
        day: "Fri",
        date: "Dec 11",
        focus: "Pull lite + Short shakeout",
        am: liftSession("Pull (very light)", DELOAD_PULL, { duration: "30 min" }),
        pm: shakeoutRun(2),
      },
      {
        day: "Sat",
        date: "Dec 12",
        focus: "Easy feel-good run",
        am: {
          kind: "run",
          title: "Easy feel-good run",
          distance: "8 km",
          zone: paceReference.easyZ2,
          duration: "45 min",
          notes: "Easy pace, maybe a few strides at the end to feel sharp. No effort. This is the last meaningful run before race week. Enjoy it.",
        },
      },
      {
        day: "Sun",
        date: "Dec 13",
        focus: "Rest",
        pm: { kind: "rest", title: "Full rest", notes: "Eat, sleep, hydrate. Race week starts tomorrow." },
      },
    ],
  },

  /* ------------------------------ WEEK 14 ------------------------------ */
  {
    number: 14,
    dateRange: "Dec 14 – Dec 20",
    mileage: "~8 km + race",
    focus: "RACE WEEK · Dec 18 · Hyrox",
    notes:
      "Race is Friday December 18. Keep the body moving Mon–Wed but do nothing that creates fatigue. No new exercises, no PR attempts, no long walks in tourist traps. Thursday is full rest. Friday is race day — wake up, warm up, compete. Everything you've built over 14 weeks comes out today.",
    days: [
      {
        day: "Mon",
        date: "Dec 14",
        focus: "Light full body + Easy jog",
        am: {
          kind: "lift",
          title: "Light full body (activation only)",
          duration: "25 min",
          notes: "Light weights, just moving the joints. No failure, no new movements. Keep it short.",
        },
        pm: easyRun(3, "10 min out, 10 min back. Completely easy."),
      },
      {
        day: "Tue",
        date: "Dec 15",
        focus: "Mobility + strides",
        am: {
          kind: "recovery",
          title: "Mobility + movement prep",
          duration: "20 min",
          notes: "Hip flexors, ankles, thoracic spine. Whatever makes you feel good.",
        },
        pm: {
          kind: "run",
          title: "Strides only",
          distance: "2–3 km",
          duration: "20 min",
          notes: "2 km easy, then 4 × 15s at race-effort strides. Just to feel sharp and alive. Done.",
        },
      },
      {
        day: "Wed",
        date: "Dec 16",
        focus: "Mobility + very easy walk/jog",
        am: {
          kind: "recovery",
          title: "Mobility only",
          duration: "15 min",
          notes: "Final tune-up. Don't lift. Don't run hard. Just move and stay loose.",
        },
        pm: {
          kind: "recovery",
          title: "Easy walk (15–20 min)",
          duration: "20 min",
          zone: "Z1",
          notes: "A walk is enough. Legs should feel springy — if they don't, that's okay, race day adrenaline handles it.",
        },
      },
      {
        day: "Thu",
        date: "Dec 17",
        focus: "Full rest — race eve",
        pm: {
          kind: "rest",
          title: "Rest + prep",
          notes: "Off your feet. Eat well — carbs, protein, good sleep. Lay out your kit. The work is done.",
        },
      },
      {
        day: "Fri",
        date: "Dec 18",
        focus: "RACE DAY — Hyrox · Sub-60",
        am: {
          kind: "hyrox",
          title: "RACE · Hyrox · Sub-60:00 Pro",
          duration: "< 60 min",
          notes: "Trust the 14 weeks. Start conservative on the runs — you will be grateful for it in the final two stations. SkiErg: efficient, don't blow up. Sled: lean in, grind. Farmer carry: tall posture. Wall balls: rhythm. Sandbag: brace everything. Run the last km like it's the only thing left. It is.",
        },
      },
      {
        day: "Sat",
        date: "Dec 19",
        focus: "Post-race recovery",
        pm: {
          kind: "recovery",
          title: "Eat, walk, celebrate",
          duration: "as long as needed",
          notes: "You just raced a Hyrox. Rest is the workout today. Light walk if the legs want to move. Protein + carbs. Zero pressure.",
        },
      },
      {
        day: "Sun",
        date: "Dec 20",
        focus: "Recovery",
        pm: { kind: "rest", title: "Rest", notes: "Full rest or very light mobility. Well earned." },
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Hyrox station reference                                                     */
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
    title: "80-90% Z1–Z2 (TFUA rule)",
    body: "Most of the training is aerobic base work. If it doesn't feel embarrassingly easy, it's probably too hard. Nose-breathing is the check — if you can't breathe through your nose, slow down.",
  },
  {
    title: "Hill sprints are the weapon",
    body: "Short, max-effort, full recovery. 8–10s uphill, walk back fully. These build neuromuscular power without taxing the aerobic system — the TFUA approach for developing speed during a base phase. Non-negotiable in Weeks 2–7.",
  },
  {
    title: "Lift AM · Run PM",
    body: "Preserves run quality. Minimum 6 hrs between sessions. 40g carbs + 20g protein within 30 min of the lift.",
  },
  {
    title: "Exercise every day",
    body: "Every day has something — some days it's a full session, some days it's 20 min of mobility. Active recovery beats passive rest for this kind of program. Sundays and light days are Z1 only.",
  },
  {
    title: "Threshold block is earned",
    body: "Don't add threshold work before Week 9. The aerobic base phase (Weeks 1–7) is what makes the threshold block effective. Skipping ahead undermines the whole approach.",
  },
  {
    title: "Hyrox finishers after every lift",
    body: "4–8 min at the end of each lift trains a station on already-fatigued muscle. Small dose, high transfer — this is what closes the gap between 'strong' and 'strong at hyrox'.",
  },
  {
    title: "Back protocol",
    body: "Trap bar over straight bar. Front squat over back squat. Brace hard on sandbag work. Sled push is spine-friendly — favor it over sled drags when in doubt.",
  },
  {
    title: "Recovery discipline",
    body: "8+ hrs sleep or the plan doesn't work. If Monday feels heavy, extend recovery rather than push through. The body adapts during rest, not during training.",
  },
  {
    title: "Fueling on long runs",
    body: "30g carbs/hr after the first 45–60 min. Water + electrolytes always. Underfueling the long run is the fastest way to blunt the base phase.",
  },
];
