// app/proxy.ts
import { defaultLocale, locales } from "@/lib/i18n-server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
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
    if (locales.includes(locale as (typeof locales)[number])) return locale;
  }
  return defaultLocale;
}

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/favicon") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = getLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!_next|images|fonts|favicon\\.ico|robots\\.txt|sitemap\\.xml|api|.*\\..*).*)",
  ],
};
