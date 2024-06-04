import { test, expect } from '@playwright/test';

test.describe('Reset Password Page', () => {
  test('should render reset password form', async ({ page }) => {
    await page.goto('http://localhost:3000/reset-password');

    await expect(page.locator('h1')).toHaveText('Reset Password');
    await expect(page.locator('label[for="email"]')).toHaveText('email');
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Send reset code');
  });

  test('should show error on invalid email', async ({ page }) => {
    await page.goto('http://localhost:3000/reset-password');

    await page.fill('input[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');

    await expect(page.locator('p.text-indigo-500')).toHaveText('User not found');
  });

  test('should redirect to reset code page on valid email', async ({ page }) => {
    await page.goto('http://localhost:3000/reset-password');

    await page.fill('input[name="email"]', 'test@example.com');
    await page.click('button[type="submit"]');

    await page.waitForURL('http://localhost:3000/reset-password/test@example.com');
    await expect(page.url()).toBe('http://localhost:3000/reset-password/test@example.com');
  });
});