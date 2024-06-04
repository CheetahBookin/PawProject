import { test, expect } from '@playwright/test';

test.describe('Label Component', () => {
  test('powinien wyświetlać etykietę i pole input poprawnie', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const labelSpan = await page.locator('span.text-gray-700');
    expect(await labelSpan.textContent()).toBe('Sample Span Content'); 

    const inputField = await page.locator('input[name="sampleName"]'); 
    expect(inputField).toBeTruthy();
  });

  test('powinien wyświetlać pole input bez etykiety, gdy noLabel jest ustawione na true', async ({ page }) => {
    await page.goto('http://localhost:3000'); 

    const inputField = await page.locator('input[name="sampleNameNoLabel"]'); 
    expect(inputField).toBeTruthy();
  });
});
