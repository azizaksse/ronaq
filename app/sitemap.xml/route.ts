import { categories, products } from "@/lib/products";

export async function GET() {
  const baseUrl = "https://ronaklife.com";
  const routes = ["", "/shop"].map(
    (path) =>
      `<url><loc>${baseUrl}${path}</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
  );

  const productRoutes = products
    .map(
      (product) =>
        `<url><loc>${baseUrl}/shop?highlight=${product.slug}</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`,
    )
    .join("");

  const categoryRoutes = categories
    .map(
      (category) =>
        `<url><loc>${baseUrl}/shop?category=${encodeURIComponent(
          category,
        )}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.join("")}
${productRoutes}
${categoryRoutes}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
