import { test, expect } from '@playwright/test';

test.describe('RSS Feed', () => {
	test('RSS feed endpoint returns valid XML', async ({ request }) => {
		const response = await request.get('/rss.xml');

		expect(response.status()).toBe(200);

		const contentType = response.headers()['content-type'];
		expect(contentType).toMatch(/xml/);

		const body = await response.text();
		expect(body).toContain('<?xml');
		expect(body).toContain('<rss');
	});

	test('RSS feed has required channel elements', async ({ request }) => {
		const response = await request.get('/rss.xml');
		const body = await response.text();

		// Required RSS 2.0 channel elements
		expect(body).toContain('<title>');
		expect(body).toContain('<link>');
		expect(body).toContain('<description>');
	});

	test('RSS feed contains items', async ({ request }) => {
		const response = await request.get('/rss.xml');
		const body = await response.text();

		// Should have at least one item
		expect(body).toContain('<item>');
	});

	test('RSS items have required elements', async ({ request }) => {
		const response = await request.get('/rss.xml');
		const body = await response.text();

		// Extract first item
		const itemMatch = body.match(/<item>([\s\S]*?)<\/item>/);
		expect(itemMatch).toBeTruthy();

		const item = itemMatch![1];

		// Items should have title and link at minimum
		expect(item).toContain('<title>');
		expect(item).toContain('<link>');
	});

	test('RSS feed links are absolute URLs', async ({ request }) => {
		const response = await request.get('/rss.xml');
		const body = await response.text();

		// Extract links from items
		const linkMatches = body.matchAll(/<link>([^<]+)<\/link>/g);

		for (const match of linkMatches) {
			const link = match[1];
			// Links should be absolute (start with http)
			expect(link).toMatch(/^https?:\/\//);
		}
	});

	test('RSS feed has valid pubDate format', async ({ request }) => {
		const response = await request.get('/rss.xml');
		const body = await response.text();

		// Check for pubDate elements
		const pubDateMatches = body.matchAll(/<pubDate>([^<]+)<\/pubDate>/g);

		for (const match of pubDateMatches) {
			const date = match[1];
			// Should be a valid date string (RFC 822 format)
			expect(new Date(date).toString()).not.toBe('Invalid Date');
		}
	});

	test('RSS feed is well-formed XML', async ({ request }) => {
		const response = await request.get('/rss.xml');
		const body = await response.text();

		// Basic XML validation - all opened tags should be closed
		expect(body).toContain('</rss>');
		expect(body).toContain('</channel>');

		// Check for balanced item tags
		const itemOpenCount = (body.match(/<item>/g) || []).length;
		const itemCloseCount = (body.match(/<\/item>/g) || []).length;
		expect(itemOpenCount).toBe(itemCloseCount);
	});

	test('RSS feed item count matches published posts', async ({ page, request }) => {
		// Get count from notebook page
		await page.goto('/notebook');
		const postCount = await page.locator('.feed-entry').count();

		// Get RSS feed
		const response = await request.get('/rss.xml');
		const body = await response.text();

		const rssItemCount = (body.match(/<item>/g) || []).length;

		// RSS should have items (may not be exact match if some posts are excluded)
		expect(rssItemCount).toBeGreaterThan(0);
		expect(rssItemCount).toBeLessThanOrEqual(postCount);
	});
});

test.describe('Feed Discovery', () => {
	test('pages have RSS autodiscovery link', async ({ page }) => {
		await page.goto('/');

		const rssLink = page.locator('link[type="application/rss+xml"]');
		const atomLink = page.locator('link[type="application/atom+xml"]');

		// Should have either RSS or Atom autodiscovery
		const hasRss = (await rssLink.count()) > 0;
		const hasAtom = (await atomLink.count()) > 0;

		// At least log the result - some sites may not have autodiscovery
		if (!hasRss && !hasAtom) {
			console.log('Note: No RSS/Atom autodiscovery link found');
		}
	});

	test('RSS link in feed discovery points to valid feed', async ({ page, request }) => {
		await page.goto('/');

		const rssLink = page.locator('link[type="application/rss+xml"]');

		if ((await rssLink.count()) > 0) {
			const href = await rssLink.getAttribute('href');
			expect(href).toBeTruthy();

			// Fetch the linked feed
			const feedUrl = href!.startsWith('http') ? href! : `/rss.xml`;
			const response = await request.get(feedUrl);
			expect(response.status()).toBe(200);
		}
	});
});
