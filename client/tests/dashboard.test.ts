import { test, expect } from '@playwright/test';

test.describe('Dashboard Page', () => {
  test('should display user dashboard information correctly', async ({ page }) => {
    await page.goto('http://localhost:3000/dashboard');

    const loading = page.locator('text=Loading');
    await expect(loading).toBeVisible();

    await page.waitForSelector('text=Dashboard');

    const userData = page.locator('section:has-text("User Data")');
    await expect(userData).toBeVisible();

    const userAchievements = page.locator('section:has-text("User Achievements")');
    await expect(userAchievements).toBeVisible();

    const profileForm = page.locator('form');
    await expect(profileForm).toBeVisible();
  });
});