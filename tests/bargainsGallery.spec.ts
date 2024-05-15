//Test not working

// import { test, expect } from '@playwright/test';

// test('Renders correctly', async ({ page }) => {
//   await page.goto('http://localhost:3000');
//   const bargainsGallery = await page.waitForSelector('.w-[65%]');
//   expect(bargainsGallery).toBeTruthy();
// });

// test('Navigates to correct page on item click', async ({ page }) => {
//   await page.goto('http://localhost:3000');
//   await page.click('.bg-brand-secondary');
//   await page.waitForNavigation();
//   expect(page.url()).toContain('/hotel/');
// });

// test('Calculates discounted price correctly', async ({ page }) => {
//   await page.goto('http://localhost:3000');
//   const oldPrice = 100;
//   const discount = 0.2;
//   const expectedPrice = oldPrice - (oldPrice * discount);

//   await page.waitForSelector('.bg-brand-secondary p:last-child');
//   const newPriceTextElement = await page.$('.bg-brand-secondary p:last-child');
//   const newPriceText = await (newPriceTextElement ? newPriceTextElement.textContent() : null);
//   const newPrice = +newPriceText?.replace('New price: ', '').replace('zł', '') || 0;

//   expect(newPrice).toBe(expectedPrice);
// });
