import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderPageParams {
  lang: string;
  id: string;
}

interface OrderPageProps {
  params: Promise<OrderPageParams>;
}

export const metadata: Metadata = {
  title: "Orden Confirmada | Zapatillas",
  description: "Detalle de tu orden",
};

export default async function OrderPage({ params }: OrderPageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const orderId = resolvedParams.id;

  // TODO: Obtener la orden desde el backend usando getOrderById
  // Por ahora solo mostramos el ID

  return (
    <div className="min-h-screen bg-(--bg) flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">¡Orden Confirmada!</CardTitle>
          <CardDescription>
            Tu orden ha sido creada exitosamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">ID de Orden:</p>
            <p className="text-lg font-mono">{orderId}</p>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-4">
              Recibirás un email de confirmación con los detalles de tu pedido.
            </p>
            <p className="text-sm text-muted-foreground">
              Puedes ver el estado de tu orden en tu historial de compras.
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <Button asChild>
              <Link href={`/${lang}/productos`}>Seguir Comprando</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/${lang}/ordenes`}>Ver Mis Órdenes</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}




