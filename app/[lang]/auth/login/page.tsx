import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./login-form";

interface LoginPageParams {
  lang: string;
}

interface LoginPageProps {
  params: Promise<LoginPageParams>;
}

export const metadata: Metadata = {
  title: "Iniciar Sesión | Zapatillas",
  description: "Inicia sesión en tu cuenta de Zapatillas",
};

function LoginFormSkeleton() {
  return (
    <div className="w-full max-w-md mx-auto animate-pulse">
      <div className="h-8 bg-(--brand-200) rounded mb-4" />
      <div className="h-4 bg-(--brand-200) rounded mb-8" />
      <div className="space-y-4">
        <div className="h-10 bg-(--brand-200) rounded" />
        <div className="h-10 bg-(--brand-200) rounded" />
        <div className="h-10 bg-(--brand-200) rounded" />
      </div>
    </div>
  );
}

export default async function LoginPage({ params }: LoginPageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) py-12 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm lang={lang} />
      </Suspense>
    </div>
  );
}




