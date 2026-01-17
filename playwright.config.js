import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_UI_URL,
    headless: isCI,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  outputDir: 'test-results',
  forbidOnly: isCI,
});
