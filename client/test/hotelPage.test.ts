import { test, expect } from '@playwright/test';

test.describe('HotelPage Component', () => {
  test('should display hotel information correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/hotel'); 

    const hotelName = await page.waitForSelector('h1.text-3xl.font-bold');
    expect(await hotelName.textContent()).not.toBeNull();

    const mainImage = await page.waitForSelector('img');
    expect(mainImage).toBeTruthy();
  });

  test('should allow rating the hotel', async ({ page }) => {
    await page.goto('http://localhost:3000/hotel'); 

    const ratingButton = await page.waitForSelector('button:has-text("Post rate")');
    expect(ratingButton).toBeTruthy();

    await page.fill('textarea', 'Great hotel!'); 
    await ratingButton.click();

    const ratingMessage = await page.waitForSelector('p:has-text("Great hotel!")');
    expect(ratingMessage).toBeTruthy();
  });

  test('should navigate to booking details on button click', async ({ page }) => {
    await page.goto('http://localhost:3000/hotel'); 

    const bookButton = await page.waitForSelector('button:has-text("Book")'); 
    await bookButton.click();

    expect(page.url()).toContain('/orderDetails'); 
  });
});
