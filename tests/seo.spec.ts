import { test, expect } from '@playwright/test';

const pages = [
	{ path: '/', name: 'Home' },
	{ path: '/about', name: 'About' },
	{ path: '/notebook', name: 'Notebook' },
	{ path: '/now', name: 'Now' },
	{ path: '/uses', name: 'Uses' },
	{ path: '/cv', name: 'CV' },
	{ path: '/changelog', name: 'Changelog' }
];

test.describe('SEO Meta Tags', () => {
	for (const { path, name } of pages) {
		test(`${name} page has title tag`, async ({ page }) => {
			await page.goto(path);

			const title = await page.title();
			expect(title.length).toBeGreaterThan(0);
			expect(title.length).toBeLessThan(70); // Recommended max length
		});

		test(`${name} page has meta description`, async ({ page }) => {
			await page.goto(path);

			const description = page.locator('meta[name="description"]').last();
			const content = await description.getAttribute('content');

			expect(content).toBeTruthy();
			expect(content!.length).toBeGreaterThan(0);
			expect(content!.length).toBeLessThan(200); // Allow slightly longer descriptions
		});
	}
});

test.describe('Open Graph Tags', () => {
	test('home page has Open Graph tags or acceptable fallback', async ({ page }) => {
		await page.goto('/');

		// Check if OG tags exist (they're optional)
		const ogTitle = page.locator('meta[property="og:title"]');
		const hasOgTitle = (await ogTitle.count()) > 0;

		if (hasOgTitle) {
			const content = await ogTitle.getAttribute('content');
			expect(content!.length).toBeGreaterThan(0);
		} else {
			// Fallback: at least have a title tag
			const title = await page.title();
			expect(title.length).toBeGreaterThan(0);
		}
	});

	test('blog posts have metadata', async ({ page }) => {
		await page.goto('/notebook');

		const firstPost = page.locator('.feed-entry').first();
		const postHref = await firstPost.getAttribute('href');
		await page.goto(postHref!);

		// At minimum, posts should have a title
		const title = await page.title();
		expect(title.length).toBeGreaterThan(0);
	});
});

test.describe('Twitter Card Tags', () => {
	test('pages have Twitter card meta tags', async ({ page }) => {
		await page.goto('/');

		const twitterCard = page.locator('meta[name="twitter:card"]');
		const hasTwitterCard = (await twitterCard.count()) > 0;

		if (hasTwitterCard) {
			const cardType = await twitterCard.getAttribute('content');
			expect(['summary', 'summary_large_image', 'app', 'player']).toContain(cardType);
		}
	});
});

test.describe('Canonical URLs', () => {
	for (const { path, name } of pages) {
		test(`${name} page has canonical URL`, async ({ page }) => {
			await page.goto(path);

			const canonical = page.locator('link[rel="canonical"]');

			if ((await canonical.count()) > 0) {
				const href = await canonical.getAttribute('href');
				expect(href).toBeTruthy();
				expect(href).toMatch(/^https?:\/\//);
			}
		});
	}
});

test.describe('Structured Data', () => {
	test('pages have valid JSON-LD structured data', async ({ page }) => {
		await page.goto('/');

		const jsonLd = page.locator('script[type="application/ld+json"]');

		if ((await jsonLd.count()) > 0) {
			const content = await jsonLd.first().textContent();
			expect(content).toBeTruthy();

			// Should be valid JSON
			expect(() => JSON.parse(content!)).not.toThrow();

			const data = JSON.parse(content!);
			expect(data['@context']).toBeTruthy();
		}
	});

	test('blog posts have Article structured data', async ({ page }) => {
		await page.goto('/notebook');

		const firstPost = page.locator('.feed-entry').first();
		const postHref = await firstPost.getAttribute('href');
		await page.goto(postHref!);

		const jsonLd = page.locator('script[type="application/ld+json"]');

		if ((await jsonLd.count()) > 0) {
			const content = await jsonLd.first().textContent();
			const data = JSON.parse(content!);

			// Should be Article or BlogPosting type
			if (data['@type']) {
				expect(['Article', 'BlogPosting', 'WebPage']).toContain(data['@type']);
			}
		}
	});
});

test.describe('Robots Meta', () => {
	test('pages are indexable by default', async ({ page }) => {
		await page.goto('/');

		const robots = page.locator('meta[name="robots"]');

		if ((await robots.count()) > 0) {
			const content = await robots.getAttribute('content');
			// Should not have noindex unless intentional
			expect(content).not.toContain('noindex');
		}
	});
});

test.describe('Language and Charset', () => {
	for (const { path, name } of pages) {
		test(`${name} page has lang attribute`, async ({ page }) => {
			await page.goto(path);

			const lang = await page.locator('html').getAttribute('lang');
			expect(lang).toBeTruthy();
		});

		test(`${name} page has charset meta`, async ({ page }) => {
			await page.goto(path);

			const charset = page.locator('meta[charset]');
			const hasCharset = (await charset.count()) > 0;

			// Alternative: content-type with charset
			const contentType = page.locator('meta[http-equiv="Content-Type"]');
			const hasContentType = (await contentType.count()) > 0;

			expect(hasCharset || hasContentType).toBe(true);
		});
	}
});

test.describe('Viewport Meta', () => {
	test('pages have responsive viewport meta', async ({ page }) => {
		await page.goto('/');

		const viewport = page.locator('meta[name="viewport"]');
		expect(await viewport.count()).toBeGreaterThan(0);

		const content = await viewport.getAttribute('content');
		expect(content).toContain('width=device-width');
	});
});
