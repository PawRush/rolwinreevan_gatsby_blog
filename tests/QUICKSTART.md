# Playwright Tests - Quick Start Guide

Get started with Playwright testing in 5 minutes!

## Quick Setup

1. **Install dependencies** (if not already done):
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Install Playwright browsers** (first time only):
   ```bash
   npx playwright install
   ```

3. **Start the dev server** (in a separate terminal):
   ```bash
   npm run develop
   ```
   Wait for the server to start at http://localhost:8001

4. **Run the tests**:
   ```bash
   npm test
   ```

That's it! You're running end-to-end tests.

## Essential Commands

### Running Tests

```bash
# Run all tests (headless)
npm test

# Run tests with browser visible
npm run test:headed

# Run tests interactively
npm run test:ui

# Debug a specific test
npm run test:debug

# Run only Chromium tests
npm run test:chromium

# View the latest test report
npm run test:report
```

### Running Specific Tests

```bash
# Run a specific test file
npx playwright test tests/e2e/01-homepage-blog-listing.spec.js

# Run tests matching a name
npx playwright test -g "homepage"

# Run tests in a specific browser
npx playwright test --project=chromium

# Run tests on mobile
npx playwright test --project="Mobile Chrome"
```

## What Gets Tested

- ✅ **Homepage & Blog Listing** - Navigation, blog posts display
- ✅ **Individual Blog Posts** - Content, images, markdown rendering
- ✅ **Tag Filtering** - Tag pages, filtering by tags
- ✅ **Contact Form** - Validation, form submission
- ✅ **Responsive Design** - Desktop, tablet, mobile layouts

## Test Files

```
tests/e2e/
├── 01-homepage-blog-listing.spec.js    # Homepage and blog tests
├── 02-blog-post-rendering.spec.js      # Individual post tests
├── 03-tag-filtering.spec.js            # Tag functionality tests
├── 04-contact-form-validation.spec.js  # Form validation tests
└── 05-responsive-design.spec.js        # Responsive layout tests
```

## Understanding Test Results

### When tests pass ✅
```
Running 45 tests using 5 workers
  45 passed (2m)
```
All good! Your app is working as expected.

### When tests fail ❌
```
  1) [chromium] › 01-homepage-blog-listing.spec.js:10:3 › should load homepage
     Timeout exceeded while waiting for locator('.container')
```

Playwright will:
- Take a screenshot of the failure
- Record a video of the test
- Show you the exact line that failed

View the HTML report to see details:
```bash
npm run test:report
```

## Common Scenarios

### Scenario 1: Quick verification before committing
```bash
# Run just the essential tests on Chromium
npx playwright test --project=chromium
```

### Scenario 2: Testing a specific feature
```bash
# Test only the contact form
npx playwright test tests/e2e/04-contact-form-validation.spec.js --headed
```

### Scenario 3: Mobile testing
```bash
# Test on mobile devices only
npx playwright test --project="Mobile Chrome" --project="Mobile Safari"
```

### Scenario 4: Debugging a failing test
```bash
# Run with UI mode for interactive debugging
npm run test:ui
```

## Troubleshooting Quick Fixes

### Problem: Port already in use
**Solution:**
```bash
# Kill process on port 8001
lsof -ti :8001 | xargs kill -9
# Or use a different port
PORT=8002 npm run develop
```

### Problem: Tests timing out
**Solution:** Increase timeout in the test:
```javascript
test('slow test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  // ... rest of test
});
```

### Problem: Can't find element
**Solution:** Add debug screenshot:
```javascript
await page.screenshot({ path: 'debug.png' });
await page.pause(); // Pauses execution
```

### Problem: Need to see what's happening
**Solution:** Run in headed mode:
```bash
npm run test:headed
```

## Understanding the Test Report

After running tests, open the HTML report:
```bash
npm run test:report
```

The report shows:
- ✅ Passed tests (green)
- ❌ Failed tests (red)
- ⚠️ Flaky tests (yellow)
- 📸 Screenshots on failure
- 🎥 Videos of failed tests
- 📊 Execution timeline

## Next Steps

1. **Read the full documentation**: See `tests/README.md`
2. **Write your own tests**: Follow the examples in existing test files
3. **Integrate with CI/CD**: Add to your GitHub Actions or CI pipeline
4. **Customize configuration**: Edit `playwright.config.js`

## Tips for Success

1. **Start simple**: Run one test file at a time when learning
2. **Use --headed mode**: See what's happening in the browser
3. **Use test.only()**: Focus on one test during development
   ```javascript
   test.only('this test will run', async ({ page }) => {
     // Only this test runs
   });
   ```
4. **Check the console**: Playwright logs are helpful for debugging
5. **Use page.pause()**: Stop execution to inspect the page
   ```javascript
   await page.pause(); // Execution pauses here
   ```

## Example Test Flow

```javascript
const { test, expect } = require('@playwright/test');

test('example test', async ({ page }) => {
  // 1. Navigate to page
  await page.goto('/');

  // 2. Interact with elements
  await page.click('text=Blog');

  // 3. Assert expectations
  await expect(page).toHaveURL('/blog');
  await expect(page.locator('h1')).toBeVisible();
});
```

## Getting Help

- 📚 Full docs: `tests/README.md`
- 🌐 Playwright docs: https://playwright.dev/
- 🐛 Issues: Open an issue on GitHub
- 💬 Questions: Ask in the project discussions

Happy Testing! 🎭
