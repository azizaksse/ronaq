"use client";

import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart";

type CartButtonProps = {
  onClick?: () => void;
  className?: string;
  label?: string;
};

export const CartButton = ({ onClick, className, label }: CartButtonProps) => {
  const { count } = useCart();

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 text-white transition hover:border-mint/40 hover:text-mint focus-ring",
        label ? "h-11" : "h-11 w-11 px-0",
        className,
      )}
      aria-label="السلة"
    >
      <ShoppingCart className="h-4 w-4" />
      {count > 0 && (
        <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-mint text-[11px] font-bold text-[#0e1a14]">
          {count}
        </span>
      )}
      {label && <span className="ms-2 text-sm font-medium">{label}</span>}
    </button>
  );
};
