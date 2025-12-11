import { getProducts, adaptApiProductToFrontend } from "@/lib/api/products";
import ProductosPageClient from "./productos-page-client";
import type { Locale } from "@/lib/i18n-server";

// Hacer la página dinámica para evitar errores durante el build
// cuando la API no está disponible
export const dynamic = 'force-dynamic';

interface ProductsPageParams {
  lang: string;
}

interface ProductsPageProps {
  params: Promise<ProductsPageParams>;
}

export default async function ProductosPage({ params }: ProductsPageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  // Obtener productos del backend (fuente de verdad)
  // Esta página SOLO muestra productos que están en la base de datos
  // No usa datos mock ni sampleProducts
  try {
    const productsResponse = await getProducts({ page: 1, limit: 100 });
    const products = productsResponse.data.map(adaptApiProductToFrontend);
    return <ProductosPageClient initialProducts={products} lang={lang} />;
  } catch (error) {
    // Si la API no está disponible durante el build, mostrar página vacía
    // En runtime, el cliente puede hacer fetch directamente
    console.warn('No se pudieron cargar productos durante el build:', error);
    return <ProductosPageClient initialProducts={[]} lang={lang} />;
  }
}
