const { test, expect } = require('@playwright/test');

test.describe('Individual Blog Post Rendering', () => {
  let firstPostUrl;

  test.beforeAll(async ({ browser }) => {
    // Get the first blog post URL to use in tests
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/blog');

    // Wait for blog posts to load
    await page.waitForSelector('a[href*="/"]', { timeout: 10000 });

    // Get the first blog post link
    const links = await page.locator('a[href*="/"]').all();
    for (const link of links) {
      const href = await link.getAttribute('href');
      // Filter for blog post URLs (not navigation links)
      if (href && href.includes('/') && !href.includes('/blog') &&
          !href.includes('/contact') && !href.includes('/tags') &&
          !href.includes('http') && href !== '/') {
        firstPostUrl = href;
        break;
      }
    }

    await context.close();
  });

  test('should navigate to a blog post from blog listing', async ({ page }) => {
    await page.goto('/blog');

    // Wait for blog posts to load
    await page.waitForSelector('a[href*="/"]', { timeout: 10000 });

    // Find and click on a blog post link
    const links = await page.locator('a[href*="/"]').all();
    let clicked = false;

    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && href.includes('/') && !href.includes('/blog') &&
          !href.includes('/contact') && !href.includes('/tags') &&
          !href.includes('http') && href !== '/') {
        await link.click();
        clicked = true;
        break;
      }
    }

    expect(clicked).toBe(true);

    // Wait for navigation
    await page.waitForLoadState('networkidle');

    // Verify we're on a different page
    await expect(page).not.toHaveURL('/blog');
  });

  test('should display blog post title', async ({ page }) => {
    // Skip if no post URL found
    test.skip(!firstPostUrl, 'No blog post URL found');

    await page.goto(firstPostUrl);

    // Verify post title is displayed
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    const titleText = await h1.textContent();
    expect(titleText.length).toBeGreaterThan(0);
  });

  test('should display blog post content', async ({ page }) => {
    test.skip(!firstPostUrl, 'No blog post URL found');

    await page.goto(firstPostUrl);

    // Verify post article content is present
    const article = page.locator('article, .blogArticle, [class*="article"]').first();
    await expect(article).toBeVisible({ timeout: 10000 });
  });

  test('should display blog post cover image', async ({ page }) => {
    test.skip(!firstPostUrl, 'No blog post URL found');

    await page.goto(firstPostUrl);

    // Check for banner/cover image
    const image = page.locator('img, .gatsby-image-wrapper, [class*="banner"]').first();
    await expect(image).toBeVisible({ timeout: 10000 });
  });

  test('should have proper blog post structure', async ({ page }) => {
    test.skip(!firstPostUrl, 'No blog post URL found');

    await page.goto(firstPostUrl);

    // Verify layout structure
    await expect(page.locator('.ant-layout')).toBeVisible();
    await expect(page.locator('.container')).toBeVisible();
  });

  test('should have SEO meta tags for blog post', async ({ page }) => {
    test.skip(!firstPostUrl, 'No blog post URL found');

    await page.goto(firstPostUrl);

    // Check page title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);

    // Check for description meta tag
    const descriptionMeta = page.locator('meta[name="description"]');
    const description = await descriptionMeta.getAttribute('content');
    expect(description).toBeTruthy();
  });

  test('should display header and navigation on blog post', async ({ page }) => {
    test.skip(!firstPostUrl, 'No blog post URL found');

    await page.goto(firstPostUrl);

    // Verify header is present
    const header = page.locator('header, .ant-layout-header, nav');
    await expect(header.first()).toBeVisible();
  });

  test('should be able to navigate back to blog listing', async ({ page }) => {
    test.skip(!firstPostUrl, 'No blog post URL found');

    await page.goto(firstPostUrl);

    // Click on Blog link in navigation
    const blogLink = page.locator('a[href*="/blog"], a:has-text("Blog")').first();
    await blogLink.click();

    // Verify we're back on blog page
    await expect(page).toHaveURL(/.*blog.*/);
  });

  test('should render markdown content properly', async ({ page }) => {
    test.skip(!firstPostUrl, 'No blog post URL found');

    await page.goto(firstPostUrl);

    // Wait for article content
    await page.waitForSelector('article, .blogArticle, [class*="article"]', { timeout: 10000 });

    // Check that content is rendered (look for common HTML elements from markdown)
    const article = page.locator('article, .blogArticle, [class*="article"]').first();
    const content = await article.textContent();

    // Content should not be empty
    expect(content.trim().length).toBeGreaterThan(0);
  });

  test('should have syntax highlighting for code blocks', async ({ page }) => {
    test.skip(!firstPostUrl, 'No blog post URL found');

    await page.goto(firstPostUrl);

    // Check if Prism.js styles are loaded (for code highlighting)
    const prismElements = page.locator('pre code, .token, [class*="language-"]');

    // If code blocks exist, they should have syntax highlighting classes
    const count = await prismElements.count();
    // This is optional - not all posts will have code blocks
    // Just verify that if they exist, they're properly styled
    if (count > 0) {
      await expect(prismElements.first()).toBeVisible();
    }
  });
});
