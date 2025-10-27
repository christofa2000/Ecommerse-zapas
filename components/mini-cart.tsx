"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, getSubtotal, getItemsCount, remove } = useCartStore();

  // Evitar mismatch de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getSubtotal();
  const itemsCount = mounted ? getItemsCount() : 0;
  const productsLabel = itemsCount === 1 ? "producto" : "productos";

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-white hover:bg-(--brand-50) text-(--fg)"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Carrito con ${itemsCount} ${productsLabel}`}
      >
        <svg
          className="h-6 w-6 text-(--fg)"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18m0 0l2.5-5M17 18l-2.5-5"
          />
        </svg>
        {mounted && itemsCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {itemsCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop (clic para cerrar) */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menú desplegable del carrito */}
          <Card className="absolute right-0 top-full z-50 mt-2 w-80 p-4 shadow-lg bg-(--brand-700) text-white border-none rounded-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Carrito</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-(--brand-600)"
                  aria-label="Cerrar carrito"
                >
                  ✕
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="opacity-90">Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="max-h-64 space-y-3 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex items-center space-x-3"
                      >
                        <div className="relative h-12 w-12 overflow-hidden rounded-md bg-(--brand-500)">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-white/80">
                            Talla {item.size} • {item.quantity}x
                          </p>
                          <p className="text-sm font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-white/80 hover:text-red-300"
                          onClick={() => remove(item.id, item.size)}
                          aria-label="Eliminar del carrito"
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-white/30" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80">Subtotal</span>
                      <span className="font-semibold">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Button
                        asChild
                        className="w-full bg-white text-(--brand-700) hover:bg-(--brand-100)"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/carrito">Ver Carrito</Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-white text-white hover:bg-(--brand-600)"
                        onClick={() => setIsOpen(false)}
                      >
                        Continuar Comprando
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
