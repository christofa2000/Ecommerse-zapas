import { expect, test } from "@playwright/test";

test.describe("Products Page", () => {
  test("should load products page and display all products", async ({
    page,
  }) => {
    await page.goto("/productos");

    // Check page title
    await expect(page.getByText("Todas las Zapatillas")).toBeVisible();
    await expect(
      page.getByText(
        "Explora nuestra colección completa de zapatillas sostenibles y cómodas."
      )
    ).toBeVisible();
  });

  test("should filter products by category", async ({ page }) => {
    await page.goto("/productos");

    // Click on Running filter
    await page.getByRole("link", { name: "Running" }).click();

    // Should navigate to filtered page
    await expect(page).toHaveURL("/productos?category=running");
    await expect(page.getByText("Zapatillas de Running")).toBeVisible();
  });

  test("should filter products by badge", async ({ page }) => {
    await page.goto("/productos");

    // Click on Sostenibles filter
    await page.getByRole("link", { name: "Sostenibles" }).click();

    // Should navigate to filtered page
    await expect(page).toHaveURL("/productos?badge=sostenible");
    await expect(page.getByText("Zapatillas Sostenibles")).toBeVisible();
  });

  test("should display product cards with correct information", async ({
    page,
  }) => {
    await page.goto("/productos");

    // Wait for product cards to load
    await page.waitForSelector(".group", { timeout: 10000 });

    // Check if product cards are visible
    const productCards = page.locator(".group");
    await expect(productCards.first()).toBeVisible();

    // Check if product information is displayed
    const firstCard = productCards.first();
    await expect(firstCard.locator("h3")).toBeVisible();
    await expect(firstCard.locator("p")).toBeVisible();
  });

  test("should navigate to product detail page when clicking on product", async ({
    page,
  }) => {
    await page.goto("/productos");

    // Wait for product cards to load
    await page.waitForSelector(".group a", { timeout: 10000 });

    // Click on first product
    const firstProductLink = page.locator(".group a").first();
    await firstProductLink.click();

    // Should navigate to product detail page
    await expect(page).toHaveURL(/\/productos\/[a-z-]+/);
  });

  test("should show empty state when no products match filter", async ({
    page,
  }) => {
    // Navigate to a non-existent category
    await page.goto("/productos?category=nonexistent");

    // Should show empty state
    await expect(page.getByText("No se encontraron productos")).toBeVisible();
    await expect(
      page.getByText("Intenta ajustar los filtros o explorar otras categorías.")
    ).toBeVisible();
  });

  test("should have proper navigation breadcrumbs", async ({ page }) => {
    await page.goto("/productos");

    // Check if navigation menu is visible
    await expect(page.getByRole("navigation")).toBeVisible();

    // Check if home link exists
    await expect(page.getByRole("link", { name: "Inicio" })).toBeVisible();

    // Check if carrito link exists
    await expect(page.getByRole("link", { name: "Carrito" })).toBeVisible();
  });
});






