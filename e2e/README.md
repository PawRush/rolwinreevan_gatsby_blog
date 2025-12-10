# Playwright E2E Test Suite for Rolwin Gatsby Blog

This directory contains comprehensive end-to-end tests for the Gatsby blog using Playwright.

## Test Coverage

### 1. Homepage and Blog Listing (`homepage-blog-listing.spec.js`)
Tests the main homepage and blog listing functionality:
- Homepage loads successfully
- About Me section is displayed
- Navigation to blog page works
- Blog posts are displayed in the listing
- Blog post titles and excerpts are visible
- Navigation links function correctly
- Blog posts can be clicked to view details
- Blog metadata (dates, tags) is displayed

### 2. Individual Blog Post Rendering (`blog-post-rendering.spec.js`)
Tests individual blog post pages:
- Blog posts render correctly
- Post titles are displayed
- Cover images load properly
- Blog content/body renders correctly
- Markdown content is converted to HTML properly
- Syntax highlighting works for code blocks
- Post metadata (date, author) is shown
- Page structure is correct
- Navigation back to blog list works
- Comments section or related posts are present

### 3. Tag Filtering Functionality (`tag-filtering.spec.js`)
Tests the tag-based filtering system:
- Tags page loads correctly
- Tag cards are displayed
- Available tags (JavaScript, React, etc.) are shown
- Clicking on a tag navigates to filtered posts
- Tag-specific pages display correct content
- Tag descriptions are shown
- Tag banner images load
- Posts are filtered correctly by tag
- Tag colors are applied correctly
- Navigation between tag pages works

### 4. Contact Form Validation (`contact-form.spec.js`)
Tests the contact form functionality:
- Contact page loads
- Form is displayed
- All form fields are present (name, email, description)
- Empty form submission shows validation errors
- Required name field validation works
- Email format validation works
- Required description field validation works
- Valid form data is accepted
- Contact image/illustration is displayed
- Form has proper layout and styling
- Field labels/placeholders are present
- Form has responsive layout

### 5. Responsive Design (`responsive-design.spec.js`)
Tests responsive behavior across different devices:
- **Desktop viewport (1920x1080)**: Proper display, sidebar visible
- **Tablet viewport (768x1024)**: Content adapts, blog grid adjusts, form displays properly
- **Mobile viewport (375x667)**:
  - Content displays correctly
  - Blog posts stack vertically
  - Mobile navigation works
  - Sidebar behavior adapts
  - Form is usable
  - Images scale properly
  - Tags display correctly
- **Orientation changes**: Landscape orientation handling
- **Touch interactions**: Touch navigation and form interactions
- **Responsive images**: Appropriate image sizes load
- **Content reflow**: Content adapts when resizing viewport
- **Typography scaling**: Text remains readable on small screens

## Running the Tests

### Run all tests
```bash
npm test
```

### Run tests with visible browser
```bash
npm run test:headed
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests only on Chromium
```bash
npm run test:chromium
```

### View test report
```bash
npm run test:report
```

## Configuration

Tests are configured in `playwright.config.js` in the root directory. The configuration includes:
- Multiple browser projects (Chromium, Firefox, WebKit)
- Mobile device testing (Pixel 5, iPhone 12)
- Automatic dev server startup
- Screenshot on failure
- Trace on first retry

## Test Structure

Each test file follows this structure:
- `test.describe()`: Groups related tests
- `test()`: Individual test cases
- Assertions use `expect()` from Playwright
- Tests wait for network idle state before assertions
- Tests are resilient to minor layout changes

## Prerequisites

- Node.js installed
- Dependencies installed (`npm install`)
- Playwright browsers installed (`npx playwright install`)

## Notes

- The dev server must be running on `http://localhost:8000` for tests to pass
- Tests use the `--legacy-peer-deps` flag due to package version conflicts
- The Google Analytics plugin is temporarily disabled in the config to allow dev server to start without GA_TRACKING_ID
- Tests are designed to be maintainable and resilient to minor UI changes

## Coverage Summary

Total test files: 5
Approximate total test cases: 70+

The test suite provides comprehensive coverage of:
- Core functionality (navigation, content display)
- User interactions (forms, links, buttons)
- Responsive design (desktop, tablet, mobile)
- Accessibility considerations (proper HTML structure)
- Visual elements (images, styling, layout)
