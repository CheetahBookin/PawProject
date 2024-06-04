import { test, expect } from '@playwright/test';

test.describe('GalleryPropertyType Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display the title', async ({ page }) => {
    await expect(page.locator('text=Browse by property type')).toBeVisible();
  });

  test('should display hotel type cards', async ({ page }) => {
    await page.waitForSelector('[data-testid="hotel-type-card"]');
    const cards = await page.locator('[data-testid="hotel-type-card"]');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('should display loading component when no data', async ({ page }) => {
    await page.route('**/getHotelsTypes', (route) =>
      route.fulfill({ status: 200, body: JSON.stringify([]) })
    );
    await page.reload();
    await expect(page.locator('text=Loading')).toBeVisible();
  });
});
