"use client";

import Pagination from "@/components/pagination";
import ProductFilters, { FilterState } from "@/components/product-filters";
import ProductGrid from "@/components/product-grid";
import { BreadcrumbJsonLd, ItemListJsonLd } from "@/components/seo/jsonld";
import { ProductGridSkeleton } from "@/components/skeletons";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { sampleProducts } from "@/lib/products/sample";
import { useMemo, useState } from "react";

interface ProductsPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default function ProductosPage({ params }: ProductsPageProps) {
  const lang = "es"; // TODO: Get from params
  const { t } = useI18n(lang as any);

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

  // Filter and sort products (useMemo for performance)
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

  // Paginate products (useMemo for performance)
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

  // Breadcrumb items
  const breadcrumbItems = [
    { name: t("nav.home"), url: `/${lang}` },
    { name: t("nav.products"), url: `/${lang}/productos` },
  ];

  return (
    <>
      {/* JSON-LD for ItemList and Breadcrumb */}
      <ItemListJsonLd products={paginatedProducts} locale={lang} />
      <BreadcrumbJsonLd items={breadcrumbItems} _locale={lang} />

      <div className="min-h-screen bg-(--bg)">
        {/* Header */}
        <div className="bg-(--brand-50) section-y">
          <div className="container-soft">
            <h1 className="text-4xl font-bold text-(--fg) mb-4">
              {t("products.title")}
            </h1>
            <p className="text-lg text-(--muted) max-w-2xl">
              {t("products.subtitle")}
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
              {t("products.filters")} ({filteredProducts.length}{" "}
              {t("common.items")})
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
                    <h3 className="text-lg font-semibold">
                      {t("products.filters")}
                    </h3>
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
    </>
  );
}
