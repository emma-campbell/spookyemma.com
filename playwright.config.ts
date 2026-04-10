import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : 4,
	reporter: [['html', { open: 'never' }], ['list']],
	timeout: 60000,

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
			use: { ...devices['Desktop Firefox'] }
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] }
		},
		{
			name: 'mobile-chrome',
			use: { ...devices['Pixel 5'] }
		},
		{
			name: 'mobile-safari',
			use: { ...devices['iPhone 12'] }
		}
	],

	webServer: {
		command: 'pnpm build && pnpm preview',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI,
		timeout: 120000
	}
});
