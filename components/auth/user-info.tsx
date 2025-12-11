"use client";

/**
 * Componente simple para mostrar información del usuario autenticado
 * 
 * TODO: Migrar a Server Component cuando se implementen cookies httpOnly
 * - Actualmente usa useAuth() que lee de localStorage (solo Client Component)
 * - Con cookies httpOnly, se puede obtener el usuario desde el servidor
 * - Usar Server Component + Server Action para obtener perfil
 */

import { useAuth } from "@/lib/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface UserInfoProps {
  lang: string;
}

export default function UserInfo({ lang }: UserInfoProps) {
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <a href={`/${lang}/auth/login`}>Iniciar Sesión</a>
        </Button>
        <Button asChild>
          <a href={`/${lang}/auth/register`}>Registrarse</a>
        </Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Usuario Autenticado</CardTitle>
        <CardDescription>Información de tu cuenta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium">Email:</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        {user.firstName && (
          <div>
            <p className="text-sm font-medium">Nombre:</p>
            <p className="text-sm text-muted-foreground">
              {user.firstName} {user.lastName || ""}
            </p>
          </div>
        )}
        <Button variant="outline" onClick={logout} className="w-full">
          Cerrar Sesión
        </Button>
      </CardContent>
    </Card>
  );
}




