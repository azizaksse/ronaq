"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProfileStub() {
  return (
    <div className="min-h-[50vh] space-y-6 rounded-[32px] border border-white/10 bg-white/5 p-10 text-white">
      <p className="text-sm uppercase tracking-[0.4em] text-mint">حسابي</p>
      <h1 className="text-3xl font-bold">الملف الشخصي قريبًا</h1>
      <p className="text-sm text-white/70">
        نعمل حالياً على إطلاق تجربة حساب شخصي لتتبع طلباتك ومكافآتك. اشترك في
        النشرة أو تواصل معنا عبر واتساب لتصلك التحديثات.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-mint"
      >
        العودة إلى الرئيسية
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
