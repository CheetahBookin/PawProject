import { test, expect } from '@playwright/test';

test('should render modal and close it', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const modal = await page.locator('div.fixed');
  await expect(modal).toBeVisible();

  const closeButton = await page.locator('button:has-text("Close")');
  await expect(closeButton).toBeVisible();

  await closeButton.click();
  await expect(modal).not.toBeVisible();
});
