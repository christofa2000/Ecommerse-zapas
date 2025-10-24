"use client";

import CartItem from "@/components/cart-item";
import CartSummary from "@/components/cart-summary";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart/store";
import Link from "next/link";

export default function CarritoPage() {
  const { items, increment, decrement, remove, getSubtotal, clear } =
    useCartStore();

  const subtotal = getSubtotal();
  const shipping = subtotal > 20000 ? 0 : 2000;
  const total = subtotal + shipping;

  const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity > 0) {
      increment(id, size);
    } else {
      remove(id, size);
    }
  };

  const handleRemoveItem = (id: string, size: string) => {
    remove(id, size);
  };

  const handleCheckout = () => {
    console.log("Proceed to checkout");
    // TODO: Implement checkout logic
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="container-soft py-16">
          <div className="text-center">
            <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-[var(--brand-100)] flex items-center justify-center">
              <svg
                className="h-12 w-12 text-[var(--brand-400)]"
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
            </div>
            <h1 className="text-3xl font-bold text-[var(--fg)] mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-lg text-[var(--muted)] mb-8">
              Explora nuestra colección y encuentra las zapatillas perfectas
              para ti.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[var(--brand-500)] hover:bg-[var(--brand-600)] text-white"
            >
              <Link href="/productos">Ver Productos</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="container-soft py-8">
        <h1 className="text-3xl font-bold text-[var(--fg)] mb-8">
          Carrito de Compras
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={`${item.id}-${item.size}`}
                id={item.id}
                product={{
                  id: item.id,
                  name: item.name,
                  slug: item.slug,
                  price: item.price,
                  image: item.image,
                }}
                size={item.size}
                color={item.color || "N/A"}
                quantity={item.quantity}
                onUpdateQuantity={(id, quantity) =>
                  handleUpdateQuantity(id, item.size, quantity)
                }
                onRemove={(id) => handleRemoveItem(id, item.size)}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
