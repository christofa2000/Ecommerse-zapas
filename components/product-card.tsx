"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCartStore } from "@/lib/cart/store";
import { Product } from "@/lib/products/sample";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { add } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.inStock) return;

    add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.sizes[0], // Default to first size
    });
  };

  return (
    <motion.div
      whileHover={{
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="group"
    >
      <Card className="overflow-hidden bg-white transition-shadow duration-300 group-hover:shadow-lg">
        <Link href={`/productos/${product.slug}`}>
          <div className="relative aspect-square overflow-hidden bg-white">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Badges */}
            <div className="absolute left-3 top-3 flex flex-wrap gap-1">
              {product.badges.map((badge) => (
                <Badge
                  key={badge}
                  variant={badge === "nuevo" ? "default" : "secondary"}
                  className={`text-xs ${
                    badge === "nuevo"
                      ? "bg-(--brand-500) text-white"
                      : badge === "más vendido"
                        ? "bg-(--brand-100) text-(--brand-700)"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Quick add button */}
            {product.inStock && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 right-3"
              >
                <Button
                  size="sm"
                  className="bg-(--brand-500) hover:bg-(--brand-600) text-white shadow-lg"
                  onClick={handleAddToCart}
                >
                  Agregar
                </Button>
              </motion.div>
            )}
          </div>

          <div className="p-4">
            <h3 className="mb-2 text-lg font-semibold text-(--fg) group-hover:text-(--brand-600) transition-colors">
              {product.name}
            </h3>

            <p className="mb-3 text-sm text-(--muted) line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-(--fg)">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-(--muted) line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {product.originalPrice && (
                <Badge variant="destructive" className="text-xs">
                  -
                  {Math.round(
                    (1 - product.price / product.originalPrice) * 100
                  )}
                  %
                </Badge>
              )}
            </div>

            {/* Colors preview */}
            <div className="mt-3 flex items-center space-x-2">
              <span className="text-xs text-(--muted)">Colores:</span>
              <div className="flex space-x-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <div
                    key={index}
                    className="h-4 w-4 rounded-full border border-(--brand-200)"
                    style={{
                      backgroundColor: getColorValue(color),
                    }}
                    title={color}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-xs text-(--muted)">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}

// Helper function to get color values
function getColorValue(color: string): string {
  const colorMap: Record<string, string> = {
    Natural: "#f5f5dc",
    Blanco: "#ffffff",
    Gris: "#808080",
    Verde: "#4ade80",
    Beige: "#f5deb3",
    Negro: "#000000",
    Azul: "#3b82f6",
    Rosa: "#f472b6",
    Amarillo: "#fbbf24",
  };
  return colorMap[color] || "#e5e7eb";
}
