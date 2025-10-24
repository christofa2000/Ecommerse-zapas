import Hero from "@/components/hero";
import ProductGrid from "@/components/product-grid";
import { getFeaturedProducts } from "@/lib/products/sample";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Hero />

      <div className="container-soft">
        <ProductGrid
          products={featuredProducts}
          title="Más Vendidos"
          description="Nuestras zapatillas más populares, elegidas por miles de clientes satisfechos"
        />
      </div>

      {/* Features Section */}
      <section className="bg-[var(--brand-50)] py-16">
        <div className="container-soft">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--fg)] mb-4">
              ¿Por qué elegir nuestras zapatillas?
            </h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Cada par está diseñado pensando en la comodidad, durabilidad y
              respeto por el medio ambiente.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-[var(--brand-200)] flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-[var(--brand-600)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--fg)] mb-2">
                Sostenibles
              </h3>
              <p className="text-[var(--muted)]">
                Hechas con materiales naturales y procesos que respetan el medio
                ambiente.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-[var(--brand-200)] flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-[var(--brand-600)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--fg)] mb-2">
                Cómodas
              </h3>
              <p className="text-[var(--muted)]">
                Diseñadas para brindar máxima comodidad durante todo el día.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-[var(--brand-200)] flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-[var(--brand-600)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--fg)] mb-2">
                Duraderas
              </h3>
              <p className="text-[var(--muted)]">
                Construidas para durar, reduciendo la necesidad de reemplazos
                frecuentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-soft text-center">
          <h2 className="text-3xl font-bold text-[var(--fg)] mb-4">
            ¿Listo para encontrar tu par perfecto?
          </h2>
          <p className="text-lg text-[var(--muted)] mb-8 max-w-2xl mx-auto">
            Explora nuestra colección completa y descubre zapatillas que se
            adaptan a tu estilo de vida.
          </p>
          <a
            href="/productos"
            className="inline-flex items-center justify-center rounded-md bg-[var(--brand-500)] px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-[var(--brand-600)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)] focus:ring-offset-2 transition-colors"
          >
            Ver Toda la Colección
          </a>
        </div>
      </section>
    </>
  );
}
