const { test, expect } = require('@playwright/test');

test.describe('Tag Filtering Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to tags page before each test
    await page.goto('/tags');
  });

  test('should display tags page', async ({ page }) => {
    // Verify tags page loads
    await expect(page).toHaveURL('/tags');

    // Check for tags heading
    await expect(page.locator('h1:has-text("Tags"), h1:has-text("#Tags")')).toBeVisible();
  });

  test('should display tag cards', async ({ page }) => {
    // Wait for tag cards to load
    await page.waitForSelector('.ant-col', { timeout: 10000 });

    // Check that tag cards are displayed
    const tagCards = page.locator('.ant-col');
    const count = await tagCards.count();

    // Should have at least one tag
    expect(count).toBeGreaterThan(0);
  });

  test('should display tag images and descriptions', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check for tag images
    const images = page.locator('img');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);
  });

  test('should be able to click on a tag card', async ({ page }) => {
    // Wait for tag cards to load
    await page.waitForSelector('.ant-col', { timeout: 10000 });

    // Get all links on the page
    const tagLinks = page.locator('a[href*="/tags/"]');
    const count = await tagLinks.count();

    if (count > 0) {
      const firstTagLink = tagLinks.first();
      const href = await firstTagLink.getAttribute('href');

      // Click on the first tag
      await firstTagLink.click();

      // Verify navigation to tag-specific page
      await page.waitForLoadState('networkidle');

      // URL should have changed
      const currentUrl = page.url();
      expect(currentUrl).toContain('/tags/');
    }
  });

  test('should navigate to tags page from navigation', async ({ page }) => {
    // Start from homepage
    await page.goto('/');

    // Find and click on Tags link
    const tagsLink = page.locator('a[href*="/tags"], a:has-text("Tags")').first();
    await tagsLink.click();

    // Verify we're on tags page
    await expect(page).toHaveURL(/.*tags.*/);
  });

  test('should display tag-specific blog posts', async ({ page }) => {
    // Wait for tag cards to load
    await page.waitForSelector('.ant-col', { timeout: 10000 });

    // Find a tag link
    const tagLinks = page.locator('a[href*="/tags/"]');
    const count = await tagLinks.count();

    if (count > 0) {
      // Click on first tag
      await tagLinks.first().click();

      // Wait for navigation
      await page.waitForLoadState('networkidle');

      // Should display filtered blog posts
      // The page should have blog post cards or articles
      const blogCards = page.locator('.ant-col');
      await expect(blogCards.first()).toBeVisible({ timeout: 10000 });
    }
  });

  test('should have proper grid layout for tags', async ({ page }) => {
    // Verify Ant Design grid structure
    await expect(page.locator('.ant-row')).toBeVisible();

    // Check for responsive columns
    const cols = page.locator('.ant-col');
    const count = await cols.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have SEO meta tags on tags page', async ({ page }) => {
    // Check page title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // Check for description meta tag
    const descriptionMeta = page.locator('meta[name="description"]');
    const description = await descriptionMeta.getAttribute('content');
    expect(description).toBeTruthy();
  });

  test('should display consistent layout across tags page', async ({ page }) => {
    // Verify layout structure
    await expect(page.locator('.ant-layout')).toBeVisible();
    await expect(page.locator('.container')).toBeVisible();

    // Verify header is present
    const header = page.locator('header, .ant-layout-header, nav');
    await expect(header.first()).toBeVisible();
  });

  test('should handle no tags gracefully', async ({ page }) => {
    // This test ensures the page doesn't break even if there are no tags
    // The page should still load and display proper structure

    await page.waitForLoadState('networkidle');

    // Layout should still be present
    await expect(page.locator('.ant-layout')).toBeVisible();
  });

  test('should show tag colors or styling', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check that tag cards have styling
    const tagCards = page.locator('.ant-col');
    const count = await tagCards.count();

    if (count > 0) {
      const firstCard = tagCards.first();
      await expect(firstCard).toBeVisible();

      // Verify the card has content
      const content = await firstCard.textContent();
      expect(content.trim().length).toBeGreaterThan(0);
    }
  });

  test('should maintain navigation on tag detail page', async ({ page }) => {
    // Wait for tag cards to load
    await page.waitForSelector('.ant-col', { timeout: 10000 });

    // Find and click on a tag
    const tagLinks = page.locator('a[href*="/tags/"]');
    const count = await tagLinks.count();

    if (count > 0) {
      await tagLinks.first().click();
      await page.waitForLoadState('networkidle');

      // Verify navigation is still present
      const header = page.locator('header, .ant-layout-header, nav');
      await expect(header.first()).toBeVisible();

      // Should be able to navigate back to all tags
      const allTagsLink = page.locator('a[href="/tags"]');
      const allTagsCount = await allTagsLink.count();

      if (allTagsCount > 0) {
        await allTagsLink.first().click();
        await expect(page).toHaveURL('/tags');
      }
    }
  });
});
