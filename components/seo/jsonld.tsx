import { Product } from "@/lib/products/types";

interface JsonLdProps {
  data: Record<string, any>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Product JSON-LD for PDP
export function ProductJsonLd({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://zapatillas.com";
  const productUrl = `${baseUrl}/${locale}/productos/${product.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images || [product.image],
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: "Zapatillas",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ARS",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: productUrl,
      seller: {
        "@type": "Organization",
        name: "Zapatillas",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: "128",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Materiales",
        value: product.materials?.join(", ") || "Materiales sostenibles",
      },
      {
        "@type": "PropertyValue",
        name: "Características",
        value: product.features?.join(", ") || "Transpirable, cómodo",
      },
    ],
  };

  return <JsonLd data={jsonLd} />;
}

// ItemList JSON-LD for PLP
export function ItemListJsonLd({
  products,
  locale,
  category,
}: {
  products: Product[];
  locale: string;
  category?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://zapatillas.com";
  const listUrl = category
    ? `${baseUrl}/${locale}/productos?category=${category}`
    : `${baseUrl}/${locale}/productos`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category ? `Zapatillas ${category}` : "Todas las Zapatillas",
    description: "Colección completa de zapatillas sostenibles",
    url: listUrl,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image,
        url: `${baseUrl}/${locale}/productos/${product.slug}`,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "ARS",
          availability: product.inStock
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        },
      },
    })),
  };

  return <JsonLd data={jsonLd} />;
}

// Breadcrumb JSON-LD
export function BreadcrumbJsonLd({
  items,
  locale,
}: {
  items: Array<{ name: string; url: string }>;
  locale: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={jsonLd} />;
}

// Organization JSON-LD for footer
export function OrganizationJsonLd({ locale }: { locale: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://zapatillas.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zapatillas",
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description:
      "Zapatillas sostenibles, cómodas y elegantes. Materiales ecológicos y respeto por el planeta.",
    sameAs: [
      "https://www.instagram.com/zapatillas",
      "https://www.facebook.com/zapatillas",
      "https://twitter.com/zapatillas",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+54-11-1234-5678",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Corrientes 1234",
      addressLocality: "Buenos Aires",
      addressRegion: "CABA",
      postalCode: "C1043",
      addressCountry: "AR",
    },
  };

  return <JsonLd data={jsonLd} />;
}
