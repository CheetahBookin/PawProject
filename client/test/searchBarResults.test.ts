import { test, expect } from '@playwright/test';

test.describe('SearchResults Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should render search results', async ({ page }) => {
    const searchResults = page.locator('.search-results');
    await expect(searchResults).toBeVisible();
    
    const results = await searchResults.locator('div:has-text("Search Results")');
    await expect(results).toHaveCount(1);
  });

  test('should update state on result click', async ({ page }) => {
    const searchResults = page.locator('.search-results');
    const firstResult = searchResults.locator('div').nth(1); 
    await firstResult.click();
    
    const updatedDestination = await page.locator('selector-for-destination-element');
    await expect(updatedDestination).toHaveText('expected-destination-text');
  });
});
