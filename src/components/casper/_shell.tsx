import type { ReactNode } from "react";

export type SlideSectionKey =
  | "intro"
  | "discovery"
  | "solution"
  | "prd"
  | "execution"
  | "close"
  | "appendix";

export type Slide = {
  id: string;
  title: string;
  section: SlideSectionKey;
  render: () => ReactNode;
};

export const slideSections: ReadonlyArray<{ key: SlideSectionKey; label: string }> = [
  { key: "intro", label: "Welcome" },
  { key: "discovery", label: "Discovery" },
  { key: "solution", label: "Solution" },
  { key: "prd", label: "PRD" },
  { key: "execution", label: "Execution" },
  { key: "close", label: "Close" },
  { key: "appendix", label: "Appendix" },
];

export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 720;

export function SlideShell({
  children,
  className,
  eyebrow,
  title,
  bg,
}: {
  children: ReactNode;
  className?: string;
  eyebrow?: string;
  title?: string;
  bg?: string;
}) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden px-14 pb-12 pt-10 text-white ${className ?? ""}`}
      style={{
        background:
          bg ??
          "radial-gradient(1200px 600px at 100% 0%, rgba(147,51,234,0.20), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(217,70,239,0.14), transparent 60%), linear-gradient(180deg, #0d0817 0%, #08050f 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(168,85,247,0.10), transparent 45%), radial-gradient(circle at 80% 80%, rgba(217,70,239,0.10), transparent 45%)",
        }}
      />
      <div className="relative flex min-h-0 flex-1 flex-col">
        {eyebrow || title ? (
          <div className="mb-6">
            {eyebrow ? (
              <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-200">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-purple-300" />
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-[38px] font-semibold tracking-tight text-white">
                {title}
              </h2>
            ) : null}
          </div>
        ) : null}
        <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
      </div>
    </div>
  );
}

export function StatCard({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-2xl border border-purple-400/50 bg-gradient-to-br from-purple-500/25 to-fuchsia-500/15 p-5"
          : "rounded-2xl border border-white/10 bg-white/[0.04] p-5"
      }
    >
      <p
        className={`text-4xl font-semibold tracking-tight ${
          accent ? "text-purple-200" : "text-white"
        }`}
      >
        {value}
      </p>
      <p className="mt-2 text-sm leading-snug text-white/70">{label}</p>
    </div>
  );
}

export function SourceLine({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 text-[10px] leading-snug text-white/40">
      <span className="font-semibold uppercase tracking-[0.18em] text-white/50">
        Source ·{" "}
      </span>
      {children}
    </p>
  );
}
