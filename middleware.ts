import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./lib/i18n-server";

// Get the preferred locale from Accept-Language header
function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    // Parse Accept-Language header
    const languages = acceptLanguage
      .split(",")
      .map((lang) => {
        const [locale, qValue] = lang.trim().split(";q=");
        return {
          locale: locale.split("-")[0], // Extract language code (es, en)
          quality: qValue ? parseFloat(qValue) : 1.0,
        };
      })
      .sort((a, b) => b.quality - a.quality);

    // Find the first supported locale
    for (const { locale } of languages) {
      if (locales.includes(locale as any)) {
        return locale;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
