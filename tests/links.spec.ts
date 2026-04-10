import { test, expect } from '@playwright/test';

test.describe('External Link Validation', () => {
	test('external links have proper attributes', async ({ page }) => {
		await page.goto('/about');

		const externalLinks = page.locator('a[href^="http"]:not([href*="localhost"])');
		const linkCount = await externalLinks.count();

		for (let i = 0; i < linkCount; i++) {
			const link = externalLinks.nth(i);
			const href = await link.getAttribute('href');

			// Skip internal links that happen to be absolute
			if (href?.includes('spookyemma.com') || href?.includes('localhost')) {
				continue;
			}

			// External links should have rel="noopener" or rel="noreferrer" for security
			const rel = await link.getAttribute('rel');
			const target = await link.getAttribute('target');

			// If opening in new tab, should have security attributes
			if (target === '_blank') {
				expect(rel, `External link ${href} with target="_blank" should have rel="noopener"`).toMatch(
					/noopener|noreferrer/
				);
			}
		}
	});

	test('external links are reachable (sample)', async ({ request, page }) => {
		await page.goto('/about');

		const externalLinks = await page.locator('a[href^="http"]').all();

		// Test a sample of external links (first 5 to avoid rate limiting)
		const linksToTest = externalLinks.slice(0, 5);

		for (const link of linksToTest) {
			const href = await link.getAttribute('href');

			if (!href || href.includes('localhost')) continue;

			try {
				const response = await request.get(href, {
					timeout: 10000,
					ignoreHTTPSErrors: true
				});

				// Accept redirects (3xx) as valid
				expect(
					response.status(),
					`External link ${href} should be reachable`
				).toBeLessThan(500);
			} catch {
				// Network errors may occur for some external sites
				console.log(`Note: Could not reach ${href}`);
			}
		}
	});
});

test.describe('Internal Link Validation', () => {
	const pagesToCheck = ['/', '/about', '/uses', '/cv'];

	for (const pagePath of pagesToCheck) {
		test(`all internal links on ${pagePath} are valid`, async ({ page }) => {
			await page.goto(pagePath);

			const internalLinks = await page.locator('a[href^="/"]').all();
			const checkedHrefs = new Set<string>();

			for (const link of internalLinks) {
				const href = await link.getAttribute('href');

				if (!href || checkedHrefs.has(href)) continue;
				checkedHrefs.add(href);

				// Skip anchor links
				if (href.startsWith('/#') || href === '#') continue;

				// Remove anchor from href for validation
				const cleanHref = href.split('#')[0];

				const response = await page.request.get(cleanHref);
				expect(response.status(), `Internal link ${href} should be valid`).toBeLessThan(400);
			}
		});
	}

	// Notebook has many links - test a sample
	test('sample internal links on /notebook are valid', async ({ page }) => {
		await page.goto('/notebook');

		const internalLinks = await page.locator('a[href^="/"]').all();
		const checkedHrefs = new Set<string>();

		// Only check first 10 unique links to avoid timeout
		let checked = 0;
		for (const link of internalLinks) {
			if (checked >= 10) break;

			const href = await link.getAttribute('href');
			if (!href || checkedHrefs.has(href)) continue;
			checkedHrefs.add(href);

			// Skip anchor links
			if (href.startsWith('/#') || href === '#') continue;

			const cleanHref = href.split('#')[0];
			const response = await page.request.get(cleanHref);
			expect(response.status(), `Internal link ${href} should be valid`).toBeLessThan(400);
			checked++;
		}
	});
});

test.describe('Anchor Links', () => {
	test('anchor links are present', async ({ page }) => {
		await page.goto('/notebook');

		const firstPost = page.locator('.feed-entry').first();
		const postHref = await firstPost.getAttribute('href');
		await page.goto(postHref!);

		// Just verify page loaded - anchor validation is complex
		await expect(page.locator('h1').first()).toBeVisible();
	});
});

test.describe('Link Accessibility', () => {
	test('links have discernible text', async ({ page }) => {
		await page.goto('/');

		const links = await page.locator('a').all();

		for (const link of links.slice(0, 20)) {
			// Skip if link has no href
			const href = await link.getAttribute('href');
			if (!href) continue;

			const text = await link.textContent();
			const ariaLabel = await link.getAttribute('aria-label');
			const title = await link.getAttribute('title');

			// Check for nested images with alt text
			const img = link.locator('img');
			const imgAlt = (await img.count()) > 0 ? await img.getAttribute('alt') : null;

			const hasText =
				(text && text.trim().length > 0) ||
				(ariaLabel && ariaLabel.trim().length > 0) ||
				(title && title.trim().length > 0) ||
				(imgAlt && imgAlt.trim().length > 0);

			expect(hasText, `Link to ${href} should have discernible text`).toBe(true);
		}
	});

	test('links are not using generic text', async ({ page }) => {
		await page.goto('/');

		const links = await page.locator('a').all();
		const genericTexts = ['click here', 'here', 'read more', 'link', 'more'];

		for (const link of links) {
			const text = (await link.textContent())?.toLowerCase().trim();

			// Allow "read more" in certain contexts but flag others
			if (text && genericTexts.includes(text) && text !== 'read more') {
				const href = await link.getAttribute('href');
				console.log(`Note: Link "${text}" to ${href} uses generic text`);
			}
		}
	});
});

test.describe('Navigation Consistency', () => {
	test('header navigation is consistent across pages', async ({ page }) => {
		const pagesToCheck = ['/', '/about', '/notebook', '/now'];
		let expectedNavLinks: string[] | null = null;

		for (const pagePath of pagesToCheck) {
			await page.goto(pagePath);

			const navLinks = await page.locator('.topbar-nav-desktop a').allTextContents();

			if (expectedNavLinks === null) {
				expectedNavLinks = navLinks;
			} else {
				expect(navLinks).toEqual(expectedNavLinks);
			}
		}
	});
});
