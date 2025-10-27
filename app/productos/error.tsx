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
    // Log the error to an error reporting service
    console.error("Productos page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-(--bg) flex items-center justify-center">
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

        <h1 className="text-2xl font-bold text-(--fg) mb-4">
          ¡Ups! Algo salió mal
        </h1>

        <p className="text-(--muted) mb-8 max-w-md">
          No pudimos cargar los productos. Por favor, intenta de nuevo o
          contacta con soporte si el problema persiste.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="btn-primary">
            Intentar de nuevo
          </Button>

          <Button variant="outline" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}












