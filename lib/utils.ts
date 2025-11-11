import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (value: number) =>
  `${value.toLocaleString("ar-DZ")} دج`;

export const brandName =
  process.env.NEXT_PUBLIC_BRAND_NAME ?? "رونق الحياة";

export const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+213555000000";
