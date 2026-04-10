import { test, expect } from '@playwright/test';

const pages = [
	{ path: '/', name: 'home' },
	{ path: '/about', name: 'about' },
	{ path: '/notebook', name: 'notebook' },
	{ path: '/now', name: 'now' },
	{ path: '/uses', name: 'uses' },
	{ path: '/cv', name: 'cv' },
	{ path: '/changelog', name: 'changelog' }
];

test.describe('Visual Regression - Desktop', () => {
	test.use({ viewport: { width: 1280, height: 720 } });

	for (const { path, name } of pages) {
		test(`${name} page matches snapshot`, async ({ page }) => {
			await page.goto(path);
			await page.waitForLoadState('networkidle');

			await expect(page).toHaveScreenshot(`${name}-desktop.png`, {
				fullPage: true,
				maxDiffPixelRatio: 0.01
			});
		});
	}
});

test.describe('Visual Regression - Mobile', () => {
	test.use({ viewport: { width: 375, height: 667 } });

	for (const { path, name } of pages) {
		test(`${name} page matches snapshot on mobile`, async ({ page }) => {
			await page.goto(path);
			await page.waitForLoadState('networkidle');

			await expect(page).toHaveScreenshot(`${name}-mobile.png`, {
				fullPage: true,
				maxDiffPixelRatio: 0.01
			});
		});
	}
});

test.describe('Component Visual Tests', () => {
	test.use({ viewport: { width: 1280, height: 720 } });

	test('header component', async ({ page }) => {
		await page.goto('/');
		const header = page.locator('header.topbar');
		await expect(header).toHaveScreenshot('header.png');
	});

	test('footer component', async ({ page }) => {
		await page.goto('/');
		const footer = page.locator('footer');
		if ((await footer.count()) > 0) {
			await expect(footer).toHaveScreenshot('footer.png');
		}
	});

	test('mobile menu open state', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto('/');

		await page.click('.hamburger');
		await page.waitForSelector('.mobile-overlay');

		await expect(page).toHaveScreenshot('mobile-menu-open.png');
	});
});

test.describe('Dark Mode Visual Tests', () => {
	test.use({ viewport: { width: 1280, height: 720 } });

	test('respects prefers-color-scheme: dark', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'dark' });
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		await expect(page).toHaveScreenshot('home-dark-mode.png', {
			fullPage: true,
			maxDiffPixelRatio: 0.01
		});
	});

	test('respects prefers-color-scheme: light', async ({ page }) => {
		await page.emulateMedia({ colorScheme: 'light' });
		await page.goto('/');
		await page.waitForLoadState('networkidle');

		await expect(page).toHaveScreenshot('home-light-mode.png', {
			fullPage: true,
			maxDiffPixelRatio: 0.01
		});
	});
});
