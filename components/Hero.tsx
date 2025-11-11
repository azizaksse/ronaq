"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FloatingOrb } from "@/app/(components)/floating-orbs";

const bullets = [
  "💊 مكملات غذائية",
  "💎 عناية بالبشرة والشعر",
  "🌿 مكونات طبيعية وآمنة",
  "🇩🇿 توصيل سريع لكل الولايات",
];

export const Hero = () => (
  <section className="relative overflow-hidden rounded-[48px] border border-white/10 bg-[#0f1d16]/90 p-10 text-white shadow-glass">
    <FloatingOrb className="-left-20 -top-10" color="jade" />
    <FloatingOrb className="-right-16 bottom-0" color="mint" delay={0.4} />
    <div className="noise-overlay" />
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 space-y-8 text-center md:text-right"
    >
      <div className="space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1 text-xs text-white/70 backdrop-blur">
          الدفع عند الاستلام • استمتع بتجربة طبيعية نقية
        </p>
        <div>
          <h1 className="text-3xl font-semibold leading-snug md:text-5xl">
            أهلاً بكم في رونق الحياة 💚
          </h1>
          <p className="mt-3 text-lg text-white/70 md:text-2xl">
            وجهتكم للمكملات الطبيعية ومنتجات الجمال المختارة بعناية!
          </p>
        </div>
      </div>
      <ul className="grid gap-3 text-sm md:grid-cols-2">
        {bullets.map((bullet) => (
          <li
            key={bullet}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/90"
          >
            {bullet}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3 text-sm font-semibold text-white md:flex-row md:items-center md:justify-start md:text-base">
        <Button asChild size="lg" className="w-full md:w-auto">
          <Link href="/shop">ابدأ التسوق</Link>
        </Button>
        <WhatsAppButton full className="md:w-auto" label="تواصل واتساب" />
      </div>
      <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 md:grid-cols-3">
        {[
          "الدفع عند الاستلام",
          "توصيل خلال 48-72 ساعة",
          "استرجاع خلال 7 أيام",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center justify-center gap-2 text-center"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  </section>
);
