/**
 * Test Helpers for Gatsby Blog E2E Tests
 * Common utilities and helper functions used across test files
 */

/**
 * Wait for page to be fully loaded including network idle
 * @param {Page} page - Playwright page object
 */
async function waitForPageLoad(page) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
}

/**
 * Get all blog post links from the blog listing page
 * @param {Page} page - Playwright page object
 * @returns {Promise<Array>} Array of blog post URLs
 */
async function getBlogPostLinks(page) {
  await page.goto('/blog');
  await page.waitForSelector('a[href*="/"]', { timeout: 10000 });

  const links = await page.locator('a[href*="/"]').all();
  const blogPostUrls = [];

  for (const link of links) {
    const href = await link.getAttribute('href');
    // Filter for blog post URLs (not navigation links)
    if (href && href.includes('/') &&
        !href.includes('/blog') &&
        !href.includes('/contact') &&
        !href.includes('/tags') &&
        !href.includes('http') &&
        href !== '/') {
      blogPostUrls.push(href);
    }
  }

  return blogPostUrls;
}

/**
 * Get all tag links from the tags page
 * @param {Page} page - Playwright page object
 * @returns {Promise<Array>} Array of tag URLs
 */
async function getTagLinks(page) {
  await page.goto('/tags');
  await page.waitForSelector('.ant-col', { timeout: 10000 });

  const tagLinks = page.locator('a[href*="/tags/"]');
  const count = await tagLinks.count();
  const urls = [];

  for (let i = 0; i < count; i++) {
    const href = await tagLinks.nth(i).getAttribute('href');
    if (href) {
      urls.push(href);
    }
  }

  return urls;
}

/**
 * Fill contact form with test data
 * @param {Page} page - Playwright page object
 * @param {Object} data - Form data { name, email, description }
 */
async function fillContactForm(page, data = {}) {
  const defaultData = {
    name: 'Test User',
    email: 'test@example.com',
    description: 'This is a test message',
    ...data,
  };

  const nameInput = page.locator('input[placeholder*="Name"], input[name="name"]').first();
  await nameInput.fill(defaultData.name);

  const emailInput = page.locator('input[placeholder*="Email"], input[name="email"]').first();
  await emailInput.fill(defaultData.email);

  const messageTextarea = page.locator('textarea[placeholder*="Description"], textarea[name="description"]').first();
  await messageTextarea.fill(defaultData.description);
}

/**
 * Check if an element exists without throwing error
 * @param {Page} page - Playwright page object
 * @param {string} selector - CSS selector
 * @returns {Promise<boolean>} True if element exists
 */
async function elementExists(page, selector) {
  try {
    const count = await page.locator(selector).count();
    return count > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Wait for Gatsby page to finish loading
 * @param {Page} page - Playwright page object
 */
async function waitForGatsbyLoad(page) {
  // Wait for Gatsby's runtime to be ready
  await page.waitForFunction(() => {
    return typeof window.___loader !== 'undefined';
  }, { timeout: 10000 }).catch(() => {
    // Ignore timeout, continue anyway
  });

  await page.waitForLoadState('networkidle');
}

/**
 * Navigate to a page and wait for it to load
 * @param {Page} page - Playwright page object
 * @param {string} url - URL to navigate to
 */
async function navigateAndWait(page, url) {
  await page.goto(url);
  await waitForGatsbyLoad(page);
}

/**
 * Take a debug screenshot
 * @param {Page} page - Playwright page object
 * @param {string} name - Screenshot name
 */
async function debugScreenshot(page, name = 'debug') {
  await page.screenshot({ path: `test-results/${name}.png`, fullPage: true });
}

/**
 * Check for common Ant Design components
 * @param {Page} page - Playwright page object
 * @returns {Promise<Object>} Object with boolean flags for component presence
 */
async function checkAntDesignComponents(page) {
  return {
    hasLayout: await elementExists(page, '.ant-layout'),
    hasRow: await elementExists(page, '.ant-row'),
    hasCol: await elementExists(page, '.ant-col'),
    hasForm: await elementExists(page, '.ant-form'),
  };
}

/**
 * Get viewport size category
 * @param {number} width - Viewport width
 * @returns {string} Size category (mobile, tablet, desktop)
 */
function getViewportCategory(width) {
  if (width < 768) return 'mobile';
  if (width < 1200) return 'tablet';
  return 'desktop';
}

module.exports = {
  waitForPageLoad,
  getBlogPostLinks,
  getTagLinks,
  fillContactForm,
  elementExists,
  waitForGatsbyLoad,
  navigateAndWait,
  debugScreenshot,
  checkAntDesignComponents,
  getViewportCategory,
};
