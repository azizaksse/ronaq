"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FloatingOrbProps = {
  className?: string;
  delay?: number;
  color?: "mint" | "jade" | "emerald";
};

const colorMap: Record<NonNullable<FloatingOrbProps["color"]>, string> = {
  mint: "floating-orb floating-orb--mint",
  jade: "floating-orb floating-orb--jade",
  emerald: "floating-orb floating-orb--emerald",
};

export const FloatingOrb = ({
  className,
  delay = 0,
  color = "mint",
}: FloatingOrbProps) => {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.25, scale: 1 }}
      transition={{ duration: 2, delay }}
      className={cn(colorMap[color], className)}
    />
  );
};
