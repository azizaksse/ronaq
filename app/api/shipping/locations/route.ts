import { NextResponse } from "next/server";
import { fetchWilayas } from "@/lib/shippingApi";
import { WILAYAS } from "@/lib/wilayas";

type CachePayload = {
  data: typeof WILAYAS;
  timestamp: number;
  source: "api" | "static";
};

let cache: CachePayload = {
  data: WILAYAS,
  timestamp: 0,
  source: "static",
};

const DAY = 1000 * 60 * 60 * 24;

export async function GET() {
  const now = Date.now();
  if (now - cache.timestamp < DAY) {
    return NextResponse.json(cache);
  }

  try {
    const data = await fetchWilayas();
    cache = { data, timestamp: now, source: "api" };
  } catch {
    cache = { data: WILAYAS, timestamp: now, source: "static" };
  }

  return NextResponse.json(cache);
}
