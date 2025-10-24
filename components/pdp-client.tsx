"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart/store";
import type { Product } from "@/lib/products/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Props = { product: Product; related: Product[]; lang?: string };

export function PdpClient({ product, related }: Props) {
  const add = useCartStore((s) => s.add);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(0);

  const images = product.images?.length ? product.images : [product.image];
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);

  // stock por talla o número total
  const stockForSize = (size: string) => {
    const s: unknown = (product as any).stock;
    if (typeof s === "number") return s;
    if (s && typeof s === "object" && size in (s as Record<string, number>)) {
      return (s as Record<string, number>)[size] ?? 0;
    }
    return 0;
  };

  const isAddToCartDisabled =
    !selectedSize || !product.inStock || stockForSize(selectedSize) <= 0;

  const colorHex = (color: string) =>
    ({
      Natural: "#f5f5dc",
      Blanco: "#ffffff",
      Gris: "#808080",
      Verde: "#4ade80",
      Beige: "#f5deb3",
      Negro: "#000000",
      Azul: "#3b82f6",
      Rosa: "#f472b6",
      Amarillo: "#fbbf24",
    }[color] || "#e5e7eb");

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Seleccioná una talla.");
    if (!product.inStock || stockForSize(selectedSize) <= 0)
      return alert("Sin stock para la talla seleccionada.");

    add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor || product.colors[0],
      qty: 1,
    });
    alert("Producto agregado al carrito");
  };

  return (
    <div className="min-h-screen bg-(--bg)">
      <div className="container-soft py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Galería */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-(--radius) bg-(--brand-50)">
              <Image
                src={images[selectedImage]}
                alt={product.alt || product.name}
                width={900}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-cover transition-opacity duration-300"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((src, i) => (
                  <button
                    key={src + i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
                      selectedImage === i
                        ? "border-(--brand-500)"
                        : "border-(--brand-200) hover:border-(--brand-300)"
                    }`}
                    aria-label={`Ver imagen ${i + 1}`}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} miniatura ${i + 1}`}
                      width={140}
                      height={140}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            {!!product.badges?.length && (
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant={badge === "nuevo" ? "default" : "secondary"}
                    className={
                      badge === "nuevo"
                        ? "bg-(--brand-500) text-white"
                        : badge === "más vendido"
                        ? "bg-(--brand-100) text-(--brand-700)"
                        : "bg-green-100 text-green-700"
                    }
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            <h1 className="text-3xl font-bold text-(--fg)">{product.name}</h1>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-(--fg)">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-(--muted) line-through">
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

            <p className="text-lg text-(--muted)">{product.description}</p>
            <Separator />

            {!!product.colors?.length && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-(--fg)">
                  Colores disponibles
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 rounded-lg border p-3 transition-colors ${
                        selectedColor === color
                          ? "border-(--brand-500) bg-(--brand-50)"
                          : "border-(--brand-200) hover:border-(--brand-400)"
                      }`}
                      aria-pressed={selectedColor === color}
                    >
                      <div
                        className="h-6 w-6 rounded-full border border-(--brand-200)"
                        style={{ backgroundColor: colorHex(color) }}
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-(--fg)">
                        {color}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!!product.sizes?.length && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-(--fg)">
                  Tallas disponibles
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => {
                    const stock = stockForSize(size);
                    const isOut = stock <= 0;
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => !isOut && setSelectedSize(size)}
                        disabled={isOut}
                        className={`rounded-md border py-2 text-center text-sm font-medium transition-colors ${
                          isSelected
                            ? "border-(--brand-500) bg-(--brand-500) text-white"
                            : isOut
                            ? "cursor-not-allowed border-(--brand-200) bg-(--brand-100) text-(--muted)"
                            : "border-(--brand-200) text-(--fg) hover:border-(--brand-400) hover:bg-(--brand-50)"
                        }`}
                        aria-pressed={isSelected}
                        aria-disabled={isOut}
                      >
                        {size}
                        {isOut && (
                          <div className="text-xs text-(--muted)">Agotado</div>
                        )}
                      </button>
                    );
                  })}
                </div>
                {selectedSize && (
                  <p className="text-sm text-(--muted)">
                    Stock disponible: {stockForSize(selectedSize)} unidades
                  </p>
                )}
              </div>
            )}

            <div className="space-y-4">
              <Button
                size="lg"
                disabled={isAddToCartDisabled}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
                onClick={handleAddToCart}
              >
                {!product.inStock
                  ? "Producto agotado"
                  : !selectedSize
                  ? "Seleccioná una talla"
                  : "Agregar al carrito"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="w-full border-(--brand-300) text-(--brand-700) hover:bg-(--brand-100)"
              >
                Agregar a favoritos
              </Button>
            </div>

            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-(--fg)">
                Características
              </h3>
              {!!product.features?.length && (
                <ul className="space-y-2 text-sm text-(--muted)">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-(--brand-500)" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              {!!product.materials?.length && (
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-semibold text-(--fg)">
                    Materiales
                  </h4>
                  <p className="text-sm text-(--muted)">
                    {product.materials.join(", ")}
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Relacionados */}
        <div className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-(--fg)">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((rp) => (
              <Link
                key={rp.id}
                href={`/productos/${rp.slug}`}
                className="group block"
              >
                <Card className="overflow-hidden transition-shadow group-hover:shadow-lg">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={rp.image}
                      alt={rp.alt || rp.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-(--fg) font-semibold transition-colors group-hover:text-(--brand-600)">
                      {rp.name}
                    </h3>
                    <p className="mt-1 text-lg font-bold text-(--fg)">
                      {formatPrice(rp.price)}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
