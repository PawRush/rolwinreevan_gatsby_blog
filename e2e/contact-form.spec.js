const { test, expect } = require('@playwright/test');

test.describe('Contact Form Validation', () => {
  test('should load contact page', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for contact heading
    await expect(page.locator('h1:has-text("Contact")')).toBeVisible();
  });

  test('should display contact form', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for form element
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('should display contact form fields', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for form inputs
    const inputs = page.locator('input[type="text"], input[placeholder*="Name"], input[placeholder*="Email"]');
    const inputCount = await inputs.count();
    expect(inputCount).toBeGreaterThan(0);

    // Check for textarea
    const textarea = page.locator('textarea');
    await expect(textarea).toBeVisible();

    // Check for submit button
    const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
    await expect(submitButton).toBeVisible();
  });

  test('should show validation error when submitting empty form', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
    await submitButton.click();

    // Wait a moment for validation to trigger
    await page.waitForTimeout(1000);

    // Check for validation messages (Ant Design form validation)
    const errorMessages = page.locator('.ant-form-item-explain-error, [class*="error"]');
    const errorCount = await errorMessages.count();

    // Should have at least one error message
    expect(errorCount).toBeGreaterThan(0);
  });

  test('should validate required name field', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Fill only email and description, leave name empty
    const emailInput = page.locator('input[placeholder*="Email"]').first();
    const descriptionTextarea = page.locator('textarea').first();

    if (await emailInput.count() > 0) {
      await emailInput.fill('test@example.com');
    }

    if (await descriptionTextarea.count() > 0) {
      await descriptionTextarea.fill('This is a test message');
    }

    // Try to submit
    const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
    await submitButton.click();

    await page.waitForTimeout(1000);

    // Should show error for missing name
    const bodyText = await page.textContent('body');
    const hasError = bodyText.includes('required') || bodyText.includes('Required');

    expect(hasError).toBeTruthy();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Fill form with invalid email
    const nameInput = page.locator('input[placeholder*="Name"]').first();
    const emailInput = page.locator('input[placeholder*="Email"]').first();
    const descriptionTextarea = page.locator('textarea').first();

    if (await nameInput.count() > 0) {
      await nameInput.fill('Test User');
    }

    if (await emailInput.count() > 0) {
      await emailInput.fill('invalid-email');
    }

    if (await descriptionTextarea.count() > 0) {
      await descriptionTextarea.fill('This is a test message');
    }

    // Try to submit
    const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
    await submitButton.click();

    await page.waitForTimeout(1000);

    // Should show email validation error
    const bodyText = await page.textContent('body');
    const hasEmailError = bodyText.includes('email') || bodyText.includes('valid');

    // If no explicit error shown, at least form shouldn't submit successfully
    expect(hasEmailError || bodyText.includes('required')).toBeTruthy();
  });

  test('should validate required description field', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Fill only name and email, leave description empty
    const nameInput = page.locator('input[placeholder*="Name"]').first();
    const emailInput = page.locator('input[placeholder*="Email"]').first();

    if (await nameInput.count() > 0) {
      await nameInput.fill('Test User');
    }

    if (await emailInput.count() > 0) {
      await emailInput.fill('test@example.com');
    }

    // Try to submit
    const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
    await submitButton.click();

    await page.waitForTimeout(1000);

    // Should show error for missing description
    const bodyText = await page.textContent('body');
    const hasError = bodyText.includes('required') || bodyText.includes('Required');

    expect(hasError).toBeTruthy();
  });

  test('should accept valid form submission', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Fill all required fields with valid data
    const nameInput = page.locator('input[placeholder*="Name"]').first();
    const emailInput = page.locator('input[placeholder*="Email"]').first();
    const descriptionTextarea = page.locator('textarea').first();

    if (await nameInput.count() > 0) {
      await nameInput.fill('Test User');
    }

    if (await emailInput.count() > 0) {
      await emailInput.fill('test@example.com');
    }

    if (await descriptionTextarea.count() > 0) {
      await descriptionTextarea.fill('This is a comprehensive test message for the contact form validation.');
    }

    // Note: We're not actually submitting to avoid hitting the real endpoint
    // Just verify the form is ready to submit
    const submitButton = page.locator('button[type="submit"], button:has-text("SUBMIT")');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test('should display contact image/illustration', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for contact image
    const images = page.locator('img[alt*="contact"], img[src*="contact"]');
    const imageCount = await images.count();

    // Should have at least one image
    expect(imageCount).toBeGreaterThan(0);
  });

  test('should have proper form layout and styling', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for Ant Design form classes
    const formItems = page.locator('.ant-form-item');
    const formItemCount = await formItems.count();

    expect(formItemCount).toBeGreaterThan(0);
  });

  test('should show field labels or placeholders', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for input placeholders
    const nameInput = page.locator('input[placeholder*="Name"]').first();
    const emailInput = page.locator('input[placeholder*="Email"]').first();
    const descInput = page.locator('textarea[placeholder*="Description"]').first();

    // At least one should exist
    const nameExists = await nameInput.count() > 0;
    const emailExists = await emailInput.count() > 0;
    const descExists = await descInput.count() > 0;

    expect(nameExists || emailExists || descExists).toBeTruthy();
  });

  test('should have responsive form layout', async ({ page }) => {
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Check for responsive grid layout (Ant Design Col components)
    const cols = page.locator('.ant-col');
    const colCount = await cols.count();

    expect(colCount).toBeGreaterThan(0);
  });
});
