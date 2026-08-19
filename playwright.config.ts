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
	testIgnore: [
		...(process.env.SKIP_VISUAL_TESTS ? ['**/visual.spec.ts'] : []),
		...(process.env.SKIP_NETWORK_TESTS ? ['**/external-links.spec.ts'] : [])
	],
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: 4,
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
		// Mobile projects share engines with the desktop chromium/webkit projects,
		// so they only add value for pixel-level snapshots. Keep them off the PR path.
		{
			name: 'mobile-chrome',
			use: { ...devices['Pixel 5'] },
			testMatch: ['visual.spec.ts']
		},
		{
			name: 'mobile-safari',
			use: { ...devices['iPhone 12'] },
			testMatch: ['visual.spec.ts']
		}
	],

	webServer: {
		command: 'pnpm build && pnpm preview',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI,
		timeout: 120000
	}
});
