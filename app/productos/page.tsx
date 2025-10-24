"use client";

import Pagination from "@/components/pagination";
import ProductFilters, { FilterState } from "@/components/product-filters";
import ProductGrid from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products/sample";
import { useMemo, useState } from "react";

export default function ProductosPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    color: "",
    size: "",
    sort: "price-asc",
    priceRange: [0, 50000],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filtros
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    if (filters.color) {
      filtered = filtered.filter((p) => p.colors.includes(filters.color));
    }
    if (filters.size) {
      filtered = filtered.filter((p) => p.sizes.includes(filters.size));
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter((p) => p.price >= min && p.price <= max);
    }

    // Orden
    switch (filters.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return filtered;
  }, [filters]);

  // Paginación
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Volver a la primera página
  };

  const handleClearFilters = () => {
    const cleared: FilterState = {
      category: "",
      color: "",
      size: "",
      sort: "price-asc",
      priceRange: [0, 50000],
    };
    setFilters(cleared);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-(--bg)">
      {/* Header */}
      <div className="section-y bg-(--brand-50)">
        <div className="container-soft">
          <h1 className="mb-4 text-4xl font-bold text-(--fg)">
            Todas las Zapatillas
          </h1>
          <p className="max-w-2xl text-lg text-(--muted)">
            Explorá nuestra colección completa de zapatillas sostenibles y
            cómodas.
          </p>
        </div>
      </div>

      {/* Botón Filtros (móvil) */}
      <div className="border-b bg-(--bg) lg:hidden">
        <div className="container-soft py-4">
          <Button
            onClick={() => setShowMobileFilters(true)}
            variant="outline"
            className="w-full"
          >
            Filtros ({filteredProducts.length} productos)
          </Button>
        </div>
      </div>

      <div className="container-soft py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Filtros Desktop */}
          <aside className="hidden lg:block">
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          {/* Drawer Filtros Móvil */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 overflow-y-auto bg-(--bg) p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filtros</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    ✕
                  </Button>
                </div>
                <ProductFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                  onClose={() => setShowMobileFilters(false)}
                />
              </div>
            </div>
          )}

          {/* Grilla de productos */}
          <main className="lg:col-span-3">
            {isLoading ? (
              <ProductGridSkeleton count={itemsPerPage} />
            ) : (
              <>
                <ProductGrid products={paginatedProducts} />

                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={filteredProducts.length}
                      onItemsPerPageChange={setItemsPerPage}
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
