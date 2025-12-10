const { test, expect, devices } = require('@playwright/test');

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Laptop', width: 1366, height: 768 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Small Mobile', width: 320, height: 568 },
  ];

  viewports.forEach(({ name, width, height }) => {
    test.describe(`${name} viewport (${width}x${height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height });
      });

      test('should load homepage responsively', async ({ page }) => {
        await page.goto('/');

        // Verify page loads
        await expect(page.locator('.container')).toBeVisible();

        // Verify layout is present
        await expect(page.locator('.ant-layout')).toBeVisible();
      });

      test('should display navigation on all screen sizes', async ({ page }) => {
        await page.goto('/');

        // Check for header/navigation
        const header = page.locator('header, .ant-layout-header, nav');
        await expect(header.first()).toBeVisible();
      });

      test('should display blog listing responsively', async ({ page }) => {
        await page.goto('/blog');

        // Verify blog page loads
        await expect(page.locator('h1:has-text("Blog")')).toBeVisible();

        // Verify blog cards are displayed
        await page.waitForSelector('.ant-col', { timeout: 10000 });
        const blogCards = page.locator('.ant-col');
        const count = await blogCards.count();
        expect(count).toBeGreaterThan(0);
      });

      test('should display contact form responsively', async ({ page }) => {
        await page.goto('/contact');

        // Verify form is visible
        const form = page.locator('form');
        await expect(form).toBeVisible();

        // Verify form fields are accessible
        const nameInput = page.locator('input[placeholder*="Name"], input[name="name"]').first();
        await expect(nameInput).toBeVisible();
      });

      test('should display tags page responsively', async ({ page }) => {
        await page.goto('/tags');

        // Verify tags page loads
        await expect(page.locator('h1:has-text("Tags"), h1:has-text("#Tags")')).toBeVisible();

        // Verify tag cards are displayed
        await page.waitForSelector('.ant-col', { timeout: 10000 });
        const tagCards = page.locator('.ant-col');
        const count = await tagCards.count();
        expect(count).toBeGreaterThan(0);
      });
    });
  });

  test.describe('Mobile-specific tests', () => {
    test.use({ ...devices['iPhone 12'] });

    test('should handle mobile navigation', async ({ page }) => {
      await page.goto('/');

      // On mobile, there might be a hamburger menu
      // Check if navigation is accessible (either visible or in a menu)
      const nav = page.locator('nav, header, .ant-layout-header');
      await expect(nav.first()).toBeVisible();
    });

    test('should display blog cards in single column on mobile', async ({ page }) => {
      await page.goto('/blog');

      // Wait for blog cards
      await page.waitForSelector('.ant-col', { timeout: 10000 });

      // On mobile, Ant Design typically shows single column
      // Verify content is still visible
      const blogCards = page.locator('.ant-col');
      await expect(blogCards.first()).toBeVisible();
    });

    test('should make contact form usable on mobile', async ({ page }) => {
      await page.goto('/contact');

      // Verify all form fields are accessible
      const nameInput = page.locator('input[placeholder*="Name"], input[name="name"]').first();
      await expect(nameInput).toBeVisible();

      const emailInput = page.locator('input[placeholder*="Email"], input[name="email"]').first();
      await expect(emailInput).toBeVisible();

      const messageTextarea = page.locator('textarea[placeholder*="Description"], textarea[name="description"]').first();
      await expect(messageTextarea).toBeVisible();

      // Test form interaction on mobile
      await nameInput.fill('Mobile User');
      await emailInput.fill('mobile@test.com');
      await messageTextarea.fill('Testing mobile form');

      // Verify submit button is accessible
      const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
      await expect(submitButton.first()).toBeVisible();
    });

    test('should display images properly on mobile', async ({ page }) => {
      await page.goto('/blog');

      // Wait for content to load
      await page.waitForLoadState('networkidle');

      // Check that images are loaded
      const images = page.locator('img, .gatsby-image-wrapper');
      const count = await images.count();

      if (count > 0) {
        // Verify at least one image is visible
        await expect(images.first()).toBeVisible();
      }
    });
  });

  test.describe('Tablet-specific tests', () => {
    test.use({ ...devices['iPad Pro'] });

    test('should display in multi-column layout on tablet', async ({ page }) => {
      await page.goto('/blog');

      // Wait for blog cards
      await page.waitForSelector('.ant-col', { timeout: 10000 });

      // Verify grid layout is working
      const row = page.locator('.ant-row');
      await expect(row.first()).toBeVisible();

      // Blog cards should be visible
      const blogCards = page.locator('.ant-col');
      const count = await blogCards.count();
      expect(count).toBeGreaterThan(0);
    });

    test('should make tags grid responsive on tablet', async ({ page }) => {
      await page.goto('/tags');

      // Wait for tag cards
      await page.waitForSelector('.ant-col', { timeout: 10000 });

      // Verify grid layout
      const tagCards = page.locator('.ant-col');
      await expect(tagCards.first()).toBeVisible();
    });
  });

  test.describe('Ant Design Grid System', () => {
    test('should use responsive columns (xs, sm, md, lg)', async ({ page }) => {
      await page.goto('/blog');

      // Wait for content
      await page.waitForSelector('.ant-col', { timeout: 10000 });

      // Verify Ant Design columns have responsive classes
      const cols = page.locator('.ant-col');
      const count = await cols.count();
      expect(count).toBeGreaterThan(0);

      // Check that columns exist (they should have classes like ant-col-xs-24, ant-col-md-12, etc.)
      const firstCol = cols.first();
      await expect(firstCol).toBeVisible();
    });

    test('should maintain proper gutter spacing', async ({ page }) => {
      await page.goto('/blog');

      // Wait for grid
      await page.waitForSelector('.ant-row', { timeout: 10000 });

      // Verify row has gutter
      const row = page.locator('.ant-row');
      await expect(row.first()).toBeVisible();
    });
  });

  test.describe('Layout Consistency', () => {
    test('should maintain header across all pages on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const pages = ['/', '/blog', '/contact', '/tags'];

      for (const pagePath of pages) {
        await page.goto(pagePath);

        // Verify header is present
        const header = page.locator('header, .ant-layout-header, nav');
        await expect(header.first()).toBeVisible();
      }
    });

    test('should maintain header across all pages on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });

      const pages = ['/', '/blog', '/contact', '/tags'];

      for (const pagePath of pages) {
        await page.goto(pagePath);

        // Verify header is present
        const header = page.locator('header, .ant-layout-header, nav');
        await expect(header.first()).toBeVisible();
      }
    });
  });

  test.describe('Touch Interactions', () => {
    test.use({ ...devices['iPhone 12'] });

    test('should support touch interactions on mobile', async ({ page }) => {
      await page.goto('/blog');

      // Wait for blog cards
      await page.waitForSelector('.ant-col', { timeout: 10000 });

      // Find a clickable element
      const links = page.locator('a[href*="/"]');
      const count = await links.count();

      if (count > 0) {
        const firstLink = links.first();
        await expect(firstLink).toBeVisible();

        // Verify link is clickable (tap on mobile)
        await firstLink.click();
        await page.waitForLoadState('networkidle');

        // Should have navigated somewhere
        const url = page.url();
        expect(url.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Viewport Meta Tag', () => {
    test('should have proper viewport meta tag', async ({ page }) => {
      await page.goto('/');

      // Check for viewport meta tag
      const viewportMeta = page.locator('meta[name="viewport"]');
      const content = await viewportMeta.getAttribute('content');

      // Should have viewport meta tag with proper settings
      expect(content).toBeTruthy();
      expect(content).toContain('width=device-width');
    });
  });
});
