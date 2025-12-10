# Playwright Tests - Quick Start Guide

## Run Tests (Step by Step)

### 1. Start the Dev Server
```bash
npm run develop
```
Wait for message: `You can now view rolwinreevan_gatsby_blog in the browser.`

### 2. Run All Tests
In a **new terminal window**:
```bash
npm test
```

### 3. View Results
```bash
npm run test:report
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run with visible browser |
| `npm run test:ui` | Interactive UI mode |
| `npm run test:debug` | Debug mode (step through) |
| `npm run test:chromium` | Run only Chromium tests |
| `npm run test:report` | View HTML report |

## Run Specific Test File

```bash
# Homepage tests only
npx playwright test e2e/homepage-blog-listing.spec.js

# Contact form tests only
npx playwright test e2e/contact-form.spec.js

# Responsive design tests only
npx playwright test e2e/responsive-design.spec.js
```

## Run Specific Browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit (Safari) only
npx playwright test --project=webkit

# Mobile Chrome
npx playwright test --project="Mobile Chrome"

# Mobile Safari
npx playwright test --project="Mobile Safari"
```

## Debug Failed Tests

```bash
# Run in headed mode to see what's happening
npm run test:headed

# Run in debug mode to step through
npm run test:debug

# Run specific test with debug
npx playwright test e2e/contact-form.spec.js --debug
```

## Common Issues & Solutions

### Issue: Port 8000 already in use
**Solution:**
```bash
# Kill existing process on port 8000
lsof -ti:8000 | xargs kill -9

# Restart dev server
npm run develop
```

### Issue: Tests timeout waiting for page
**Solution:**
- Ensure dev server is fully started (check http://localhost:8000)
- Wait 60 seconds after dev server starts
- Check for build errors in dev server output

### Issue: Sharp/vips errors
**Solution:**
```bash
# Install vips
brew install vips

# Rebuild sharp
npm rebuild sharp --legacy-peer-deps
```

### Issue: Tests fail intermittently
**Solution:**
```bash
# Run with retries
npx playwright test --retries=2

# Run with single worker (slower but more stable)
npx playwright test --workers=1
```

## Test File Overview

| File | Tests | What It Tests |
|------|-------|---------------|
| `homepage-blog-listing.spec.js` | 8 | Homepage, blog list, navigation |
| `blog-post-rendering.spec.js` | 10 | Individual blog posts, markdown, images |
| `tag-filtering.spec.js` | 12 | Tag pages, tag filtering |
| `contact-form.spec.js` | 11 | Contact form validation |
| `responsive-design.spec.js` | 19 | Mobile, tablet, desktop layouts |

**Total: 60 tests**

## Writing New Tests

Create a new test file in `e2e/`:

```javascript
const { test, expect } = require('@playwright/test');

test.describe('My New Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/my-page');
    await page.waitForLoadState('networkidle');

    // Your test assertions here
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

## CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
- name: Install dependencies
  run: npm install --legacy-peer-deps

- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npm test

- name: Upload test report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Tips & Best Practices

1. **Always wait for load state**: Use `await page.waitForLoadState('networkidle')` after navigation
2. **Use flexible selectors**: Prefer `page.locator('button:has-text("Submit")')` over `.ant-btn-primary`
3. **Screenshot on failure**: Already configured in `playwright.config.js`
4. **Keep tests independent**: Each test should work standalone
5. **Test user journeys**: Group related tests in describe blocks

## Getting Help

- Playwright Docs: https://playwright.dev
- Test Results: Check `test-results/` directory for screenshots
- HTML Report: Run `npm run test:report` for detailed results
- Debug Mode: Use `npm run test:debug` to step through tests
