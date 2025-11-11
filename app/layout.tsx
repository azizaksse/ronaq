import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { Toaster } from "@/components/ui/toaster";
import { brandName } from "@/lib/utils";
import { products } from "@/lib/products";

const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-kufi",
});

const siteUrl = "https://ronaklife.com";
const heroDescription =
  "رونق الحياة، وجهتك الراقية للمكملات الطبيعية ومنتجات الجمال بعناية فائقة مع توصيل سريع لكل الولايات.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${brandName} | مكملات طبيعية بعناية`,
    template: `%s | ${brandName}`,
  },
  description: heroDescription,
  openGraph: {
    title: `${brandName} | مكملات طبيعية وجمال`,
    description: heroDescription,
    url: siteUrl,
    siteName: brandName,
    locale: "ar_DZ",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: brandName,
      },
    ],
  },
  keywords: [
    "مكملات طبيعية",
    "منتجات جمال",
    "الدفع عند الاستلام",
    "رونق الحياة",
    "متجر جزائري",
  ],
  icons: {
    icon: "/icon.png",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+213555000000",
        contactType: "customer service",
        areaServed: "DZ",
        availableLanguage: ["Arabic"],
      },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.slice(0, 4).map((product, index) => ({
      "@type": "Product",
      position: index + 1,
      name: product.nameAr,
      description: product.descAr,
      image: `${siteUrl}${product.image}`,
      offers: {
        "@type": "Offer",
        priceCurrency: "DZD",
        price: product.priceDzd,
        availability: "https://schema.org/InStock",
      },
    })),
  };

  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${kufi.variable} bg-[var(--bg)] text-white antialiased`}
      >
        <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,_rgba(46,125,50,0.25),transparent_60%)]">
          <div className="absolute inset-0 -z-10 opacity-60 blur-[200px]" />
          <div className="container space-y-16 pb-24 pt-6">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <MobileDock />
          <Toaster />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </body>
    </html>
  );
}
