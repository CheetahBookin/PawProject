import { test, expect } from "@playwright/test";

test.describe("GalleryPopularDestinations", () => {
  test("displays loading indicator", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await expect(page.getByText("Loading...")).toBeVisible();
  });

  test("displays popular destinations", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.waitForSelector('h2:has-text("Popular Destinations")');

    await expect(
      page.getByRole("heading", { name: "Popular Destinations" })
    ).toBeVisible();

    const hotelCards = page.locator(".hotel-card");
    await expect(hotelCards).toHaveCount(4);
  });

  test("each hotel card displays correct information", async ({ page }) => {
    await page.goto("http://localhost:3000");

    await page.waitForSelector('h2:has-text("Popular Destinations")');

    const hotelCards = page.locator(".hotel-card");

    const cardCount = await hotelCards.count();
    for (let i = 0; i < cardCount; i++) {
      const card = hotelCards.nth(i);
      await expect(card.locator(".hotel-city")).toBeVisible();
      await expect(card.locator(".hotel-image")).toBeVisible();
    }
  });
});
