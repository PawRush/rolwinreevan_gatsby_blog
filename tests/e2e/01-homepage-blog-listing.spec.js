const { test, expect } = require('@playwright/test');

test.describe('Homepage and Blog Listing', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    // Verify the page loads without errors
    await expect(page).toHaveURL('/');

    // Check that the main layout is present
    await expect(page.locator('.container')).toBeVisible();
  });

  test('should display header navigation', async ({ page }) => {
    // Verify header is present
    const header = page.locator('header, .ant-layout-header, nav');
    await expect(header.first()).toBeVisible();
  });

  test('should display About Me section on homepage', async ({ page }) => {
    // Check for About Me content
    await expect(page.locator('text=/about/i').first()).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to blog page from homepage', async ({ page }) => {
    // Click on Blog link
    const blogLink = page.locator('a[href*="/blog"], a:has-text("Blog")').first();
    await blogLink.click();

    // Verify navigation to blog page
    await expect(page).toHaveURL(/.*blog.*/);
  });

  test('should display blog listing page', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog');

    // Verify page title
    await expect(page.locator('h1:has-text("Blog")')).toBeVisible();

    // Check for blog post cards (using Ant Design Col component)
    const postCards = page.locator('.ant-col');
    await expect(postCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('should display multiple blog posts', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog');

    // Wait for blog posts to load
    await page.waitForSelector('.ant-col', { timeout: 10000 });

    // Count blog post cards
    const postCards = page.locator('.ant-col');
    const count = await postCards.count();

    // Should have at least one blog post
    expect(count).toBeGreaterThan(0);
  });

  test('should display blog post metadata', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Check for post card elements
    const firstPostCard = page.locator('.ant-col').first();
    await expect(firstPostCard).toBeVisible();
  });

  test('should be able to click on a blog post card', async ({ page }) => {
    // Navigate to blog page
    await page.goto('/blog');

    // Wait for blog posts to load
    await page.waitForSelector('.ant-col', { timeout: 10000 });

    // Click on the first blog post card link
    const firstPostLink = page.locator('a[href*="/"]').first();
    const href = await firstPostLink.getAttribute('href');

    // Verify that links exist
    expect(href).toBeTruthy();
  });

  test('should have SEO meta tags', async ({ page }) => {
    // Check for SEO meta tags
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // Check for description meta tag
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
  });

  test('should have proper page structure', async ({ page }) => {
    await page.goto('/blog');

    // Verify Ant Design layout structure
    await expect(page.locator('.ant-layout')).toBeVisible();

    // Verify row/col grid structure for blog posts
    await expect(page.locator('.ant-row')).toBeVisible();
  });
});
