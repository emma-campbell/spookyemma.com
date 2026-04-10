import { test, expect } from '@playwright/test';

test.describe('Page Load Tests', () => {
	test('home page loads successfully', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveTitle(/Emma Campbell/i);
		await expect(page.locator('.page')).toBeVisible();
		await expect(page.locator('.hero-title')).toBeVisible();
	});

	test('about page loads successfully', async ({ page }) => {
		await page.goto('/about');
		await expect(page.locator('.page')).toBeVisible();
		await expect(page.locator('h1')).toBeVisible();
	});

	test('notebook page loads successfully', async ({ page }) => {
		await page.goto('/notebook');
		await expect(page.locator('.page')).toBeVisible();
	});

	test('now page loads successfully', async ({ page }) => {
		await page.goto('/now');
		await expect(page.locator('.page')).toBeVisible();
	});

	test('uses page loads successfully', async ({ page }) => {
		await page.goto('/uses');
		await expect(page.locator('.page')).toBeVisible();
	});

	test('cv page loads successfully', async ({ page }) => {
		await page.goto('/cv');
		await expect(page.locator('.page')).toBeVisible();
	});

	test('changelog page loads successfully', async ({ page }) => {
		await page.goto('/changelog');
		await expect(page.locator('.page')).toBeVisible();
	});

	test('design page loads successfully', async ({ page }) => {
		await page.goto('/design');
		await expect(page.locator('.lib-page')).toBeVisible();
		await expect(page.locator('.lib-title')).toBeVisible();
	});

	test('components page loads successfully', async ({ page }) => {
		await page.goto('/components');
		await expect(page.locator('.page-title').first()).toBeVisible();
		await expect(page.locator('.lib-section').first()).toBeVisible();
	});
});

test.describe('Error Pages', () => {
	test('404 page shows for non-existent routes', async ({ page }) => {
		const response = await page.goto('/this-page-does-not-exist');
		expect(response?.status()).toBe(404);
	});
});
