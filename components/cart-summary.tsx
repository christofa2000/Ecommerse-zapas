"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({
  subtotal,
  shipping,
  total,
  onCheckout,
}: CartSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="p-6 sticky top-8">
      <h2 className="text-xl font-semibold text-(--fg) mb-6">
        Resumen del Pedido
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between text-(--muted)">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-(--muted)">
          <span>Envío</span>
          <span>
            {shipping === 0 ? (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-700"
              >
                Gratis
              </Badge>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>

        {shipping > 0 && (
          <p className="text-sm text-(--brand-600)">
            Agrega {formatPrice(20000 - subtotal)} más para envío gratis
          </p>
        )}

        <Separator />

        <div className="flex justify-between text-lg font-semibold text-(--fg)">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <Button
          size="lg"
          className="w-full bg-(--brand-500) hover:bg-(--brand-600) text-white"
          onClick={onCheckout}
        >
          Finalizar Compra
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="w-full border-(--brand-300) text-(--brand-700) hover:bg-(--brand-100)"
          asChild
        >
          <Link href="/productos">Continuar Comprando</Link>
        </Button>
      </div>

      {/* Security badges */}
      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-center space-x-4 text-sm text-(--muted)">
          <div className="flex items-center space-x-1">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Pago seguro</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Garantía</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

