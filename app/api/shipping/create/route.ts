import { NextResponse } from "next/server";
import { createShipment } from "@/lib/shippingApi";
import { fallbackQuote } from "@/lib/shippingFallback";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "بيانات غير صالحة" }, { status: 400 });
  }

  if (process.env.MOCK_SHIPPING === "1") {
    const estimate = fallbackQuote({
      destWilaya: Number(body.customer?.wilaya) || 16,
      cartTotal: Number(body.codAmount) || 0,
    });
    return NextResponse.json({
      trackingNumber: `MOCK-${Date.now()}`,
      priceDzd: estimate.priceDzd,
      eta: estimate.eta,
      source: "fallback",
    });
  }

  try {
    const data = await createShipment(body);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "فشل إنشاء الشحنة",
      },
      { status: 500 },
    );
  }
}
