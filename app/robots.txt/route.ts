import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://zapatillas.com";

  const robotsTxt = `User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Allow important pages
Allow: /es/
Allow: /en/
Allow: /es/productos/
Allow: /en/productos/
Allow: /es/productos/*/
Allow: /en/productos/*/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}




