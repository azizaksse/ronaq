"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/Price";
import { type Product } from "@/lib/products";
import { buildWhatsAppLink, type CartItem, useCart } from "@/lib/cart";

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const previewCart: CartItem = { ...product, quantity: 1 };
  const whatsappPreview = buildWhatsAppLink([previewCart]);
  const productLink = `/shop?highlight=${product.slug}`;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-4 text-white shadow-glass backdrop-blur-xl"
    >
      <Link
        href={productLink}
        className="relative mb-4 block overflow-hidden rounded-2xl bg-gradient-to-br from-green-1/40 to-green-2/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
      >
        <Image
          src={product.image}
          alt={product.nameAr}
          width={320}
          height={320}
          className="h-52 w-full rounded-2xl object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-[#0f1d16]/60 px-3 py-1 text-xs">
          {product.category}
        </span>
      </Link>
      <div className="flex flex-1 flex-col gap-3">
        <Link
          href={productLink}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
        >
          <h3 className="text-lg font-semibold text-white">{product.nameAr}</h3>
          <p className="text-sm text-white/70">{product.descAr}</p>
        </Link>
        <div className="flex flex-wrap gap-2 text-[11px] text-mint">
          {product.highlights?.map((item) => (
            <span
              key={item}
              className="rounded-full border border-mint/20 px-3 py-1 backdrop-blur"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <Price value={product.priceDzd} className="text-xl font-bold" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => addItem(product)} className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            أضف للسلة
          </Button>
          <Button asChild variant="outline" className="gap-2 text-mint">
            <a href={whatsappPreview} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              اطلب بالواتساب
            </a>
          </Button>
        </div>
      </div>
    </motion.article>
  );
};
