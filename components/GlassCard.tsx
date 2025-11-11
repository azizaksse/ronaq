"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export const GlassCard = ({
  children,
  className,
  as: Tag = "div",
}: GlassCardProps) => (
  <Tag
    className={cn(
      "glass-panel border border-white/10 bg-white/5 p-6 text-white backdrop-blur-2xl",
      className,
    )}
  >
    {children}
  </Tag>
);
