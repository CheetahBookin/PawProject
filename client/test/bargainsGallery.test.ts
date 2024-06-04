import { test, expect } from '@playwright/test';

test.describe('BargainsGallery Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display carousel items with discounted prices', async ({ page }) => {
    await page.route('**/getDiscountedRooms', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [
            {
              id: 1,
              name: 'Hotel One',
              country: 'Country A',
              images: [{ image: '/images/hotel1.jpg' }],
              Rooms: [
                {
                  id: 101,
                  roomNumber: 'Room 1',
                  peopleCapacity: 2,
                  priceForPerson: 100,
                  discount: 0.2,
                },
              ],
            },
            {
              id: 2,
              name: 'Hotel Two',
              country: 'Country B',
              images: [{ image: '/images/hotel2.jpg' }],
              Rooms: [
                {
                  id: 102,
                  roomNumber: 'Room 2',
                  peopleCapacity: 3,
                  priceForPerson: 150,
                  discount: 0.1,
                },
              ],
            },
          ],
        }),
      })
    );

    await page.reload();
    await page.waitForSelector('[data-testid="carousel-item"]');

    const discountedPrice1 = await page.textContent('[data-testid="carousel-item"]:nth-child(1) .new-price');
    expect(discountedPrice1).toContain('80zł'); 

    const discountedPrice2 = await page.textContent('[data-testid="carousel-item"]:nth-child(2) .new-price');
    expect(discountedPrice2).toContain('135zł'); 
  });

  test('should navigate to correct URL on room click', async ({ page }) => {
    await page.route('**/getDiscountedRooms', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [
            {
              id: 1,
              name: 'Hotel One',
              country: 'Country A',
              images: [{ image: '/images/hotel1.jpg' }],
              Rooms: [
                {
                  id: 101,
                  roomNumber: 'Room 1',
                  peopleCapacity: 2,
                  priceForPerson: 100,
                  discount: 0.2,
                },
              ],
            },
          ],
        }),
      })
    );

    await page.reload();
    await page.click('text=Room 1');
    await expect(page).toHaveURL('/hotel/hotel-one-1?room=101');
  });
});
