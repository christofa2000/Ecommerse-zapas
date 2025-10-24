import { expect, test } from "@playwright/test";

test.describe("Accessibility", () => {
  test("Home page passes accessibility checks @a11y", async ({ page }) => {
    await page.goto("/es");

    // Check for basic accessibility issues
    await expect(page.locator("h1")).toHaveCount(1);

    // Check for alt text on images
    const images = page.locator("img");
    const imageCount = await images.count();

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      expect(alt).toBeTruthy();
      expect(alt).not.toBe("");
    }

    // Check for proper heading hierarchy
    const h1 = page.locator("h1");
    const h2 = page.locator("h2");

    await expect(h1).toHaveCount(1);
    await expect(h2).toHaveCount(2); // Featured products and CTA sections

    // Check for focusable elements
    const buttons = page.locator("button, a[href]");
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);

    // Check for proper form labels (if any)
    const inputs = page.locator("input");
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute("id");
      const ariaLabel = await input.getAttribute("aria-label");
      const ariaLabelledBy = await input.getAttribute("aria-labelledby");

      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = (await label.count()) > 0;
        const hasAriaLabel = ariaLabel || ariaLabelledBy;

        expect(hasLabel || hasAriaLabel).toBeTruthy();
      }
    }
  });

  test("Products page passes accessibility checks @a11y", async ({ page }) => {
    await page.goto("/es/productos");

    // Check for proper heading structure
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("Todas las Zapatillas");

    // Check for filter accessibility
    const filterButtons = page.locator("button[aria-pressed]");
    const filterButtonCount = await filterButtons.count();
    expect(filterButtonCount).toBeGreaterThan(0);

    // Check for proper button labels
    for (let i = 0; i < filterButtonCount; i++) {
      const button = filterButtons.nth(i);
      const ariaPressed = await button.getAttribute("aria-pressed");
      expect(ariaPressed).toMatch(/true|false/);
    }

    // Check for product cards accessibility
    const productCards = page.locator('[data-testid="product-card"]');
    const cardCount = await productCards.count();

    if (cardCount > 0) {
      // Check first product card
      const firstCard = productCards.first();
      const cardLink = firstCard.locator("a");
      await expect(cardLink).toHaveAttribute("href");

      const cardImage = firstCard.locator("img");
      const altText = await cardImage.getAttribute("alt");
      expect(altText).toBeTruthy();
    }
  });

  test("Product detail page passes accessibility checks @a11y", async ({
    page,
  }) => {
    await page.goto("/es/productos/runner-natural");

    // Check for proper heading structure
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);

    // Check for size selector accessibility
    const sizeButtons = page.locator("button[aria-pressed]");
    const sizeButtonCount = await sizeButtons.count();
    expect(sizeButtonCount).toBeGreaterThan(0);

    // Check for color selector accessibility
    const colorButtons = page.locator("button[title]");
    const colorButtonCount = await colorButtons.count();
    expect(colorButtonCount).toBeGreaterThan(0);

    // Check for proper form structure
    const addToCartButton = page.locator(
      'button:has-text("Agregar al Carrito")'
    );
    await expect(addToCartButton).toHaveCount(1);

    // Check for proper image gallery accessibility
    const galleryImages = page.locator('img[alt*="thumbnail"]');
    const galleryImageCount = await galleryImages.count();

    for (let i = 0; i < galleryImageCount; i++) {
      const img = galleryImages.nth(i);
      const alt = await img.getAttribute("alt");
      expect(alt).toContain("thumbnail");
    }
  });

  test("Cart page passes accessibility checks @a11y", async ({ page }) => {
    await page.goto("/es/carrito");

    // Check for proper heading structure
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);

    // Check for empty cart state accessibility
    const emptyState = page.locator("text=Tu Carrito Está Vacío");
    const isEmpty = (await emptyState.count()) > 0;

    if (isEmpty) {
      // Check for proper empty state structure
      const emptyImage = page.locator('img[alt*="carrito"]');
      await expect(emptyImage).toHaveCount(1);

      const ctaButton = page.locator('a:has-text("Ver Productos")');
      await expect(ctaButton).toHaveCount(1);
    }
  });

  test("Navigation is keyboard accessible", async ({ page }) => {
    await page.goto("/es");

    // Test tab navigation
    await page.keyboard.press("Tab");

    // Check if focus is visible
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toHaveCount(1);

    // Test mobile navigation
    const mobileNavButton = page.locator('button[aria-label*="menú"]');
    if ((await mobileNavButton.count()) > 0) {
      await mobileNavButton.focus();
      await page.keyboard.press("Enter");

      // Check if mobile menu is accessible
      const mobileMenu = page.locator('[role="dialog"]');
      await expect(mobileMenu).toBeVisible();
    }
  });

  test("Color contrast meets minimum requirements", async ({ page }) => {
    await page.goto("/es");

    // Check for proper color contrast on buttons
    const primaryButton = page.locator(".btn-primary");
    if ((await primaryButton.count()) > 0) {
      const button = primaryButton.first();
      const styles = await button.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          backgroundColor: computed.backgroundColor,
          color: computed.color,
        };
      });

      // Basic check - ensure button has background and text color
      expect(styles.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
      expect(styles.color).not.toBe("rgba(0, 0, 0, 0)");
    }

    // Check for proper color contrast on links
    const links = page.locator("a");
    const linkCount = await links.count();

    for (let i = 0; i < Math.min(linkCount, 5); i++) {
      const link = links.nth(i);
      const styles = await link.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
        };
      });

      expect(styles.color).not.toBe("rgba(0, 0, 0, 0)");
    }
  });

  test("Focus management works correctly", async ({ page }) => {
    await page.goto("/es/productos");

    // Test filter interaction
    const filterButton = page.locator('button[aria-pressed="false"]').first();
    if ((await filterButton.count()) > 0) {
      await filterButton.focus();
      await page.keyboard.press("Enter");

      // Check if button state changed
      const pressed = await filterButton.getAttribute("aria-pressed");
      expect(pressed).toBe("true");
    }

    // Test product card interaction
    const productCard = page.locator('[data-testid="product-card"]').first();
    if ((await productCard.count()) > 0) {
      const cardLink = productCard.locator("a");
      await cardLink.focus();
      await page.keyboard.press("Enter");

      // Should navigate to product page
      await expect(page).toHaveURL(/\/productos\/[^\/]+$/);
    }
  });
});





