import CategoryGrid from "@/components/category-grid";
import Hero from "@/components/hero";
import ProductGrid from "@/components/product-grid";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { getDictionary, type Locale } from "@/lib/i18n-server";
import { sampleProducts } from "@/lib/products/sample";

interface HomePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  // Get featured products (first 8 products)
  const featuredProducts = sampleProducts.slice(0, 8);

  // Get new arrivals (products with "nuevo" badge)
  const newArrivals = sampleProducts
    .filter((p) => p.badges.includes("nuevo"))
    .slice(0, 4);

  // Get best sellers (products with "más vendido" badge)
  const bestSellers = sampleProducts
    .filter((p) => p.badges.includes("más vendido"))
    .slice(0, 4);

  return (
    <>
      {/* JSON-LD for organization */}
      <OrganizationJsonLd locale={lang} />

      <div className="min-h-screen bg-(--bg)">
        {/* Hero Section */}
        <Hero />

        {/* Category Grid */}
        <CategoryGrid lang={lang} />

        {/* Featured Products */}
        <section className="py-16 bg-(--brand-50)">
          <div className="container-soft">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-(--fg) mb-4">
                {(dict.home as Record<string, string>).featured}
              </h2>
              <p className="text-lg text-(--muted) max-w-2xl mx-auto">
                {(dict.home as Record<string, string>).subtitle}
              </p>
            </div>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <section className="py-16">
            <div className="container-soft">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-(--fg) mb-4">
                  {(dict.home as Record<string, string>).newArrivals}
                </h2>
                <p className="text-lg text-(--muted) max-w-2xl mx-auto">
                  Descubre las últimas incorporaciones a nuestra colección
                </p>
              </div>
              <ProductGrid products={newArrivals} />
            </div>
          </section>
        )}

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <section className="py-16 bg-(--brand-50)">
            <div className="container-soft">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-(--fg) mb-4">
                  {(dict.home as Record<string, string>).bestSellers}
                </h2>
                <p className="text-lg text-(--muted) max-w-2xl mx-auto">
                  Los productos más populares de nuestra comunidad
                </p>
              </div>
              <ProductGrid products={bestSellers} />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16">
          <div className="container-soft">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-(--fg) mb-4">
                ¿Listo para encontrar tu par perfecto?
              </h2>
              <p className="text-lg text-(--muted) mb-8 max-w-2xl mx-auto">
                Explora nuestra colección completa y descubre zapatillas que se
                adaptan a tu estilo de vida
              </p>
              <a
                href={`/${lang}/productos`}
                className="btn-primary inline-block px-8 py-3 text-lg"
              >
                Ver Toda la Colección
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
