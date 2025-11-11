"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SearchSheet } from "@/components/SearchSheet";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { cn } from "@/lib/utils";

const links = [
  { href: "#hero", label: "الرئيسية", isAnchor: true },
  { href: "/shop", label: "التسوق" },
  { href: "#offers", label: "العروض", isAnchor: true },
  { href: "#reviews", label: "آراء العملاء", isAnchor: true },
  { href: "#contact", label: "تواصل", isAnchor: true },
] as const;

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 space-y-3">
      <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center text-xs text-white/80 backdrop-blur">
        الدفع عند الاستلام • توصيل سريع لكل الولايات 🇩🇿
      </div>
      <nav
        className={cn(
          "flex items-center justify-between gap-4 rounded-full border border-white/10 px-6 py-3 text-white transition backdrop-blur-xl",
          scrolled ? "bg-[#0f1d16]/90 shadow-glass" : "bg-[#0f1d16]/70",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold"
        >
          <Image
            src="/logo.jpg"
            alt="رونق الحياة"
            width={44}
            height={44}
            priority
            className="h-11 w-11 rounded-full border border-mint/40 object-cover shadow-[0_0_25px_rgba(185,246,202,0.35)]"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xs uppercase tracking-[0.4em] text-mint">
              رونق الحياة
            </span>
            <span>رونق الحياة</span>
          </div>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) =>
            "isAnchor" in link && link.isAnchor ? (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 transition hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 transition hover:text-white"
              >
                {link.label}
              </Link>
            ),
          )}
        </div>
        <div className="flex items-center gap-3">
          <SearchSheet />
          <CartDrawer />
          <div className="hidden md:block">
            <WhatsAppButton label="اطلب واتساب" />
          </div>
        </div>
      </nav>
    </header>
  );
};
