import ConsentBanner from "@/components/consent-banner";
import Footer from "@/components/footer";
import MiniCart from "@/components/mini-cart";
import { Button } from "@/components/ui/button";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zapatillas - Zapatillas Sostenibles y Cómodas",
  description:
    "Descubre nuestra colección de zapatillas sostenibles, cómodas y diseñadas para durar. Hechas con materiales naturales y pensadas para el futuro.",
  keywords: [
    "zapatillas",
    "sostenible",
    "natural",
    "cómodas",
    "running",
    "casual",
  ],
  authors: [{ name: "Zapatillas" }],
  creator: "Zapatillas",
  publisher: "Zapatillas",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL("https://zapatillas.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://zapatillas.com",
    title: "Zapatillas - Zapatillas Sostenibles y Cómodas",
    description:
      "Descubre nuestra colección de zapatillas sostenibles, cómodas y diseñadas para durar.",
    siteName: "Zapatillas",
    // image sugerida (si la tenés en /public/images/og.jpg)
    // images: ["/images/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zapatillas - Zapatillas Sostenibles y Cómodas",
    description:
      "Descubre nuestra colección de zapatillas sostenibles, cómodas y diseñadas para durar.",
    // images: ["/images/og.jpg"],
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b17" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable} suppressHydrationWarning>
      <body
        className="min-h-screen bg-(--bg) text-(--fg) antialiased"
        suppressHydrationWarning
      >
        <div className="flex min-h-screen flex-col">
          {/* Floating Home Button */}
          <Link href="/es" className="fixed top-4 left-4 z-50">
            <Button
              variant="ghost"
              size="sm"
              className="relative h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-white hover:bg-(--brand-50) text-(--fg)"
            >
              <svg
                className="h-6 w-6 text-(--fg)"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Button>
          </Link>

          {/* Floating Cart Button */}
          <div className="fixed top-4 right-4 z-50">
            <MiniCart />
          </div>

          <main className="flex-1">{children}</main>
          <Footer />
          <ConsentBanner />
        </div>
      </body>
    </html>
  );
}
