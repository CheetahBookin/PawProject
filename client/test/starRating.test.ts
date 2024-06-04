import { test, expect } from '@playwright/test';

test.describe('StarRating Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should render stars correctly', async ({ page }) => {
    const stars = page.locator('svg'); 
    await expect(stars).toHaveCount(5);
  });

  test('should update stars on click', async ({ page }) => {
    const stars = page.locator('svg');
    
    await stars.nth(2).click();
    for (let i = 0; i < 3; i++) {
      await expect(stars.nth(i)).toHaveAttribute('fill', 'yellow');
    }

    for (let i = 3; i < 5; i++) {
      await expect(stars.nth(i)).toHaveAttribute('fill', '#d4d4d8');
    }
  });

  test('should update stars on hover', async ({ page }) => {
    const stars = page.locator('svg');
    
    await stars.nth(3).hover();
    for (let i = 0; i < 4; i++) {
      await expect(stars.nth(i)).toHaveAttribute('fill', 'yellow');
    }

    await page.mouse.move(0, 0);
    await expect(stars.nth(3)).toHaveAttribute('fill', '#d4d4d8');
  });
});
