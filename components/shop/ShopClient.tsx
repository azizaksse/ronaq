"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { type Product } from "@/lib/products";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

type ShopClientProps = {
  products: Product[];
  categories: readonly string[];
  highlightSlug?: string;
  initialCategory?: string | null;
};

export const ShopClient = ({
  products,
  categories,
  highlightSlug,
  initialCategory = null,
}: ShopClientProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(initialCategory);
  const [maxPrice, setMaxPrice] = useState(7000);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category ? product.category === category : true;
      const matchesPrice = product.priceDzd <= maxPrice;
      const matchesSearch =
        product.nameAr.includes(search) || product.descAr.includes(search);
      return matchesCategory && matchesPrice && matchesSearch;
    });
  }, [products, category, maxPrice, search]);

  const highlightProduct = useMemo(
    () => products.find((product) => product.slug === highlightSlug),
    [products, highlightSlug],
  );

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-white/15 bg-white/10 p-6 text-white shadow-glass backdrop-blur-2xl">
        <div className="flex items-center gap-3 text-sm text-white/85">
          <Filter className="h-4 w-4 text-mint" />
          صمّم اختيارك
        </div>
        <div className="mt-4 grid gap-6 md:grid-cols-[2fr_1fr]">
          <Input
            placeholder="ابحث باسم المنتج، الفائدة أو المكون"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="text-white placeholder:text-white/60"
          />
          <div className="flex flex-col gap-2 text-sm">
            <label className="text-white/80">
              الحد الأقصى للسعر: {maxPrice.toLocaleString("ar-DZ")} دج
            </label>
            <input
              type="range"
              min={1500}
              max={7000}
              step={100}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="accent-mint"
            />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setCategory(null)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition backdrop-blur",
              !category
                ? "border-mint bg-mint/15 text-mint"
                : "border-white/25 text-white/70 hover:text-white",
            )}
          >
            الكل
          </button>
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition backdrop-blur",
                category === option
                  ? "border-mint bg-mint/15 text-mint"
                  : "border-white/25 text-white/70 hover:text-white",
              )}
            >
              {option}
            </button>
          ))}
          {category && (
            <button
              type="button"
              onClick={() => setCategory(null)}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs text-white/80 backdrop-blur"
            >
              <X className="h-3.5 w-3.5" />
              تصفية جديدة
            </button>
          )}
        </div>
      </div>
      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-white/70">
          لم نعثر على منتجات مطابقة. جرّب تغيير الفلاتر أو السعر.
        </div>
      )}
      {highlightProduct && (
        <div className="rounded-3xl border border-mint/30 bg-white/5 p-4 text-center text-sm text-white/80">
          يتم توجيهك إلى:{" "}
          <span className="font-semibold text-white">{highlightProduct.nameAr}</span>
        </div>
      )}
    </div>
  );
};
