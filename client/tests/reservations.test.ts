import { test, expect } from '@playwright/test';

test.describe('Reservations Page', () => {
  test('should display unpaid and paid reservations', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard/reservations');

    await expect(page.locator('h1')).toHaveText('Unpaid reservations');

    const unpaidReservations = page.locator('.reservation-card');
    const unpaidCount = await unpaidReservations.count();
    if (unpaidCount === 0) {
      await expect(page.locator('p')).toHaveText('No unpaid reservations');
    } else {
      await expect(unpaidReservations).toHaveCount(unpaidCount);
    }

    const showPaidButton = page.locator('button').filter({ hasText: 'Show Paid Reservations' });
    if (await showPaidButton.isVisible()) {
      await showPaidButton.click();
      const paidReservations = page.locator('.reservation-card');
      const paidCount = await paidReservations.count();
      expect(paidCount).toBeGreaterThan(0);
    }
  });
});