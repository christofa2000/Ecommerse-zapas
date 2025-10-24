import Footer from "@/components/footer";
import Header from "@/components/header";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
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
        className={`${inter.className} min-h-screen bg-(--bg) text-(--fg) antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
