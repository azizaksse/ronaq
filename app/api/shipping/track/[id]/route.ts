import { NextResponse } from "next/server";
import { trackShipment } from "@/lib/shippingApi";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_: Request, { params }: Params) {
  const trackingNumber = params.id;
  if (!trackingNumber) {
    return NextResponse.json(
      { error: "رقم التتبع مطلوب" },
      { status: 400 },
    );
  }

  try {
    const data = await trackShipment(trackingNumber);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "تعذّر تتبع الشحنة",
      },
      { status: 500 },
    );
  }
}
