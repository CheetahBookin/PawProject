import { test, expect } from '@playwright/test';

test.describe('HotelTypeCard Component', () => {
  test('should display hotel information correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const hotelImage = await page.waitForSelector('.hotel-image');
    expect(hotelImage).toBeTruthy();

    const hotelName = await page.locator('.hotel-info h2').first();
    expect(await hotelName.textContent()).not.toBeNull();

    const hotelCity = await page.locator('.hotel-info p').first();
    expect(await hotelCity.textContent()).not.toBeNull();
  });

  test('should navigate to hotel details page on image click', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const hotelImage = await page.waitForSelector('.hotel-image');
    await hotelImage.click();

    expect(page.url()).toContain('/hotel/');
  });
});