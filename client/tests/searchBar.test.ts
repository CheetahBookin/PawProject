import { test, expect } from '@playwright/test';

test.describe('SearchBar Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); 
  });

  test('should display validation errors for missing fields', async ({ page }) => {
    await page.click('button#search');
    const errorText = await page.locator('text=You have to go somewhere');
    await expect(errorText).toBeVisible();
  });

  test('should display validation errors for invalid dates', async ({ page }) => {
    await page.fill('input[name="destination"]', 'Paris');
    await page.fill('input[name="checkInDate"]', '2023-06-01');
    await page.fill('input[name="checkOutDate"]', '2023-05-31');
    await page.click('button#search');
    const errorText = await page.locator('text=You can\'t go back in time dumbass');
    await expect(errorText).toBeVisible();
  });

  test('should perform a search with valid inputs', async ({ page }) => {
    await page.fill('input[name="destination"]', 'Paris');
    await page.fill('input[name="checkInDate"]', '2023-07-01');
    await page.fill('input[name="checkOutDate"]', '2023-07-10');
    await page.fill('input[name="adults"]', '2');
    await page.click('button#search');

    await expect(page).toHaveURL(/search\?destination=Paris&checkInDate=2023-07-01&checkOutDate=2023-07-10&children=0&adults=2/);
  });

  test('should display search results as the user types', async ({ page }) => {
    await page.fill('input[name="destination"]', 'New');
    const searchResults = await page.locator('text=New York');
    await expect(searchResults).toBeVisible();
  });

  test('should handle dynamic input changes', async ({ page }) => {
    await page.fill('input[name="destination"]', 'London');
    await page.fill('input[name="checkInDate"]', '2023-08-01');
    await page.fill('input[name="checkOutDate"]', '2023-08-15');
    await page.click('button#search');

    await expect(page).toHaveURL(/search\?destination=London&checkInDate=2023-08-01&checkOutDate=2023-08-15&children=0&adults=1/);
  });
});
