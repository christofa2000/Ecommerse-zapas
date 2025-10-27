import { ProductDetailSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-(--bg)">
      <div className="container-soft py-8">
        <ProductDetailSkeleton />
      </div>
    </div>
  );
}










