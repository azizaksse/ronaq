type OrderLine = {
  name: string;
  quantity: number;
  priceDzd: number;
  totalDzd: number;
};

type CustomerInfo = {
  name: string;
  phone: string;
  wilaya: string;
  address: string;
  note?: string;
};

type ComposeOrderMessageArgs = {
  brand: string;
  lines: OrderLine[];
  subtotalDzd: number;
  shippingDzd: number;
  discountDzd?: number;
  codFeeDzd?: number;
  totalDzd: number;
  eta?: string;
  customer: CustomerInfo;
};

const formatDzd = (value: number) =>
  `${Math.max(0, Math.round(value)).toLocaleString("ar-DZ")} دج`;

export const composeOrderMessage = ({
  brand,
  lines,
  subtotalDzd,
  shippingDzd,
  discountDzd = 0,
  codFeeDzd = 0,
  totalDzd,
  eta,
  customer,
}: ComposeOrderMessageArgs) => {
  const orderLines = lines
    .map(
      (line, index) =>
        `${index + 1}. ${line.name} × ${line.quantity} — ${formatDzd(line.totalDzd)}`,
    )
    .join("\n");

  const details = [
    `مرحبا ${brand} 👋`,
    "أرغب في تأكيد الطلب التالي:",
    "",
    orderLines,
    "",
    `المجموع الفرعي: ${formatDzd(subtotalDzd)}`,
    `الشحن: ${formatDzd(shippingDzd)}`,
    `رسوم الدفع عند الاستلام: ${formatDzd(codFeeDzd)}`,
    `الخصم: ${formatDzd(discountDzd)}`,
    `الإجمالي: ${formatDzd(totalDzd)}`,
    eta ? `التوصيل المتوقع: ${eta}` : null,
    "",
    "بيانات الزبون:",
    `الاسم: ${customer.name}`,
    `الهاتف: ${customer.phone}`,
    `الولاية: ${customer.wilaya}`,
    `العنوان المختصر: ${customer.address}`,
    customer.note ? `ملاحظة: ${customer.note}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return details;
};

export const buildWhatsAppLink = (numberE164: string, message: string) => {
  const phone = numberE164.replace(/[^+\d]/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
