"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  MessageCircle,
  User2,
  ShoppingCart,
} from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { cn, whatsappNumber } from "@/lib/utils";
import { buildWhatsAppLink } from "@/lib/wa";
import { useCart } from "@/lib/cart";

const links = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/shop", label: "التسوق", icon: ShoppingBag },
  { href: "/profile", label: "حسابي", icon: User2 },
];

const CartDockTrigger = () => {
  const { count } = useCart();
  return (
    <button
      type="button"
      className="flex w-full flex-col items-center gap-1 rounded-2xl bg-white/5 px-3 py-2 text-[11px] text-white/80 shadow-inner focus-ring"
    >
      <div className="relative">
        <ShoppingCart className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-1 -left-2 flex h-4 w-4 items-center justify-center rounded-full bg-mint text-[10px] font-bold text-[#0e1a14]">
            {count}
          </span>
        )}
      </div>
      السلة
    </button>
  );
};

export const MobileDock = () => {
  const pathname = usePathname();
  const waLink = buildWhatsAppLink(
    whatsappNumber,
    "أرغب في طلب سريع من رونق الحياة 🌿",
  );

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-between gap-3 rounded-[32px] border border-white/10 bg-[#0f1d16]/90 px-4 py-3 text-white shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-lg md:hidden">
      {links.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex flex-1 flex-col items-center gap-1 rounded-2xl px-3 py-1 text-[11px] text-white/70 transition",
            pathname === href && "bg-white/10 text-white shadow-inner",
          )}
        >
          <Icon className="h-5 w-5" />
          {label}
        </Link>
      ))}
      <CartDrawer trigger={<CartDockTrigger />} />
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-gradient-to-br from-green-1 to-green-2 px-3 py-2 text-[11px] font-semibold shadow-lg shadow-green-2/40"
      >
        <MessageCircle className="h-5 w-5" />
        واتساب
      </a>
    </div>
  );
};
