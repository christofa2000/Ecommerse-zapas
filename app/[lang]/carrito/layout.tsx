import { getCanonicalUrl, getDictionary, type Locale } from "@/lib/i18n-server";
import type { Metadata } from "next";

interface CartLayoutParams {
  lang: Locale;
}

interface CartLayoutProps {
  children: React.ReactNode;
  params: Promise<CartLayoutParams>;
}

export async function generateMetadata({
  params,
}: CartLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const seo = dict.seo as Record<string, string>;

  return {
    title: seo.cartTitle,
    description: seo.cartDescription,
    alternates: {
      canonical: getCanonicalUrl("/carrito", lang),
      languages: {
        "es-ES": "/es/carrito",
        "en-US": "/en/carrito",
      },
    },
    robots: {
      index: false, // Don't index cart pages
      follow: false,
    },
  };
}

export default async function CartLayout({
  children,
  params,
}: CartLayoutProps) {
  await params; // Consumir params para mantener consistencia con Next.js
  return <>{children}</>;
}
