import { test, expect } from '@playwright/test';

test('successful newsletter subscription', async ({ page }) => {
    await page.goto('http://localhost:3000');
    try {
        await page.waitForSelector('.mx-auto input[type="email"]', { timeout: 10000 });
    } catch (error) {
        console.error("Failed to locate the email input field:", error);
        throw error;
    }

    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.text-green-500');
    const successMessage = await page.textContent('.text-green-500');

    expect(successMessage).toBe('Thank you for subscribing!');
});
