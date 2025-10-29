"use client";

import CartItem from "@/components/cart-item";
import CartSummary from "@/components/cart-summary";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart/store";
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-server";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { use } from "react";

interface CartPageParams {
  lang: string;
}

interface CartPageProps {
  params: Promise<CartPageParams>;
}

export default function CarritoPage({ params }: CartPageProps) {
  const resolvedParams = use(params);
  const lang = resolvedParams.lang as Locale;
  const { t } = useI18n(lang);

  const { items, increment, decrement, remove, getSubtotal } = useCartStore();

  const subtotal = getSubtotal();
  const shipping = subtotal > 20000 ? 0 : 2000; // Example shipping logic
  const total = subtotal + shipping;

  const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
    const currentItem = items.find(
      (item) => item.id === id && item.size === size
    );
    if (!currentItem) return;

    if (quantity > currentItem.quantity) {
      // Increase quantity
      for (let i = currentItem.quantity; i < quantity; i++) {
        increment(id, size);
      }
    } else if (quantity < currentItem.quantity) {
      // Decrease quantity
      for (let i = currentItem.quantity; i > quantity; i--) {
        decrement(id, size);
      }
    }
  };

  const handleRemoveItem = (id: string, size: string) => {
    remove(id, size);
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-(--brand-50)">
        <div className="container-soft py-16">
          <div className="text-center">
            <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-(--brand-100) flex items-center justify-center">
              <ShoppingCartIcon className="h-12 w-12 text-(--brand-600)" />
            </div>
            <h1 className="text-3xl font-bold text-(--fg) mb-4">
              {t("cart.empty")}
            </h1>
            <p className="text-lg text-(--muted) mb-8">
              {t("cart.emptySubtitle")}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-(--brand-500) hover:bg-(--brand-600) text-white"
            >
              <Link href={`/${lang}/productos`}>{t("cart.viewProducts")}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-(--bg) min-h-screen">
      <div className="container-soft py-12">
        <h1 className="text-3xl font-bold text-(--fg) mb-8">
          {t("cart.title")}
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
