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

  // Get featured products (first 4 products)
  const featuredProducts = sampleProducts.slice(0, 4);

  // Get new arrivals (specific products: rosa, violeta, amarillo, hombre5)
  const newArrivals = sampleProducts.filter((p) =>
    ["14", "15", "16", "11"].includes(p.id)
  );

  return (
    <>
      {/* JSON-LD for organization */}
      <OrganizationJsonLd locale={lang} />

      <div className="min-h-screen bg-(--bg)">
        {/* Hero Section */}
        <Hero />

        {/* Category Grid */}
        <CategoryGrid />

        {/* Featured Products */}
        <section className="py-16 bg-(--brand-50)">
          <div className="container-soft">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-(--fg) mb-4">
                {(dict.home as Record<string, string>).featured}
              </h2>
              <p className="text-lg text-(--muted) max-w-2xl mx-auto">
                Cómodas, elegantes y respetuosas con el planeta
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
              </div>
              <ProductGrid products={newArrivals} />
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
