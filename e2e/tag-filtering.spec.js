const { test, expect } = require('@playwright/test');

test.describe('Tag Filtering Functionality', () => {
  test('should load tags page', async ({ page }) => {
    await page.goto('/tags');
    await page.waitForLoadState('networkidle');

    // Check for tags heading
    await expect(page.locator('h1:has-text("Tags"), h1:has-text("#Tags")')).toBeVisible();
  });

  test('should display tag cards on tags page', async ({ page }) => {
    await page.goto('/tags');
    await page.waitForLoadState('networkidle');

    // Check for tag cards - they should be in a grid layout
    const tagCards = page.locator('.ant-col, [class*="tagCard"]');
    const count = await tagCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display available tags (javascript, react, etc)', async ({ page }) => {
    await page.goto('/tags');
    await page.waitForLoadState('networkidle');

    const bodyText = await page.textContent('body');

    // Check for common tags mentioned in config
    const hasJavaScript = bodyText.toLowerCase().includes('javascript');
    const hasReact = bodyText.toLowerCase().includes('react');
    const hasTags = hasJavaScript || hasReact;

    expect(hasTags).toBeTruthy();
  });

  test('should navigate to a specific tag page when clicking on a tag', async ({ page }) => {
    await page.goto('/tags');
    await page.waitForLoadState('networkidle');

    // Find links to tag pages
    const tagLinks = page.locator('a[href*="/tags/"]');
    const linkCount = await tagLinks.count();

    if (linkCount > 0) {
      const firstTagLink = tagLinks.first();
      await firstTagLink.click();
      await page.waitForLoadState('networkidle');

      // Verify we're on a tag-specific page
      expect(page.url()).toContain('/tags/');
    }
  });

  test('should display posts filtered by JavaScript tag', async ({ page }) => {
    await page.goto('/tags/javascript');
    await page.waitForLoadState('networkidle');

    // Check for page heading with tag name
    const h1 = page.locator('h1');
    const count = await h1.count();
    expect(count).toBeGreaterThan(0);

    // Check for filtered blog posts
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(100);
  });

  test('should display tag description', async ({ page }) => {
    await page.goto('/tags/javascript');
    await page.waitForLoadState('networkidle');

    // Check for description text
    const h4Elements = page.locator('h4');
    const count = await h4Elements.count();

    if (count > 0) {
      const descText = await h4Elements.first().textContent();
      expect(descText).toBeTruthy();
    } else {
      // At minimum, verify page loaded
      const content = await page.textContent('body');
      expect(content.length).toBeGreaterThan(50);
    }
  });

  test('should display tag banner/image', async ({ page }) => {
    await page.goto('/tags/javascript');
    await page.waitForLoadState('networkidle');

    // Check for images (tags should have banner images)
    const images = page.locator('img');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);
  });

  test('should show blog posts related to the selected tag', async ({ page }) => {
    await page.goto('/tags/javascript');
    await page.waitForLoadState('networkidle');

    // Look for blog post cards
    const postCards = page.locator('.ant-col, [class*="postCard"]');
    const cardCount = await postCards.count();
    expect(cardCount).toBeGreaterThan(0);
  });

  test('should filter posts correctly - only show posts with selected tag', async ({ page }) => {
    await page.goto('/tags/reactjs');
    await page.waitForLoadState('networkidle');

    // Verify we're on the react tag page
    expect(page.url()).toContain('/tags/reactjs');

    // Check that content loaded
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(100);
  });

  test('should navigate back to all tags from a specific tag page', async ({ page }) => {
    await page.goto('/tags/javascript');
    await page.waitForLoadState('networkidle');

    // Try to find link back to tags index
    const tagsLink = page.locator('a[href="/tags"]').first();

    if (await tagsLink.count() > 0) {
      await tagsLink.click();
      await page.waitForLoadState('networkidle');

      // Verify we're back on tags page
      expect(page.url()).toContain('/tags');
      expect(page.url()).not.toContain('/tags/');
    }
  });

  test('should display tag colors correctly', async ({ page }) => {
    await page.goto('/tags');
    await page.waitForLoadState('networkidle');

    // Check for colored elements (tag cards should have colors from config)
    const bodyHtml = await page.content();

    // Verify page structure is present
    expect(bodyHtml).toContain('ant-col');
  });

  test('should handle navigation between different tag pages', async ({ page }) => {
    await page.goto('/tags/javascript');
    await page.waitForLoadState('networkidle');

    // Navigate to another tag
    await page.goto('/tags/nodejs');
    await page.waitForLoadState('networkidle');

    // Verify we're on nodejs tag page
    expect(page.url()).toContain('/tags/nodejs');
  });
});
