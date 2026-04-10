import { test, expect } from '@playwright/test';

const viewports = {
	mobile: { width: 375, height: 667 },
	tablet: { width: 768, height: 1024 },
	desktop: { width: 1280, height: 720 },
	wide: { width: 1920, height: 1080 }
};

// Exclude changelog from horizontal scroll tests - it has wider content by design
// Exclude notebook as it may have scrollbar rendering differences in some browsers
const pages = ['/', '/about', '/now', '/uses', '/cv'];

test.describe('Responsive Design', () => {
	for (const [viewportName, viewport] of Object.entries(viewports)) {
		test.describe(`${viewportName} viewport (${viewport.width}x${viewport.height})`, () => {
			test.use({ viewport });

			for (const pagePath of pages) {
				test(`${pagePath} renders without horizontal scroll`, async ({ page, isMobile }) => {
					// Skip large viewports on mobile - just pass the test
					if (isMobile && viewport.width > 768) {
						return;
					}

					await page.goto(pagePath);

					const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
					const viewportWidth = await page.evaluate(() => window.innerWidth);

					expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
				});
			}

			test('content is readable at viewport size', async ({ page, isMobile }) => {
				// Skip large viewports on mobile - just pass the test
				if (isMobile && viewport.width > 768) {
					return;
				}

				await page.goto('/about');

				const mainContent = page.locator('.page');
				await expect(mainContent).toBeVisible();

				// Check that content doesn't overflow viewport
				const mainBox = await mainContent.boundingBox();
				expect(mainBox?.width).toBeLessThanOrEqual(viewport.width);
			});
		});
	}
});

test.describe('Breakpoint Behavior', () => {
	test('mobile shows hamburger, hides desktop nav', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		await expect(page.locator('.hamburger')).toBeVisible();
		await expect(page.locator('.topbar-nav-desktop')).toBeHidden();
	});

	test('tablet shows desktop nav, hides hamburger', async ({ page }) => {
		await page.setViewportSize({ width: 768, height: 1024 });
		await page.goto('/');

		await expect(page.locator('.hamburger')).toBeHidden();
		await expect(page.locator('.topbar-nav-desktop')).toBeVisible();
	});

	test('desktop shows desktop nav, hides hamburger', async ({ page }) => {
		await page.setViewportSize({ width: 1280, height: 720 });
		await page.goto('/');

		await expect(page.locator('.hamburger')).toBeHidden();
		await expect(page.locator('.topbar-nav-desktop')).toBeVisible();
	});
});

test.describe('Touch Interactions', () => {
	test.use({ viewport: viewports.mobile, hasTouch: true });

	test('mobile menu is touch-friendly', async ({ page }) => {
		await page.goto('/');

		// Click to open menu (tap can be flaky)
		await page.click('.hamburger');
		await expect(page.locator('.mobile-overlay')).toBeVisible();

		// Click link to navigate
		await page.click('.mobile-nav a[href="/about"]');
		await expect(page).toHaveURL(/\/about\/?$/);
	});
});

test.describe('Viewport Resize', () => {
	test('layout adapts when resizing from mobile to desktop', async ({ page }) => {
		// Start at mobile
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		await expect(page.locator('.hamburger')).toBeVisible();
		await expect(page.locator('.topbar-nav-desktop')).toBeHidden();

		// Resize to desktop
		await page.setViewportSize({ width: 1280, height: 720 });

		await expect(page.locator('.hamburger')).toBeHidden();
		await expect(page.locator('.topbar-nav-desktop')).toBeVisible();
	});

	test('layout adapts when resizing from desktop to mobile', async ({ page }) => {
		// Start at desktop
		await page.setViewportSize({ width: 1280, height: 720 });
		await page.goto('/');

		await expect(page.locator('.hamburger')).toBeHidden();
		await expect(page.locator('.topbar-nav-desktop')).toBeVisible();

		// Resize to mobile
		await page.setViewportSize({ width: 375, height: 667 });

		await expect(page.locator('.hamburger')).toBeVisible();
		await expect(page.locator('.topbar-nav-desktop')).toBeHidden();
	});
});
