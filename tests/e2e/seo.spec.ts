import { expect, test } from "@playwright/test";

test.describe("SEO", () => {
  test("Home page has correct meta tags @smoke", async ({ page }) => {
    await page.goto("/es");

    // Check title
    await expect(page).toHaveTitle(/Zapatillas Sostenibles/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      "content",
      /zapatillas sostenibles/i
    );

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /\/es$/);

    // Check hreflang
    const hreflangEs = page.locator('link[hreflang="es-ES"]');
    const hreflangEn = page.locator('link[hreflang="en-US"]');
    await expect(hreflangEs).toHaveAttribute("href", /\/es$/);
    await expect(hreflangEn).toHaveAttribute("href", /\/en$/);

    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    const ogImage = page.locator('meta[property="og:image"]');

    await expect(ogTitle).toHaveAttribute("content", /Zapatillas Sostenibles/);
    await expect(ogDescription).toHaveAttribute(
      "content",
      /zapatillas sostenibles/i
    );
    await expect(ogImage).toHaveAttribute("content", /\/images\/og\/home\.jpg/);

    // Check Twitter Card tags
    const twitterCard = page.locator('meta[name="twitter:card"]');
    const twitterTitle = page.locator('meta[name="twitter:title"]');

    await expect(twitterCard).toHaveAttribute("content", "summary_large_image");
    await expect(twitterTitle).toHaveAttribute(
      "content",
      /Zapatillas Sostenibles/
    );
  });

  test("Products page has correct meta tags", async ({ page }) => {
    await page.goto("/es/productos");

    // Check title
    await expect(page).toHaveTitle(/Zapatillas.*Colección Completa/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      "content",
      /colección completa/i
    );

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", /\/es\/productos$/);
  });

  test("Product page has correct meta tags and JSON-LD", async ({ page }) => {
    await page.goto("/es/productos/runner-natural");

    // Check title includes product name
    await expect(page).toHaveTitle(/Runner Natural/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      "content",
      /zapatilla de running/i
    );

    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute(
      "href",
      /\/es\/productos\/runner-natural$/
    );

    // Check JSON-LD is present
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(2); // Product + Breadcrumb

    // Check JSON-LD content
    const jsonLdContent = await jsonLd.first().textContent();
    expect(jsonLdContent).toContain('"@type":"Product"');
    expect(jsonLdContent).toContain('"name":"Runner Natural"');
    expect(jsonLdContent).toContain('"@type":"BreadcrumbList"');
  });

  test("Cart page has correct meta tags", async ({ page }) => {
    await page.goto("/es/carrito");

    // Check title
    await expect(page).toHaveTitle(/Carrito de Compras/);

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute("content", /carrito/i);

    // Check robots noindex
    const robots = page.locator('meta[name="robots"]');
    await expect(robots).toHaveAttribute("content", "noindex,nofollow");
  });

  test("Sitemap is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);

    const content = await page.textContent("body");
    expect(content).toContain("<?xml");
    expect(content).toContain("<urlset");
    expect(content).toContain("/es");
    expect(content).toContain("/en");
  });

  test("Robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);

    const content = await page.textContent("body");
    expect(content).toContain("User-agent: *");
    expect(content).toContain("Allow: /");
    expect(content).toContain("Disallow: /api/");
    expect(content).toContain("Sitemap:");
  });

  test("Language switching works correctly", async ({ page }) => {
    // Start on Spanish
    await page.goto("/es");
    await expect(page).toHaveURL(/\/es$/);

    // Check hreflang for English
    const hreflangEn = page.locator('link[hreflang="en-US"]');
    await expect(hreflangEn).toHaveAttribute("href", /\/en$/);

    // Navigate to English
    await page.goto("/en");
    await expect(page).toHaveURL(/\/en$/);

    // Check hreflang for Spanish
    const hreflangEs = page.locator('link[hreflang="es-ES"]');
    await expect(hreflangEs).toHaveAttribute("href", /\/es$/);
  });
});






