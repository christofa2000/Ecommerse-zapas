import { ProductJsonLd } from "@/components/seo/jsonld";
import ProductPageClient from "@/components/product-page-client";
import { getProductBySlug, sampleProducts } from "@/lib/products/sample";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface ProductPageParams {
  slug: string;
}

interface ProductPageProps {
  params: Promise<ProductPageParams>;
}

export async function generateStaticParams() {
  return sampleProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://zapatillas.com";
  const productUrl = `${baseUrl}/productos/${product.slug}`;

  return {
    title: `${product.name} | Zapatillas`,
    description: product.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: "website",
      url: productUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = sampleProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <>
      <ProductJsonLd product={product} locale="es" />
      <ProductPageClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
