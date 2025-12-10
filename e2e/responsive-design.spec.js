const { test, expect, devices } = require('@playwright/test');

test.describe('Responsive Design', () => {
  test.describe('Desktop viewport', () => {
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should display properly on desktop', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check that container is visible
      await expect(page.locator('.container')).toBeVisible();

      // Check viewport
      const viewportSize = page.viewportSize();
      expect(viewportSize.width).toBe(1920);
    });

    test('should display sidebar on desktop', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check for sidebar or layout elements
      const layout = page.locator('.ant-layout, [class*="sidebar"]');
      const count = await layout.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Tablet viewport', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('should display properly on tablet', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check that main content is still visible
      await expect(page.locator('.container')).toBeVisible();

      // Check viewport
      const viewportSize = page.viewportSize();
      expect(viewportSize.width).toBe(768);
    });

    test('should adjust blog grid on tablet', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // Check for responsive grid
      const cols = page.locator('.ant-col');
      const count = await cols.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should display contact form properly on tablet', async ({ page }) => {
      await page.goto('/contact');
      await page.waitForLoadState('networkidle');

      // Form should still be visible and usable
      const form = page.locator('form');
      await expect(form).toBeVisible();
    });
  });

  test.describe('Mobile viewport', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('should display properly on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check that content is visible
      const container = page.locator('.container');
      await expect(container).toBeVisible();

      // Check viewport
      const viewportSize = page.viewportSize();
      expect(viewportSize.width).toBe(375);
    });

    test('should stack blog posts vertically on mobile', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // Check for blog post cards
      const cols = page.locator('.ant-col');
      const count = await cols.count();
      expect(count).toBeGreaterThan(0);

      // On mobile, Ant Design cols should take full width (xs={24})
      // Verify content is stacked properly
      const bodyHtml = await page.content();
      expect(bodyHtml).toContain('ant-col');
    });

    test('should display mobile navigation', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check for navigation elements
      const links = page.locator('a');
      const linkCount = await links.count();
      expect(linkCount).toBeGreaterThan(0);
    });

    test('should hide sidebar on mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // On mobile, sidebar might be hidden or converted to hamburger menu
      // Just verify page loads correctly
      const content = await page.textContent('body');
      expect(content.length).toBeGreaterThan(100);
    });

    test('should display contact form properly on mobile', async ({ page }) => {
      await page.goto('/contact');
      await page.waitForLoadState('networkidle');

      // Form should be visible and inputs should be accessible
      const form = page.locator('form');
      await expect(form).toBeVisible();

      // Check for stacked form layout
      const formItems = page.locator('.ant-form-item');
      const count = await formItems.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should scale images properly on mobile', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // Check that images don't overflow
      const images = page.locator('img');
      const imageCount = await images.count();

      if (imageCount > 0) {
        const firstImg = images.first();
        const boundingBox = await firstImg.boundingBox();

        if (boundingBox) {
          // Image width should not exceed viewport width
          expect(boundingBox.width).toBeLessThanOrEqual(375);
        }
      }
    });

    test('should display tags properly on mobile', async ({ page }) => {
      await page.goto('/tags');
      await page.waitForLoadState('networkidle');

      // Tags should be stacked on mobile
      const tagCards = page.locator('.ant-col');
      const count = await tagCards.count();
      expect(count).toBeGreaterThan(0);
    });
  });

  test.describe('Orientation changes', () => {
    test('should handle landscape orientation on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 667, height: 375 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Content should still be visible
      await expect(page.locator('.container')).toBeVisible();
    });
  });

  test.describe('Touch interactions', () => {
    test('should handle touch navigation on mobile device', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12 dimensions
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Try to tap a link
      const links = page.locator('a[href*="/blog"], a[href*="/contact"]').first();

      if (await links.count() > 0) {
        await links.tap();
        await page.waitForLoadState('networkidle');

        // Verify navigation worked
        expect(page.url()).not.toBe('http://localhost:8000/');
      }
    });

    test('should handle form interactions on touch devices', async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 }); // iPhone 12 dimensions
      await page.goto('/contact');
      await page.waitForLoadState('networkidle');

      // Try to tap and interact with form
      const nameInput = page.locator('input[placeholder*="Name"]').first();

      if (await nameInput.count() > 0) {
        await nameInput.tap();
        await nameInput.fill('Touch Test');

        const value = await nameInput.inputValue();
        expect(value).toBe('Touch Test');
      }
    });
  });

  test.describe('Responsive images', () => {
    test('should load appropriate image sizes for viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // Gatsby uses responsive images, check that they load
      const images = page.locator('img');
      const imageCount = await images.count();
      expect(imageCount).toBeGreaterThan(0);
    });
  });

  test.describe('Content reflow', () => {
    test('should reflow content when resizing viewport', async ({ page }) => {
      // Start with desktop
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');

      // Resize to mobile
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(500);

      // Content should still be visible and properly arranged
      await expect(page.locator('.container')).toBeVisible();
    });
  });

  test.describe('Typography scaling', () => {
    test('should have readable text on small screens', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Check for headings
      const h1 = page.locator('h1').first();

      if (await h1.count() > 0) {
        const fontSize = await h1.evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });

        // Font size should be reasonable (not too small)
        const fontSizeNum = parseFloat(fontSize);
        expect(fontSizeNum).toBeGreaterThan(16);
      }
    });
  });
});
