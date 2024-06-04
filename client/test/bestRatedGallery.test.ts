import { test, expect } from '@playwright/test';

test.describe('BesRatedGallery Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the title', async ({ page }) => {
    await expect(page.locator('text=Best rated')).toBeVisible();
  });

  test('should display carousel items', async ({ page }) => {
    await page.route('**/getBestRated', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [
            {
              id: 1,
              name: 'Hotel One',
              country: 'Country A',
              image: '/images/hotel1.jpg',
              avg_rate: 4.5,
              rates_count: 10,
            },
            {
              id: 2,
              name: 'Hotel Two',
              country: 'Country B',
              image: '/images/hotel2.jpg',
              avg_rate: 4.0,
              rates_count: 20,
            },
          ],
        }),
      })
    );

    await page.reload();
    await page.waitForSelector('[data-testid="carousel-item"]');
    const items = await page.locator('[data-testid="carousel-item"]');
    expect(await items.count()).toBe(2);
  });

  test('should navigate to correct URL on "View Details" button click', async ({ page }) => {
    await page.route('**/getBestRated', (route) =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [
            {
              id: 1,
              name: 'Hotel One',
              country: 'Country A',
              image: '/images/hotel1.jpg',
              avg_rate: 4.5,
              rates_count: 10,
            },
          ],
        }),
      })
    );

    await page.reload();
    await page.click('text=View Details');
    await expect(page).toHaveURL('/hotel/hotel-one-1');
  });
});
