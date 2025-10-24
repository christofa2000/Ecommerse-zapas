"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/cart/store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MiniCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, getSubtotal, getItemsCount, remove } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getSubtotal();
  const itemsCount = getItemsCount();

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="relative p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Carrito con ${itemsCount} productos`}
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
        {itemsCount > 0 && (
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
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Cart Dropdown */}
          <Card className="absolute right-0 top-full z-50 mt-2 w-80 p-4 shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-(--fg)">Carrito</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-(--muted)">Tu carrito está vacío</p>
                </div>
              ) : (
                <>
                  <div className="max-h-64 space-y-3 overflow-y-auto">
                    {items.map((item) => (
                      <div
                        key={`${item.id}-${item.size}`}
                        className="flex items-center space-x-3"
                      >
                        <div className="relative h-12 w-12 overflow-hidden rounded-md bg-(--brand-50)">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-(--fg) truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-(--muted)">
                            Talla {item.size} • {item.quantity}x
                          </p>
                          <p className="text-sm font-semibold text-(--fg)">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-(--muted) hover:text-red-600"
                          onClick={() => remove(item.id, item.size)}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-(--muted)">Subtotal</span>
                      <span className="font-semibold text-(--fg)">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <Button
                        asChild
                        className="w-full btn-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/carrito">Ver Carrito</Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
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


