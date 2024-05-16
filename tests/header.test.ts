import { test, expect } from '@playwright/test';

test('header renders correctly', async ({ page }) => {
    await page.goto('http://localhost:3000');

    const logo = await page.waitForSelector('header img');
    expect(logo).toBeTruthy();

    const navigationLinks = await page.$$('header nav ul li a');
    expect(navigationLinks.length).toBeGreaterThan(0);

    await page.evaluate(() => {
        localStorage.setItem('isLogged', 'true');
    });

    await page.reload();

    // const userInfo = await page.waitForSelector('header p');
    //expect(userInfo).toBeTruthy();

    //const reservationsLink = await page.waitForSelector('header a[href="/dashboard/reservations"]');
    //expect(reservationsLink).toBeTruthy();
});
