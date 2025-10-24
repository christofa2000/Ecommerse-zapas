// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { defaultLocale, locales } from "./lib/i18n-server";

// Cualquier archivo con extensión (.png, .jpg, .svg, .woff2, .ico, etc.)
const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const languages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [locale, qValue] = lang.trim().split(";q=");
        return {
          locale: locale.split("-")[0],
          quality: qValue ? parseFloat(qValue) : 1.0,
        };
      })
      .sort((a, b) => b.quality - a.quality);

    for (const { locale } of languages) {
      if (locales.includes(locale as any)) return locale;
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1) EXCLUSIONES: no tocar assets ni APIs ni archivos con extensión
  if (
    pathname.startsWith("/_next") || // estáticos Next
    pathname.startsWith("/images") || // /public/images/*
    pathname.startsWith("/fonts") || // /public/fonts/*
    pathname.startsWith("/favicon") || // favicon.*
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname) // cualquier *.ext
  ) {
    return NextResponse.next();
  }

  // 2) Si ya tiene locale, seguir
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  // 3) Redirigir agregando locale
  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

// IMPORTANT: el matcher también excluye estáticos y archivos con extensión
export const config = {
  matcher: [
    "/((?!_next|images|fonts|favicon\\.ico|robots\\.txt|sitemap\\.xml|api|.*\\..*).*)",
  ],
};
