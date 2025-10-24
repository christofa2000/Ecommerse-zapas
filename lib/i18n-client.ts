import type { Locale } from "./i18n-server";

// Client-side i18n hook
export function useI18n(lang: Locale) {
  const translations = {
    es: {
      "cart.title": "Carrito de Compras",
      "cart.empty": "Tu carrito está vacío",
      "cart.emptySubtitle":
        "Explora nuestra colección y encuentra las zapatillas perfectas para ti.",
      "cart.viewProducts": "Ver Productos",
    },
    en: {
      "cart.title": "Shopping Cart",
      "cart.empty": "Your cart is empty",
      "cart.emptySubtitle":
        "Explore our collection and find the perfect sneakers for you.",
      "cart.viewProducts": "View Products",
    },
  };

  const t = (key: string) => {
    return (
      translations[lang][key as keyof (typeof translations)[typeof lang]] || key
    );
  };

  return { t };
}
