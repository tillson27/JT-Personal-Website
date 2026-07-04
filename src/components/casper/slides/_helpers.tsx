import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export function Stagger({
  children,
  delay = 0,
  gap = 0.08,
  className,
  fill = false,
}: {
  children: ReactNode;
  delay?: number;
  gap?: number;
  className?: string;
  fill?: boolean;
}) {
  const combined = fill
    ? `flex min-h-0 flex-1 flex-col ${className ?? ""}`
    : className;
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: gap, delayChildren: delay },
        },
      }}
      className={combined}
    >
      {children}
    </motion.div>
  );
}

export function FadeUp({
  children,
  className,
  y = 24,
  duration = 0.6,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: easeOut },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.4,
  className,
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const durationMs = duration * 1000;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  const shown =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString();
  return (
    <span className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}

export function GradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

export function AnimatedBar({
  percent,
  color = "from-purple-400 to-fuchsia-400",
  delay = 0,
}: {
  percent: number;
  color?: string;
  delay?: number;
}) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1.2, delay, ease: easeOut }}
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
      />
    </div>
  );
}
