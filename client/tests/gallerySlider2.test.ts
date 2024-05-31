import { test, expect } from '@playwright/test';

test.describe('GallerySlider2 Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); 
  });

  test('should display the first slide initially', async ({ page }) => {
    const firstSlide = await page.locator('text=Nazwa Hotelu #1');
    await expect(firstSlide).toBeVisible();
  });

  test('should automatically change slides', async ({ page }) => {
    const firstSlide = await page.locator('text=Nazwa Hotelu #1');
    const secondSlide = await page.locator('text=Nazwa Hotelu #2');
    const thirdSlide = await page.locator('text=Nazwa Hotelu #3');


    await expect(firstSlide).toBeVisible();

 
    await page.waitForTimeout(4000);
    await expect(secondSlide).toBeVisible();


    await page.waitForTimeout(4000);
    await expect(thirdSlide).toBeVisible();


    await page.waitForTimeout(4000);
    await expect(firstSlide).toBeVisible();
  });
});
