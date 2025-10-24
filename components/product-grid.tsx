import { Product } from "@/lib/products/sample";
import ProductCard from "./product-card";

interface ProductGridProps {
  products: Product[];
  title?: string;
  description?: string;
}

export default function ProductGrid({
  products,
  title,
  description,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-(--brand-100) flex items-center justify-center">
            <svg
              className="h-8 w-8 text-(--brand-400)"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-(--fg) mb-2">
            No se encontraron productos
          </h3>
          <p className="text-(--muted)">
            Intenta ajustar los filtros o explorar otras categorías.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12">
      {(title || description) && (
        <div className="mb-8 text-center">
          {title && (
            <h2 className="text-3xl font-bold text-(--fg) mb-4">{title}</h2>
          )}
          {description && (
            <p className="text-lg text-(--muted) max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
