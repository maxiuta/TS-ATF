import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // UI preconditions
  await page.goto('/');
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({
      path: `test-results/${testInfo.title}.png`,
      fullPage: true,
    });
  }
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'failed') return;

  const logs: string[] = [];
  page.on('console', (msg) => logs.push(msg.text()));

  testInfo.attachments.push({
    name: 'browser-console',
    body: Buffer.from(logs.join('\n')),
    contentType: 'text/plain',
  });
});
