import { test, expect } from '@playwright/test';

test.describe('OrderDetails Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should increment and decrement adults and children counters', async ({ page }) => {
    const incrementAdultsButton = page.locator('button:has-text("+"):near(:text("Adults"))');
    const decrementAdultsButton = page.locator('button:has-text("-"):near(:text("Adults"))');
    const incrementChildrenButton = page.locator('button:has-text("+"):near(:text("Children"))');
    const decrementChildrenButton = page.locator('button:has-text("-"):near(:text("Children"))');

    await incrementAdultsButton.click();
    await expect(page.locator(':text("Adults: 1")')).toBeVisible();
    await decrementAdultsButton.click();
    await expect(page.locator(':text("Adults: 0")')).toBeVisible();

    await incrementChildrenButton.click();
    await expect(page.locator(':text("Children: 1")')).toBeVisible();
    await decrementChildrenButton.click();
    await expect(page.locator(':text("Children: 0")')).toBeVisible();
  });

  test('should validate and set dates', async ({ page }) => {
    const fromDateInput = page.locator('input[name="fromDate"]');
    const toDateInput = page.locator('input[name="toDate"]');

    await fromDateInput.fill('2023-06-15');
    await toDateInput.fill('2023-06-20');

    await expect(fromDateInput).toHaveValue('2023-06-15');
    await expect(toDateInput).toHaveValue('2023-06-20');
  });

  test('should display error on invalid data', async ({ page }) => {
    const setDataButton = page.locator('button:has-text("Set your data")');

    await setDataButton.click();
    await expect(page.locator(':text("There must be at least one adult on the trip")')).toBeVisible();
  });

  test('should close the modal', async ({ page }) => {
    const closeButton = page.locator(':text("x")');

    await closeButton.click();
    await expect(page.locator('div.bg-gray-200')).not.toBeVisible();
  });
});
