import { test, expect } from '@playwright/test';

test.describe('UserBlocks Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should render header correctly', async ({ page }) => {
    const header = page.locator('h1');
    await expect(header)
  });

});
