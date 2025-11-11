"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
  label: string;
  icon?: string;
  className?: string;
};

export const CategoryCard = ({
  label,
  icon = "🌿",
  className,
}: CategoryCardProps) => (
  <motion.div whileHover={{ y: -6 }} className={cn("h-full", className)}>
    <Link
      href={`/shop?category=${encodeURIComponent(label)}`}
      className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-5 text-white transition hover:border-mint/40"
    >
      <span className="text-3xl">{icon}</span>
      <div>
        <p className="text-lg font-semibold">{label}</p>
        <ArrowUpRight className="mt-2 h-4 w-4 text-white/60" />
      </div>
    </Link>
  </motion.div>
);
