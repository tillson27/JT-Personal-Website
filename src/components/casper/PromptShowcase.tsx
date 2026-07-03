import { motion } from "framer-motion";
import {
  Boxes,
  ChevronRight,
  FolderTree,
  GitBranch,
  GitPullRequest,
  Package,
  RefreshCw,
  Search,
  Sparkles,
  Terminal,
  Upload,
  Users,
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
    cmd: "prompt search reverse-logistics",
    comment: "Browse the community registry for packs matching your problem",
    result: [
      "found 3 packs",
      "  reverse-logistics-ops    1.2.0  · 84 installs  ★ 4.7",
      "  disposition-agent        0.6.1  · 41 installs  ★ 4.4",
      "  wms-integration-kit      0.3.0  · 12 installs  ★ 4.1",
    ],
  },
  {
    cmd: "prompt install reverse-logistics-ops",
    comment: "Install any pack from public or private registries",
    result: [
      "resolving reverse-logistics-ops@latest…",
      "  ↳ resolved 1.2.0 (11 skills, 4 rules, 3 prompts)",
      "✔ installed · linked to .claude/commands + .cursor/rules",
      "run  prompt list  to see everything you now have",
    ],
  },
  {
    cmd: "prompt update",
    comment: "Pull the newest version of every installed pack",
    result: [
      "checking registry…",
      "  developer                3.2.1 → 3.3.0",
      "  reverse-logistics-ops    1.2.0 → 1.2.1",
      "  product                  3.4.0 (up to date)",
      "✔ 2 packs updated · restart Claude Code to pick them up",
    ],
  },
  {
    cmd: "prompt publish retail-toolkit",
    comment: "Upload your own toolkit, shareable with the team or the community",
    result: [
      "packing 8 skills, 3 rules, 2 prompts…",
      "→ registry.prompt.dev/retail-toolkit@0.4.0",
      "✔ published · 12 subscribers will be notified",
    ],
  },
  {
    cmd: "prompt contribute reverse-logistics-ops",
    comment: "Fork a public pack, propose changes back to the maintainer",
    result: [
      "forking reverse-logistics-ops@1.2.1 → your workspace",
      "✔ editable copy at ~/.prompt/forks/reverse-logistics-ops",
      "when ready:  prompt pr  → opens a proposal to the maintainer",
    ],
  },
];

const FEATURES: ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  detail: string;
}> = [
  {
    icon: Search,
    title: "Browse & search",
    detail:
      "A public registry of skill packs, searchable by problem, tag, or author. Find the pack someone already built for the job.",
  },
  {
    icon: Package,
    title: "One-command install",
    detail:
      "Semver, lockfile, private registries: the mental model devs already have from npm and cargo.",
  },
  {
    icon: Upload,
    title: "Publish & share",
    detail:
      "Ship your own toolkits publicly or to a team-scoped registry. Skill drift across the org drops from weeks to hours.",
  },
  {
    icon: GitPullRequest,
    title: "Contribute back",
    detail:
      "Fork a public pack, iterate locally, and open a proposal to the maintainer. The OSS loop, purpose-built for skills.",
  },
];

