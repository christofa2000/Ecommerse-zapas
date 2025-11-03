import { ProductJsonLd } from "@/components/seo/jsonld";
import ProductPageClientLang from "@/components/product-page-client-lang";
import { getProductBySlug, sampleProducts } from "@/lib/products/sample";
import type { Locale } from "@/lib/i18n-server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface ProductPageParams {
  lang: string;
  slug: string;
}

interface ProductPageProps {
  params: Promise<ProductPageParams>;
}

export async function generateStaticParams() {
  return sampleProducts.flatMap((product) =>
    ["es", "en"].map((lang) => ({
      lang,
      slug: product.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const slug = resolvedParams.slug;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://zapatillas.com";
  const productUrl = `${baseUrl}/${lang}/productos/${product.slug}`;

  return {
    title: `${product.name} | Zapatillas`,
    description: product.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: productUrl,
      languages: {
        "es-ES": `${baseUrl}/es/productos/${product.slug}`,
        "en-US": `${baseUrl}/en/productos/${product.slug}`,
      },
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
      locale: lang === "es" ? "es_ES" : "en_US",
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
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const slug = resolvedParams.slug;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = sampleProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <>
      <ProductJsonLd product={product} locale={lang} />
      <ProductPageClientLang
        product={product}
        relatedProducts={relatedProducts}
        lang={lang}
      />
    </>
  );
}
