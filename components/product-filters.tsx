"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { sampleProducts } from "@/lib/products/sample";
import { useState } from "react";

export interface FilterState {
  category: string;
  gender?: string;
  color: string;
  size: string;
  sort: string;
  priceRange: [number, number];
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

// Move FilterCard outside the component to avoid creating components during render
const FilterCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <Card className={`p-4 ${className}`}>{children}</Card>;

export default function ProductFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen = true,
  onClose,
}: ProductFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  // Extract unique values from products
  const categories = Array.from(new Set(sampleProducts.map((p) => p.category)));
  const colors = Array.from(new Set(sampleProducts.flatMap((p) => p.colors)));
  const sizes = Array.from(new Set(sampleProducts.flatMap((p) => p.sizes)));

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose?.();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: "",
      gender: "",
      color: "",
      size: "",
      sort: "price-asc",
      priceRange: [0, 50000] as [number, number],
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const activeFiltersCount = Object.values(filters).filter(
    (value) => value && value !== "price-asc"
  ).length;

  return (
    <div className={`space-y-6 ${!isOpen ? "hidden lg:block" : ""}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-(--fg)">Filtros</h3>
        {activeFiltersCount > 0 && (
          <Badge
            variant="secondary"
            className="bg-(--brand-100) text-(--brand-700)"
          >
            {activeFiltersCount}
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {/* Gender Filter */}
        <FilterCard>
          <h4 className="text-sm font-medium text-(--fg) mb-3">Género</h4>
          <div className="space-y-2">
            <button
              className={`chip w-full justify-start ${
                !localFilters.gender ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("gender", "")}
            >
              Todos
            </button>
            <button
              className={`chip w-full justify-start ${
                localFilters.gender === "mujer" ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("gender", "mujer")}
            >
              Mujer
            </button>
            <button
              className={`chip w-full justify-start ${
                localFilters.gender === "hombre" ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("gender", "hombre")}
            >
              Hombre
            </button>
            <button
              className={`chip w-full justify-start ${
                localFilters.gender === "ninos" ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("gender", "ninos")}
            >
              Niño
            </button>
            <button
              className={`chip w-full justify-start ${
                localFilters.gender === "unisex" ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("gender", "unisex")}
            >
              Unisex
            </button>
          </div>
        </FilterCard>

        {/* Category Filter */}
        <FilterCard>
          <h4 className="text-sm font-medium text-(--fg) mb-3">Categoría</h4>
          <div className="space-y-2">
            <button
              className={`chip w-full justify-start ${
                !localFilters.category ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("category", "")}
            >
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`chip w-full justify-start ${
                  localFilters.category === category ? "selected" : ""
                }`}
                onClick={() => handleFilterChange("category", category)}
              >
                {category === "running" ? "Running" : "Casual"}
              </button>
            ))}
          </div>
        </FilterCard>

        {/* Color Filter */}
        <FilterCard>
          <h4 className="text-sm font-medium text-(--fg) mb-3">Color</h4>
          <div className="space-y-2">
            <button
              className={`chip w-full justify-start ${
                !localFilters.color ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("color", "")}
            >
              Todos
            </button>
            {colors.map((color) => (
              <button
                key={color}
                className={`chip w-full justify-start ${
                  localFilters.color === color ? "selected" : ""
                }`}
                onClick={() => handleFilterChange("color", color)}
              >
                {color}
              </button>
            ))}
          </div>
        </FilterCard>

        {/* Size Filter */}
        <FilterCard>
          <h4 className="text-sm font-medium text-(--fg) mb-3">Talla</h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              className={`chip justify-center ${
                !localFilters.size ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("size", "")}
            >
              Todas
            </button>
            {sizes.map((size) => (
              <button
                key={size}
                className={`chip justify-center ${
                  localFilters.size === size ? "selected" : ""
                }`}
                onClick={() => handleFilterChange("size", size)}
              >
                {size}
              </button>
            ))}
          </div>
        </FilterCard>

        {/* Sort Filter */}
        <FilterCard>
          <h4 className="text-sm font-medium text-(--fg) mb-3">Ordenar por</h4>
          <div className="space-y-2">
            <button
              className={`chip w-full justify-start ${
                localFilters.sort === "price-asc" ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("sort", "price-asc")}
            >
              Precio: Menor a Mayor
            </button>
            <button
              className={`chip w-full justify-start ${
                localFilters.sort === "price-desc" ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("sort", "price-desc")}
            >
              Precio: Mayor a Menor
            </button>
            <button
              className={`chip w-full justify-start ${
                localFilters.sort === "name-asc" ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("sort", "name-asc")}
            >
              Nombre: A-Z
            </button>
            <button
              className={`chip w-full justify-start ${
                localFilters.sort === "name-desc" ? "selected" : ""
              }`}
              onClick={() => handleFilterChange("sort", "name-desc")}
            >
              Nombre: Z-A
            </button>
          </div>
        </FilterCard>
      </div>

      <Separator />

      <div className="space-y-3">
        <Button onClick={handleApplyFilters} className="w-full btn-primary">
          Aplicar Filtros
        </Button>

        <Button
          variant="outline"
          onClick={handleClearFilters}
          className="w-full"
        >
          Limpiar Filtros
        </Button>
      </div>
    </div>
  );
}
