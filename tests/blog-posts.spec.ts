import { test, expect } from '@playwright/test';

test.describe('Blog Post Pages', () => {
	test('individual blog post loads and renders correctly', async ({ page }) => {
		// First get a list of posts from the notebook page
		await page.goto('/notebook');

		// Get the first post link
		const firstPostLink = page.locator('.feed-entry').first();
		const postHref = await firstPostLink.getAttribute('href');

		expect(postHref).toBeTruthy();

		// Navigate to the post
		await page.goto(postHref!);

		// Verify key elements are present
		await expect(page.locator('.page')).toBeVisible();
		await expect(page.locator('h1')).toBeVisible();
	});

	test('blog post has article structure', async ({ page }) => {
		await page.goto('/notebook');

		const firstPostLink = page.locator('.feed-entry').first();
		const postHref = await firstPostLink.getAttribute('href');
		await page.goto(postHref!);

		// Check for prose content
		const prose = page.locator('.prose, article, [class*="content"]');
		await expect(prose.first()).toBeVisible();
	});

	test('blog post navigation works', async ({ page, isMobile }) => {
		await page.goto('/notebook');

		// Click first post
		await page.locator('.feed-entry').first().click();
		await page.waitForLoadState('networkidle');

		// Should be on a post page
		await expect(page).toHaveURL(/\/notebook\/.+/);

		// Navigate back via breadcrumb or nav (may need to open mobile menu)
		if (isMobile) {
			// On mobile, use browser back or verify we can navigate
			await page.goBack();
			await expect(page).toHaveURL(/\/notebook\/?$/);
		} else {
			const backLink = page.locator('a[href="/notebook"]').first();
			if ((await backLink.count()) > 0 && (await backLink.isVisible())) {
				await backLink.click();
				await expect(page).toHaveURL(/\/notebook\/?$/);
			}
		}
	});

	test('multiple posts load correctly', async ({ page }) => {
		await page.goto('/notebook');

		// Get first 3 post hrefs
		const postHrefs: string[] = [];
		const entries = page.locator('.feed-entry');
		const count = Math.min(3, await entries.count());

		for (let i = 0; i < count; i++) {
			const href = await entries.nth(i).getAttribute('href');
			if (href) postHrefs.push(href);
		}

		for (const href of postHrefs) {
			const response = await page.goto(href);
			expect(response?.status()).toBeLessThan(400);
		}
	});

	test('post metadata is displayed', async ({ page }) => {
		await page.goto('/notebook');

		const firstPostLink = page.locator('.feed-entry').first();
		const postHref = await firstPostLink.getAttribute('href');
		await page.goto(postHref!);

		// Check for common metadata elements (date, tags, etc.)
		const metaElements = page.locator('[class*="meta"], [class*="date"], [class*="tag"]');
		const hasMetadata = (await metaElements.count()) > 0;
		expect(hasMetadata).toBe(true);
	});
});

test.describe('Blog Post Content Rendering', () => {
	test('posts render content', async ({ page }) => {
		await page.goto('/notebook');

		const firstPost = page.locator('.feed-entry').first();
		await firstPost.click();

		// Verify content is rendered
		await expect(page.locator('h1').first()).toBeVisible();
	});

	test('internal links in posts are valid', async ({ page }) => {
		await page.goto('/notebook');

		const firstPostLink = page.locator('.feed-entry').first();
		const postHref = await firstPostLink.getAttribute('href');
		await page.goto(postHref!);

		// Check a sample of internal links
		const internalLinks = await page.locator('a[href^="/"]').all();
		for (const link of internalLinks.slice(0, 5)) {
			const href = await link.getAttribute('href');
			if (href && !href.includes('#')) {
				const response = await page.request.get(href);
				expect(response.status(), `Link ${href} should be valid`).toBeLessThan(400);
			}
		}
	});
});
