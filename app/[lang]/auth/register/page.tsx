import type { Metadata } from "next";
import RegisterForm from "./register-form";

interface RegisterPageParams {
  lang: string;
}

interface RegisterPageProps {
  params: Promise<RegisterPageParams>;
}

export const metadata: Metadata = {
  title: "Registrarse | Zapatillas",
  description: "Crea tu cuenta en Zapatillas",
};

export default async function RegisterPage({ params }: RegisterPageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg) py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm lang={lang} />
    </div>
  );
}




