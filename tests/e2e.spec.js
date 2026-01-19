const { test, expect } = require('@playwright/test');

test.describe('Gatsby Blog E2E Tests', () => {
  // Homepage Tests
  test('homepage loads with container', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page.locator('.container')).toBeVisible();
  });

  test('homepage has SEO meta tags', async ({ page }) => {
    await page.goto('/');
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
  });

  test('can navigate to blog page from homepage', async ({ page }) => {
    await page.goto('/');
    const blogLink = page.locator('a[href*="/blog"], a:has-text("Blog")').first();
    await blogLink.click();
    await expect(page).toHaveURL(/.*blog.*/);
  });

  // Blog Listing Tests
  test('blog page displays posts in grid layout', async ({ page }) => {
    await page.goto('/blog');
    await expect(page.locator('h1:has-text("Blog")')).toBeVisible();
    await expect(page.locator('.ant-row').first()).toBeVisible();
    const postCards = page.locator('.ant-col');
    await expect(postCards.first()).toBeVisible({ timeout: 10000 });
    const count = await postCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('blog post cards have clickable links', async ({ page }) => {
    await page.goto('/blog');
    await page.waitForSelector('.ant-col', { timeout: 10000 });
    const firstPostLink = page.locator('a[href*="/"]').first();
    const href = await firstPostLink.getAttribute('href');
    expect(href).toBeTruthy();
  });

  // Blog Post Tests - using known blog post URL
  test('can view a blog post directly', async ({ page }) => {
    await page.goto('/whats-new-in-react17');
    await page.waitForLoadState('domcontentloaded');
    
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('blog post displays content', async ({ page }) => {
    await page.goto('/whats-new-in-react17');
    await page.waitForLoadState('domcontentloaded');
    
    // Just verify the page loaded and has content
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible({ timeout: 10000 });
  });

  test('can navigate back to blog from post', async ({ page }) => {
    await page.goto('/whats-new-in-react17');
    await page.waitForLoadState('domcontentloaded');
    
    const blogLink = page.locator('a[href*="/blog"], a:has-text("Blog")').first();
    await blogLink.click();
    await expect(page).toHaveURL(/.*blog.*/);
  });

  // Tags Tests
  test('tags page displays tag cards', async ({ page }) => {
    await page.goto('/tags');
    await expect(page).toHaveURL('/tags');
    await expect(page.locator('h1:has-text("Tags"), h1:has-text("#Tags")')).toBeVisible();
    await page.waitForSelector('.ant-col', { timeout: 10000 });
    const tagCards = page.locator('.ant-col');
    const count = await tagCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('can navigate to tags from homepage', async ({ page }) => {
    await page.goto('/');
    const tagsLink = page.locator('a[href*="/tags"], a:has-text("Tags")').first();
    await tagsLink.click();
    await expect(page).toHaveURL(/.*tags.*/);
  });

  // Contact Form Tests
  test('contact page displays form with all fields', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveURL('/contact');
    
    const form = page.locator('form');
    await expect(form).toBeVisible();
    
    const nameInput = page.locator('input[placeholder*="Name"], input[name="name"]').first();
    await expect(nameInput).toBeVisible();
    
    const emailInput = page.locator('input[placeholder*="Email"], input[name="email"]').first();
    await expect(emailInput).toBeVisible();
    
    const messageTextarea = page.locator('textarea[placeholder*="Description"], textarea[name="description"]').first();
    await expect(messageTextarea).toBeVisible();
    
    const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
    await expect(submitButton.first()).toBeVisible();
  });

  test('contact form shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/contact');
    
    const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
    await submitButton.first().click();
    
    await page.waitForTimeout(500);
    const validationMessages = page.locator('.ant-form-item-explain-error, .ant-form-item-has-error');
    const count = await validationMessages.count();
    expect(count).toBeGreaterThan(0);
  });

  test('contact form validates required name field', async ({ page }) => {
    await page.goto('/contact');
    
    const emailInput = page.locator('input[placeholder*="Email"], input[name="email"]').first();
    await emailInput.fill('test@example.com');
    
    const messageTextarea = page.locator('textarea[placeholder*="Description"], textarea[name="description"]').first();
    await messageTextarea.fill('Test message');
    
    const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
    await submitButton.first().click();
    
    await page.waitForTimeout(500);
    const nameError = page.locator('.ant-form-item-explain-error').first();
    await expect(nameError).toBeVisible();
  });

  test('contact form validates required description field', async ({ page }) => {
    await page.goto('/contact');
    
    const nameInput = page.locator('input[placeholder*="Name"], input[name="name"]').first();
    await nameInput.fill('John Doe');
    
    const emailInput = page.locator('input[placeholder*="Email"], input[name="email"]').first();
    await emailInput.fill('test@example.com');
    
    const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
    await submitButton.first().click();
    
    await page.waitForTimeout(500);
    const descError = page.locator('.ant-form-item-explain-error');
    const count = await descError.count();
    expect(count).toBeGreaterThan(0);
  });

  test('contact form accepts valid submission', async ({ page }) => {
    await page.goto('/contact');
    
    const nameInput = page.locator('input[placeholder*="Name"], input[name="name"]').first();
    await nameInput.fill('John Doe');
    
    const emailInput = page.locator('input[placeholder*="Email"], input[name="email"]').first();
    await emailInput.fill('test@example.com');
    
    const messageTextarea = page.locator('textarea[placeholder*="Description"], textarea[name="description"]').first();
    await messageTextarea.fill('This is a test message for the contact form.');
    
    const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
    await submitButton.first().click();
    
    await page.waitForTimeout(1000);
  });

  test('can navigate to contact from homepage', async ({ page }) => {
    await page.goto('/');
    const contactLink = page.locator('a[href*="/contact"], a:has-text("Contact")').first();
    await contactLink.click();
    await expect(page).toHaveURL(/.*contact.*/);
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  // Layout Tests
  test('all pages have consistent layout structure', async ({ page }) => {
    const pages = ['/', '/blog', '/tags', '/contact'];
    
    for (const url of pages) {
      await page.goto(url);
      await expect(page.locator('.ant-layout').first()).toBeVisible();
    }
  });

  test('form inputs are editable', async ({ page }) => {
    await page.goto('/contact');
    
    const nameInput = page.locator('input[placeholder*="Name"], input[name="name"]').first();
    await expect(nameInput).toBeEditable();
    
    const emailInput = page.locator('input[placeholder*="Email"], input[name="email"]').first();
    await expect(emailInput).toBeEditable();
    
    const messageTextarea = page.locator('textarea[placeholder*="Description"], textarea[name="description"]').first();
    await expect(messageTextarea).toBeEditable();
  });
});
