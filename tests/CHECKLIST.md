# Playwright Test Suite - Execution Checklist

Quick checklist to run and verify the Playwright test suite.

## Pre-Flight Checklist

### First Time Setup (One-time only)
- [ ] Node.js v14+ installed
- [ ] npm installed
- [ ] Repository cloned
- [ ] In project directory: `/Volumes/workplace/AWSDeployAgentScripts/repos/rolwinreevan_gatsby_blog`

### Installation Steps
- [ ] Run `npm install --legacy-peer-deps`
- [ ] Run `npx playwright install`
- [ ] Verify `package.json` has test scripts

## Running Tests - Quick Guide

### Option 1: Let Playwright Start the Server (Recommended)
```bash
# Playwright will automatically start dev server
npm test
```

**What happens:**
1. Playwright reads `playwright.config.js`
2. Starts Gatsby dev server on port 8001
3. Waits for server to be ready
4. Runs all tests
5. Stops server when done

### Option 2: Manual Server Start
```bash
# Terminal 1: Start dev server
npm run develop

# Terminal 2: Run tests (after server starts)
npm test
```

## Test Execution Checklist

### Before Running Tests
- [ ] No other process using port 8001
- [ ] Sufficient disk space for test results
- [ ] Stable internet connection (for CDN resources)

### Running All Tests
- [ ] Run: `npm test`
- [ ] Wait for completion (2-5 minutes)
- [ ] Check console output for pass/fail

### Running Specific Tests
- [ ] Homepage tests: `npx playwright test tests/e2e/01-homepage-blog-listing.spec.js`
- [ ] Blog post tests: `npx playwright test tests/e2e/02-blog-post-rendering.spec.js`
- [ ] Tag tests: `npx playwright test tests/e2e/03-tag-filtering.spec.js`
- [ ] Form tests: `npx playwright test tests/e2e/04-contact-form-validation.spec.js`
- [ ] Responsive tests: `npx playwright test tests/e2e/05-responsive-design.spec.js`

### Running Tests by Browser
- [ ] Chromium only: `npm run test:chromium`
- [ ] Firefox only: `npx playwright test --project=firefox`
- [ ] WebKit only: `npx playwright test --project=webkit`
- [ ] Mobile Chrome: `npx playwright test --project="Mobile Chrome"`
- [ ] Mobile Safari: `npx playwright test --project="Mobile Safari"`

## Verification Checklist

### After Tests Complete
- [ ] Check console output for summary
- [ ] Note number of passed tests
- [ ] Note number of failed tests (if any)
- [ ] Check test duration

### Review Test Reports
- [ ] Run: `npm run test:report`
- [ ] HTML report opens in browser
- [ ] Review test results
- [ ] Check screenshots (if failures)
- [ ] Review videos (if failures)

### Expected Results
- [ ] ~60 tests total
- [ ] Tests run on 6 browser configurations
- [ ] All tests pass (green checkmarks)
- [ ] Test results saved in `test-results/`

## Debugging Checklist

### If Tests Fail
- [ ] Check error message in console
- [ ] Open HTML report: `npm run test:report`
- [ ] View screenshot of failure
- [ ] Watch video of test execution
- [ ] Check if dev server was running
- [ ] Verify port 8001 is available

### Debug Commands
- [ ] UI Mode: `npm run test:ui` (interactive)
- [ ] Headed Mode: `npm run test:headed` (see browser)
- [ ] Debug Mode: `npm run test:debug` (step-through)
- [ ] Single test: `npx playwright test -g "test name"`

### Common Issues Resolution
- [ ] Port in use? → `lsof -ti :8001 | xargs kill -9`
- [ ] Timeout? → Increase in playwright.config.js
- [ ] Element not found? → Check selectors
- [ ] Slow tests? → Reduce workers or run specific browser

## Test Results Checklist

### Files Generated
- [ ] `test-results/html/index.html` - HTML report
- [ ] `test-results/results.json` - JSON results
- [ ] `test-results/[test-name]/` - Screenshots/videos

### Review Reports
- [ ] Open HTML report
- [ ] Verify all tests passed
- [ ] Check execution time
- [ ] Review any warnings
- [ ] Check browser compatibility

## CI/CD Integration Checklist

### GitHub Actions Setup
- [ ] Create `.github/workflows/tests.yml`
- [ ] Add Playwright installation step
- [ ] Add test execution step
- [ ] Add artifact upload for reports
- [ ] Test the workflow

### Environment Variables
- [ ] `BASE_URL` set if different from default
- [ ] `CI=true` for CI environment
- [ ] Secrets configured (if needed)

## Maintenance Checklist

### Regular Maintenance
- [ ] Update Playwright: `npm install -D @playwright/test@latest`
- [ ] Update browsers: `npx playwright install`
- [ ] Review and update tests for new features
- [ ] Check for deprecated patterns

### Before Commits
- [ ] Run relevant tests
- [ ] Ensure tests pass
- [ ] Update tests if needed
- [ ] Commit test results documentation

## Quick Commands Reference

```bash
# Essential Commands
npm test                      # Run all tests
npm run test:ui               # Interactive UI mode
npm run test:headed           # See browser
npm run test:report           # View HTML report

# Specific Tests
npx playwright test tests/e2e/01-homepage-blog-listing.spec.js
npx playwright test -g "homepage"

# Specific Browser
npm run test:chromium
npx playwright test --project=firefox

# Debug
npm run test:debug
PWDEBUG=1 npx playwright test

# Development Server
npm run develop               # Start Gatsby dev server
```

## Success Criteria

### Tests Pass If:
- ✅ All pages load correctly
- ✅ Navigation works
- ✅ Blog posts display
- ✅ Tags filter properly
- ✅ Contact form validates
- ✅ Responsive design works
- ✅ SEO meta tags present
- ✅ No console errors

### Test Suite Quality:
- ✅ 60+ tests covering all features
- ✅ Tests on 6 browser configurations
- ✅ 5 viewport sizes tested
- ✅ Comprehensive documentation
- ✅ Helper utilities included
- ✅ CI/CD ready

## Final Verification

- [ ] All tests run successfully
- [ ] HTML report generated
- [ ] No critical failures
- [ ] Documentation reviewed
- [ ] Ready for deployment

## Next Steps After Verification

1. [ ] Integrate into CI/CD pipeline
2. [ ] Set up automated test runs
3. [ ] Configure notifications for failures
4. [ ] Add to deployment checklist
5. [ ] Train team on running tests

## Support

If you need help:
1. Check `tests/README.md` for detailed documentation
2. Review `tests/QUICKSTART.md` for quick start
3. See `TESTING.md` for overview
4. Visit [Playwright Docs](https://playwright.dev/)
5. Open an issue on GitHub

---

## Quick Start (TL;DR)

```bash
# Install and run tests in 3 commands:
npm install --legacy-peer-deps
npx playwright install
npm test
```

**That's it!** Tests will run automatically.

---

**Status**: ✅ Ready to use
**Last Updated**: December 10, 2025
