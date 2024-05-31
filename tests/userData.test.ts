import { test, expect } from '@playwright/test';

test.describe('Basic UserData Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); 
  });

  test('should load the page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/CheetahBooking/); 
  });

  test('should display welcome message', async ({ page }) => {
    const welcomeMessage = page.locator('text=Welcome,'); 
    await expect(welcomeMessage).toBeVisible();
  });

  test('should display profile image', async ({ page }) => {
    const profileImage = page.locator('img'); 
    await expect(profileImage).toBeVisible();
  });
});
