import dynamic from "next/dynamic";
import CategoryGrid from "@/components/category-grid";
import Hero from "@/components/hero";
import ProductGrid from "@/components/product-grid";
import { OrganizationJsonLd } from "@/components/seo/jsonld";
import { getDictionary, type Locale } from "@/lib/i18n-server";
import { sampleProducts } from "@/lib/products/sample";

/**
 * NOTA: Esta página (home) actualmente usa datos mock de `lib/products/sample.ts`
 * 
 * Para migrar a datos del backend:
 * 1. Importar `getProducts` de `@/lib/api/products`
 * 2. Obtener productos destacados desde el backend
 * 3. Adaptar con `adaptApiProductToFrontend`
 * 
 * Por ahora, la fuente de verdad para productos es:
 * - PLP: `/es/productos` → usa backend (`GET /api/products`)
 * - PDP: `/es/productos/[slug]` → usa backend (`GET /api/products/slug/:slug`)
 * - Home: `/` → usa datos mock (este archivo)
 */

const VideoGallery = dynamic(() => import("@/components/video-gallery"), {
  loading: () => (
    <section className="py-16 bg-(--bg)">
      <div className="container-soft">
        <div className="skeleton h-96 rounded-(--radius)" />
      </div>
    </section>
  ),
});

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
  // TODO: Migrar a datos del backend usando getProducts() con filtro de destacados
  const featuredProducts = sampleProducts.slice(0, 4);

  // Get new arrivals (specific products: rosa, violeta, amarillo, hombre5)
  // TODO: Migrar a datos del backend usando getProducts() ordenados por createdAt DESC
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

        {/* Video Gallery Section */}
        <VideoGallery />

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
