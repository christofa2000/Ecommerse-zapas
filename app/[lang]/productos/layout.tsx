import { getCanonicalUrl, getDictionary, type Locale } from "@/lib/i18n-server";
import type { Metadata } from "next";

interface ProductsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: ProductsLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const typedLang = lang as Locale;
  const dict = await getDictionary(typedLang);
  const seo = dict.seo as Record<string, string>;

  const productsTitle = seo.productsTitle || "Productos";
  const productsDescription =
    seo.productsDescription || "Explora nuestra colección";

  return {
    title: productsTitle,
    description: productsDescription,
    alternates: {
      canonical: getCanonicalUrl("/productos", typedLang),
      languages: {
        "es-ES": "/es/productos",
        "en-US": "/en/productos",
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_ES" : "en_US",
      url: getCanonicalUrl("/productos", typedLang),
      title: productsTitle,
      description: productsDescription,
      siteName: "Zapatillas",
      images: [
        {
          url: "/images/og/products.jpg",
          width: 1200,
          height: 630,
          alt: productsTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: productsTitle,
      description: productsDescription,
      images: ["/images/og/products.jpg"],
    },
  };
}

export default async function ProductsLayout({
  children,
  params: _,
}: ProductsLayoutProps) {
  await _; // Await params to prevent unused parameter warning
  return <>{children}</>;
}
