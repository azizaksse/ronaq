import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { GlassCard } from "@/components/GlassCard";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { BundleCard } from "@/components/BundleCard";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { FAQ } from "@/components/FAQ";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { bundles, categories, products } from "@/lib/products";

const uspCards = [
  {
    title: "طبيعي 100%",
    description: "مكونات عضوية مختبرة بدون إضافات مخفية أو مواد حافظة.",
    icon: "🌱",
  },
  {
    title: "جودة موثّقة",
    description: "تحاليل معتمدة لكل دفعة إنتاج لضمان النقاء والفعالية.",
    icon: "💎",
  },
  {
    title: "دفع عند الاستلام",
    description: "راحة وأمان كامل مع فحص الطلب قبل الدفع.",
    icon: "💳",
  },
  {
    title: "خدمة زبائن سريعة",
    description: "خبراء متواجدون عبر الهاتف وواتساب يوميًا لخدمتك.",
    icon: "⚡",
  },
];

const categoryIcons: Record<string, string> = {
  "مكملات غذائية": "💊",
  "عناية بالبشرة": "💎",
  "عناية بالشعر": "💇‍♀️",
  "زيوت وأعشاب": "🌿",
};

const collomakImages = [
  "/products/clomac-1.jpg",
  "/products/clomac-2.jpg",
  "/products/clomac-3.jpg",
  "/products/clomac-4.jpg",
];

const collomakHighlights = [
  "يعالج عين السمكة والتصلبات بسرعة فائقة.",
  "يحتوي على حمض اللاكتيك لتقشير موضعي آمن.",
  "بولي دوكانول يهدئ الألم فور التطبيق.",
  "مثالي لمسامير القدم مع نتائج واضحة خلال أيام.",
];

export default function HomePage() {
  const bestSellers = products.slice(0, 8);

  return (
    <div className="space-y-16">
      <section id="hero">
        <Hero />
      </section>

      <section className="grid gap-6 md:grid-cols-4">
        {uspCards.map((usp) => (
          <GlassCard
            key={usp.title}
            className="space-y-2 text-center md:text-right"
          >
            <span className="text-3xl">{usp.icon}</span>
            <h3 className="text-lg font-semibold">{usp.title}</h3>
            <p className="text-sm text-white/70">{usp.description}</p>
          </GlassCard>
        ))}
      </section>

      <GlassCard
        as="section"
        className="space-y-6 border-white/15 bg-white/10"
        aria-labelledby="categories"
      >
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.4em] text-mint">
            الفئات
          </p>
          <h2 id="categories" className="text-3xl font-bold text-white">
            اكتشف مجموعاتنا المختارة
          </h2>
          <p className="text-sm text-white/80">
            مصفوفة مختارة بعناية تجمع بين المكملات، الجمال، والعناية العشبية
            داخل بطاقات زجاجية فاخرة.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              label={category}
              icon={categoryIcons[category] ?? "🌿"}
            />
          ))}
        </div>
      </GlassCard>

      <section className="space-y-6" aria-labelledby="best-sellers">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.4em] text-mint">
            الأكثر طلبًا
          </p>
          <h2 id="best-sellers" className="text-3xl font-bold">
            منتجات مختارة بعناية
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section
        id="collomak"
        className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
        aria-labelledby="collomak-heading"
      >
        <GlassCard className="space-y-4 border-white/15 bg-[#122017]/80 backdrop-blur-2xl">
          <p className="text-sm uppercase tracking-[0.4em] text-mint">
            جديد رونق الحياة
          </p>
          <h2 id="collomak-heading" className="text-3xl font-bold text-white">
            Collomak لعلاج الثآليل فوراً
          </h2>
          <p className="text-sm text-white/85">
            محلول كوللوماك يعالج عين السمكة، الثآليل، ومسامير القدم بسرعة بفضل حمض
            اللاكتيك والمخدر الموضعي بولي دوكانول، ما يمنحك راحة فورية وثقة في
            كل خطوة.
          </p>
          <ul className="space-y-2 text-sm text-white/80">
            {collomakHighlights.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-mint" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild className="gap-2">
              <Link href="/shop?highlight=collomak">اكتشف Collomak الآن</Link>
            </Button>
            <WhatsAppButton label="استفسر واتساب" />
          </div>
          <div className="text-sm text-white/70">
            خدمة التوصيل متوفرة لـ 58 ولاية 🛒🚚
            <br />
            هاتف الطلب السريع:{" "}
            <a href="tel:00676610457" className="text-mint underline">
              00676610457
            </a>
          </div>
        </GlassCard>
        <div className="grid gap-4 sm:grid-cols-2">
          {collomakImages.map((src) => (
            <div
              key={src}
              className="overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-glass"
            >
              <Image
                src={src}
                alt="صور منتج Collomak"
                width={460}
                height={460}
                className="h-full w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="offers" className="space-y-6" aria-labelledby="bundles">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.4em] text-mint">
            وفر أكثر
          </p>
          <h2 id="bundles" className="text-3xl font-bold">
            باقات مصممة لنمطك
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} {...bundle} />
          ))}
        </div>
      </section>

      <section
        id="reviews"
        className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
        aria-labelledby="reviews-heading"
      >
        <ReviewCarousel />
        <GlassCard className="flex flex-col justify-between space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-mint">
              ثقة دائمة
            </p>
            <h2 id="reviews-heading" className="mt-2 text-3xl font-bold">
              4.9/5 متوسط تقييم العملاء
            </h2>
            <p className="mt-2 text-sm text-white/70">
              أكثر من 12,000 طلب تم توصيله خلال العامين الماضيين مع دعم لحظي عبر
              واتساب.
            </p>
          </div>
          <WhatsAppButton full label="احك لنا تجربتك" />
        </GlassCard>
      </section>

      <GlassCard
        as="section"
        className="space-y-4 bg-gradient-to-r from-green-1/60 via-green-2/40 to-green-1/60 text-white lg:flex lg:items-center lg:justify-between lg:space-y-0"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-mint">
            تذكير لطيف
          </p>
          <h2 className="mt-2 text-3xl font-bold">
            حاب تطلب بسرعة؟ راسلنا على واتساب الآن
          </h2>
          <p className="mt-2 text-base text-white/90">
            فريق الاستشارة متواجد يوميًا من الساعة 9 صباحًا حتى 11 ليلاً مع
            إمكانية إرسال عرض الشحن مباشرة وخيارات توصيل مرنة لكل الولايات.
          </p>
        </div>
        <div className="mt-6 lg:mt-0">
          <WhatsAppButton />
        </div>
      </GlassCard>

      <section id="faq" className="space-y-6">
        <FAQ />
      </section>
    </div>
  );
}
