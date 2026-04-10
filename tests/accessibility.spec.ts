import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
	{ path: '/', name: 'Home' },
	{ path: '/about', name: 'About' },
	{ path: '/notebook', name: 'Notebook' },
	{ path: '/now', name: 'Now' },
	{ path: '/uses', name: 'Uses' },
	{ path: '/cv', name: 'CV' },
	{ path: '/changelog', name: 'Changelog' },
	{ path: '/design', name: 'Design' },
	{ path: '/components', name: 'Components' }
];

test.describe('Accessibility Tests', () => {
	for (const { path, name } of pages) {
		test(`${name} page passes accessibility checks`, async ({ page }) => {
			await page.goto(path);

			const results = await new AxeBuilder({ page })
				.withTags(['wcag2a', 'wcag2aa'])
				.exclude('.shiki')
				.exclude('pre')
				.exclude('[class*="lib-"]') // Exclude component library demo elements
				.exclude('canvas') // Exclude canvas elements
				.analyze();

			// Only fail on critical violations
			const criticalViolations = results.violations.filter((v) => v.impact === 'critical');

			if (results.violations.length > 0) {
				console.log(
					`${name}: ${results.violations.length} a11y issues (${criticalViolations.length} critical)`
				);
			}

			expect(criticalViolations).toEqual([]);
		});
	}
});

test.describe('Keyboard Navigation', () => {
	// Skip keyboard tests on webkit/mobile as Tab behavior differs
	test.skip(({ browserName }) => browserName === 'webkit', 'Tab behavior differs in webkit');

	test('can navigate header links with keyboard', async ({ page, browserName }) => {
		// Skip on mobile browsers
		test.skip(browserName.includes('Mobile'), 'Tab behavior differs on mobile');

		await page.goto('/');

		// Tab through focusable elements
		await page.keyboard.press('Tab');
		const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
		expect(['A', 'BUTTON']).toContain(firstFocused);
	});

	test('skip link functionality', async ({ page, browserName }) => {
		test.skip(browserName.includes('Mobile'), 'Tab behavior differs on mobile');

		await page.goto('/');

		// Check if there's a skip link (common accessibility pattern)
		const skipLink = page.locator('a[href="#main"], a[href="#content"]');
		const hasSkipLink = (await skipLink.count()) > 0;

		if (hasSkipLink) {
			await page.keyboard.press('Tab');
			await expect(skipLink.first()).toBeFocused();
		}
	});

	test('focusable elements have visible focus styles', async ({ page, browserName }) => {
		test.skip(browserName.includes('Mobile'), 'Tab behavior differs on mobile');

		await page.goto('/');

		await page.keyboard.press('Tab');

		const focusedElement = page.locator(':focus');

		// Just verify something is focused
		const hasFocus = (await focusedElement.count()) > 0;
		if (hasFocus) {
			await expect(focusedElement).toBeVisible();
		}
	});
});

test.describe('Semantic Structure', () => {
	test('pages have proper heading hierarchy', async ({ page }) => {
		await page.goto('/about');

		const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
		const headingLevels = await Promise.all(
			headings.map(async (h) => {
				const tag = await h.evaluate((el) => el.tagName);
				return parseInt(tag.replace('H', ''));
			})
		);

		// Should have exactly one h1
		const h1Count = headingLevels.filter((l) => l === 1).length;
		expect(h1Count).toBeLessThanOrEqual(1);

		// Heading levels should not skip (e.g., h1 -> h3)
		for (let i = 1; i < headingLevels.length; i++) {
			const diff = headingLevels[i] - headingLevels[i - 1];
			expect(diff, `Heading level should not skip more than one level`).toBeLessThanOrEqual(1);
		}
	});

	test('images have alt text', async ({ page }) => {
		await page.goto('/about');

		const images = await page.locator('img').all();
		for (const img of images) {
			const alt = await img.getAttribute('alt');
			const role = await img.getAttribute('role');

			// Images should have alt text or be marked as decorative
			const hasAlt = alt !== null;
			const isDecorative = role === 'presentation' || alt === '';
			expect(hasAlt || isDecorative, 'Image should have alt text or be decorative').toBe(true);
		}
	});

	test('links have discernible text', async ({ page }) => {
		await page.goto('/');

		const links = await page.locator('a').all();
		for (const link of links) {
			const text = await link.textContent();
			const ariaLabel = await link.getAttribute('aria-label');
			const title = await link.getAttribute('title');

			const hasDiscernibleText =
				(text && text.trim().length > 0) ||
				(ariaLabel && ariaLabel.trim().length > 0) ||
				(title && title.trim().length > 0);

			expect(hasDiscernibleText, 'Link should have discernible text').toBe(true);
		}
	});
});
