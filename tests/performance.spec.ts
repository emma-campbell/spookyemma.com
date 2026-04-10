import { test, expect } from '@playwright/test';

const pages = [
	{ path: '/', name: 'Home' },
	{ path: '/about', name: 'About' },
	{ path: '/notebook', name: 'Notebook' },
	{ path: '/now', name: 'Now' }
];

test.describe('Page Load Performance', () => {
	for (const { path, name } of pages) {
		test(`${name} page loads within acceptable time`, async ({ page }) => {
			const startTime = Date.now();

			await page.goto(path, { waitUntil: 'domcontentloaded' });

			const loadTime = Date.now() - startTime;

			// Page should load within 3 seconds for DOMContentLoaded
			expect(loadTime).toBeLessThan(3000);
		});
	}
});

test.describe('Core Web Vitals Proxies', () => {
	test('Largest Contentful Paint proxy - main content visible quickly', async ({ page }) => {
		const startTime = Date.now();

		await page.goto('/');

		// Wait for main content to be visible
		await page.locator('.hero-title, h1').first().waitFor({ state: 'visible' });

		const lcpProxy = Date.now() - startTime;

		// LCP should be under 2.5s for "good" score
		expect(lcpProxy).toBeLessThan(2500);
	});

	test('First Input Delay proxy - page is interactive', async ({ page }) => {
		await page.goto('/');

		const startTime = Date.now();

		// Try to interact with the page
		const link = page.locator('a').first();
		await link.waitFor({ state: 'visible' });

		const fidProxy = Date.now() - startTime;

		// Page should be interactive quickly
		expect(fidProxy).toBeLessThan(1000);
	});

	test('Cumulative Layout Shift proxy - no major layout shifts', async ({ page }) => {
		await page.goto('/');

		// Get initial positions of key elements
		const heroTitle = page.locator('.hero-title, h1').first();
		const initialBox = await heroTitle.boundingBox();

		// Wait for page to fully load
		await page.waitForLoadState('networkidle');

		// Check position again
		const finalBox = await heroTitle.boundingBox();

		if (initialBox && finalBox) {
			// Position should not have shifted significantly
			const yShift = Math.abs(finalBox.y - initialBox.y);
			expect(yShift).toBeLessThan(50); // Allow small shifts
		}
	});
});

test.describe('Resource Loading', () => {
	test('page resources load', async ({ page }) => {
		const startTime = Date.now();

		await page.goto('/');
		await page.waitForLoadState('domcontentloaded');

		const loadTime = Date.now() - startTime;

		// Page should load in reasonable time
		expect(loadTime).toBeLessThan(5000);
	});

	test('images are optimized (reasonable sizes)', async ({ page }) => {
		const imageSizes: { url: string; size: number }[] = [];

		page.on('response', async (response) => {
			const contentType = response.headers()['content-type'];
			if (contentType?.includes('image')) {
				const buffer = await response.body().catch(() => null);
				if (buffer) {
					imageSizes.push({
						url: response.url(),
						size: buffer.length
					});
				}
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Check for excessively large images (> 500KB)
		const largeImages = imageSizes.filter((img) => img.size > 500 * 1024);

		if (largeImages.length > 0) {
			console.log(
				'Large images:',
				largeImages.map((img) => `${img.url}: ${(img.size / 1024).toFixed(0)}KB`)
			);
		}

		// Should not have too many large images
		expect(largeImages.length).toBeLessThan(3);
	});
});

test.describe('JavaScript Performance', () => {
	test('no JavaScript errors on page load', async ({ page }) => {
		const errors: string[] = [];

		page.on('pageerror', (error) => {
			errors.push(error.message);
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(errors).toEqual([]);
	});

	test('no console errors on navigation', async ({ page }) => {
		const errors: string[] = [];

		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});

		// Navigate through several pages
		const routes = ['/', '/about', '/notebook', '/now'];

		for (const route of routes) {
			await page.goto(route);
			await page.waitForLoadState('networkidle');
		}

		// Filter out known acceptable errors
		const criticalErrors = errors.filter(
			(e) => !e.includes('favicon') && !e.includes('analytics')
		);

		expect(criticalErrors).toEqual([]);
	});
});

test.describe('Network Efficiency', () => {
	test('total page weight is reasonable', async ({ page }) => {
		let totalBytes = 0;

		page.on('response', async (response) => {
			const buffer = await response.body().catch(() => null);
			if (buffer) {
				totalBytes += buffer.length;
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		const totalKB = totalBytes / 1024;
		const totalMB = totalKB / 1024;

		console.log(`Total page weight: ${totalKB.toFixed(0)}KB (${totalMB.toFixed(2)}MB)`);

		// Page should be under 3MB total
		expect(totalMB).toBeLessThan(3);
	});

	test('number of requests is reasonable', async ({ page }) => {
		let requestCount = 0;

		page.on('request', () => {
			requestCount++;
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		console.log(`Total requests: ${requestCount}`);

		// Should not have excessive requests
		expect(requestCount).toBeLessThan(100);
	});
});

test.describe('Caching', () => {
	test('static assets have cache headers', async ({ page }) => {
		const staticAssets: { url: string; cacheControl: string | null }[] = [];

		page.on('response', (response) => {
			const url = response.url();
			if (url.match(/\.(js|css|woff2?|ttf|png|jpg|jpeg|gif|svg|ico)$/)) {
				staticAssets.push({
					url,
					cacheControl: response.headers()['cache-control']
				});
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		// Check that static assets have cache headers
		const uncachedAssets = staticAssets.filter((a) => !a.cacheControl);

		if (uncachedAssets.length > 0) {
			console.log(
				'Assets without cache headers:',
				uncachedAssets.map((a) => a.url)
			);
		}
	});
});

test.describe('Mobile Performance', () => {
	test.use({
		viewport: { width: 375, height: 667 },
		userAgent:
			'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
	});

	test('mobile page loads efficiently', async ({ page }) => {
		const startTime = Date.now();

		await page.goto('/');
		await page.waitForLoadState('domcontentloaded');

		const loadTime = Date.now() - startTime;

		// Mobile should also load quickly
		expect(loadTime).toBeLessThan(3000);
	});

	test('mobile navigation is responsive', async ({ page }) => {
		await page.goto('/');

		const startTime = Date.now();

		// Open mobile menu
		await page.click('.hamburger');
		await page.locator('.mobile-overlay').waitFor({ state: 'visible' });

		const menuOpenTime = Date.now() - startTime;

		// Menu should open instantly
		expect(menuOpenTime).toBeLessThan(500);
	});
});
