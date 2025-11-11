"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  MessageCircle,
  Minus,
  Plus,
  Trash2,
  Truck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartButton } from "@/components/CartButton";
import { WilayaSelect } from "@/components/WilayaSelect";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Price } from "@/components/Price";
import { useCart } from "@/lib/cart";
import { brandName, whatsappNumber } from "@/lib/utils";
import { composeOrderMessage, buildWhatsAppLink } from "@/lib/wa";
import { useShippingQuote } from "@/hooks/useShippingQuote";
import { useToast } from "@/components/ui/use-toast";

type CartDrawerProps = {
  trigger?: React.ReactNode;
};

const phonePattern = /^(05|06|07)\d{8}$/;

export const CartDrawer = ({ trigger }: CartDrawerProps = {}) => {
  const { items, subtotal, updateQuantity, removeItem, clear } = useCart();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [wilaya, setWilaya] = useState<{ code: number; name: string } | null>(
    null,
  );
  const [attempted, setAttempted] = useState(false);
  const { toast } = useToast();

  const shippingQuote = useShippingQuote({
    destWilaya: wilaya?.code,
    items,
    cartTotal: subtotal,
    cod: true,
  });

  useEffect(() => {
    if (shippingQuote.data?.source === "fallback" && shippingQuote.data.warning) {
      toast({
        title: "تعذّر جلب تكلفة الشحن",
        description: "تم استعمال تقدير تقريبي لضمان إكمال الطلب.",
      });
    }
  }, [shippingQuote.data, toast]);
  useEffect(() => {
    if (!open) {
      setAttempted(false);
    }
  }, [open]);

  const shippingCost = shippingQuote.data?.priceDzd ?? 0;
  const codFee = shippingQuote.data?.codFeeDzd ?? 0;
  const discount = shippingQuote.data?.discountDzd ?? 0;

  const total = useMemo(
    () => Math.max(0, subtotal + shippingCost + codFee - discount),
    [subtotal, shippingCost, codFee, discount],
  );

  const missingName = attempted && !fullName.trim();
  const missingPhone = attempted && !phonePattern.test(phone.trim());
  const missingWilaya = attempted && !wilaya;
  const missingAddress = attempted && address.trim().length < 6;

  const canSubmit =
    items.length > 0 &&
    !missingName &&
    !missingPhone &&
    !missingWilaya &&
    !missingAddress;

  const handleSubmit = () => {
    setAttempted(true);
    if (!canSubmit || !wilaya) return;

    const message = composeOrderMessage({
      brand: brandName,
      lines: items.map((item) => ({
        name: item.nameAr,
        quantity: item.quantity,
        priceDzd: item.priceDzd,
        totalDzd: item.priceDzd * item.quantity,
      })),
      subtotalDzd: subtotal,
      shippingDzd: shippingCost,
      codFeeDzd: codFee,
      discountDzd: discount,
      totalDzd: total,
      eta: shippingQuote.data?.eta,
      customer: {
        name: fullName.trim(),
        phone: phone.trim(),
        wilaya: `${wilaya.code} — ${wilaya.name}`,
        address: address.trim(),
        note: note.trim(),
      },
    });

    const link = buildWhatsAppLink(whatsappNumber, message);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger ?? <CartButton />}
      </SheetTrigger>
      <SheetContent side="right" className="flex h-full flex-col bg-[#0f1d16] text-white">
        <SheetHeader className="text-right">
          <SheetTitle>سلة مشترياتك</SheetTitle>
          <p className="text-sm text-white/70">
            أكمل البيانات أدناه لتحصل على عرض شحن دقيق وتأكيد سريع عبر واتساب.
          </p>
        </SheetHeader>
        <div className="mt-6 flex-1 space-y-6 overflow-y-auto px-2">
          <section className="space-y-4">
            {items.length === 0 && (
              <div className="rounded-3xl border border-dashed border-white/20 p-8 text-center text-white/60">
                لم تضف أي منتج بعد. ابدأ بالتسوق ثم عد لإتمام الطلب.
              </div>
            )}
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex gap-3">
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white/10">
                    <Image
                      src={item.image}
                      alt={item.nameAr}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{item.nameAr}</p>
                        <p className="text-xs text-white/60">
                          {item.category}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="rounded-full border border-white/15 p-1 text-white/60 transition hover:text-white"
                        aria-label={`حذف ${item.nameAr}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-white/15 px-2 py-1">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="rounded-full p-1 text-white/70 transition hover:text-white"
                          aria-label="إنقاص الكمية"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="rounded-full p-1 text-white/70 transition hover:text-white"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <Price
                        value={item.priceDzd * item.quantity}
                        className="text-sm font-semibold text-mint"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {items.length > 0 && (
            <>
              <section className="space-y-3">
                <div className="grid gap-3">
                  <Input
                    placeholder="الاسم الكامل"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className={missingName ? "border-red-400/70" : undefined}
                  />
                  {missingName && (
                    <p className="text-xs text-red-300">
                      يرجى إدخال الاسم الكامل.
                    </p>
                  )}
                  <Input
                    placeholder="رقم الهاتف (مثال: 0555000000)"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className={missingPhone ? "border-red-400/70" : undefined}
                  />
                  {missingPhone && (
                    <p className="text-xs text-red-300">
                      يجب أن يبدأ الرقم بـ 05 أو 06 أو 07 ويحتوي على 10 أرقام.
                    </p>
                  )}
                  <WilayaSelect
                    value={wilaya?.code}
                    onChange={(option) => setWilaya(option)}
                    error={missingWilaya ? "اختر الولاية المطلوبة" : null}
                  />
                  <Input
                    placeholder="العنوان المختصر"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    className={missingAddress ? "border-red-400/70" : undefined}
                  />
                  {missingAddress && (
                    <p className="text-xs text-red-300">
                      يرجى إدخال عنوان واضح من 6 أحرف على الأقل.
                    </p>
                  )}
                  <textarea
                    placeholder="ملاحظة إضافية (اختياري)"
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    className="min-h-[90px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                  />
                </div>
              </section>

              <section className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Truck className="h-4 w-4 text-mint" />
                  <span>تكلفة الشحن والدفع عند الاستلام</span>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#122319]/60 p-4 text-sm">
                  {shippingQuote.isLoading && (
                    <div className="flex items-center gap-3 text-white/70">
                      <Loader2 className="h-4 w-4 animate-spin text-mint" />
                      جاري حساب تكلفة الشحن...
                    </div>
                  )}
                  {!shippingQuote.isLoading && shippingQuote.error && (
                    <p className="text-red-300">{shippingQuote.error}</p>
                  )}
                  {!shippingQuote.isLoading && !shippingQuote.error && (
                    <div className="space-y-1 text-white">
                      <p>
                        الشحن:{" "}
                        <span className="font-semibold text-mint">
                          {shippingCost.toLocaleString("ar-DZ")} دج
                        </span>
                      </p>
                      <p className="text-white/80">
                        رسوم الدفع عند الاستلام:{" "}
                        {codFee.toLocaleString("ar-DZ")} دج
                      </p>
                      {discount > 0 && (
                        <p className="text-mint">
                          خصم فوري: -{discount.toLocaleString("ar-DZ")} دج
                        </p>
                      )}
                      {shippingQuote.data?.eta && (
                        <p className="text-white/70">
                          التوصيل المتوقع: {shippingQuote.data.eta}
                        </p>
                      )}
                      {shippingQuote.data?.freeFromDzd && (
                        <p className="text-xs text-white/50">
                          شحن مجاني ابتداءً من{" "}
                          {shippingQuote.data.freeFromDzd.toLocaleString("ar-DZ")} دج
                        </p>
                      )}
                      {shippingQuote.data?.source === "fallback" && (
                        <p className="text-xs text-white/50">
                          * تم اعتماد تقدير تقريبي لضمان استمرار العملية.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>

        <div className="space-y-4 border-t border-white/10 p-6">
          <div className="space-y-2 text-sm text-white/70">
            <div className="flex items-center justify-between">
              <span>المجموع الفرعي</span>
              <Price value={subtotal} className="text-base font-semibold" />
            </div>
            <div className="flex items-center justify-between">
              <span>الشحن</span>
              <span>{shippingCost.toLocaleString("ar-DZ")} دج</span>
            </div>
            <div className="flex items-center justify-between">
              <span>رسوم الدفع عند الاستلام</span>
              <span>{codFee.toLocaleString("ar-DZ")} دج</span>
            </div>
            {discount > 0 && (
              <div className="flex items-center justify-between text-mint">
                <span>الخصم</span>
                <span>-{discount.toLocaleString("ar-DZ")} دج</span>
              </div>
            )}
            <Separator className="border-white/10" />
            <div className="flex items-center justify-between text-base font-semibold text-white">
              <span>الإجمالي</span>
              <Price value={total} className="text-xl font-bold text-mint" />
            </div>
          </div>
          <Button
            disabled={!canSubmit || shippingQuote.isLoading || items.length === 0}
            className="w-full gap-2"
            onClick={handleSubmit}
          >
            <MessageCircle className="h-4 w-4" />
            إتمام الطلب واتساب
          </Button>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="w-full text-center text-xs text-white/50 underline underline-offset-4"
            >
              تفريغ السلة
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
