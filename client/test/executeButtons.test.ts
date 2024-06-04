import { test, expect } from '@playwright/test';

test.describe('ExecuteButtons Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); 
  });

  test('should open settings modal', async ({ page }) => {
    await page.click('button:has-text("Settings")');
    const settingsModal = await page.locator('text=Update nickname');
    await expect(settingsModal).toBeVisible();
  });

  test('should open logout modal', async ({ page }) => {
    await page.click('button:has-text("Logout")');
    const logoutModal = await page.locator('text=Are you sure you want to logout?');
    await expect(logoutModal).toBeVisible();
  });

  test('should update nickname', async ({ page }) => {
    await page.click('button:has-text("Settings")');
    await page.click('button:has-text("Update nickname")');
    await page.fill('input[name="nickname"]', 'newNickname');
    await page.click('button:has-text("Update")');

    const successToast = await page.locator('text=Success');
    await expect(successToast).toBeVisible();
  });

  test('should update email', async ({ page }) => {
    await page.click('button:has-text("Settings")');
    await page.click('button:has-text("Update email")');
    await page.fill('input[name="email"]', 'newemail@example.com');
    await page.click('button:has-text("Update")');

    const successToast = await page.locator('text=Success');
    await expect(successToast).toBeVisible();
  });

  test('should update password', async ({ page }) => {
    await page.click('button:has-text("Settings")');
    await page.click('button:has-text("Update password")');
    await page.fill('input[name="currPassword"]', 'currentPassword');
    await page.fill('input[name="newPassword"]', 'newPassword');
    await page.click('button:has-text("Update")');

    const successToast = await page.locator('text=Success');
    await expect(successToast).toBeVisible();
  });

  test('should update phone number', async ({ page }) => {
    await page.click('button:has-text("Settings")');
    await page.click('button:has-text("Update phone number")');
    await page.fill('input[name="phoneNumber"]', '123456789');
    await page.click('button:has-text("Update")');

    const successToast = await page.locator('text=Success');
    await expect(successToast).toBeVisible();
  });

  test('should confirm logout', async ({ page }) => {
    await page.click('button:has-text("Logout")');
    await page.click('button:has-text("Yes")');

    await expect(page).toHaveURL('http://localhost:3000/login'); 
  });

  test('should cancel logout', async ({ page }) => {
    await page.click('button:has-text("Logout")');
    await page.click('button:has-text("No")');

    const logoutModal = await page.locator('text=Are you sure you want to logout?');
    await expect(logoutModal).not.toBeVisible();
  });
});
