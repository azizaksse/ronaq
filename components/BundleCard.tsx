"use client";

import { motion } from "framer-motion";
import { Gift, ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/Price";
import { type Bundle } from "@/lib/products";
import {
  buildWhatsAppLink,
  getProductById,
  type CartItem,
  useCart,
} from "@/lib/cart";

type BundleCardProps = Bundle;

export const BundleCard = ({
  nameAr,
  descAr,
  priceDzd,
  originalPriceDzd,
  products,
  badge,
  id,
}: BundleCardProps) => {
  const { addItem } = useCart();
  const resolvedProducts = products
    .map((productId) => getProductById(productId))
    .filter((product): product is NonNullable<typeof product> => Boolean(product));

  const bundleCartItems = resolvedProducts.map<CartItem>((product) => ({
    ...product,
    quantity: 1,
  }));
  const whatsappLink = buildWhatsAppLink(bundleCartItems);

  return (
    <motion.article
      layoutId={id}
      whileHover={{ y: -8 }}
      className="flex h-full flex-col rounded-3xl border border-white/10 bg-[#102017]/90 p-6 text-white shadow-glass backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1 text-xs">
          <Gift className="h-3.5 w-3.5" />
          {badge}
        </div>
        <span className="text-xs text-white/60">
          وفر {Math.round(((originalPriceDzd - priceDzd) / originalPriceDzd) * 100)}%
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold">{nameAr}</h3>
      <p className="text-sm text-white/70">{descAr}</p>
      <ul className="mt-4 space-y-1 text-sm text-white/80">
        {resolvedProducts.map(
          (product) =>
            product && (
              <li key={product.id} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                {product.nameAr}
              </li>
            ),
        )}
      </ul>
      <div className="mt-auto space-y-3 pt-6">
        <div className="flex items-center gap-3">
          <Price value={priceDzd} className="text-2xl font-bold text-mint" />
          <span className="text-sm text-white/50 line-through">
            {originalPriceDzd.toLocaleString("ar-DZ")} دج
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            className="gap-2"
            onClick={() => resolvedProducts.forEach((product) => addItem(product))}
          >
            <ShoppingBag className="h-4 w-4" />
            أضف للسلة
          </Button>
          <Button asChild variant="outline" className="gap-2 text-mint">
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              اطلب بالواتساب
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
};
