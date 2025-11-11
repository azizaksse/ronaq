"use client";

import { Button } from "@/components/ui/button";
import { buildWhatsAppLink } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { MessageCircleMore } from "lucide-react";
import Link from "next/link";

type WhatsAppButtonProps = {
  label?: string;
  className?: string;
  full?: boolean;
};

export const WhatsAppButton = ({
  label = "تواصل واتساب",
  className,
  full = false,
}: WhatsAppButtonProps) => (
  <Button
    asChild
    variant="outline"
    className={cn(
      "border-mint/50 bg-mint/10 text-mint hover:bg-mint/20",
      full && "w-full",
      className,
    )}
  >
    <Link href={buildWhatsAppLink([])} target="_blank" rel="noreferrer">
      <MessageCircleMore className="ms-2 h-4 w-4" />
      {label}
    </Link>
  </Button>
);
