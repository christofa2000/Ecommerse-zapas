"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product detail page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="h-12 w-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[var(--fg)] mb-4">
          No se pudo cargar el producto
        </h1>

        <p className="text-[var(--muted)] mb-8 max-w-md">
          Hubo un problema al cargar los detalles del producto. Por favor,
          intenta de nuevo.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="btn-primary">
            Intentar de nuevo
          </Button>

          <Button variant="outline" asChild>
            <Link href="/productos">Ver todos los productos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}


