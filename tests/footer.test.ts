import { test, expect } from '@playwright/test';

test('newsletter display on link click', async ({ page }) => {
  await page.goto('http://localhost:3000'); 

  // Kliknij link "Newsletter"
  await page.click('a[href="#"]');

  // Oczekiwanie na wyświetlenie komponentu Newsletter
  const newsletterComponent = await page.waitForSelector('.newsletter');
  const ariaHidden = await newsletterComponent.getAttribute('aria-hidden');
  expect(ariaHidden).toBe('false');
});
