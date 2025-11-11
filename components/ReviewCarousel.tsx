"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";
import { reviews } from "@/lib/products";

export const ReviewCarousel = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % reviews.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-white backdrop-blur-xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={reviews[active].id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.45 }}
          className="space-y-4"
        >
          <div className="flex gap-2 text-mint">
            {Array.from({ length: reviews[active].rating }).map((_, index) => (
              <Star key={index} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <p className="text-lg leading-relaxed text-white/90">
            “{reviews[active].quote}”
          </p>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <ShieldCheck className="h-4 w-4 text-mint" />
            <span>{reviews[active].author}</span>
            <span className="text-white/40">•</span>
            <span>{reviews[active].state}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-6 flex gap-2">
        {reviews.map((review, index) => (
          <button
            key={review.id}
            type="button"
            onClick={() => setActive(index)}
            className={`h-2.5 flex-1 rounded-full transition ${index === active ? "bg-mint" : "bg-white/20"}`}
            aria-label={`عرض رأي ${review.author}`}
          />
        ))}
      </div>
    </div>
  );
};
