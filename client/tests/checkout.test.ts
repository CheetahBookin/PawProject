import { test, expect } from '@playwright/test';

test.describe('Checkout Page', () => {
  test('should allow user to submit email and redirect to payment page', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/reservations/checkout?order=test-order-id');

    await expect(page.locator('h1')).toHaveText('Checkout');

    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:3000/successful-payment-url');
  });
});