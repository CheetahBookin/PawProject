import { test, expect } from '@playwright/test';

test.describe('Success Page', () => {
  test('should display payment successful message and redirect after countdown', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/reservations/checkout/success?orderId=test-order-id');

    await expect(page).toHaveTitle('Payment successful');

    await expect(page.locator('h1')).toHaveText('Payment successful!');
    await expect(page.locator('p').nth(0)).toHaveText('Thank you for booking our hotel!');
    await expect(page.locator('p').nth(1)).toHaveText(/In 10s you'll come back to reservations\./);

    await page.waitForTimeout(11000);

    await expect(page).toHaveURL('http://localhost:3000/dashboard/reservations');
  });
});