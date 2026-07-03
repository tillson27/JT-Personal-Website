import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import CasperMark from "./CasperMark";

export default function SubPageShell({
  eyebrow,
  chip,
  children,
}: {
  eyebrow: string;
  chip?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="relative min-h-dvh w-full overflow-hidden text-white"
      style={{
        background:
          "radial-gradient(1400px 700px at 100% 0%, rgba(168,85,247,0.20), transparent 60%), radial-gradient(1200px 600px at 0% 100%, rgba(217,70,239,0.14), transparent 60%), linear-gradient(180deg, #0a0714 0%, #05030b 100%)",
      }}
    >
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-6 pt-6 sm:px-10 sm:pt-8 lg:px-16"
      >
        <div className="flex items-center gap-3">
          <Link
            to="/casper"
            aria-label="Back to hub"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-white/85 backdrop-blur transition hover:border-purple-400/40 hover:bg-purple-500/10"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5 group-hover:text-purple-200" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
              Hub
            </span>
          </Link>
          <CasperMark size="sm" className="hidden sm:inline-block" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300/80">
            {eyebrow}
          </p>
        </div>
        {chip ? (
          <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-purple-200">
            {chip}
          </span>
        ) : null}
      </motion.header>

      <main className="relative z-0 mx-auto w-full max-w-6xl px-6 pb-16 pt-8 sm:px-10 lg:px-12">
        {children}
      </main>
    </div>
  );
}
