// app/page.tsx
import Hero from "@/components/hero";
import ProductGrid from "@/components/product-grid";
import { getFeaturedProducts } from "@/lib/products/sample";
import Link from "next/link";

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
      <section className="bg-(--brand-50) py-16">
        <div className="container-soft">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-(--fg)">
              ¿Por qué elegir nuestras zapatillas?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-(--muted)">
              Cada par está diseñado pensando en la comodidad, durabilidad y
              respeto por el medio ambiente.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--brand-200)">
                <svg
                  className="h-8 w-8 text-(--brand-600)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-(--fg)">
                Sostenibles
              </h3>
              <p className="text-(--muted)">
                Hechas con materiales naturales y procesos que respetan el medio
                ambiente.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--brand-200)">
                <svg
                  className="h-8 w-8 text-(--brand-600)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-(--fg)">
                Cómodas
              </h3>
              <p className="text-(--muted)">
                Diseñadas para brindar máxima comodidad durante todo el día.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-(--brand-200)">
                <svg
                  className="h-8 w-8 text-(--brand-600)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-(--fg)">
                Duraderas
              </h3>
              <p className="text-(--muted)">
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
          <h2 className="mb-4 text-3xl font-bold text-(--fg)">
            ¿Listo para encontrar tu par perfecto?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-(--muted)">
            Explorá nuestra colección completa y descubrí zapatillas que se
            adaptan a tu estilo de vida.
          </p>

          <Link
            href="/productos"
            className="inline-flex items-center justify-center rounded-md bg-(--brand-500) px-8 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-(--brand-600) focus:outline-none focus:ring-2 focus:ring-(--brand-500) focus:ring-offset-2"
          >
            Ver Toda la Colección
          </Link>
        </div>
      </section>
    </>
  );
}
