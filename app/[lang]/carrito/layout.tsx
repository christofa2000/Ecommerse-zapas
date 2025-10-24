import { getCanonicalUrl, getDictionary } from "@/lib/i18n-server";
import type { Metadata } from "next";

interface CartLayoutProps {
  children: React.ReactNode;
  params: any;
}

export async function generateMetadata({
  params,
}: CartLayoutProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as any);
  const seo = dict.seo as any;

  return {
    title: seo.cartTitle,
    description: seo.cartDescription,
    alternates: {
      canonical: getCanonicalUrl("/carrito", lang as any),
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
  return <>{children}</>;
}
