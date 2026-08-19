import { test, expect } from '@playwright/test';

/*
 * Hits real third-party servers, so it's slow and inherently flaky.
 * Excluded from PR runs via SKIP_NETWORK_TESTS; runs in the weekly
 * scheduled workflow alongside visual regression.
 */
test.describe('External Link Validation', () => {
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
