import { getCanonicalUrl, getDictionary } from "@/lib/i18n-server";
import type { Metadata } from "next";

interface ProductsLayoutProps {
  children: React.ReactNode;
  params: any;
}

export async function generateMetadata({
  params,
}: ProductsLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);
  const seo = dict.seo as any;

  return {
    title: seo.productsTitle,
    description: seo.productsDescription,
    alternates: {
      canonical: getCanonicalUrl("/productos", lang as any),
      languages: {
        "es-ES": "/es/productos",
        "en-US": "/en/productos",
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_ES" : "en_US",
      url: getCanonicalUrl("/productos", lang as any),
      title: seo.productsTitle,
      description: seo.productsDescription,
      siteName: "Zapatillas",
      images: [
        {
          url: "/images/og/products.jpg",
          width: 1200,
          height: 630,
          alt: seo.productsTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.productsTitle,
      description: seo.productsDescription,
      images: ["/images/og/products.jpg"],
    },
  };
}

export default async function ProductsLayout({
  children,
  params,
}: ProductsLayoutProps) {
  return <>{children}</>;
}
