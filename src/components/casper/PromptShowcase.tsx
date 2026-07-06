import { motion } from "framer-motion";
import {
  ChevronRight,
  FileText,
  FolderTree,
  GitCommit,
  Layers,
  Lock,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import SubPageShell from "./SubPageShell";

type Command = {
  cmd: string;
  comment: string;
  result: ReadonlyArray<string>;
};

const COMMANDS: ReadonlyArray<Command> = [
  {
    cmd: "prompt init",
    comment: "Create the .prompt file — one plain-text file that lists your sources",
    result: [
      "✔ created .prompt",
      "✔ added .packages/ to .gitignore",
      "next:  prompt add <git-url>  to register a source",
    ],
  },
  {
    cmd: "prompt add git@github.com:acme/skill-packs.git ~=1.2.0",
    comment: "Add a source — any Git repo that hosts a manifest of packs",
    result: [
      "✔ resolved acme/skill-packs @ 1.2.0",
      "✔ wrote entry to .prompt",
      "run  prompt install  to sync",
    ],
  },
  {
    cmd: "prompt install",
    comment: "Reads .prompt, clones every pack at the pinned version, writes .prompt.lock",
    result: [
      "reading .prompt · 3 sources",
      "  ↳ acme/skill-packs      → 11 packs",
      "  ↳ internal/rl-toolkit   → 4 packs",
      "  ↳ you/experiments       → 2 packs",
      "✔ 17 packs linked into .packages/",
      "✔ wrote .prompt.lock (commit SHAs pinned)",
    ],
  },
  {
    cmd: "prompt list",
    comment: "See everything installed and where it came from",
    result: [
      "acme/skill-packs @ 1.2.0",
      "  developer         3.3.0",
      "  product           3.4.2",
      "internal/rl-toolkit @ 0.4.0",
      "  reverse-logistics-ops   1.2.1",
      "  disposition-agent       0.6.1",
    ],
  },
];

const FEATURES: ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  detail: string;
}> = [
  {
    icon: FileText,
    title: "Declare it once",
    detail:
      "One .prompt file lists the sources your team uses. Commit it alongside your code — it's your source of truth.",
  },
  {
    icon: Terminal,
    title: "One-command install",
    detail:
      "prompt install. Every teammate gets the same packs, same versions, same day. Same mental model as npm install.",
  },
  {
    icon: Lock,
    title: "Lockfile = reproducibility",
    detail:
      ".prompt.lock records the exact Git commit for every pack, so installs are byte-identical across the whole team.",
  },
  {
    icon: Layers,
    title: "Stands on giants",
    detail:
      "Under the hood: Google's repo tool — the code Android has used to sync hundreds of Git repos since 2008.",
  },
];

const PROMPT_FILE_LINES: ReadonlyArray<{
  text: string;
  kind: "comment" | "var" | "source";
}> = [
  { text: "# sources your team uses — commit this file", kind: "comment" },
  { text: "GITBASE=git@github.com:acme", kind: "var" },
  { text: "skill-packs=${GITBASE}/skill-packs.git @ ~=1.2.0", kind: "source" },
  { text: "rl-toolkit=git@github.com:internal/rl-toolkit.git @ 0.4.0", kind: "source" },
  { text: "experiments=git@github.com:you/experiments.git @ main", kind: "source" },
];

const LOCK_FILE_LINES: ReadonlyArray<{
  name: string;
  version: string;
  sha: string;
}> = [
  { name: "acme/skill-packs", version: "1.2.0", sha: "f83c9a4d" },
  { name: "internal/rl-toolkit", version: "0.4.0", sha: "3f9c2d1e" },
  { name: "you/experiments", version: "main", sha: "8b2f11c7" },
];

function CommandLine({ cmd, index }: { cmd: Command; index: number }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const t = setTimeout(
      () => {
        setVisibleLines(cmd.result.length);
      },
      600 + index * 200,
    );
    return () => clearTimeout(t);
  }, [cmd.result.length, index]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-3 font-mono text-[10.5px] leading-relaxed shadow-[0_10px_30px_-10px_rgba(147,51,234,0.35)] sm:p-3.5 sm:text-[12px]"
    >
      <p className="mb-1.5 text-[10px] uppercase tracking-[0.2em] text-white/40">
        {cmd.comment}
      </p>
      <p className="text-white/90">
        <span className="text-purple-300">$</span>{" "}
        <span className="text-white">{cmd.cmd}</span>
      </p>
      <div className="mt-1 space-y-0.5 text-white/60">
        {cmd.result.slice(0, visibleLines).map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: i * 0.12 }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

