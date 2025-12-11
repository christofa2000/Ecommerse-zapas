import { ProductJsonLd } from "@/components/seo/jsonld";
import ProductPageClientLang from "@/components/product-page-client-lang";
import { getProductBySlug as getProductBySlugApi, adaptApiProductToFrontend } from "@/lib/api/products";
import { getProducts } from "@/lib/api/products";
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
  // Obtener productos del backend para generar rutas estáticas
  try {
    const productsResponse = await getProducts({ page: 1, limit: 100 });
    return productsResponse.data.flatMap((product) =>
      ["es", "en"].map((lang) => ({
        lang,
        slug: product.slug,
      }))
    );
  } catch {
    // Si falla, retornar array vacío (se generarán dinámicamente)
    return [];
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const slug = resolvedParams.slug;
  
  try {
    const productResponse = await getProductBySlugApi(slug);
    const product = adaptApiProductToFrontend(productResponse.data);

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
  } catch {
    return {
      title: "Producto no encontrado",
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const slug = resolvedParams.slug;

  try {
    // Intentar obtener el producto del backend
    const productResponse = await getProductBySlugApi(slug);
    const product = adaptApiProductToFrontend(productResponse.data);

    // Obtener productos relacionados (misma categoría)
    // Si falla, usar array vacío (no es crítico)
    let relatedProducts: ReturnType<typeof adaptApiProductToFrontend>[] = [];
    try {
      const relatedProductsResponse = await getProducts({
        category: product.category,
        limit: 5,
      });
      relatedProducts = relatedProductsResponse.data
        .map(adaptApiProductToFrontend)
        .filter((p) => p.id !== product.id)
        .slice(0, 4);
    } catch {
      // Si falla obtener relacionados, continuar sin ellos
      console.warn(`No se pudieron obtener productos relacionados para ${slug}`);
    }

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
  } catch (error) {
    // Solo mostrar 404 si realmente el backend devuelve 404 (producto no encontrado)
    // Log del error para debugging
    console.error(`Error al obtener producto con slug "${slug}":`, error);
    
    // Si es un error de fetch (404, etc.), mostrar notFound
    if (error instanceof Error && error.message.includes('404')) {
      notFound();
    }
    
    // Para otros errores, también mostrar 404 (producto no disponible)
    notFound();
  }
}
