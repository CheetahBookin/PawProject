// tests/hotelCard.spec.ts

import { test, expect } from '@playwright/test';

test.describe('HotelCard Component', () => {
  test('should display hotel information correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/hotel');

    const hotelImage = await page.waitForSelector('img');
    expect(hotelImage).toBeTruthy();

    const hotelNameCity = await page.locator('p').first();
    expect(await hotelNameCity.textContent()).toMatch(/.+, .+/);

    const flagImage = await page.waitForSelector('img[alt]');
    expect(flagImage).toBeTruthy();
  });

  test('should add and remove hotel from favorites', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const regularHeartIcon = await page.waitForSelector('svg[data-icon="heart"]:not(.text-red-700)');
    expect(regularHeartIcon).toBeTruthy();

    await regularHeartIcon.click();

    const solidHeartIcon = await page.waitForSelector('svg[data-icon="heart"].text-red-700');
    expect(solidHeartIcon).toBeTruthy();

    await solidHeartIcon.click();

    const regularHeartIconAfter = await page.waitForSelector('svg[data-icon="heart"]:not(.text-red-700)');
    expect(regularHeartIconAfter).toBeTruthy();
  });

  test('should navigate to hotel details page on image click', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const hotelImage = await page.waitForSelector('img');
    await hotelImage.click();

    expect(page.url()).toContain('/hotel/');
  });
});