export default function PromptShowcase() {
  return (
    <SubPageShell
      eyebrow="Case study · Prompt · Package manager for AI skills"
      chip="AI Forward Deployed Product Management · Client work"
    >
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mt-4"
      >
        <div className="flex flex-wrap items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-purple-300/80 sm:gap-2 sm:text-[11px] sm:tracking-[0.24em]">
          <Terminal className="h-3.5 w-3.5" aria-hidden />
          CLI · Git-native · Python
          <span className="text-white/25">·</span>
          <span className="text-fuchsia-200">Shipped on client engagements</span>
        </div>
        <h1 className="mt-2 text-[30px] font-semibold leading-[1.05] tracking-tight text-white sm:mt-3 sm:text-[42px] lg:text-[52px]">
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
            Prompt
          </span>{":"} an npm for AI skills.
        </h1>
        <p className="mt-3 max-w-3xl text-[13.5px] leading-snug text-white/70 sm:mt-4 sm:text-[15px] lg:text-[17px]">
          A recent AI-native product I owned end-to-end as an AI Forward Deployed Product
          Manager. From spotting the "everyone's on different skills" problem, to writing the PRD,
          to shipping a Git-native CLI that pins, syncs, and reproduces AI skill packs across
          delivery teams.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-full border border-purple-400/30 bg-purple-500/10 px-2.5 py-1 font-semibold uppercase tracking-[0.2em] text-purple-200">
            Problem → PRD → shipped
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 uppercase tracking-[0.2em] text-white/60">
            AI-native product management
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 uppercase tracking-[0.2em] text-white/60">
            Internal + client deployment
          </span>
        </div>
      </motion.section>

      {/* Features */}
      <section className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4"
          >
            <span className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-200 sm:mb-3 sm:h-9 sm:w-9">
              <f.icon className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-[12.5px] font-semibold text-white sm:text-[13px]">{f.title}</p>
            <p className="mt-1 text-[11.5px] leading-snug text-white/60 sm:mt-1.5 sm:text-[12px]">{f.detail}</p>
          </motion.div>
        ))}
      </section>

      {/* Terminal + Config files */}
      <section className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:mb-3 sm:text-[11px] sm:tracking-[0.24em]">
            The full loop, in a terminal
          </p>
          <div className="space-y-2.5">
            {COMMANDS.map((c, i) => (
              <CommandLine key={c.cmd} cmd={c} index={i} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* .prompt config */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                .prompt · what your team uses
              </p>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                like requirements.txt
              </span>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2 text-[11px]">
                <FileText className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                <span className="font-mono text-white/70">.prompt</span>
                <span className="ml-auto text-[10px] text-white/40">3 sources</span>
              </div>
              <div className="px-4 py-3 font-mono text-[11px] leading-relaxed">
                {PROMPT_FILE_LINES.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.4 + i * 0.06 }}
                    className={
                      line.kind === "comment"
                        ? "text-white/35"
                        : line.kind === "var"
                          ? "text-fuchsia-200/80"
                          : "text-white/80"
                    }
                  >
                    {line.text}
                  </motion.p>
                ))}
              </div>
            </div>
          </div>

          {/* .prompt.lock */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                .prompt.lock · byte-identical installs
              </p>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                like package-lock.json
              </span>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/[0.06] to-transparent">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2 text-[11px]">
                <Lock className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                <span className="font-mono text-white/70">.prompt.lock</span>
                <span className="ml-auto text-[10px] text-white/40">exact Git commits</span>
              </div>
              <ul>
                {LOCK_FILE_LINES.map((row, i) => (
                  <motion.li
                    key={row.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.55 + i * 0.08 }}
                    className="flex items-center gap-2 border-b border-white/5 px-4 py-2 font-mono text-[11px] last:border-b-0"
                  >
                    <span className="text-white/85">{row.name}</span>
                    <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-white/70">
                      {row.version}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-[10px] text-fuchsia-200">
                      <GitCommit className="h-3 w-3" aria-hidden />
                      {row.sha}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Under the hood */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:mt-10 sm:p-5"
      >
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-purple-300" aria-hidden />
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-200 sm:text-[11px] sm:tracking-[0.22em]">
            Under the hood · what makes it work
          </p>
        </div>
        <p className="mt-3 max-w-3xl text-[12.5px] leading-snug text-white/70 sm:text-[13px]">
          Rather than building a Git-syncing engine from scratch, Prompt sits on Google's{" "}
          <span className="font-mono text-white/90">repo</span> tool — the same multi-repo manager
          that clones the entire Android Open Source Project. Battle-tested since 2008, quietly
          doing the heavy lifting underneath a friendly CLI.
        </p>
        <p className="mt-3 max-w-3xl text-[12.5px] leading-snug text-white/60">
          Two small layers on top are what make it feel like a modern package manager:
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:mt-4 sm:grid-cols-2 sm:gap-4">
          <div className="rounded-xl border border-white/10 bg-black/30 p-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-200">
              Portable manifests
            </p>
            <p className="mt-1.5 text-[12px] leading-snug text-white/70">
              Variables like{" "}
              <span className="font-mono text-white/90">{"${GITBASE}"}</span> let a manifest work
              across orgs — one team's Bitbucket, another's GitHub — without rewriting URLs.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-3.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-fuchsia-200">
              Flexible versions
            </p>
            <p className="mt-1.5 text-[12px] leading-snug text-white/70">
              Say <span className="font-mono text-white/90">~=1.2.0</span> ("compatible with
              1.2") instead of pinning an exact commit. The tool resolves it; the lockfile pins
              the SHA.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Distribution loop */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-8 rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/12 to-fuchsia-500/8 p-4 sm:mt-10 sm:p-5"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-200 sm:text-[11px] sm:tracking-[0.22em]">
          The distribution loop
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-white/85 sm:mt-4 sm:gap-2 sm:text-[12px]">
          <span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono">
            someone updates a skill
          </span>
          <ChevronRight className="h-3 w-3 text-purple-300" aria-hidden />
          <span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono">
            commit to git
          </span>
          <ChevronRight className="h-3 w-3 text-purple-300" aria-hidden />
          <span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono">
            bump version in .prompt
          </span>
          <ChevronRight className="h-3 w-3 text-purple-300" aria-hidden />
          <span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono">
            team runs prompt install
          </span>
          <ChevronRight className="h-3 w-3 text-purple-300" aria-hidden />
          <span className="rounded-lg border border-purple-400/40 bg-purple-500/20 px-2.5 py-1.5 font-mono">
            everyone reproducibly in sync
          </span>
        </div>
        <p className="mt-3 max-w-3xl text-[12px] leading-snug text-white/60">
          Skill drift is measured in hours, not sprints. Every dev is running the same version of
          the toolkit, every day — and if there's ever a question, the lockfile is the receipt.
        </p>
      </motion.section>

      {/* Impact tiles */}
      <section className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/15 to-transparent p-4 sm:p-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-200 sm:text-[11px] sm:tracking-[0.22em]">
            Real impact · shipped by me as PM
          </p>
          <p className="mt-2 text-[13.5px] leading-snug text-white/80">
            First rollout: 20+ engineers on the same skill baseline, same day. Zero "wait, which
            version are you on?" in retro. Now expanding across client teams.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-[11px] sm:tracking-[0.22em]">
            What it manages
          </p>
          <ul className="mt-2 space-y-1 text-[12.5px] text-white/80">
            <li>· Skills (SKILL.md + templates)</li>
            <li>· Rules, prompts, and rulesets</li>
            <li>· MCP recipes and connector configs</li>
            <li>· Anything living in a Git repo, really</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-[11px] sm:tracking-[0.22em]">
            Where it's headed
          </p>
          <ul className="mt-2 space-y-1 text-[12.5px] text-white/80">
            <li>· A hosted registry for discovery</li>
            <li>· Usage analytics per skill</li>
            <li>· Automatic skill-quality scoring</li>
            <li>· One-click roll-back on regressions</li>
          </ul>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-10 flex items-center justify-end gap-2 text-[11px] uppercase tracking-[0.24em] text-white/40"
      >
        <span className="inline-flex items-center gap-1.5">
          <FolderTree className="h-3 w-3" aria-hidden />
          .claude/ · .cursor/ · .codex/ · one config, many surfaces
        </span>
      </motion.div>
    </SubPageShell>
  );
}
