import { getCanonicalUrl, getDictionary, type Locale } from "@/lib/i18n-server";
import { Calendar, Clock, CreditCard, ShoppingBag } from "lucide-react";
import type { Metadata } from "next";

interface PublicidadPageParams {
  lang: string;
}

interface PublicidadPageProps {
  params: Promise<PublicidadPageParams>;
}

const promotions = [
  {
    day: "Martes",
    icon: CreditCard,
    title: "15% de Descuento con MercadoPago",
    description:
      "Realizá tu compra pagando con MercadoPago y obtené un 15% de descuento adicional.",
    color: "from-blue-500 to-blue-600",
    iconBg: "bg-blue-500",
    highlight: "15% OFF",
  },
  {
    day: "Jueves",
    icon: CreditCard,
    title: "20% de Descuento con VISA",
    description:
      "Usá tu tarjeta VISA y ahorrá un 20% en toda tu compra. Válido todos los jueves.",
    color: "from-yellow-400 to-yellow-500",
    iconBg: "bg-yellow-500",
    highlight: "20% OFF",
  },
  {
    day: "Viernes",
    icon: Calendar,
    title: "6 Cuotas sin Interés",
    description:
      "Comprá en cómodas cuotas sin interés. Aplicable en todos los medios de pago.",
    color: "from-purple-500 to-purple-600",
    iconBg: "bg-purple-500",
    highlight: "6 Cuotas",
  },
  {
    day: "Domingo",
    icon: ShoppingBag,
    title: "50% OFF en la 2da Unidad",
    description:
      "Comprá dos pares y pagá el segundo al 50% de descuento. ¡No te lo pierdas!",
    color: "from-red-500 to-red-600",
    iconBg: "bg-red-500",
    highlight: "50% OFF",
  },
];

export async function generateMetadata({
  params,
}: PublicidadPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  return {
    title: "Promociones | Zapatillas",
    description:
      "Descubrí nuestras promociones especiales de la semana con descuentos increíbles.",
    alternates: {
      canonical: getCanonicalUrl("/publicidad", lang),
      languages: {
        "es-ES": "/es/publicidad",
        "en-US": "/en/publicidad",
      },
    },
  };
}

export default async function PublicidadPage({ params }: PublicidadPageProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-(--brand-100)">
      {/* Header */}
      <div className="bg-linear-to-r from-brand-600 to-brand-700 text-black py-16">
        <div className="container-soft">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Promociones de la Semana
          </h1>
          <p className="text-lg md:text-xl text-brand-100 max-w-2xl">
            Descubrí nuestras ofertas especiales y ahorrá en tus zapatillas
            favoritas. Cada día tiene su propia promoción exclusiva.
          </p>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="container-soft py-12 md:py-16">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {promotions.map((promo, index) => {
            const Icon = promo.icon;
            return (
              <div
                key={promo.day}
                className="relative group overflow-hidden rounded-2xl bg-white shadow-(--shadow-card) hover:shadow-(--shadow-lg) transition-all duration-300"
              >
                {/* Day Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/30">
                    <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {promo.day}
                    </p>
                  </div>
                </div>

                {/* Highlight Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div
                    className={`${promo.iconBg} rounded-full px-4 py-1.5 shadow-lg`}
                  >
                    <p className="text-sm font-bold text-white">
                      {promo.highlight}
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative">
                  {/* Background Gradient */}
                  <div
                    className={`h-32 bg-linear-to-br ${promo.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                  />

                  {/* Content */}
                  <div className="relative p-6 md:p-8">
                    {/* Icon */}
                    <div className="mb-4">
                      <div
                        className={`${promo.iconBg} w-12 h-12 rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-(--fg) mb-3">
                      {promo.title}
                    </h2>

                    {/* Description */}
                    <p className="text-(--muted) text-base leading-relaxed">
                      {promo.description}
                    </p>

                    {/* Decorative Element */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <p className="text-xs text-(--muted) font-medium">
                        Válido todos los {promo.day.toLowerCase()}s
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl shadow-(--shadow-card) px-8 md:px-12 py-10 md:py-12 max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-(--fg) mb-4">
              ¿Listo para aprovechar estas ofertas?
            </h3>
            <p className="text-(--muted) text-lg mb-6">
              Visitá nuestro catálogo y encontrá las zapatillas perfectas para
              vos.
            </p>
            <a
              href={`/${lang}/productos`}
              className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 focus-ring"
            >
              Ver Catálogo Completo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
