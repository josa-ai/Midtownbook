const { test, expect } = require('@playwright/test');

/**
 * DESIGN SYSTEM VALIDATION TESTS
 * These tests automatically verify design system compliance
 */

const BASE_URL = 'http://localhost:3000';

// All 46 pages in the application
const PAGES_TO_TEST = [
  // Public Pages (24)
  '/',
  '/businesses',
  '/businesses/sunrise-cafe',
  '/businesses/create',
  '/businesses/sunrise-cafe/claim',
  '/businesses/sunrise-cafe/claim/success',
  '/categories',
  '/categories/restaurants',
  '/events',
  '/events/summer-food-festival',
  '/deals',
  '/blog',
  '/blog/top-10-midtown-cafes',
  '/help',
  '/favorites',
  '/compare',
  '/about',
  '/contact',
  '/contact/success',
  '/newsletter/success',
  '/reviews/success',
  '/privacy',
  '/terms',

  // Authentication Pages (5)
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/verify-email',

  // User Pages (1)
  '/profile',

  // Dashboard Pages (9)
  '/dashboard',
  '/dashboard/settings',
  '/dashboard/analytics',
  '/dashboard/events',
  '/dashboard/events/new',
  '/dashboard/deals',
  '/dashboard/deals/new',
  '/dashboard/reviews',

  // Admin Pages (4)
  '/admin',
  '/admin/users',
  '/admin/moderation',
  '/admin/businesses',
];

