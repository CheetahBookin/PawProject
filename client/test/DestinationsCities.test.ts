import { test, expect } from '@playwright/test';

test.describe('DestinationsCities Component', () => {
    test('should display cities based on the selected country', async ({ page }) => {
        await page.goto('http://localhost:3000'); 

        await page.fill('input[placeholder="Enter country"]', 'SampleCountry'); 
        await page.click('button:has-text("Search")'); 

        await page.waitForSelector('div.flex.items-center.justify-between');

        const cityNames = await page.$$eval('h3.text-lg.font-semibold', elements => elements.map(el => el.textContent));
        expect(cityNames.length).toBeGreaterThan(0);
    });
});