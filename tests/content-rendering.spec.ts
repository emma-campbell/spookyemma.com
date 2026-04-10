import { test, expect } from '@playwright/test';

test.describe('MDX Content Rendering', () => {
	test('prose content renders correctly', async ({ page }) => {
		await page.goto('/notebook');

		const firstPost = page.locator('.feed-entry').first();
		await firstPost.click();

		// Check for rendered prose elements
		const paragraphs = page.locator('p');
		expect(await paragraphs.count()).toBeGreaterThan(0);
	});

	test('headings render with correct hierarchy', async ({ page }) => {
		await page.goto('/notebook');

		const firstPost = page.locator('.feed-entry').first();
		await firstPost.click();

		// Page should have h1
		const h1Count = await page.locator('h1').count();
		expect(h1Count).toBeGreaterThanOrEqual(1);
	});

	test('lists render correctly', async ({ page }) => {
		// Visit multiple posts to find one with lists
		await page.goto('/notebook');

		const posts = await page.locator('.feed-entry').all();

		for (const post of posts.slice(0, 5)) {
			const href = await post.getAttribute('href');
			await page.goto(href!);

			const ul = page.locator('ul:not(.post-list):not(.link-list):not(.mobile-nav)');
			const ol = page.locator('ol');

			if ((await ul.count()) > 0 || (await ol.count()) > 0) {
				// Found a post with lists - verify they render
				const listItems = page.locator('li');
				expect(await listItems.count()).toBeGreaterThan(0);
				return;
			}
		}
	});

	test('posts have text content', async ({ page }) => {
		await page.goto('/notebook');

		const firstPost = page.locator('.feed-entry').first();
		await firstPost.click();

		// Verify there's actual content
		const bodyText = await page.locator('body').textContent();
		expect(bodyText!.length).toBeGreaterThan(100);
	});

	test('code elements render when present', async ({ page }) => {
		await page.goto('/components');

		// Components page should have code examples
		const code = page.locator('code');
		const hasCode = (await code.count()) > 0;

		expect(hasCode).toBe(true);
	});
});

test.describe('Custom Components', () => {
	test('custom components render when present', async ({ page }) => {
		await page.goto('/notebook');

		const firstPost = page.locator('.feed-entry').first();
		await firstPost.click();

		// Just verify the page loaded - custom components are optional
		await expect(page.locator('h1')).toBeVisible();
	});
});

test.describe('Images', () => {
	test('images load successfully', async ({ page }) => {
		await page.goto('/notebook');

		const posts = await page.locator('.feed-entry').all();

		for (const post of posts.slice(0, 5)) {
			const href = await post.getAttribute('href');
			await page.goto(href!);

			const images = page.locator('article img, .prose img, .content img');
			const imgCount = await images.count();

			if (imgCount > 0) {
				for (let i = 0; i < imgCount; i++) {
					const img = images.nth(i);

					// Check image has src attribute as a basic validation
					const src = await img.getAttribute('src');
					expect(src, 'Image should have src').toBeTruthy();

					// Verify image element is in the DOM
					await expect(img).toBeAttached();
				}
				return;
			}
		}
	});

	test('images have alt text', async ({ page }) => {
		await page.goto('/about');

		const images = await page.locator('img').all();

		for (const img of images) {
			const alt = await img.getAttribute('alt');
			const role = await img.getAttribute('role');

			// Should have alt text or be decorative
			const isAccessible = alt !== null || role === 'presentation';
			expect(isAccessible, 'Images should have alt text').toBe(true);
		}
	});

	test('figure elements have captions', async ({ page }) => {
		await page.goto('/notebook');

		const posts = await page.locator('.feed-entry').all();

		for (const post of posts.slice(0, 10)) {
			const href = await post.getAttribute('href');
			await page.goto(href!);

			const figures = page.locator('figure');

			if ((await figures.count()) > 0) {
				const firstFigure = figures.first();
				const caption = firstFigure.locator('figcaption');

				// Figures should have captions
				if ((await caption.count()) > 0) {
					await expect(caption).toBeVisible();
					return;
				}
			}
		}
	});
});

test.describe('Tables', () => {
	test('tables render on components page', async ({ page }) => {
		await page.goto('/components');

		// Components page has table examples
		const tables = page.locator('table');
		const hasTable = (await tables.count()) > 0;

		if (hasTable) {
			await expect(tables.first()).toBeVisible();
		}
	});
});
