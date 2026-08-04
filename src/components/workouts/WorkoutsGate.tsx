import { motion } from "framer-motion";
import { ChevronRight, Lock } from "lucide-react";
import { useState } from "react";
import { WORKOUTS_PASSWORD } from "./auth";
import posthog from "@/lib/posthog";

export default function WorkoutsGate({
  onAuthenticated,
}: {
  onAuthenticated: () => void;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === WORKOUTS_PASSWORD) {
      onAuthenticated();
      return;
    }
    setError(true);
    setShakeKey((k) => k + 1);
    posthog.capture("workouts access denied");
  };

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6"
      style={{
        background:
          "radial-gradient(1000px 500px at 50% -20%, rgba(220,38,38,0.18), transparent 60%), radial-gradient(800px 400px at 50% 110%, rgba(59,130,246,0.10), transparent 60%), linear-gradient(180deg, #0a0a0a 0%, #050505 100%)",
      }}
    >
      <motion.div
        key={shakeKey}
        animate={error ? { x: [0, -10, 10, -6, 6, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_-30px_rgba(220,38,38,0.4)] backdrop-blur-xl sm:p-10"
      >
        <div className="mb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-red-400/90 font-mono">
            Training Log
          </p>
          <h1 className="mt-2 text-xl font-medium text-white">
            Hyrox + Half Marathon Build
          </h1>
          <p className="mt-1 text-xs text-white/50 font-mono">
            Aug 4 — Sep 28 · 8 weeks
          </p>
        </div>

        <p className="mb-6 text-sm text-white/60">
          What's the most underrated piece of the training puzzle?
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="workouts-password"
              className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50 font-mono"
            >
              <Lock className="mr-1 inline-block h-3 w-3" aria-hidden /> Answer
            </label>
            <input
              id="workouts-password"
              type="password"
              autoFocus
              autoComplete="off"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(false);
              }}
              placeholder="one word"
              className={`w-full rounded-lg border bg-black/50 px-4 py-3 text-base text-white placeholder:text-white/25 focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-400/60 focus:ring-red-400/40"
                  : "border-white/10 focus:border-white/30 focus:ring-white/20"
              }`}
            />
            {error ? (
              <p className="mt-2 text-xs text-red-300">
                Not it. Think about what runners neglect most.
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Unlock
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
