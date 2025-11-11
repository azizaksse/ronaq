"use client";

import Link from "next/link";
import { Facebook, Instagram, Phone, Mail } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Footer = () => {
  return (
    <footer
      id="contact"
      className="mt-24 rounded-[40px] border border-white/10 bg-[#0b1611] p-10 text-white shadow-inner"
    >
      <div className="grid gap-10 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">رونق الحياة</h3>
          <p className="text-sm text-white/70">
            نختار لك أفضل المكملات ومنتجات الجمال الطبيعية بعناية، مع تجربة شراء
            فاخرة وسريعة.
          </p>
          <WhatsAppButton label="تواصل معنا" />
        </div>
        <div>
          <h4 className="text-lg font-semibold">روابط سريعة</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/shop" className="hover:text-white">
                متجر المنتجات
              </Link>
            </li>
            <li>
              <a href="#offers" className="hover:text-white">
                العروض الحالية
              </a>
            </li>
            <li>
              <a href="#reviews" className="hover:text-white">
                آراء العملاء
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-white">
                الأسئلة الشائعة
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold">سياسات</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <span>سياسة الخصوصية</span>
            </li>
            <li>
              <span>سياسة الاسترجاع</span>
            </li>
            <li>
              <span>شروط الاستخدام</span>
            </li>
          </ul>
        </div>
        <div className="space-y-3 text-sm text-white/70">
          <h4 className="text-lg font-semibold">تواصل</h4>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+213 555 000 000</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>hello@ronaklife.dz</span>
          </div>
          <div className="flex gap-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 p-2 text-white/70 hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 p-2 text-white/70 hover:text-white"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-center text-xs text-white/60 md:flex-row md:items-center md:justify-between">
        <p>© 2025 رونق الحياة. كل الحقوق محفوظة.</p>
        <p>صنع بإتقان لمحبي الحياة الخضراء.</p>
      </div>
    </footer>
  );
};
