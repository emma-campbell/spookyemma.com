import { test, expect } from '@playwright/test';

test.describe('Desktop Navigation', () => {
	test.use({ viewport: { width: 1280, height: 720 } });

	test('site title links to home', async ({ page }) => {
		await page.goto('/about');
		await page.click('a.site-title');
		await expect(page).toHaveURL('/');
	});

	test('navigation links work correctly', async ({ page }) => {
		await page.goto('/');

		const navLinks = [
			{ href: '/notebook', label: 'notebook' },
			{ href: '/about', label: 'about' },
			{ href: '/now', label: 'now' },
			{ href: '/uses', label: 'uses' },
			{ href: '/changelog', label: 'changelog' }
		];

		for (const link of navLinks) {
			await page.click(`.topbar-nav-desktop a[href="${link.href}"]`);
			await expect(page).toHaveURL(new RegExp(`${link.href}/?$`));
		}
	});

	test('active nav link is highlighted', async ({ page }) => {
		await page.goto('/about');
		const activeLink = page.locator('.topbar-nav-desktop a.active');
		await expect(activeLink).toHaveAttribute('href', '/about');
	});

	test('hamburger menu is hidden on desktop', async ({ page }) => {
		await page.goto('/');
		const hamburger = page.locator('.hamburger');
		await expect(hamburger).toBeHidden();
	});
});

test.describe('Mobile Navigation', () => {
	test.use({ viewport: { width: 375, height: 667 } });

	test('hamburger menu is visible on mobile', async ({ page }) => {
		await page.goto('/');
		const hamburger = page.locator('.hamburger');
		await expect(hamburger).toBeVisible();
	});

	test('desktop nav is hidden on mobile', async ({ page }) => {
		await page.goto('/');
		const desktopNav = page.locator('.topbar-nav-desktop');
		await expect(desktopNav).toBeHidden();
	});

	test('mobile menu opens and closes', async ({ page }) => {
		await page.goto('/');

		const overlay = page.locator('.mobile-overlay');

		// Menu should not exist initially
		await expect(overlay).toHaveCount(0);

		// Open menu
		await page.click('.hamburger');
		await expect(overlay).toBeVisible();

		// Close menu by clicking hamburger (now showing ✕) - use force to bypass overlay
		await page.click('.hamburger', { force: true });
		await expect(overlay).toHaveCount(0);
	});

	test('mobile menu links navigate correctly', async ({ page }) => {
		await page.goto('/');

		await page.click('.hamburger');
		await page.click('.mobile-nav a[href="/about"]');

		await expect(page).toHaveURL(/\/about\/?$/);
		// Menu should close after navigation (element removed from DOM)
		const overlay = page.locator('.mobile-overlay');
		await expect(overlay).toHaveCount(0);
	});

	test('clicking overlay closes mobile menu', async ({ page }) => {
		await page.goto('/');

		await page.click('.hamburger');
		const overlay = page.locator('.mobile-overlay');
		await expect(overlay).toBeVisible();

		// Click overlay (outside nav)
		await overlay.click({ position: { x: 10, y: 10 } });
		await expect(overlay).toHaveCount(0);
	});
});

test.describe('Internal Link Validation', () => {
	test('all internal links on home page are valid', async ({ page }) => {
		await page.goto('/');

		const links = await page.locator('a[href^="/"]').all();
		const hrefs = await Promise.all(links.map((link) => link.getAttribute('href')));
		const uniqueHrefs = [...new Set(hrefs.filter(Boolean))];

		for (const href of uniqueHrefs) {
			const response = await page.request.get(href!);
			expect(response.status(), `Link ${href} should be valid`).toBeLessThan(400);
		}
	});
});
