import { getCanonicalUrl, getDictionary } from "@/lib/i18n-server";
import { getProductBySlug } from "@/lib/products/sample";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductLayoutProps {
  children: React.ReactNode;
  params: any;
}

export async function generateMetadata({
  params,
}: ProductLayoutProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const dict = await getDictionary(lang as any);
  const seo = dict.seo as any;

  const productUrl = getCanonicalUrl(`/productos/${slug}`, lang as any);
  const productImage = product.images?.[0] || product.image;

  return {
    title: `${product.name} | ${seo.productsTitle}`,
    description: product.description,
    alternates: {
      canonical: productUrl,
      languages: {
        "es-ES": `/es/productos/${slug}`,
        "en-US": `/en/productos/${slug}`,
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_ES" : "en_US",
      url: productUrl,
      title: product.name,
      description: product.description,
      siteName: "Zapatillas",
      images: [
        {
          url: productImage,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [productImage],
    },
  };
}

export default async function ProductLayout({
  children,
  params,
}: ProductLayoutProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <>{children}</>;
}