const REGISTRY_TREE: ReadonlyArray<{
  label: string;
  version: string;
  desc: string;
  count: number;
  featured?: boolean;
  scope?: "public" | "private";
}> = [
  {
    label: "developer",
    version: "3.3.0",
    desc: "Review, debug, plan, commit. The everyday engineering skills.",
    count: 22,
    featured: true,
    scope: "public",
  },
  {
    label: "product",
    version: "3.4.2",
    desc: "PM skills: Jira triage, epic summaries, discovery, presentation-builder.",
    count: 14,
    scope: "public",
  },
  {
    label: "reverse-logistics-ops",
    version: "1.2.1",
    desc: "Community pack · disposition decisions, returns triage, capacity checks.",
    count: 11,
    scope: "public",
  },
  {
    label: "retail-toolkit",
    version: "0.4.0",
    desc: "Team-scoped · data-model mapping, standards alignment, reverse-log ops.",
    count: 8,
    scope: "private",
  },
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
      className="rounded-xl border border-white/10 bg-black/50 p-3.5 font-mono text-[12px] leading-relaxed shadow-[0_10px_30px_-10px_rgba(147,51,234,0.35)]"
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

/* --------- Community browse mini-list --------- */
type PublicPack = {
  name: string;
  desc: string;
  installs: number;
  stars: number;
  tags: ReadonlyArray<string>;
};

const PUBLIC_PACKS: ReadonlyArray<PublicPack> = [
  {
    name: "reverse-logistics-ops",
    desc: "Disposition, returns triage, DC capacity. Battle-tested at a mid-market retailer.",
    installs: 84,
    stars: 4.7,
    tags: ["retail", "ops"],
  },
  {
    name: "mismo-mapping",
    desc: "MISMO v3.5 mapping helpers + validators. Pairs with the data-model MCP.",
    installs: 62,
    stars: 4.6,
    tags: ["finserv", "data"],
  },
  {
    name: "voice-agent-eval",
    desc: "Golden-set eval scripts for LLM voice agents: turn quality + latency.",
    installs: 47,
    stars: 4.5,
    tags: ["voice", "eval"],
  },
];

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
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-300/80">
          <Terminal className="h-3.5 w-3.5" aria-hidden />
          CLI · Node-style
          <span className="text-white/25">·</span>
          <span className="text-fuchsia-200">Scoped, built & shipped on client engagements</span>
        </div>
        <h1 className="mt-3 text-[42px] font-semibold leading-[1.05] tracking-tight text-white sm:text-[52px]">
          <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent">
            Prompt
          </span>{":"} an npm for AI skills.
        </h1>
        <p className="mt-4 max-w-3xl text-[15px] leading-snug text-white/70 sm:text-[17px]">
          A recent AI-native product I owned end-to-end as an AI Forward Deployed Product
          Manager. From spotting the "everyone's on different skills" problem, to writing the PRD,
          to shipping a Node-style CLI that installs, versions, publishes, and distributes AI
          skill packs across delivery teams and client engagements.
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
      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/20 text-purple-200">
              <f.icon className="h-4 w-4" aria-hidden />
            </span>
            <p className="text-[13px] font-semibold text-white">{f.title}</p>
            <p className="mt-1.5 text-[12px] leading-snug text-white/60">{f.detail}</p>
          </motion.div>
        ))}
      </section>

      {/* Terminal + Registry */}
      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
            The full loop, in a terminal
          </p>
          <div className="space-y-2.5">
            {COMMANDS.map((c, i) => (
              <CommandLine key={c.cmd} cmd={c} index={i} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Local installed */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                Your installed packs
              </p>
              <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-200">
                Illustrative
              </span>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2 text-[11px]">
                <Boxes className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                <span className="font-semibold uppercase tracking-[0.2em] text-white/70">
                  Local registry
                </span>
                <span className="ml-auto text-[10px] text-white/40">4 packs · 55 skills</span>
              </div>
              <ul>
                {REGISTRY_TREE.map((pkg, i) => (
                  <motion.li
                    key={pkg.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.4 + i * 0.08 }}
                    className={
                      pkg.featured
                        ? "border-b border-white/5 bg-purple-500/[0.06] px-4 py-2.5"
                        : "border-b border-white/5 px-4 py-2.5 last:border-b-0"
                    }
                  >
                    <div className="flex items-center gap-2">
                      <Package className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                      <span className="font-mono text-[12.5px] font-semibold text-white">
                        {pkg.label}
                      </span>
                      <span className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white/70">
                        {pkg.version}
                      </span>
                      <span
                        className={
                          pkg.scope === "public"
                            ? "rounded-md border border-emerald-400/30 bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200"
                            : "rounded-md border border-purple-400/30 bg-purple-500/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-purple-200"
                        }
                      >
                        {pkg.scope}
                      </span>
                      <span className="ml-auto text-[10px] font-mono text-white/40">
                        {pkg.count} skills
                      </span>
                    </div>
                    <p className="mt-1 pl-5 text-[11px] leading-snug text-white/60">
                      {pkg.desc}
                    </p>
                  </motion.li>
                ))}
              </ul>
              <div className="flex items-center gap-2 border-t border-white/5 bg-white/[0.02] px-4 py-2 text-[10.5px] text-white/50">
                <GitBranch className="h-3 w-3" aria-hidden />
                <span>lockfile · prompt.lock ·</span>
                <span className="font-mono">3f9c2d1</span>
              </div>
            </div>
          </div>

          {/* Community browse */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
                Community · trending this week
              </p>
              <span className="rounded-full border border-amber-400/40 bg-amber-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-amber-200">
                Illustrative
              </span>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/[0.06] to-transparent">
              <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.02] px-4 py-2 text-[11px]">
                <Sparkles className="h-3.5 w-3.5 text-purple-300" aria-hidden />
                <span className="font-semibold uppercase tracking-[0.2em] text-white/70">
                  registry.prompt.dev
                </span>
                <span className="ml-auto text-[10px] text-white/40">1,842 packs total</span>
              </div>
              <ul>
                {PUBLIC_PACKS.map((p, i) => (
                  <motion.li
                    key={p.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.55 + i * 0.08 }}
                    className="border-b border-white/5 px-4 py-2.5 last:border-b-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[12px] font-semibold text-white">
                        {p.name}
                      </span>
                      <span className="ml-auto font-mono text-[10px] text-white/50">
                        ↓ {p.installs}
                      </span>
                      <span className="font-mono text-[10px] text-fuchsia-200">
                        ★ {p.stars}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-snug text-white/60">{p.desc}</p>
                    <div className="mt-1 flex gap-1">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-purple-400/25 bg-purple-500/10 px-1.5 py-[1px] text-[9px] font-medium text-purple-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Distribution loop */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-10 rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/12 to-fuchsia-500/8 p-5"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-200">
          The distribution loop
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-white/85">
          <span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono">
            someone builds a skill
          </span>
          <ChevronRight className="h-3 w-3 text-purple-300" aria-hidden />
          <span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono">
            prompt publish
          </span>
          <ChevronRight className="h-3 w-3 text-purple-300" aria-hidden />
          <span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono">
            registry updates
          </span>
          <ChevronRight className="h-3 w-3 text-purple-300" aria-hidden />
          <span className="rounded-lg border border-white/10 bg-black/40 px-2.5 py-1.5 font-mono">
            team runs prompt update
          </span>
          <ChevronRight className="h-3 w-3 text-purple-300" aria-hidden />
          <span className="rounded-lg border border-purple-400/40 bg-purple-500/20 px-2.5 py-1.5 font-mono">
            everyone on the latest
          </span>
        </div>
        <p className="mt-3 max-w-3xl text-[12px] leading-snug text-white/60">
          Skill drift is measured in hours, not sprints. Every dev on the client is running the
          same, best version of the toolkit, every day. Public packs also open the door for the
          community to iterate together.
        </p>
      </motion.section>

      {/* Impact tiles */}
      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/15 to-transparent p-5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-200">
            Real impact · shipped by me as PM
          </p>
          <p className="mt-2 text-[13.5px] leading-snug text-white/80">
            First rollout: 20+ engineers on the same skill baseline, same day. Zero
            "wait, which version are you on?" in retro. Now expanding across client teams.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
            What it manages
          </p>
          <ul className="mt-2 space-y-1 text-[12.5px] text-white/80">
            <li>· Skill definitions (SKILL.md + templates)</li>
            <li>· Cross-tool wiring (Claude Code + Cursor)</li>
            <li>· Rules, prompts, and rulesets</li>
            <li>· MCP recipes and connector configs</li>
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
            Where it's headed
          </p>
          <ul className="mt-2 space-y-1 text-[12.5px] text-white/80">
            <li>· Registry-hosted skill previews</li>
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
          .claude/ · .cursor/ · .codex/ · .gemini/ · one source, many surfaces
        </span>
      </motion.div>
    </SubPageShell>
  );
}
