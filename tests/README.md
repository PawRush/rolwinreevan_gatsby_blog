# Playwright Test Suite for Gatsby Blog

Comprehensive end-to-end testing suite for the Rolwin Reevan Gatsby Blog using Playwright.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Test Coverage](#test-coverage)
- [Configuration](#configuration)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Overview

This test suite provides comprehensive end-to-end testing for the Gatsby blog, covering:

- Homepage and blog listing functionality
- Individual blog post rendering
- Tag filtering and navigation
- Contact form validation
- Responsive design across multiple devices

The tests are built with Playwright, a modern end-to-end testing framework that supports multiple browsers (Chromium, Firefox, WebKit) and devices.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Gatsby CLI (for development server)

## Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Install Playwright browsers (if not already installed):
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests with UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests for specific browser
```bash
npm run test:chromium
```

### Run specific test file
```bash
npx playwright test tests/e2e/01-homepage-blog-listing.spec.js
```

### Run specific test
```bash
npx playwright test -g "should load the homepage successfully"
```

### View test report
```bash
npm run test:report
```

## Test Structure

The test suite is organized into the following files:

### 1. Homepage and Blog Listing Tests
**File:** `tests/e2e/01-homepage-blog-listing.spec.js`

Tests covering:
- Homepage loading and structure
- Navigation to blog page
- Blog post listing display
- Blog post cards and metadata
- SEO meta tags
- Ant Design layout structure

**Key tests:**
- Should load the homepage successfully
- Should navigate to blog page from homepage
- Should display multiple blog posts
- Should have proper page structure

### 2. Blog Post Rendering Tests
**File:** `tests/e2e/02-blog-post-rendering.spec.js`

Tests covering:
- Navigation to individual blog posts
- Blog post title and content display
- Cover image rendering
- Markdown content rendering
- Syntax highlighting for code blocks
- Navigation back to blog listing

**Key tests:**
- Should navigate to a blog post from blog listing
- Should display blog post title and content
- Should display blog post cover image
- Should render markdown content properly
- Should have syntax highlighting for code blocks

### 3. Tag Filtering Tests
**File:** `tests/e2e/03-tag-filtering.spec.js`

Tests covering:
- Tags page display
- Tag cards and images
- Navigation to tag-specific pages
- Tag-filtered blog post display
- Grid layout for tags

**Key tests:**
- Should display tags page with tag cards
- Should be able to click on a tag card
- Should display tag-specific blog posts
- Should maintain navigation on tag detail page

### 4. Contact Form Validation Tests
**File:** `tests/e2e/04-contact-form-validation.spec.js`

Tests covering:
- Contact page display
- Form fields presence
- Required field validation
- Email format validation
- Form submission handling
- Form accessibility

**Key tests:**
- Should display all form fields
- Should show validation error when submitting empty form
- Should validate required name field
- Should validate email format
- Should validate required description field
- Should accept valid form submission

### 5. Responsive Design Tests
**File:** `tests/e2e/05-responsive-design.spec.js`

Tests covering:
- Multiple viewport sizes (Desktop, Laptop, Tablet, Mobile, Small Mobile)
- Mobile-specific navigation
- Touch interactions
- Grid system responsiveness
- Layout consistency across pages
- Ant Design responsive columns

**Key tests:**
- Should load homepage responsively
- Should display navigation on all screen sizes
- Should handle mobile navigation
- Should maintain header across all pages
- Should support touch interactions on mobile

## Test Coverage

### Pages Tested
- ✅ Homepage (/)
- ✅ Blog listing (/blog)
- ✅ Individual blog posts (/blog/post-slug)
- ✅ Tags page (/tags)
- ✅ Tag-specific pages (/tags/tag-name)
- ✅ Contact page (/contact)

### Features Tested
- ✅ Navigation between pages
- ✅ Blog post rendering and display
- ✅ Tag filtering and navigation
- ✅ Contact form validation
- ✅ Responsive design (5 viewport sizes)
- ✅ SEO meta tags
- ✅ Ant Design component rendering
- ✅ Image loading
- ✅ Markdown rendering
- ✅ Code syntax highlighting

### Browser Coverage
- ✅ Chromium (Chrome/Edge)
- ✅ Firefox
- ✅ WebKit (Safari)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)
- ✅ Microsoft Edge

## Configuration

The test configuration is defined in `playwright.config.js`:

```javascript
{
  testDir: './tests/e2e',
  timeout: 30000,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  baseURL: 'http://localhost:8001',
  projects: ['chromium', 'firefox', 'webkit', 'Mobile Chrome', 'Mobile Safari', 'Microsoft Edge']
}
```

### Configuration Options

- **testDir**: Location of test files
- **timeout**: Maximum time for each test (30 seconds)
- **retries**: Number of retries for failed tests (2 in CI, 0 locally)
- **workers**: Number of parallel workers (1 in CI, unlimited locally)
- **baseURL**: Development server URL
- **reporter**: HTML, list, and JSON reporters

### Environment Variables

- `BASE_URL`: Override the default base URL (default: http://localhost:8001)
- `CI`: Enable CI mode with retries and single worker

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    - name: Install dependencies
      run: npm ci --legacy-peer-deps
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npm test
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: test-results/
        retention-days: 30
```

## Troubleshooting

### Common Issues

#### 1. Port 8000 already in use
If you see an error about port 8000 being in use, the config uses port 8001 by default. You can:

```bash
# Kill the process on port 8000
lsof -ti :8000 | xargs kill -9

# Or set a different port
export PORT=8002
npm run develop
```

#### 2. Tests timing out
Increase the timeout in `playwright.config.js`:

```javascript
timeout: 60 * 1000, // 60 seconds
```

#### 3. Browsers not installed
Install Playwright browsers:

```bash
npx playwright install
```

#### 4. Dev server not starting
Ensure Gatsby dev server is running:

```bash
npm run develop
```

Or let Playwright start it automatically (configured in `webServer` option).

#### 5. Test failures due to network issues
Enable retries in local development:

```javascript
retries: 2, // In playwright.config.js
```

### Debug Mode

Run tests in debug mode to step through tests:

```bash
npm run test:debug
```

Or use the Playwright Inspector:

```bash
PWDEBUG=1 npx playwright test
```

### Viewing Test Results

After running tests, view the HTML report:

```bash
npm run test:report
```

This will open a browser with detailed test results, including:
- Test execution timeline
- Screenshots of failures
- Video recordings of failed tests
- Network logs
- Console logs

## Best Practices

1. **Wait for elements properly**: Use `await expect(element).toBeVisible()` instead of arbitrary `waitForTimeout`
2. **Use semantic selectors**: Prefer text content and accessibility selectors over CSS classes
3. **Keep tests independent**: Each test should be able to run independently
4. **Use Page Object Model**: For larger test suites, consider using POM pattern
5. **Mock external APIs**: Don't test against real backend services
6. **Test user flows**: Test complete user journeys, not just individual components

## Writing New Tests

To add new tests:

1. Create a new file in `tests/e2e/` with `.spec.js` extension
2. Follow the naming convention: `##-descriptive-name.spec.js`
3. Use `test.describe()` to group related tests
4. Use `test.beforeEach()` for common setup
5. Write clear, descriptive test names

Example:

```javascript
const { test, expect } = require('@playwright/test');

test.describe('New Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/new-feature');
  });

  test('should do something', async ({ page }) => {
    // Your test code here
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Gatsby Testing Guide](https://www.gatsbyjs.com/docs/testing/)
- [Ant Design Components](https://ant.design/components/overview/)
- [Best Practices for E2E Testing](https://playwright.dev/docs/best-practices)

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your tests
4. Run the test suite
5. Submit a pull request

## Support

For issues or questions:
- Check the [Playwright Documentation](https://playwright.dev/)
- Open an issue on GitHub
- Contact the maintainers
