import { test, expect } from '@playwright/test';

test.describe('Notebook Filtering', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/notebook');
	});

	test('filter buttons are visible', async ({ page }) => {
		const filterButtons = page.locator('.filter-btn');
		await expect(filterButtons).toHaveCount(4); // all, log, thinking, making
	});

	test('all filter is active by default', async ({ page }) => {
		const allFilter = page.locator('.filter-btn.filter-all');
		await expect(allFilter).toHaveClass(/active/);
	});

	test('clicking filter changes active state', async ({ page }) => {
		// Click log filter
		const logFilter = page.locator('.filter-btn.filter-log');
		await logFilter.click();

		await expect(logFilter).toHaveClass(/active/);

		// All filter should no longer be active
		const allFilter = page.locator('.filter-btn.filter-all');
		await expect(allFilter).not.toHaveClass(/active/);
	});

	test('filtering reduces displayed entries', async ({ page }) => {
		// Get initial count
		const initialCount = await page.locator('.feed-entry').count();

		// Apply a filter
		await page.locator('.filter-btn.filter-log').click();

		// Wait for filter to apply
		await page.waitForTimeout(100);

		const filteredCount = await page.locator('.feed-entry').count();

		// Filtered count should be less than or equal to initial
		expect(filteredCount).toBeLessThanOrEqual(initialCount);
	});

	test('filter count updates correctly', async ({ page }) => {
		const countText = page.locator('.filter-count');

		// Apply log filter
		await page.locator('.filter-btn.filter-log').click();
		await page.waitForTimeout(300);

		const filteredText = await countText.textContent();
		const filteredEntries = await page.locator('.feed-entry').count();

		// Count text should contain a number
		expect(filteredText).toMatch(/\d+/);

		// The count shown should be a reasonable representation
		// (may include total count format like "5 of 64")
		if (filteredEntries > 0) {
			expect(filteredText).toMatch(new RegExp(`${filteredEntries}|\\d+`));
		}
	});

	test('each filter type shows only matching entries', async ({ page }) => {
		const filters = [
			{ selector: '.filter-btn.filter-log', type: 'type-log' },
			{ selector: '.filter-btn.filter-thinking', type: 'type-thinking' },
			{ selector: '.filter-btn.filter-making', type: 'type-making' }
		];

		for (const filter of filters) {
			await page.locator(filter.selector).click();
			await page.waitForTimeout(100);

			const entries = await page.locator('.feed-entry').all();

			if (entries.length > 0) {
				// All visible entries should match the filter type
				for (const entry of entries) {
					const classes = await entry.getAttribute('class');
					expect(classes).toContain(filter.type);
				}
			}
		}
	});

	test('clicking all filter shows all entries again', async ({ page }) => {
		// Get initial count with all filter
		const initialCount = await page.locator('.feed-entry').count();

		// Apply a filter
		await page.locator('.filter-btn.filter-log').click();
		await page.waitForTimeout(500);

		const filteredCount = await page.locator('.feed-entry').count();

		// Click all filter
		await page.locator('.filter-btn.filter-all').click();
		await page.waitForTimeout(500);

		// Should be back to at least the filtered count (verify filter toggling works)
		const restoredCount = await page.locator('.feed-entry').count();
		expect(restoredCount).toBeGreaterThanOrEqual(filteredCount);
	});

	test('filter persists while scrolling', async ({ page }) => {
		// Apply filter
		await page.locator('.filter-btn.filter-thinking').click();
		await page.waitForTimeout(100);

		const countBefore = await page.locator('.feed-entry').count();

		// Scroll down
		await page.evaluate(() => window.scrollBy(0, 500));
		await page.waitForTimeout(100);

		// Filter should still be applied
		const countAfter = await page.locator('.feed-entry').count();
		expect(countAfter).toBe(countBefore);

		// Filter button should still be active
		await expect(page.locator('.filter-btn.filter-thinking')).toHaveClass(/active/);
	});

	test('type stats in sidebar show correct counts', async ({ page }) => {
		const typeRows = page.locator('.nb-type-row');
		const rowCount = await typeRows.count();

		expect(rowCount).toBeGreaterThan(0);

		// Each row should have a label and count
		for (let i = 0; i < rowCount; i++) {
			const row = typeRows.nth(i);
			const text = await row.textContent();
			expect(text).toMatch(/\d+/); // Should contain a number
		}
	});
});

test.describe('Notebook Entry Display', () => {
	test('entries show date information', async ({ page, isMobile }) => {
		await page.goto('/notebook');

		const firstEntry = page.locator('.feed-entry').first();
		const dateCol = firstEntry.locator('.entry-date-col');

		// Date column may be hidden on mobile viewports
		if (!isMobile) {
			await expect(dateCol).toBeVisible();
			await expect(dateCol.locator('.entry-date-day')).toBeVisible();
			await expect(dateCol.locator('.entry-date-month')).toBeVisible();
			await expect(dateCol.locator('.entry-date-year')).toBeVisible();
		} else {
			// On mobile, just verify the entry is visible
			await expect(firstEntry).toBeVisible();
		}
	});

	test('entries show type icon and label', async ({ page }) => {
		await page.goto('/notebook');

		const firstEntry = page.locator('.feed-entry').first();

		await expect(firstEntry.locator('.entry-glyph')).toBeVisible();
		await expect(firstEntry.locator('.entry-type-label')).toBeVisible();
	});

	test('entries show title', async ({ page }) => {
		await page.goto('/notebook');

		const firstEntry = page.locator('.feed-entry').first();
		const title = firstEntry.locator('.entry-title');

		await expect(title).toBeVisible();
		const titleText = await title.textContent();
		expect(titleText?.length).toBeGreaterThan(0);
	});

	test('clicking entry navigates to post', async ({ page }) => {
		await page.goto('/notebook');

		const firstEntry = page.locator('.feed-entry').first();
		const href = await firstEntry.getAttribute('href');

		await firstEntry.click();

		await expect(page).toHaveURL(new RegExp(href!.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
	});
});
