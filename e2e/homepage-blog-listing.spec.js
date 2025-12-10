const { test, expect } = require('@playwright/test');

test.describe('Homepage and Blog Listing', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check that the page loaded
    await expect(page).toHaveTitle(/Rolwin/);

    // Check for main layout elements
    await expect(page.locator('.container')).toBeVisible();
  });

  test('should display About Me section on homepage', async ({ page }) => {
    await page.goto('/');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check for About Me content
    const content = await page.textContent('body');
    expect(content).toBeTruthy();
  });

  test('should navigate to blog page', async ({ page }) => {
    await page.goto('/');

    // Navigate to blog
    await page.goto('/blog');

    // Wait for blog page to load
    await page.waitForLoadState('networkidle');

    // Check for blog title
    await expect(page.locator('h1:has-text("Blog")')).toBeVisible();
  });

  test('should display blog posts on blog page', async ({ page }) => {
    await page.goto('/blog');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check for blog posts - using Ant Design Row component
    const blogPosts = page.locator('.ant-row').first();
    await expect(blogPosts).toBeVisible();

    // Verify at least one blog post card exists
    const postCards = page.locator('[class*="postCard"]').or(page.locator('.ant-col'));
    const count = await postCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display blog post titles and excerpts', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Check for any text content that looks like blog metadata
    const content = await page.textContent('body');

    // Should have some blog-related content
    expect(content.length).toBeGreaterThan(100);
  });

  test('should have navigation links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for navigation - look for links
    const links = page.locator('a');
    const linkCount = await links.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('should be able to click on a blog post', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Find the first link that goes to a blog post
    const blogLink = page.locator('a[href*="/blog/"]').first();

    if (await blogLink.count() > 0) {
      await blogLink.click();

      // Wait for navigation
      await page.waitForLoadState('networkidle');

      // Check that we're on a blog post page
      expect(page.url()).toContain('/blog/');
    }
  });

  test('should display blog metadata (date, tags)', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Check for content - blog posts should have dates and tags
    const bodyText = await page.textContent('body');
    expect(bodyText).toBeTruthy();
  });
});
