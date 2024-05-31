import { test, expect } from '@playwright/test';

test.describe('UserProfileForm Component Basic Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); 
  });

  test('should load the page with correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/CheetahBooking/); 
  });

  test('should display input fields and buttons', async ({ page }) => {
    const firstNameInput = page.locator('input[name="firstName"]');
    await expect(firstNameInput).toBeVisible();
    
    const lastNameInput = page.locator('input[name="lastName"]');
    await expect(lastNameInput).toBeVisible();
    
    const countryInput = page.locator('input[name="country"]');
    await expect(countryInput).toBeVisible();
    
    const addressInput = page.locator('input[name="address"]');
    await expect(addressInput).toBeVisible();
    
    const profileImageInput = page.locator('input[name="profileImage"]');
    await expect(profileImageInput).toBeVisible();
    
    const darkModeSwitch = page.locator('label:has-text("Switch to dark mode")');
    await expect(darkModeSwitch).toBeVisible();
    
    const saveProfileButton = page.locator('button:has-text("Save Profile")');
    await expect(saveProfileButton).toBeVisible();
    
    const updateProfileButton = page.locator('button:has-text("Update Profile")');
    await expect(updateProfileButton).toBeVisible();
  });
});
