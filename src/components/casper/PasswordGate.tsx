import { motion } from "framer-motion";
import { ChevronRight, Lock } from "lucide-react";
import { useMemo, useState } from "react";
import { CASPER_PASSWORD } from "./auth";
import CasperMark from "./CasperMark";
import casperLogo from "@/assets/casper/casper-logo.png";

export default function PasswordGate({
  onAuthenticated,
}: {
  onAuthenticated: () => void;
}) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === CASPER_PASSWORD) {
      onAuthenticated();
      return;
    }
    setError(true);
    setShakeKey((k) => k + 1);
  };

  return (
    <div
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6"
      style={{
        background:
          "radial-gradient(1200px 600px at 50% -10%, rgba(147,51,234,0.35), transparent 60%), radial-gradient(900px 500px at 50% 110%, rgba(217,70,239,0.20), transparent 60%), linear-gradient(180deg, #0d0817 0%, #05030b 100%)",
      }}
    >
      <FloatingGhosts />

      <motion.div
        key={shakeKey}
        animate={error ? { x: [0, -12, 12, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md rounded-3xl border border-purple-400/25 bg-white/[0.04] p-8 shadow-[0_30px_80px_-30px_rgba(147,51,234,0.5)] backdrop-blur-xl sm:p-10"
      >
        <div className="mb-6 flex items-center gap-3">
          <CasperMark size="lg" animated />
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-purple-300">
              Casper Studios
            </p>
            <h1 className="text-lg font-semibold text-white">
              PM Challenge · Josh Tillson
            </h1>
          </div>
        </div>

        <p className="mb-6 text-sm text-white/70">
          Welcome. Enter the access code to unlock the full experience.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="casper-password"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.22em] text-white/60"
            >
              <Lock className="mr-1 inline-block h-3 w-3" aria-hidden /> Access code
            </label>
            <input
              id="casper-password"
              type="password"
              autoFocus
              autoComplete="off"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(false);
              }}
              placeholder="what does a ghost say?"
              className={`w-full rounded-xl border bg-black/40 px-4 py-3 text-base text-white placeholder:text-white/25 focus:outline-none focus:ring-2 ${
                error
                  ? "border-red-400/60 focus:ring-red-400/40"
                  : "border-white/15 focus:border-purple-400/60 focus:ring-purple-400/40"
              }`}
            />
            {error ? (
              <p className="mt-2 text-xs text-red-300">
                Not quite. Try something a ghost might say.
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(168,85,247,0.8)] transition hover:from-purple-400 hover:to-fuchsia-400"
          >
            Enter
            <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-white/40">
          Prepared for Kelly, Derek, Jay & Talent @ Casper Studios
        </p>
      </motion.div>
    </div>
  );
}

function FloatingGhosts() {
  const marks = useMemo(
    () =>
      Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        left: `${8 + i * 15 + (i % 2) * 5}%`,
        top: `${10 + (i * 13) % 70}%`,
        size: 28 + (i % 3) * 10,
        delay: i * 0.6,
        duration: 6 + (i % 3) * 2,
      })),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {marks.map((g) => (
        <motion.img
          key={g.id}
          src={casperLogo}
          alt=""
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.3, 0.12, 0.3, 0],
            y: [-10, -40, -10, -40, -10],
            rotate: [-4, 4, -4],
          }}
          transition={{
            duration: g.duration,
            delay: g.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-xl object-cover"
          style={{ left: g.left, top: g.top, width: g.size, height: g.size }}
        />
      ))}
    </div>
  );
}
