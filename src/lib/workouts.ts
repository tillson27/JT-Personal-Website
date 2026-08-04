export type SessionKind = "lift" | "run" | "erg" | "hyrox" | "recovery" | "rest";

export interface Exercise {
  name: string;
  sets: string;
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
  block: "8-week base + engine build (Aug 4 → Sep 28). Sharpening block follows.",
};

/* -------------------------------------------------------------------------- */
/* Exercise blocks (reused across weeks)                                      */
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
  { name: "Standing calf raise", sets: "3 × 15", notes: "Build slowly — shin splints watch" },
  { name: "Tibialis raise", sets: "2 × 20", notes: "Direct shin-splint prehab" },
  ...CORE_B,
];

const HYROX_STATIONS: Exercise[] = [
  { name: "SkiErg", sets: "3 × 500m", notes: "Race pace" },
  { name: "Sled push", sets: "4 × 25m", notes: "Moderate load — build up" },
  { name: "Sled pull (rope or harness)", sets: "4 × 25m" },
  { name: "Farmer carry (2 × 24kg)", sets: "4 × 50m" },
  { name: "Wall balls (9kg)", sets: "3 × 30" },
  { name: "Sandbag lunges (20kg)", sets: "3 × 20m", notes: "Careful with back — brace hard" },
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

const easyRun = (km: number): Session => ({
  kind: "run",
  title: "Easy Z2 run",
  distance: `${km} km`,
  zone: paceReference.easyZ2,
  duration: `${Math.round(km * 5.5)} min`,
  notes: "Nose-breathing pace. If you can't hold a conversation, slow down.",
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
  notes: "Bike, ski erg, or easy walk. Should feel restorative, not depleting. Add 10 min mobility after.",
});

const ergIntervals = (label: string, intervals: string, notes?: string): Session => ({
  kind: "erg",
  title: label,
  duration: "40–50 min",
  intervals,
  notes: notes ?? "Sub for run intensity — protects shins while training the engine. Rower, ski erg, or bike — rotate weekly.",
});

const liftSession = (title: string, exercises: Exercise[], duration = "60 min"): Session => ({
  kind: "lift",
  title,
  duration,
  exercises,
});

const hyroxSession = (title: string, duration: string, exercises: Exercise[], notes?: string): Session => ({
  kind: "hyrox",
  title,
  duration,
  exercises,
  notes,
});

/* -------------------------------------------------------------------------- */
/* Weekly template (weeks 2–3, then variants)                                 */
/* -------------------------------------------------------------------------- */

const longRun = (km: number, addStations = true): Session => ({
  kind: "run",
  title: `Long run + ${addStations ? "hyrox stations" : "mobility"}`,
  distance: `${km} km`,
  zone: paceReference.easyZ2,
  duration: `${Math.round(km * 5.5)} min + ${addStations ? "25–30" : "10"} min stations/mobility`,
  notes: addStations
    ? "Long run FIRST (fresh legs, aerobic focus). Fuel with 30g carbs/hr after 60 min. Take a snack + 10 min break, then hit 25–30 min of stations at moderate effort — deliberately practicing hyrox work on tired legs."
    : "Just the long run today. Cool down + full mobility routine.",
});

/* -------------------------------------------------------------------------- */
/* Weeks                                                                       */
/* -------------------------------------------------------------------------- */

export const weeks: Week[] = [
  /* ------------------------------ WEEK 1 ------------------------------ */
  {
    number: 1,
    dateRange: "Aug 4 – Aug 10",
    mileage: "30 km",
    focus: "Foundation · protect shins · all run intensity on erg",
    notes:
      "Partial week (no Monday). All running Z2 only. Intensity comes from the erg session on Wed — this is deliberate: your shins get to adapt to volume without the pounding of speed. Ease into lifting loads.",
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
        am: liftSession("Pull A", PULL_A),
        pm: easyRun(6),
      },
      {
        day: "Wed",
        date: "Aug 5",
        focus: "AM Legs · PM Erg engine",
        am: liftSession("Legs + Core", LEGS),
        pm: ergIntervals(
          "Erg intervals (ski or row)",
          "10 min WU · 6 × 3 min @ RPE 8 / 90s easy · 10 min CD",
          "This is your first quality piece. Ski erg preferred (hyrox carryover). Pull hard but controlled."
        ),
      },
      {
        day: "Thu",
        date: "Aug 6",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push A", PUSH_A),
        pm: easyRun(6),
      },
      {
        day: "Fri",
        date: "Aug 7",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Aug 8",
        focus: "Long run + stations (anchor session)",
        am: longRun(13),
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
    mileage: "34 km",
    focus: "Base building · Push/Pull/Legs rotation locked in",
    notes:
      "First full week. Same structure as Week 1 with an added Monday session. Runs stay Z2 — resist the urge to push. Add 5 kg to your main lifts vs last week if RPE was ≤ 7.",
    days: [
      {
        day: "Mon",
        date: "Aug 11",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push A", PUSH_A),
        pm: easyRun(5),
      },
      {
        day: "Tue",
        date: "Aug 12",
        focus: "AM Pull · PM Easy Z2",
        am: liftSession("Pull A", PULL_A),
        pm: easyRun(6),
      },
      {
        day: "Wed",
        date: "Aug 13",
        focus: "AM Legs · PM Erg engine",
        am: liftSession("Legs + Core", LEGS),
        pm: ergIntervals(
          "Bike intervals",
          "10 min WU · 5 × 4 min @ RPE 8 / 2 min easy · 10 min CD",
          "Longer intervals this week. Assault bike or road bike trainer — cadence 85+."
        ),
      },
      {
        day: "Thu",
        date: "Aug 14",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push B", PUSH_B, "45 min"),
        pm: easyRun(5),
      },
      {
        day: "Fri",
        date: "Aug 15",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B),
        pm: shakeoutRun(4),
      },
      {
        day: "Sat",
        date: "Aug 16",
        focus: "Long run + stations",
        am: longRun(14),
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
    mileage: "38 km",
    focus: "Volume build · last week before deload",
    notes:
      "Peak volume of the first sub-block. Shins will feel it — do 10 min of calf/soleus + tib work every evening. If pain moves from 'awareness' to sharp/localized, cut Friday's shakeout and swap Saturday stations for full rest.",
    days: [
      {
        day: "Mon",
        date: "Aug 18",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push A", PUSH_A),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Aug 19",
        focus: "AM Pull · PM Easy Z2",
        am: liftSession("Pull A", PULL_A),
        pm: easyRun(6),
      },
      {
        day: "Wed",
        date: "Aug 20",
        focus: "AM Legs · PM Ski erg pyramid",
        am: liftSession("Legs + Core", LEGS),
        pm: ergIntervals(
          "Ski erg pyramid",
          "10 min WU · 200/400/600/800/600/400/200 m @ RPE 8 · equal rest · 10 min CD",
          "Ski erg specifically — this maps directly to hyrox station #1. Grip and pace like race day."
        ),
      },
      {
        day: "Thu",
        date: "Aug 21",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push B", PUSH_B, "45 min"),
        pm: easyRun(6),
      },
      {
        day: "Fri",
        date: "Aug 22",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B),
        pm: shakeoutRun(4),
      },
      {
        day: "Sat",
        date: "Aug 23",
        focus: "Long run + stations",
        am: longRun(16),
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
    mileage: "32 km",
    focus: "DELOAD · shin reset · lifts drop to RPE 6",
    notes:
      "Planned deload. Reduce all lift loads by ~15% or drop to RPE 6. Runs stay short and easy. Purpose is to let connective tissue catch up so weeks 5–8 can push harder. Don't skip the deload just because you feel good.",
    days: [
      {
        day: "Mon",
        date: "Aug 25",
        focus: "AM Push (deload) · PM Easy Z2",
        am: liftSession("Push (deload)", DELOAD_PUSH, "45 min"),
        pm: easyRun(5),
      },
      {
        day: "Tue",
        date: "Aug 26",
        focus: "AM Pull (deload) · PM Easy Z2",
        am: liftSession("Pull (deload)", DELOAD_PULL, "45 min"),
        pm: easyRun(5),
      },
      {
        day: "Wed",
        date: "Aug 27",
        focus: "AM Legs (deload) · PM Easy bike",
        am: liftSession("Legs (deload)", DELOAD_LEGS, "45 min"),
        pm: recoveryCardio(40),
      },
      {
        day: "Thu",
        date: "Aug 28",
        focus: "AM Push (deload) · PM Easy Z2",
        am: liftSession("Push (deload)", DELOAD_PUSH, "45 min"),
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
        am: longRun(14, false),
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
    mileage: "40 km",
    focus: "Reintroduce run quality · first tempo",
    notes:
      "Shins should have adapted. This week you get the first tempo run — on grass or track if possible to keep it soft. If any sharp shin pain returns during warm-up, abort and do the session on the erg instead. Lifts back to RPE 7.",
    days: [
      {
        day: "Mon",
        date: "Sep 1",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push A", PUSH_A),
        pm: easyRun(5),
      },
      {
        day: "Tue",
        date: "Sep 2",
        focus: "AM Pull · PM TEMPO",
        am: liftSession("Pull A", PULL_A),
        pm: {
          kind: "run",
          title: "Tempo run",
          distance: "8 km",
          intervals: "2 km WU · 4 km @ threshold · 2 km CD",
          zone: paceReference.threshold,
          notes: "First run-based quality piece. Target ~4:20/km on the 4 km block. Should feel 'comfortably hard' — you could speak 3 words at a time.",
        },
      },
      {
        day: "Wed",
        date: "Sep 3",
        focus: "AM Legs · PM Cross-training",
        am: liftSession("Legs + Core", LEGS),
        pm: ergIntervals(
          "Mixed cardio",
          "45 min: 15 min bike + 15 min ski erg + 15 min row · all Z2/Z3",
          "Aerobic maintenance — no impact. Recovery from Tuesday tempo."
        ),
      },
      {
        day: "Thu",
        date: "Sep 4",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push B", PUSH_B, "45 min"),
        pm: easyRun(6),
      },
      {
        day: "Fri",
        date: "Sep 5",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B),
        pm: shakeoutRun(4),
      },
      {
        day: "Sat",
        date: "Sep 6",
        focus: "Long run + stations",
        am: longRun(17),
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
    mileage: "45 km",
    focus: "First intervals · hyrox specificity ramps",
    notes:
      "First true VO2 session — 800s at 5k pace. This is the pace you'll need for half marathon negative splits and the running legs of hyrox. Saturday's station work bumps to 30 min compromised.",
    days: [
      {
        day: "Mon",
        date: "Sep 8",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push A", PUSH_A),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Sep 9",
        focus: "AM Pull · PM INTERVALS",
        am: liftSession("Pull A", PULL_A),
        pm: {
          kind: "run",
          title: "VO2 intervals",
          distance: "10 km",
          intervals: "2 km WU · 6 × 800 m @ 5k pace / 400 m jog · 2 km CD",
          zone: paceReference.vo2,
          notes: "Target ~3:55/km on the reps. This is HARD. Consistent splits > blowing out the first rep. Track or flat road only.",
        },
      },
      {
        day: "Wed",
        date: "Sep 10",
        focus: "AM Legs · PM Erg engine",
        am: liftSession("Legs + Core", LEGS),
        pm: ergIntervals(
          "Ski erg + row combo",
          "10 min WU · 4 × (500 m ski / 500 m row) @ RPE 8 · 2 min rest between rounds · 10 min CD",
          "Alternates the hyrox stations — teaches transitions."
        ),
      },
      {
        day: "Thu",
        date: "Sep 11",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push B", PUSH_B, "45 min"),
        pm: easyRun(6),
      },
      {
        day: "Fri",
        date: "Sep 12",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B),
        pm: shakeoutRun(5),
      },
      {
        day: "Sat",
        date: "Sep 13",
        focus: "Long run + stations",
        am: longRun(18),
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
    mileage: "49 km",
    focus: "Peak volume · two quality run days",
    notes:
      "Biggest week of the block. Two run quality sessions — mind the recovery between them (Wed erg is genuinely easy). If shins flare, keep Tuesday intervals and swap Thursday for compromised erg + stations. Sleep is non-negotiable — 8+ hrs.",
    days: [
      {
        day: "Mon",
        date: "Sep 15",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push A", PUSH_A),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Sep 16",
        focus: "AM Pull · PM 1k INTERVALS",
        am: liftSession("Pull A", PULL_A),
        pm: {
          kind: "run",
          title: "VO2 intervals",
          distance: "10 km",
          intervals: "2 km WU · 5 × 1000 m @ 5k pace / 400 m jog · 2 km CD",
          zone: paceReference.vo2,
          notes: "Same pace as last week's 800s, longer reps. ~3:55/km. Even splits — should feel controlled for reps 1–3, ugly for 4–5.",
        },
      },
      {
        day: "Wed",
        date: "Sep 17",
        focus: "AM Legs · PM Easy bike",
        am: liftSession("Legs + Core", LEGS),
        pm: recoveryCardio(50),
      },
      {
        day: "Thu",
        date: "Sep 18",
        focus: "AM Push (lighter) · PM THRESHOLD",
        am: liftSession("Push B (lighter)", PUSH_B, "40 min"),
        pm: {
          kind: "run",
          title: "Threshold intervals",
          distance: "10 km",
          intervals: "2 km WU · 2 × 3 km @ threshold / 3 min jog · 2 km CD",
          zone: paceReference.threshold,
          notes: "Half marathon pace effort. This is the money workout for your 1:18 goal. Nail the pace — don't run the first rep faster than the second.",
        },
      },
      {
        day: "Fri",
        date: "Sep 19",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B),
        pm: shakeoutRun(4),
      },
      {
        day: "Sat",
        date: "Sep 20",
        focus: "Peak long run + stations",
        am: longRun(19),
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
    mileage: "42 km",
    focus: "Transition · hyrox SIM · fitness check",
    notes:
      "Volume drops, intensity stays. Wednesday is a hyrox mini-sim to check current fitness against your sub-60 goal. Saturday's long run is easier — you finish this block healthy and ready for the sharpening/peak block that leads into December.",
    days: [
      {
        day: "Mon",
        date: "Sep 22",
        focus: "AM Push (lighter) · PM Easy Z2",
        am: liftSession("Push A (moderate)", PUSH_A),
        pm: easyRun(6),
      },
      {
        day: "Tue",
        date: "Sep 23",
        focus: "AM Pull · PM TEMPO",
        am: liftSession("Pull A", PULL_A),
        pm: {
          kind: "run",
          title: "Extended tempo",
          distance: "10 km",
          intervals: "2 km WU · 5 km @ threshold · 3 km CD",
          zone: paceReference.threshold,
          notes: "Longer continuous tempo. Target ~4:20/km. Practices race-effort mental patience.",
        },
      },
      {
        day: "Wed",
        date: "Sep 24",
        focus: "AM Legs (lighter) · PM HYROX SIM",
        am: liftSession("Legs (moderate)", LEGS, "45 min"),
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
          "Half a hyrox. Time it. This is your fitness benchmark going into the sharpening block. Aim for ~28–30 min total."
        ),
      },
      {
        day: "Thu",
        date: "Sep 25",
        focus: "AM Push · PM Easy Z2",
        am: liftSession("Push B", PUSH_B, "40 min"),
        pm: easyRun(6),
      },
      {
        day: "Fri",
        date: "Sep 26",
        focus: "AM Pull · PM Shakeout",
        am: liftSession("Pull B", PULL_B),
        pm: shakeoutRun(4),
      },
      {
        day: "Sat",
        date: "Sep 27",
        focus: "Moderate long run",
        am: longRun(16),
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
    body: "Preserves running quality. Minimum 6 hrs between the two. Eat 40g carbs + 20g protein within 30 min of the lift.",
  },
  {
    title: "Shin splint protocol",
    body: "Tib raises + calf/soleus work daily. All run intensity in weeks 1–4 goes on the erg/bike. If sharp localized pain during warm-up → abort run, sub with bike Z2.",
  },
  {
    title: "Back protocol",
    body: "Trap bar over straight bar. Front squat over back squat. Brace hard on sandbag work. Sled push is spine-friendly — favor it over sled drags when in doubt.",
  },
  {
    title: "Recovery discipline",
    body: "8+ hrs sleep or the plan doesn't work. Sunday is truly easy — Z1 only. If Monday feels heavy, extend the recovery not push through.",
  },
  {
    title: "Fueling on long runs",
    body: "30g carbs/hr after the first hour. Water + electrolytes always. Underfueling long runs is the #1 way to blunt this block.",
  },
  {
    title: "Deload weeks matter",
    body: "Week 4 deload is not optional. Skipping it is the fastest way to arrive at the sharpening block already fried.",
  },
];
