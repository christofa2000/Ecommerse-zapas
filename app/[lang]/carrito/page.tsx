"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CartItem from "@/components/cart-item";
import CartSummary from "@/components/cart-summary";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cart/store";
import { useAuth } from "@/lib/hooks/use-auth";
import { createOrder } from "@/lib/api/orders";
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
  const router = useRouter();

  const { items, increment, decrement, remove, getSubtotal, clear } = useCartStore();
  const { isAuthenticated, token, isLoading: isAuthLoading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const handleCheckout = async () => {
    // Verificar autenticación
    if (!isAuthenticated || !token) {
      router.push(`/${lang}/auth/login?from=carrito`);
      return;
    }

    // Verificar que haya items en el carrito
    if (items.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccess(null);

    try {
      // Agrupar items por productId (sumar cantidades si hay múltiples talles del mismo producto)
      const itemsMap = new Map<string, number>();
      items.forEach((item) => {
        const currentQuantity = itemsMap.get(item.id) || 0;
        itemsMap.set(item.id, currentQuantity + item.quantity);
      });

      // Convertir a formato que espera el backend
      const orderItems = Array.from(itemsMap.entries()).map(([productId, quantity]) => ({
        productId,
        quantity,
      }));

      // Crear la orden
      const orderInput = {
        items: orderItems,
        shippingAddress: "Dirección de envío (demo)", // TODO: Obtener de formulario real
        paymentMethod: "card" as const, // TODO: Obtener de formulario real
      };

      const response = await createOrder(orderInput, token);

      // Limpiar el carrito
      clear();

      // Mostrar mensaje de éxito
      setSuccess(`¡Orden creada exitosamente! ID: ${response.data.id}`);

      // Redirigir después de un breve delay
      setTimeout(() => {
        router.push(`/${lang}/ordenes/${response.data.id}`);
      }, 2000);
    } catch (err) {
      console.error("Error al crear la orden:", err);
      if (err instanceof Error) {
        setError(err.message || "Hubo un problema al crear tu orden. Intenta de nuevo.");
      } else {
        setError("Hubo un problema al crear tu orden. Intenta de nuevo.");
      }
    } finally {
      setIsProcessing(false);
    }
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

        {/* Mensajes de feedback */}
        {error && (
          <div className="mb-6 p-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
            {success}
          </div>
        )}

        {!isAuthenticated && !isAuthLoading && (
          <div className="mb-6 p-4 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md">
            Debes iniciar sesión para finalizar la compra.{" "}
            <Link
              href={`/${lang}/auth/login?from=carrito`}
              className="underline font-medium"
            >
              Iniciar sesión
            </Link>
          </div>
        )}

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
              isProcessing={isProcessing}
              isDisabled={!isAuthenticated || items.length === 0 || isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
