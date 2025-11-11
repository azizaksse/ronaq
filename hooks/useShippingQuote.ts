import { useEffect, useMemo, useRef, useState } from "react";
import type { CartItem } from "@/lib/cart";

export type ShippingQuote = {
  priceDzd: number;
  eta: string;
  codFeeDzd?: number;
  discountDzd?: number;
  freeFromDzd?: number;
  source: "api" | "fallback";
  warning?: string;
};

type Params = {
  destWilaya?: number | null;
  items: CartItem[];
  cartTotal: number;
  cod: boolean;
};

export const useShippingQuote = ({
  destWilaya,
  items,
  cartTotal,
  cod,
}: Params) => {
  const [data, setData] = useState<ShippingQuote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const lastRequestKey = useRef<string>("");

  const itemsPayload = useMemo(
    () =>
      items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        priceDzd: item.priceDzd,
        weightGrams: item.weightGrams ?? 250,
      })),
    [items],
  );

  useEffect(() => {
    if (!destWilaya || items.length === 0) {
      setData(null);
      setError(null);
      return;
    }

    const controller = new AbortController();
    const key = JSON.stringify({
      destWilaya,
      cartTotal,
      cod,
      items: itemsPayload,
    });
    lastRequestKey.current = key;

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await fetch("/api/shipping/quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            destWilaya,
            cartTotal,
            cod,
            items: itemsPayload,
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("تعذّر جلب تكلفة الشحن");
        }

        const payload = (await response.json()) as ShippingQuote;
        if (lastRequestKey.current === key) {
          setData(payload);
          setError(null);
        }
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(
          err instanceof Error ? err.message : "تعذّر حساب تكلفة الشحن",
        );
      } finally {
        if (lastRequestKey.current === key) {
          setIsLoading(false);
        }
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [destWilaya, cartTotal, cod, itemsPayload, items.length]);

  return { data, error, isLoading };
};
