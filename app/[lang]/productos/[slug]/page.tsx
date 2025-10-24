import { PdpClient } from "@/components/pdp-client";
import { getProductBySlug, products } from "@/lib/products/sample";
import type { Product } from "@/lib/products/types";
import { notFound } from "next/navigation";

type Props = { params: { lang: string; slug: string } };

export default async function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  const related: Product[] = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return <PdpClient product={product} related={related} lang={params.lang} />;
}
