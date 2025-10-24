export function ProductCardSkeleton() {
  return (
    <div className="group">
      <div className="surface overflow-hidden">
        <div className="relative aspect-square overflow-hidden">
          <div className="skeleton h-full w-full" />
        </div>

        <div className="p-4">
          <div className="mb-2 flex space-x-2">
            <div className="skeleton h-4 w-16 rounded-full" />
            <div className="skeleton h-4 w-20 rounded-full" />
          </div>

          <div className="skeleton mb-2 h-6 w-3/4 rounded" />
          <div className="skeleton mb-3 h-4 w-full rounded" />
          <div className="skeleton mb-3 h-4 w-2/3 rounded" />

          <div className="flex items-center justify-between">
            <div className="skeleton h-6 w-20 rounded" />
            <div className="skeleton h-4 w-16 rounded" />
          </div>

          <div className="mt-3 flex space-x-1">
            <div className="skeleton h-4 w-4 rounded-full" />
            <div className="skeleton h-4 w-4 rounded-full" />
            <div className="skeleton h-4 w-4 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Images */}
      <div className="space-y-4">
        <div className="aspect-square overflow-hidden rounded-(--radius)">
          <div className="skeleton h-full w-full" />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-md">
              <div className="skeleton h-full w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
        </div>

        <div className="skeleton h-8 w-3/4 rounded" />

        <div className="flex items-center space-x-4">
          <div className="skeleton h-8 w-24 rounded" />
          <div className="skeleton h-6 w-20 rounded" />
        </div>

        <div className="skeleton h-6 w-full rounded" />

        <div className="space-y-3">
          <div className="skeleton h-6 w-32 rounded" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton h-8 w-12 rounded" />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="skeleton h-6 w-24 rounded" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="skeleton h-10 w-full rounded" />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="skeleton h-10 w-full rounded" />
          <div className="skeleton h-10 w-full rounded" />
        </div>
      </div>
    </div>
  );
}

export function FilterSkeleton() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-6 w-24 rounded" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-8 w-full rounded" />
        ))}
      </div>

      <div className="skeleton h-6 w-20 rounded" />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-8 w-full rounded" />
        ))}
      </div>
    </div>
  );
}
