import { test, expect } from '@playwright/test';

test('should render checkbox and handle click', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const checkbox = await page.locator('input[type="checkbox"][name="testCheckbox"]');
  await expect(checkbox).toBeVisible();
  await checkbox.click();
  await expect(checkbox).toBeChecked();
});

test('should render terms and conditions link', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const termsLink = await page.locator('a[href="/assets/CheetahBooking_TermsAndConditions.pdf"]');
  await expect(termsLink).toBeVisible();
  await expect(termsLink).toHaveText('terms and conditions');
});
