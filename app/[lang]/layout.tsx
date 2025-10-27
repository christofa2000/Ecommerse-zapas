import {
  getCanonicalUrl,
  getDictionary,
  locales,
  type Locale,
} from "@/lib/i18n-server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";

interface RootLayoutParams {
  lang: string;
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<RootLayoutParams>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: RootLayoutProps): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  if (!locales.includes(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);
  const seo = dict.seo as Record<string, string>;

  return {
    title: {
      default: seo.homeTitle,
      template: `%s | ${seo.homeTitle}`,
    },
    description: seo.homeDescription,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL || "https://zapatillas.com"
    ),
    alternates: {
      canonical: getCanonicalUrl("/", lang),
      languages: {
        "es-ES": "/es",
        "en-US": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "es" ? "es_ES" : "en_US",
      url: getCanonicalUrl("/", lang),
      title: seo.homeTitle,
      description: seo.homeDescription,
      siteName: "Zapatillas",
      images: [
        {
          url: "/images/og/home.jpg",
          width: 1200,
          height: 630,
          alt: seo.homeTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.homeTitle,
      description: seo.homeDescription,
      images: ["/images/og/home.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  if (!locales.includes(lang)) {
    notFound();
  }

  // dict no se usa actualmente pero podría ser necesario para componentes del layout
  await getDictionary(lang);

  return <>{children}</>;
}
