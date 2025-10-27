export type Locale = "es" | "en";

export const defaultLocale: Locale = "es";
export const locales: Locale[] = ["es", "en"];

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

// Dictionary type
export type Dictionary = {
  [key: string]: string | Dictionary;
};

// Server-side dictionary loading
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const dictionaries = {
    es: {
      // Navigation
      nav: {
        home: "Inicio",
        products: "Productos",
        cart: "Carrito",
        about: "Nosotros",
        contact: "Contacto",
      },
      // Home page
      home: {
        title: "Zapatillas Sostenibles",
        subtitle: "Cómodas, elegantes y respetuosas con el planeta",
        cta: "Ver Colección",
        featured: "Productos Destacados",
        newArrivals: "Nuevas Llegadas",
        bestSellers: "Más Vendidos",
      },
      // Products
      products: {
        title: "Todas las Zapatillas",
        subtitle:
          "Explora nuestra colección completa de zapatillas sostenibles y cómodas",
        filters: "Filtros",
        sortBy: "Ordenar por",
        priceAsc: "Precio: Menor a Mayor",
        priceDesc: "Precio: Mayor a Menor",
        nameAsc: "Nombre: A-Z",
        nameDesc: "Nombre: Z-A",
        clearFilters: "Limpiar Filtros",
        applyAndClose: "Aplicar y Cerrar",
        category: "Categoría",
        color: "Color",
        size: "Talle",
        all: "Todos",
        allCategories: "Todas",
        allColors: "Todos",
        allSizes: "Todos",
        inStock: "En Stock",
        outOfStock: "Agotado",
        addToCart: "Agregar al Carrito",
        selectSize: "Selecciona una talla",
        productUnavailable: "Producto agotado",
        stockAvailable: "Stock disponible",
        units: "unidades",
        materials: "Materiales",
        features: "Características",
        relatedProducts: "Productos Relacionados",
        colors: "Colores disponibles",
        sizes: "Tallas disponibles",
      },
      // Cart
      cart: {
        title: "Carrito de Compras",
        empty: "Tu Carrito Está Vacío",
        emptySubtitle:
          "Explora nuestra colección y encuentra las zapatillas perfectas para ti",
        viewProducts: "Ver Productos",
        subtotal: "Subtotal",
        shipping: "Envío",
        total: "Total",
        checkout: "Finalizar Compra",
        remove: "Eliminar",
        quantity: "Cantidad",
        freeShipping: "Envío gratis en compras superiores a $20.000",
      },
      // Common
      common: {
        loading: "Cargando...",
        error: "¡Algo salió mal!",
        retry: "Intentar de nuevo",
        notFound: "No encontrado",
        back: "Volver",
        close: "Cerrar",
        open: "Abrir",
        next: "Siguiente",
        previous: "Anterior",
        page: "Página",
        of: "de",
        show: "Mostrar",
        items: "productos",
        currency: "ARS",
      },
      // SEO
      seo: {
        homeTitle: "Zapatillas Sostenibles | Calzado Ecológico y Cómodo",
        homeDescription:
          "Descubre nuestra colección de zapatillas sostenibles, cómodas y elegantes. Materiales ecológicos, diseño moderno y respeto por el planeta.",
        productsTitle: "Zapatillas | Colección Completa",
        productsDescription:
          "Explora nuestra colección completa de zapatillas sostenibles. Running, casual y deportivas con materiales ecológicos.",
        cartTitle: "Carrito de Compras",
        cartDescription:
          "Revisa los productos en tu carrito y completa tu compra.",
      },
    },
    en: {
      // Navigation
      nav: {
        home: "Home",
        products: "Products",
        cart: "Cart",
        about: "About",
        contact: "Contact",
      },
      // Home page
      home: {
        title: "Sustainable Sneakers",
        subtitle: "Comfortable, elegant and planet-friendly",
        cta: "View Collection",
        featured: "Featured Products",
        newArrivals: "New Arrivals",
        bestSellers: "Best Sellers",
      },
      // Products
      products: {
        title: "All Sneakers",
        subtitle:
          "Explore our complete collection of sustainable and comfortable sneakers",
        filters: "Filters",
        sortBy: "Sort by",
        priceAsc: "Price: Low to High",
        priceDesc: "Price: High to Low",
        nameAsc: "Name: A-Z",
        nameDesc: "Name: Z-A",
        clearFilters: "Clear Filters",
        applyAndClose: "Apply and Close",
        category: "Category",
        color: "Color",
        size: "Size",
        all: "All",
        allCategories: "All",
        allColors: "All",
        allSizes: "All",
        inStock: "In Stock",
        outOfStock: "Out of Stock",
        addToCart: "Add to Cart",
        selectSize: "Select a size",
        productUnavailable: "Product unavailable",
        stockAvailable: "Stock available",
        units: "units",
        materials: "Materials",
        features: "Features",
        relatedProducts: "Related Products",
        colors: "Available colors",
        sizes: "Available sizes",
      },
      // Cart
      cart: {
        title: "Shopping Cart",
        empty: "Your Cart is Empty",
        emptySubtitle:
          "Explore our collection and find the perfect sneakers for you",
        viewProducts: "View Products",
        subtotal: "Subtotal",
        shipping: "Shipping",
        total: "Total",
        checkout: "Checkout",
        remove: "Remove",
        quantity: "Quantity",
        freeShipping: "Free shipping on orders over $20,000",
      },
      // Common
      common: {
        loading: "Loading...",
        error: "Something went wrong!",
        retry: "Try again",
        notFound: "Not found",
        back: "Back",
        close: "Close",
        open: "Open",
        next: "Next",
        previous: "Previous",
        page: "Page",
        of: "of",
        show: "Show",
        items: "items",
        currency: "ARS",
      },
      // SEO
      seo: {
        homeTitle: "Sustainable Sneakers | Ecological and Comfortable Footwear",
        homeDescription:
          "Discover our collection of sustainable sneakers, comfortable and elegant. Ecological materials, modern design and respect for the planet.",
        productsTitle: "Sneakers | Complete Collection",
        productsDescription:
          "Explore our complete collection of sustainable sneakers. Running, casual and sports with ecological materials.",
        cartTitle: "Shopping Cart",
        cartDescription:
          "Review the products in your cart and complete your purchase.",
      },
    },
  };

  return dictionaries[locale] || dictionaries[defaultLocale];
}

// Helper to get localized URL
export function getLocalizedPath(path: string, locale: Locale): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `/${locale}/${cleanPath}`;
}

// Helper to get canonical URL
export function getCanonicalUrl(path: string, locale: Locale): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://zapatillas.com";
  const localizedPath = getLocalizedPath(path, locale);
  return `${baseUrl}${localizedPath}`;
}














