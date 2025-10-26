import ConsentBanner from "@/components/consent-banner";
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
  lang: Locale;
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
  const { lang } = await params;

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
  const { lang } = await params;

  if (!locales.includes(lang)) {
    notFound();
  }

  // dict no se usa actualmente pero podría ser necesario para componentes del layout
  await getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/images/hero-main.jpg"
          as="image"
          type="image/jpeg"
        />
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
      <body className="min-h-screen bg-(--bg) text-(--fg) antialiased">
        <div className="relative flex min-h-screen flex-col">
          <main className="flex-1">{children}</main>
          <ConsentBanner />
        </div>
      </body>
    </html>
  );
}