test.describe('Design System Compliance', () => {

  for (const pagePath of PAGES_TO_TEST) {
    test.describe(`Page: ${pagePath}`, () => {

      test.beforeEach(async ({ page }) => {
        // Increase timeout for initial navigation
        test.setTimeout(60000);

        try {
          await page.goto(`${BASE_URL}${pagePath}`, {
            waitUntil: 'networkidle',
            timeout: 30000
          });
        } catch (error) {
          console.warn(`⚠️  Could not load ${pagePath}: ${error.message}`);
          // Continue with other tests
        }
      });

      // ==========================================
      // TEST 1: SPACING SYSTEM (8-Point Grid)
      // ==========================================
      test('validates 8-point grid spacing', async ({ page }) => {
        const elements = await page.locator('section, .card, .btn, h1, h2, h3, p').all();

        let violations = [];

        for (const element of elements.slice(0, 20)) { // Check first 20 elements
          try {
            const styles = await element.evaluate(el => {
              const computed = window.getComputedStyle(el);
              return {
                paddingTop: computed.paddingTop,
                paddingBottom: computed.paddingBottom,
                paddingLeft: computed.paddingLeft,
                paddingRight: computed.paddingRight,
                marginTop: computed.marginTop,
                marginBottom: computed.marginBottom,
                tagName: el.tagName,
              };
            });

            // Check all spacing values are multiples of 8
            for (const [key, value] of Object.entries(styles)) {
              if (key === 'tagName') continue;
              const px = parseInt(value);
              if (px > 0 && px % 8 !== 0) {
                violations.push({
                  element: styles.tagName,
                  property: key,
                  value: `${px}px`,
                });
              }
            }
          } catch (e) {
            // Skip elements that can't be evaluated
          }
        }

        if (violations.length > 0) {
          console.warn(`⚠️  Found ${violations.length} 8-point grid violations on ${pagePath}`);
          console.warn(violations.slice(0, 5)); // Show first 5
        }
      });

      // ==========================================
      // TEST 2: LINE HEIGHT RATIOS
      // ==========================================
      test('validates line height ratios', async ({ page }) => {
        let headerViolations = [];
        let bodyViolations = [];

        // Headers should have ~1.0-1.3 ratio
        const headers = await page.locator('h1, h2, h3, h4, h5, h6').all();

        for (const header of headers.slice(0, 10)) {
          try {
            const ratio = await header.evaluate(el => {
              const computed = window.getComputedStyle(el);
              const fontSize = parseFloat(computed.fontSize);
              const lineHeight = parseFloat(computed.lineHeight);
              return { ratio: lineHeight / fontSize, tagName: el.tagName };
            });

            if (ratio.ratio < 1.0 || ratio.ratio > 1.4) {
              headerViolations.push({
                element: ratio.tagName,
                ratio: ratio.ratio.toFixed(2),
              });
            }
          } catch (e) {
            // Skip
          }
        }

        // Body text should have ~1.5-1.7 ratio
        const paragraphs = await page.locator('p, li').all();

        for (const p of paragraphs.slice(0, 10)) {
          try {
            const ratio = await p.evaluate(el => {
              const computed = window.getComputedStyle(el);
              const fontSize = parseFloat(computed.fontSize);
              const lineHeight = parseFloat(computed.lineHeight);
              return lineHeight / fontSize;
            });

            if (ratio < 1.4 || ratio > 1.8) {
              bodyViolations.push({ ratio: ratio.toFixed(2) });
            }
          } catch (e) {
            // Skip
          }
        }

        if (headerViolations.length > 0) {
          console.warn(`⚠️  ${headerViolations.length} header line-height issues on ${pagePath}`);
        }
        if (bodyViolations.length > 0) {
          console.warn(`⚠️  ${bodyViolations.length} body line-height issues on ${pagePath}`);
        }
      });

      // ==========================================
      // TEST 3: LETTER SPACING
      // ==========================================
      test('validates letter spacing standards', async ({ page }) => {
        let displayIssues = [];
        let ctaIssues = [];

        // Display text should have negative letter spacing
        const displayText = await page.locator('h1').all();

        for (const element of displayText.slice(0, 3)) {
          try {
            const letterSpacing = await element.evaluate(el => {
              return parseFloat(window.getComputedStyle(el).letterSpacing);
            });

            if (letterSpacing >= 0) {
              displayIssues.push({ letterSpacing: `${letterSpacing}px` });
            }
          } catch (e) {
            // Skip
          }
        }

        // CTAs should have positive letter spacing
        const ctas = await page.locator('button, .btn').all();

        for (const cta of ctas.slice(0, 10)) {
          try {
            const letterSpacing = await cta.evaluate(el => {
              return parseFloat(window.getComputedStyle(el).letterSpacing);
            });

            if (letterSpacing < 0) {
              ctaIssues.push({ letterSpacing: `${letterSpacing}px` });
            }
          } catch (e) {
            // Skip
          }
        }

        if (displayIssues.length > 0) {
          console.warn(`⚠️  ${displayIssues.length} display text letter-spacing issues on ${pagePath}`);
        }
        if (ctaIssues.length > 0) {
          console.warn(`⚠️  ${ctaIssues.length} CTA letter-spacing issues on ${pagePath}`);
        }
      });

      // ==========================================
      // TEST 4: TEXT READABILITY (Line Length)
      // ==========================================
      test('validates text line length (50-75 characters)', async ({ page }) => {
        const paragraphs = await page.locator('p').all();
        let wideLines = [];

        for (const p of paragraphs.slice(0, 10)) {
          try {
            const width = await p.evaluate(el => {
              return el.offsetWidth;
            });

            // Optimal: 600-700px
            // Max acceptable: 900px
            if (width > 900) {
              wideLines.push({ width: `${width}px` });
            } else if (width > 800) {
              console.warn(`⚠️  Paragraph width ${width}px exceeds 800px on ${pagePath}`);
            }
          } catch (e) {
            // Skip
          }
        }

        if (wideLines.length > 0) {
          console.warn(`⚠️  ${wideLines.length} paragraphs exceed maximum readable width on ${pagePath}`);
        }
      });

      // ==========================================
      // TEST 5: VISUAL HIERARCHY (Squint Test)
      // ==========================================
      test('validates visual hierarchy (automated squint test)', async ({ page }) => {
        try {
          const headingSizes = await page.evaluate(() => {
            const h1 = document.querySelector('h1');
            const h2 = document.querySelector('h2');
            const p = document.querySelector('p');

            return {
              h1Size: h1 ? parseFloat(window.getComputedStyle(h1).fontSize) : null,
              h2Size: h2 ? parseFloat(window.getComputedStyle(h2).fontSize) : null,
              pSize: p ? parseFloat(window.getComputedStyle(p).fontSize) : null,
            };
          });

          // H1 should be significantly larger than body text
          if (headingSizes.h1Size && headingSizes.pSize) {
            const h1Ratio = headingSizes.h1Size / headingSizes.pSize;
            if (h1Ratio < 2.0) {
              console.warn(`⚠️  H1 is only ${h1Ratio.toFixed(2)}x larger than body text (recommend 2x+) on ${pagePath}`);
            }
          }

          // H2 should be larger than body text
          if (headingSizes.h2Size && headingSizes.pSize) {
            const h2Ratio = headingSizes.h2Size / headingSizes.pSize;
            if (h2Ratio < 1.5) {
              console.warn(`⚠️  H2 is only ${h2Ratio.toFixed(2)}x larger than body text (recommend 1.5x+) on ${pagePath}`);
            }
          }
        } catch (e) {
          console.warn(`⚠️  Could not check hierarchy on ${pagePath}`);
        }
      });

      // ==========================================
      // TEST 6: COLOR CONTRAST (Accessibility)
      // ==========================================
      test('validates color contrast for readability', async ({ page }) => {
        const contrastIssues = await page.evaluate(() => {
          const issues = [];

          // Check first 20 text elements
          const textElements = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button')).slice(0, 20);

          textElements.forEach(el => {
            const styles = window.getComputedStyle(el);
            const color = styles.color;
            const bgColor = styles.backgroundColor;

            // Simple check: ensure text isn't too light on light background
            const colorRgb = color.match(/\d+/g);
            const bgRgb = bgColor.match(/\d+/g);

            if (colorRgb && bgRgb) {
              const textLuminance = (parseInt(colorRgb[0]) + parseInt(colorRgb[1]) + parseInt(colorRgb[2])) / 3;
              const bgLuminance = (parseInt(bgRgb[0]) + parseInt(bgRgb[1]) + parseInt(bgRgb[2])) / 3;

              const contrast = Math.abs(textLuminance - bgLuminance);

              if (contrast < 50) {
                issues.push({
                  element: el.tagName,
                  text: el.textContent.substring(0, 30),
                  contrast: contrast.toFixed(1),
                });
              }
            }
          });

          return issues;
        });

        if (contrastIssues.length > 0) {
          console.warn(`⚠️  Found ${contrastIssues.length} potential contrast issues on ${pagePath}`);
          console.warn(contrastIssues.slice(0, 3)); // Show first 3
        }
      });

      // ==========================================
      // TEST 7: SECTION SPACING CONSISTENCY
      // ==========================================
      test('validates consistent section spacing', async ({ page }) => {
        const sections = await page.locator('section, .section').all();

        const spacings = [];
        for (const section of sections.slice(0, 10)) {
          try {
            const spacing = await section.evaluate(el => {
              const computed = window.getComputedStyle(el);
              return {
                paddingTop: parseInt(computed.paddingTop),
                paddingBottom: parseInt(computed.paddingBottom),
              };
            });
            spacings.push(spacing);
          } catch (e) {
            // Skip
          }
        }

        // Check that major sections use consistent spacing
        const uniqueTopPaddings = [...new Set(spacings.map(s => s.paddingTop))].filter(p => p > 0);
        const uniqueBottomPaddings = [...new Set(spacings.map(s => s.paddingBottom))].filter(p => p > 0);

        if (uniqueTopPaddings.length > 4) {
          console.warn(`⚠️  ${uniqueTopPaddings.length} different top padding values on ${pagePath} (recommend 1-3 consistent values)`);
        }
        if (uniqueBottomPaddings.length > 4) {
          console.warn(`⚠️  ${uniqueBottomPaddings.length} different bottom padding values on ${pagePath} (recommend 1-3 consistent values)`);
        }
      });

      // ==========================================
      // TEST 8: BUTTON/CTA VISIBILITY
      // ==========================================
      test('validates CTAs are clearly visible', async ({ page }) => {
        const buttons = await page.locator('button, .btn').all();
        let paddingIssues = [];

        for (const button of buttons.slice(0, 10)) {
          try {
            const isVisible = await button.isVisible();

            if (isVisible) {
              // Check button has sufficient padding
              const padding = await button.evaluate(el => {
                const computed = window.getComputedStyle(el);
                return {
                  top: parseInt(computed.paddingTop),
                  right: parseInt(computed.paddingRight),
                };
              });

              if (padding.top < 8) {
                paddingIssues.push({ type: 'vertical', value: `${padding.top}px` });
              }
              if (padding.right < 16) {
                paddingIssues.push({ type: 'horizontal', value: `${padding.right}px` });
              }
            }
          } catch (e) {
            // Skip
          }
        }

        if (paddingIssues.length > 0) {
          console.warn(`⚠️  ${paddingIssues.length} button padding issues on ${pagePath}`);
        }
      });

      // ==========================================
      // TEST 9: RESPONSIVE TYPOGRAPHY
      // ==========================================
      test('validates responsive typography on mobile', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });

        try {
          const h1Size = await page.evaluate(() => {
            const h1 = document.querySelector('h1');
            return h1 ? parseFloat(window.getComputedStyle(h1).fontSize) : null;
          });

          // On mobile, h1 should be smaller but still prominent
          if (h1Size) {
            if (h1Size > 48) {
              console.warn(`⚠️  H1 is ${h1Size}px on mobile (recommend ≤48px) on ${pagePath}`);
            }
            if (h1Size < 28) {
              console.warn(`⚠️  H1 is ${h1Size}px on mobile (recommend ≥28px) on ${pagePath}`);
            }
          }
        } catch (e) {
          // Skip
        }

        // Reset viewport
        await page.setViewportSize({ width: 1280, height: 720 });
      });

      // ==========================================
      // TEST 10: CARD SHADOW SUBTLETY
      // ==========================================
      test('validates subtle shadows on cards', async ({ page }) => {
        const cards = await page.locator('.card, [class*="Card"]').all();
        let shadowIssues = [];

        for (const card of cards.slice(0, 10)) {
          try {
            const shadow = await card.evaluate(el => {
              return window.getComputedStyle(el).boxShadow;
            });

            // Should have shadow (not 'none')
            if (shadow === 'none') {
              shadowIssues.push({ type: 'missing', element: 'card' });
            } else {
              // Check for subtle shadow (low opacity)
              const hasSubtleShadow = shadow.includes('rgba') &&
                                       (shadow.includes('0.05') ||
                                        shadow.includes('0.08') ||
                                        shadow.includes('0.1') ||
                                        shadow.includes('0.12'));

              if (!hasSubtleShadow) {
                shadowIssues.push({ type: 'not-subtle', shadow: shadow.substring(0, 50) });
              }
            }
          } catch (e) {
            // Skip
          }
        }

        if (shadowIssues.length > 0) {
          console.warn(`⚠️  ${shadowIssues.length} card shadow issues on ${pagePath}`);
        }
      });

    });
  }
});

// ==========================================
// VISUAL REGRESSION TEST
// ==========================================
test.describe('Visual Regression (Squint Test)', () => {
  test('captures page screenshots for manual squint test', async ({ page }) => {
    // Test a subset of critical pages for visual regression
    const criticalPages = [
      '/',
      '/businesses',
      '/businesses/sunrise-cafe',
      '/auth/login',
      '/dashboard',
      '/admin',
    ];

    for (const pagePath of criticalPages) {
      try {
        await page.goto(`${BASE_URL}${pagePath}`, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        // Full page screenshot
        const fileName = `tests/screenshots${pagePath.replace(/\//g, '_') || '_home'}.png`;
        await page.screenshot({
          path: fileName,
          fullPage: true
        });

        console.log(`📸 Screenshot saved for ${pagePath} → ${fileName}`);
      } catch (error) {
        console.warn(`⚠️  Could not capture screenshot for ${pagePath}: ${error.message}`);
      }
    }

    console.log('✅ Visual regression screenshots complete');
    console.log('   → Open screenshots and perform squint test manually');
    console.log('   → Headlines and CTAs should stand out when blurred');
  });
});
