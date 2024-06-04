import { test, expect } from '@playwright/test';

test('should render loading spinner', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const spinner = await page.locator('div.animate-spin');
  await expect(spinner).toBeVisible();
  
  await expect(spinner).toHaveClass(/border-4/);
  await expect(spinner).toHaveClass(/border-gray-200/);
  await expect(spinner).toHaveClass(/border-t-4/);
  await expect(spinner).toHaveClass(/border-t-gray-800/);
  await expect(spinner).toHaveClass(/rounded-full/);
  await expect(spinner).toHaveClass(/h-8/);
  await expect(spinner).toHaveClass(/w-8/);
});
