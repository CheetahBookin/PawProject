import { test, expect } from '@playwright/test';

test('newsletter display on link click', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const newsletterLink = await page.waitForSelector('a[href="#"]');
    expect(newsletterLink).not.toBeNull();

    await newsletterLink.click();

    const isNewsletterRendered = await page.evaluate(() => {
        const newsletterElement = document.querySelector('.newsletter');
        return newsletterElement !== null && newsletterElement.innerHTML.trim() !== '';
    });
    expect(isNewsletterRendered).toBe(true);
});
