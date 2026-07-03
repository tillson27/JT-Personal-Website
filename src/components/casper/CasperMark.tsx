import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import logo from "@/assets/casper/casper-logo.png";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

const SIZE_MAP: Record<Size, string> = {
  xs: "h-6 w-6",
  sm: "h-9 w-9",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
};

const RADIUS_MAP: Record<Size, string> = {
  xs: "rounded-lg",
  sm: "rounded-xl",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-2xl",
};

const SHADOW_MAP: Record<Size, string> = {
  xs: "",
  sm: "shadow-[0_6px_20px_-4px_rgba(168,85,247,0.6)]",
  md: "shadow-[0_8px_24px_-6px_rgba(168,85,247,0.6)]",
  lg: "shadow-[0_10px_30px_-5px_rgba(168,85,247,0.65)]",
  xl: "shadow-[0_14px_40px_-8px_rgba(168,85,247,0.7)]",
};

export default function CasperMark({
  size = "md",
  animated = false,
  className,
  ...rest
}: {
  size?: Size;
  animated?: boolean;
  className?: string;
} & Omit<HTMLMotionProps<"img">, "src" | "alt">) {
  const base = `inline-block ${SIZE_MAP[size]} ${RADIUS_MAP[size]} ${SHADOW_MAP[size]} object-cover ring-1 ring-inset ring-white/10 ${className ?? ""}`;

  if (animated) {
    return (
      <motion.img
        src={logo}
        alt="Casper Studios"
        animate={{ y: [0, -4, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className={base}
        {...rest}
      />
    );
  }

  return (
    <motion.img
      src={logo}
      alt="Casper Studios"
      className={base}
      {...rest}
    />
  );
}
