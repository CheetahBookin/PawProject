import { test, expect } from '@playwright/test';

test.describe('Counter component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); 
  });

  test('should increment and decrement the counter', async ({ page }) => {
    const incrementButton = page.locator('button:has-text("+")');
    const decrementButton = page.locator('button:has-text("-")');
    const counterLabel = page.locator('span:text-matches("\\d+")');

    await expect(counterLabel).toHaveText('0');

    await incrementButton.click();
    await expect(counterLabel).toHaveText('1');

    await decrementButton.click();
    await expect(counterLabel).toHaveText('0');

    await decrementButton.click();
  });
});
