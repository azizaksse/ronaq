"use client";

import { useMemo, useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/products";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const SearchSheet = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const term = query.trim();
    if (!term) return products.slice(0, 4);
    return products.filter(
      (product) =>
        product.nameAr.includes(term) ||
        product.descAr.includes(term) ||
        product.category.includes(term),
    );
  }, [query]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="بحث" className="focus-ring rounded-full">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15">
          <Search className="h-4 w-4" />
        </div>
      </SheetTrigger>
      <SheetContent side="top" className="max-h-[70vh] overflow-y-auto rounded-b-[32px] border border-white/10">
        <SheetHeader>
          <SheetTitle>ابحث عن منتجك المثالي</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-8 pb-8">
          <Input
            autoFocus
            placeholder="اكتب اسم المنتج أو الفائدة..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="space-y-3">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/shop?highlight=${product.slug}`}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-mint/40"
                onClick={() => setOpen(false)}
              >
                <div>
                  <p className="font-medium">{product.nameAr}</p>
                  <p className="text-xs text-white/70">{product.descAr}</p>
                </div>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            ))}
            {results.length === 0 && (
              <p className="text-center text-sm text-white/60">
                لم نجد نتائج. جرّب كلمة مفتاحية أخرى.
              </p>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
