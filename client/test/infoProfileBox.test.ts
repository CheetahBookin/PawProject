import { test, expect } from '@playwright/test';

test.describe('InfoProfileBox Component', () => {
  test('should display text and children correctly', async ({ page }) => {
    await page.goto('http://localhost:3000'); 

    const boxText = await page.locator('h1.text-xl.font-bold');
    expect(await boxText.textContent()).toBe('Sample Text'); 

    const childrenContent = await page.locator('.bg-white.rounded-lg.shadow-lg p');
    expect(childrenContent).toBeTruthy();
  });
});
