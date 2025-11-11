import { NextResponse } from "next/server";
import { fallbackQuote } from "@/lib/shippingFallback";
import { quoteRate } from "@/lib/shippingApi";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.destWilaya !== "number") {
    return NextResponse.json(
      { error: "الرجاء اختيار الولاية لإتمام حساب الشحن" },
      { status: 400 },
    );
  }

  const { destWilaya, items = [], cartTotal = 0, cod = true } = body;
  const fallback = () =>
    fallbackQuote({
      destWilaya,
      cartTotal: Number(cartTotal) || 0,
    });

  if (process.env.MOCK_SHIPPING === "1") {
    const data = fallback();
    return NextResponse.json({ ...data, source: "fallback" });
  }

  try {
    const data = await quoteRate({
      destWilaya,
      cod,
      items: items.map((item: any) => ({
        priceDzd: Number(item.priceDzd),
        quantity: Number(item.quantity),
        weightGrams: Number(item.weightGrams ?? 250),
      })),
    });
    return NextResponse.json({ ...data, source: "api" });
  } catch {
    const data = fallback();
    return NextResponse.json({
      ...data,
      source: "fallback",
      warning: "api_failed",
    });
  }
}
