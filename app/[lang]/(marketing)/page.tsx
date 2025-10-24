import Hero from "@/components/hero";
import ProductGrid from "@/components/product-grid";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { getDictionary } from "@/lib/i18n-server";
import { getFeaturedProducts } from "@/lib/products/sample";

interface HomePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);

  // Get featured products (first 8 products)
  const featuredProducts = getFeaturedProducts(8);

  // Get new arrivals (products with "nuevo" badge)
  const newArrivals = getFeaturedProducts(4);

  // Get best sellers (products with "más vendido" badge)
  const bestSellers = getFeaturedProducts(4);

  return (
    <>
      {/* JSON-LD for organization */}
      <OrganizationJsonLd locale={lang} />

      <div className="min-h-screen bg-[var(--bg)]">
        {/* Hero Section */}
        <Hero />

        {/* Featured Products */}
        <section className="py-16 bg-[var(--brand-50)]">
          <div className="container-soft">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--fg)] mb-4">
                {(dict.home as any).featured}
              </h2>
              <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
                {(dict.home as any).subtitle}
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
                <h2 className="text-3xl font-bold text-[var(--fg)] mb-4">
                  {(dict.home as any).newArrivals}
                </h2>
                <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
                  Descubre las últimas incorporaciones a nuestra colección
                </p>
              </div>
              <ProductGrid products={newArrivals} />
            </div>
          </section>
        )}

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <section className="py-16 bg-[var(--brand-50)]">
            <div className="container-soft">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[var(--fg)] mb-4">
                  {(dict.home as any).bestSellers}
                </h2>
                <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
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
              <h2 className="text-3xl font-bold text-[var(--fg)] mb-4">
                ¿Listo para encontrar tu par perfecto?
              </h2>
              <p className="text-lg text-[var(--muted)] mb-8 max-w-2xl mx-auto">
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
