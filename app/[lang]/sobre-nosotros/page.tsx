import { Card } from "@/components/ui/card";
import { getCanonicalUrl, getDictionary, type Locale } from "@/lib/i18n-server";
import type { Metadata } from "next";
import Image from "next/image";

interface SobreNosotrosPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: SobreNosotrosPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  return {
    title: "Nuestra Historia - Zapatillas Sostenibles",
    description:
      "Conoce la historia de nuestra marca de zapatillas sostenibles que ayuda al planeta.",
    alternates: {
      canonical: getCanonicalUrl("/sobre-nosotros", lang),
    },
  };
}

export default async function SobreNosotros({
  params,
}: SobreNosotrosPageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <main className="container-soft section-y">
      <section className="mb-16 text-center">
        <h1 className="mb-6 text-4xl font-bold text-(--fg) md:text-5xl lg:text-6xl">
          Nuestra Historia
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-(--muted) md:text-xl">
          Una década transformando la industria del calzado hacia un futuro más
          sostenible, una zapatilla a la vez.
        </p>
      </section>

      <section className="mb-16 space-y-12">
        <Card className="overflow-hidden border-(--brand-200) p-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-block rounded-full bg-(--brand-500) px-4 py-2 text-sm font-semibold text-white">
                2014
              </div>
              <h2 className="mb-4 text-2xl font-bold text-(--fg)">
                El Inicio de un Sueño
              </h2>
              <p className="mb-4 text-(--muted)">
                Todo comenzó en un pequeño garaje en Buenos Aires. Tres amigos,
                apasionados por el running y preocupados por el medio ambiente,
                se dieron cuenta de que la industria del calzado generaba
                millones de toneladas de desechos cada año.
              </p>
              <p className="text-(--muted)">
                Con apenas $500 pesos y mucha determinación, decidieron crear
                zapatillas que no solo fueran cómodas y duraderas, sino también
                amigables con el planeta. Comenzaron experimentando con
                materiales reciclados.
              </p>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg bg-(--brand-50) md:h-80">
              <Image
                src="/images/zapas-blancas.png"
                alt="Primeras zapatillas sostenibles"
                fill
                className="object-contain p-8"
              />
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden border-(--brand-200) p-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="order-2 md:order-1">
              <div className="relative h-64 overflow-hidden rounded-lg bg-(--brand-50) md:h-80">
                <Image
                  src="/images/zapas-blancas2.png"
                  alt="Expansión de la marca"
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="mb-4 inline-block rounded-full bg-(--brand-500) px-4 py-2 text-sm font-semibold text-white">
                2016
              </div>
              <h2 className="mb-4 text-2xl font-bold text-(--fg)">
                Primera Colección Oficial
              </h2>
              <p className="mb-4 text-(--muted)">
                Después de dos años de pruebas, lanzamos nuestra primera
                colección oficial: "Tierra Pura". Solo 500 pares que se agotaron
                en menos de un mes. La gente estaba hambrienta de alternativas
                sostenibles que no comprometieran el estilo.
              </p>
              <p className="text-(--muted)">
                Ese año decidimos comprometernos con ser carbono neutrales. Por
                cada par vendido, plantamos un árbol.
              </p>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden border-(--brand-700) bg-(--brand-50) p-8">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 inline-block rounded-full bg-(--brand-700) px-4 py-2 text-sm font-semibold text-white">
                2024
              </div>
              <h2 className="mb-4 text-3xl font-bold text-(--fg)">
                El Futuro que Construimos
              </h2>
              <p className="mb-4 text-lg text-(--muted)">
                Hoy somos más que una marca de zapatillas. Somos un movimiento
                que demuestra que la moda puede ser sostenible, hermosa y
                accesible.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-(--brand-200) bg-white p-4">
                  <div className="text-3xl font-bold text-(--brand-600)">
                    2M+
                  </div>
                  <div className="text-sm text-(--muted)">
                    Árboles plantados
                  </div>
                </div>
                <div className="rounded-lg border border-(--brand-200) bg-white p-4">
                  <div className="text-3xl font-bold text-(--brand-600)">
                    150K
                  </div>
                  <div className="text-sm text-(--muted)">Pares reciclados</div>
                </div>
                <div className="rounded-lg border border-(--brand-200) bg-white p-4">
                  <div className="text-3xl font-bold text-(--brand-600)">
                    200+
                  </div>
                  <div className="text-sm text-(--muted)">Empleos creados</div>
                </div>
                <div className="rounded-lg border border-(--brand-200) bg-white p-4">
                  <div className="text-3xl font-bold text-(--brand-600)">
                    -60%
                  </div>
                  <div className="text-sm text-(--muted)">CO₂ reducido</div>
                </div>
              </div>
            </div>
            <div className="relative h-64 overflow-hidden rounded-lg bg-white md:h-80">
              <Image
                src="/images/zapas-blancas4.png"
                alt="El futuro sostenible"
                fill
                className="object-contain p-8"
              />
            </div>
          </div>
        </Card>
      </section>

      <section className="mb-16 rounded-2xl bg-(--brand-700) p-12 text-center text-white">
        <h2 className="mb-6 text-3xl font-bold">Nuestra Misión</h2>
        <p className="mx-auto max-w-3xl text-lg opacity-90">
          Crear zapatillas sostenibles que no solo te lleven a donde quieras ir,
          sino que también ayuden a crear un mundo más verde.
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-center text-3xl font-bold text-(--fg)">
          Nuestros Valores
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 text-center">
            <div className="mb-4 text-4xl">🌱</div>
            <h3 className="mb-2 text-xl font-semibold text-(--fg)">
              Sostenibilidad
            </h3>
            <p className="text-(--muted)">
              Cada decisión considera el impacto en el planeta.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="mb-4 text-4xl">🎨</div>
            <h3 className="mb-2 text-xl font-semibold text-(--fg)">
              Diseño Innovador
            </h3>
            <p className="text-(--muted)">
              La sostenibilidad no debe comprometer el estilo.
            </p>
          </Card>
          <Card className="p-6 text-center">
            <div className="mb-4 text-4xl">🤝</div>
            <h3 className="mb-2 text-xl font-semibold text-(--fg)">
              Comunidad
            </h3>
            <p className="text-(--muted)">
              Relaciones duraderas con clientes y proveedores.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}
