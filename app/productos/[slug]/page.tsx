"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart/store";
import { getProductBySlug, sampleProducts } from "@/lib/products/sample";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState } from "react";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  const { add } = useCartStore();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    notFound();
  }

  const images = product.images || [product.image];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getColorValue = (color: string): string => {
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
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }

    if (!product.inStock || (product.stock[selectedSize] || 0) <= 0) {
      alert("Este producto no está disponible en la talla seleccionada");
      return;
    }

    add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor || product.colors[0],
    });

    alert("Producto agregado al carrito");
  };

  const isAddToCartDisabled =
    !selectedSize ||
    !product.inStock ||
    (product.stock[selectedSize] || 0) <= 0;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="container-soft py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-[var(--radius)] bg-[var(--brand-50)]">
              <Image
                src={images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover transition-opacity duration-300"
                priority
              />
            </div>

            {/* Thumbnail images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
                      selectedImage === index
                        ? "border-[var(--brand-500)]"
                        : "border-[var(--brand-200)] hover:border-[var(--brand-300)]"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <Badge
                  key={badge}
                  variant={badge === "nuevo" ? "default" : "secondary"}
                  className={`${
                    badge === "nuevo"
                      ? "bg-[var(--brand-500)] text-white"
                      : badge === "más vendido"
                      ? "bg-[var(--brand-100)] text-[var(--brand-700)]"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-[var(--fg)]">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-[var(--fg)]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-[var(--muted)] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="destructive">
                    -
                    {Math.round(
                      (1 - product.price / product.originalPrice) * 100
                    )}
                    %
                  </Badge>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-[var(--muted)]">{product.description}</p>

            <Separator />

            {/* Colors */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[var(--fg)]">
                Colores disponibles
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center space-x-2 rounded-lg border p-3 transition-colors ${
                      selectedColor === color
                        ? "border-[var(--brand-500)] bg-[var(--brand-50)]"
                        : "border-[var(--brand-200)] hover:border-[var(--brand-400)]"
                    }`}
                  >
                    <div
                      className="h-6 w-6 rounded-full border border-[var(--brand-200)]"
                      style={{ backgroundColor: getColorValue(color) }}
                    />
                    <span className="text-sm font-medium text-[var(--fg)]">
                      {color}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-[var(--fg)]">
                Tallas disponibles
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => {
                  const stock = product.stock[size] || 0;
                  const isOutOfStock = stock <= 0;
                  const isSelected = selectedSize === size;

                  return (
                    <button
                      key={size}
                      onClick={() => !isOutOfStock && setSelectedSize(size)}
                      disabled={isOutOfStock}
                      className={`rounded-md border py-2 text-center text-sm font-medium transition-colors ${
                        isSelected
                          ? "border-[var(--brand-500)] bg-[var(--brand-500)] text-white"
                          : isOutOfStock
                          ? "border-[var(--brand-200)] bg-[var(--brand-100)] text-[var(--muted)] cursor-not-allowed"
                          : "border-[var(--brand-200)] text-[var(--fg)] hover:border-[var(--brand-400)] hover:bg-[var(--brand-50)]"
                      }`}
                    >
                      {size}
                      {isOutOfStock && (
                        <div className="text-xs text-[var(--muted)]">
                          Agotado
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              {selectedSize && (
                <p className="text-sm text-[var(--muted)]">
                  Stock disponible: {product.stock[selectedSize] || 0} unidades
                </p>
              )}
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                size="lg"
                disabled={isAddToCartDisabled}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddToCart}
              >
                {!product.inStock
                  ? "Producto agotado"
                  : !selectedSize
                  ? "Selecciona una talla"
                  : "Agregar al Carrito"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-[var(--brand-300)] text-[var(--brand-700)] hover:bg-[var(--brand-100)]"
              >
                Agregar a Favoritos
              </Button>
            </div>

            {/* Features */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-[var(--fg)] mb-4">
                Características
              </h3>
              <ul className="space-y-2 text-sm text-[var(--muted)]">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--brand-500)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {product.materials && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-[var(--fg)] mb-2">
                    Materiales
                  </h4>
                  <p className="text-sm text-[var(--muted)]">
                    {product.materials.join(", ")}
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[var(--fg)] mb-8">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sampleProducts
              .filter(
                (p) => p.id !== product.id && p.category === product.category
              )
              .slice(0, 4)
              .map((relatedProduct) => (
                <a
                  key={relatedProduct.id}
                  href={`/productos/${relatedProduct.slug}`}
                  className="group block"
                >
                  <Card className="overflow-hidden transition-shadow group-hover:shadow-lg">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[var(--fg)] group-hover:text-[var(--brand-600)] transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-[var(--fg)] mt-1">
                        {formatPrice(relatedProduct.price)}
                      </p>
                    </div>
                  </Card>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
