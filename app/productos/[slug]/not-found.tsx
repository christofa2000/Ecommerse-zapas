import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-(--bg) flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-8 h-24 w-24 rounded-full bg-(--brand-100) flex items-center justify-center">
          <svg
            className="h-12 w-12 text-(--brand-600)"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-(--fg) mb-4">
          Producto no encontrado
        </h1>

        <p className="text-lg text-(--muted) mb-8 max-w-md">
          El producto que buscas no existe o ha sido removido. Explora nuestra
          colección para encontrar algo que te guste.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild className="btn-primary">
            <Link href="/productos">Ver todos los productos</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}











