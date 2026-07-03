import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import type { Slide } from "../_shell";
import { SlideShell, SourceLine } from "../_shell";
import { AnimatedBar, CountUp, FadeUp, GradientText, Stagger } from "./_helpers";

function AnchorStat({
  value,
  unit,
  label,
  source,
  delay,
}: {
  value: number;
  unit: string;
  label: string;
  source: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-1 overflow-hidden rounded-2xl border border-purple-400/40 bg-gradient-to-br from-purple-500/20 via-fuchsia-500/10 to-transparent p-8"
    >
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <p className="relative text-[11px] font-semibold uppercase tracking-[0.24em] text-purple-200">
        Anchor stat
      </p>
      <div className="relative mt-3 flex items-baseline gap-1">
        <CountUp
          to={value}
          suffix={unit}
          duration={1.8}
          className="text-[84px] font-semibold leading-none tracking-tight text-white"
        />
      </div>
      <p className="relative mt-3 text-[16px] leading-snug text-white/85">
        {label}
      </p>
      <p className="relative mt-3 text-[10px] uppercase tracking-[0.18em] text-white/40">
        {source}
      </p>
    </motion.div>
  );
}

function CategoryBar({
  category,
  percent,
  color,
  delay,
}: {
  category: string;
  percent: string;
  color: string;
  delay: number;
}) {
  const num = parseFloat(percent);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[13px]">
        <span className="text-white/80">{category}</span>
        <span className="font-mono font-semibold text-white">{percent}</span>
      </div>
      <AnimatedBar percent={num * 2} color={color} delay={delay} />
    </div>
  );
}

export const statsSlide: Slide = {
  id: "stats",
  title: "The disposition decision is where the money leaks",
  section: "discovery",
  render: () => (
    <SlideShell eyebrow="Discovery · Returns economics">
      <Stagger gap={0.08}>
        <FadeUp>
          <h2 className="text-[42px] font-semibold leading-[1.05] tracking-tight text-white">
            Front-end stockouts make the news.{" "}
            <GradientText>The back-end loses more money, quietly.</GradientText>
          </h2>
        </FadeUp>

        <div className="mt-6 flex gap-5">
          <AnchorStat
            value={48}
            unit="%"
            label="of returned items are resold at full price today."
            source="Eightx · reverse logistics analysis"
            delay={0.3}
          />
          <AnchorStat
            value={30}
            unit="%"
            label="of an item's original value can be eaten by reverse logistics alone."
            source="Eightx · 20–30% range cited"
            delay={0.5}
          />
        </div>

        <div className="mt-6 grid flex-1 grid-cols-2 gap-6">
          <FadeUp>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                Apparel is the worst category
              </p>
              <p className="mt-2 text-[13px] text-white/60">
                Return rate by category. Apparel and shoes lead by a wide margin.
              </p>
              <div className="mt-4 space-y-3">
                <CategoryBar
                  category="Shoes"
                  percent="31.4%"
                  color="from-fuchsia-400 to-purple-400"
                  delay={0.7}
                />
                <CategoryBar
                  category="Apparel (avg)"
                  percent="25.0%"
                  color="from-purple-400 to-fuchsia-400"
                  delay={0.8}
                />
                <CategoryBar
                  category="Electronics"
                  percent="12.0%"
                  color="from-purple-500/60 to-purple-400/60"
                  delay={0.9}
                />
                <CategoryBar
                  category="Beauty"
                  percent="8.0%"
                  color="from-purple-500/40 to-purple-400/40"
                  delay={1.0}
                />
              </div>
              <SourceLine>Richpanel · Eightx category benchmarks (2025)</SourceLine>
            </div>
          </FadeUp>

          <FadeUp>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-300/80">
                And time destroys what's left
              </p>
              <ul className="mt-3 space-y-3 text-[13px] leading-snug text-white/85">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[10px] font-semibold text-purple-200">
                    01
                  </span>
                  <span>
                    <span className="font-semibold text-white">$849.9B</span> in expected US returns
                    in 2025, <span className="font-semibold text-white">15.8%</span> of sales;
                    online runs near <span className="font-semibold text-white">19.3%</span>.
                    <SourceLine>National Retail Federation, 2025</SourceLine>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-purple-500/20 text-[10px] font-semibold text-purple-200">
                    02
                  </span>
                  <span>
                    Returned stock left sitting draws <span className="font-semibold text-white">25–50%</span>{" "}
                    markdowns. <span className="font-semibold text-white">50–60%</span> of goods
                    need rework before resale.
                    <SourceLine>TheIndustry.fashion, 2025</SourceLine>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-fuchsia-500/20 text-[10px] font-semibold text-fuchsia-200">
                    <TrendingDown className="h-3 w-3" />
                  </span>
                  <span>
                    <span className="font-semibold text-white">EU 2026:</span> ban on destroying
                    unsold stock. Regulatory push toward resale and donation.
                    <SourceLine>TheIndustry.fashion, 2025</SourceLine>
                  </span>
                </li>
              </ul>
            </div>
          </FadeUp>
        </div>
      </Stagger>
    </SlideShell>
  ),
};
