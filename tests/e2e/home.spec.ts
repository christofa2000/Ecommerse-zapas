import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load home page and display hero section", async ({ page }) => {
    await page.goto("/");

    // Check if hero section is visible
    await expect(
      page.getByText("Zapatillas que respetan el planeta")
    ).toBeVisible();
    await expect(
      page.getByText("Descubre nuestra colección de zapatillas sostenibles")
    ).toBeVisible();
  });

  test("should display featured products section", async ({ page }) => {
    await page.goto("/");

    // Check if featured products section exists
    await expect(page.getByText("Más Vendidos")).toBeVisible();
    await expect(
      page.getByText("Nuestras zapatillas más populares")
    ).toBeVisible();
  });

  test('should navigate to products page when clicking "Ver Colección"', async ({
    page,
  }) => {
    await page.goto("/");

    // Click on "Ver Colección" button
    await page.getByRole("link", { name: "Ver Colección" }).click();

    // Should navigate to products page
    await expect(page).toHaveURL("/productos");
  });

  test("should display product cards with correct information", async ({
    page,
  }) => {
    await page.goto("/");

    // Wait for product cards to load
    await page.waitForSelector('[data-testid="product-card"], .group', {
      timeout: 10000,
    });

    // Check if at least one product card is visible
    const productCards = page.locator(".group").first();
    await expect(productCards).toBeVisible();
  });

  test("should display features section", async ({ page }) => {
    await page.goto("/");

    // Scroll to features section
    await page
      .getByText("¿Por qué elegir nuestras zapatillas?")
      .scrollIntoViewIfNeeded();

    // Check features
    await expect(page.getByText("Sostenibles")).toBeVisible();
    await expect(page.getByText("Cómodas")).toBeVisible();
    await expect(page.getByText("Duraderas")).toBeVisible();
  });

  test("should have proper meta tags", async ({ page }) => {
    await page.goto("/");

    // Check title
    await expect(page).toHaveTitle(
      /Zapatillas - Zapatillas Sostenibles y Cómodas/
    );

    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute(
      "content",
      /Descubre nuestra colección de zapatillas sostenibles/
    );
  });

  test("should be responsive on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Check if hero content is still visible on mobile
    await expect(
      page.getByText("Zapatillas que respetan el planeta")
    ).toBeVisible();

    // Check if buttons stack vertically on mobile
    const buttons = page.locator(
      'a[href="/productos"], a[href="/sobre-nosotros"]'
    );
    await expect(buttons).toHaveCount(2);
  });
});




