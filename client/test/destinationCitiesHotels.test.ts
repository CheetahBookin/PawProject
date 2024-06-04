import { test, expect } from '@playwright/test';

test.describe('DestinationsCitiesHotels Component', () => {
    test('should display hotels based on the selected city', async ({ page }) => {
        await page.fill('input[name="city"]', 'SampleCity');
        await page.click('button[name="search"]'); 

        await page.waitForSelector('div.flex.items-center.cursor-pointer');

        const hotelNames = await page.$$eval('h3.text-lg.font-semibold', elements => elements.map(el => el.textContent));
        expect(hotelNames.length).toBeGreaterThan(0);
    });
});
