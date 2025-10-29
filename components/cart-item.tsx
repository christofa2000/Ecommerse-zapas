"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { toast } from "sonner";

interface CartItemProps {
  id: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
  };
  size: string;
  color: string;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  id,
  product,
  size,
  color,
  quantity,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-4">
        <div className="relative h-20 w-20 overflow-hidden rounded-md bg-(--brand-50)">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold text-(--fg)">{product.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-(--muted)">
            <span>Talla: {size}</span>
            <span>Color: {color}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => onUpdateQuantity(id, quantity + 1)}
              >
                +
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-(--muted) hover:text-red-600"
              onClick={() => {
                onRemove(id);
                toast.success(`${product.name} eliminado del carrito`);
              }}
            >
              Eliminar
            </Button>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-semibold text-(--fg)">
            {formatPrice(product.price * quantity)}
          </p>
          {quantity > 1 && (
            <p className="text-sm text-(--muted)">
              {formatPrice(product.price)} c/u
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
