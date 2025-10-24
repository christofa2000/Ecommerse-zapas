"use client";

import Pagination from "@/components/pagination";
import ProductFilters, { FilterState } from "@/components/product-filters";
import ProductGrid from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { sampleProducts } from "@/lib/products/sample";
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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...sampleProducts];

    // Apply filters
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.color) {
      filtered = filtered.filter((p) => p.colors.includes(filters.color));
    }

    if (filters.size) {
      filtered = filtered.filter((p) => p.sizes.includes(filters.size));
    }

    // Apply sorting
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

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: "",
      color: "",
      size: "",
      sort: "price-asc",
      priceRange: [0, 50000] as [number, number],
    };
    setFilters(clearedFilters);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="bg-[var(--brand-50)] section-y">
        <div className="container-soft">
          <h1 className="text-4xl font-bold text-[var(--fg)] mb-4">
            Todas las Zapatillas
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl">
            Explora nuestra colección completa de zapatillas sostenibles y
            cómodas.
          </p>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="border-b bg-white lg:hidden">
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
          {/* Desktop Filters */}
          <div className="hidden lg:block">
            <ProductFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Mobile Filters Drawer */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowMobileFilters(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
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

          {/* Products Grid */}
          <div className="lg:col-span-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}
