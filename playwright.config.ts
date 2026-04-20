import { defineConfig, devices } from '@playwright/test';

/**
 * Tests that depend on browser rendering and should run cross-browser.
 * Everything else only runs on Chromium to avoid redundant CI time.
 */
const crossBrowserTests = [
	'visual.spec.ts',
	'navigation.spec.ts',
	'responsive.spec.ts',
	'pages.spec.ts'
];

export default defineConfig({
	testDir: './tests',
	testIgnore: process.env.SKIP_VISUAL_TESTS ? ['**/visual.spec.ts'] : undefined,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : 4,
	reporter: [['html', { open: 'never' }], ['list']],
	timeout: 60000,

	expect: {
		toHaveScreenshot: {
			stylePath: './tests/screenshot.css'
		}
	},

	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		actionTimeout: 15000,
		navigationTimeout: 30000
	},

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
			testMatch: crossBrowserTests
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
			testMatch: crossBrowserTests
		},
		{
			name: 'mobile-chrome',
			use: { ...devices['Pixel 5'] },
			testMatch: crossBrowserTests
		},
		{
			name: 'mobile-safari',
			use: { ...devices['iPhone 12'] },
			testMatch: crossBrowserTests
		}
	],

	webServer: {
		command: 'pnpm build && pnpm preview',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI,
		timeout: 120000
	}
});
