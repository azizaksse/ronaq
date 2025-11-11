import type { Metadata } from "next";
import { categories, products } from "@/lib/products";
import { ShopClient } from "@/components/shop/ShopClient";
import { brandName } from "@/lib/utils";
import { CartDrawer } from "@/components/CartDrawer";
import { CartButton } from "@/components/CartButton";

export const metadata: Metadata = {
  title: `التسوق | ${brandName}`,
  description:
    "استكشف تشكيلة رونق الحياة من المكملات الطبيعية، العناية بالبشرة والشعر، والزيوت العشبية مع فلاتر ذكية وسلة سهلة.",
};

type ShopPageProps = {
  searchParams?: {
    category?: string;
    highlight?: string;
  };
};

export default function ShopPage({ searchParams }: ShopPageProps) {
  const initialCategory = searchParams?.category ?? null;

  return (
    <div className="space-y-10 pb-16 pt-4">
      <div className="flex flex-col gap-4 text-white md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.4em] text-mint">
            المتجر
          </p>
          <h1 className="text-4xl font-bold">اختر روتينك المثالي</h1>
          <p className="text-base text-white/90">
            استخدم البحث والفلاتر لاختيار ما يناسب هدفك اليومي، ثم أنهِ الطلب
            مباشرة عبر السلة أو واتساب.
          </p>
        </div>
        <CartDrawer
          trigger={
            <CartButton
              label="عرض السلة"
              className="w-full justify-center border-white/15 bg-white/10"
            />
          }
        />
      </div>
      <ShopClient
        products={products}
        categories={categories}
        highlightSlug={searchParams?.highlight}
        initialCategory={initialCategory}
      />
    </div>
  );
}
