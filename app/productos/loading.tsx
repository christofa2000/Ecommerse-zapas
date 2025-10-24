import { ProductGridSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="min-h-screen bg-(--bg)">
      {/* Header */}
      <div className="bg-(--brand-50) py-12">
        <div className="container-soft">
          <div className="skeleton h-10 w-64 rounded" />
          <div className="skeleton mt-4 h-6 w-96 rounded" />
        </div>
      </div>

      {/* Filters */}
      <div className="border-b bg-white">
        <div className="container-soft py-6">
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="skeleton h-8 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-soft py-12">
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  );
}





