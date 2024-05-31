import { test, expect } from '@playwright/test';
import { exec } from 'child_process';

let serverProcess;

test.beforeAll(async () => {
  // Start the development server
  serverProcess = exec('npm start');
  // Wait for the server to start (adjust the time as necessary)
  await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds
});

test.afterAll(async () => {
  // Stop the development server
  serverProcess.kill();
});

test.describe('UserAchievements Component Tests', () => {
  const appUrl = 'http://localhost:3000';

  test('should display the user level', async ({ page }) => {
    await page.goto(appUrl);
    const levelHeader = page.locator('text=Your level');
    await expect(levelHeader).toBeVisible();

    const levelValue = page.locator('div:has-text("Your level") >> p');
    await expect(levelValue).toBeVisible();
  });

  test('should display user opinions', async ({ page }) => {
    await page.goto(appUrl);
    const opinionsHeader = page.locator('text=Your opinions');
    await expect(opinionsHeader).toBeVisible();

    const noOpinionsText = page.locator('text=You have not yet placed any opinions');
    if (await noOpinionsText.isVisible()) {
      await expect(noOpinionsText).toBeVisible();
    } else {
      const opinions = page.locator('div:has-text("You have placed")');
      await expect(opinions).toBeVisible();
    }
  });

  test('should display user favorites', async ({ page }) => {
    await page.goto(appUrl);
    const favoritesHeader = page.locator('text=Your favorites');
    await expect(favoritesHeader).toBeVisible();

    const noFavoritesText = page.locator('text=You have not yet added any favorites');
    if (await noFavoritesText.isVisible()) {
      await expect(noFavoritesText).toBeVisible();
    } else {
      const favorites = page.locator('div:has-text("You have")');
      await expect(favorites).toBeVisible();
    }
  });
});
