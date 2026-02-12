import { test, expect } from "@playwright/test";

test.describe("Checkout and Order History", () => {
  const uniqueId = Date.now();
  const username = `shopper_${uniqueId}`;
  const password = "ShopperPass1!";

  test.beforeAll(async ({ request }) => {
    // Register a fresh user via API to save time
    await request.post("http://localhost:8000/auth/register", {
      data: {
        username: username,
        password: password,
        email: `${username}@test.com`,
      },
    });
  });

  test.beforeEach(async ({ page }) => {
    // Login UI
    await page.goto("/login");
    await page.fill("#username", username);
    await page.fill("#password", password);
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL("/");
    // Wait for auth to complete
    await expect(page.locator("header")).toContainText(username);
  });

  test("should complete a purchase and view in history", async ({ page }) => {
    // 1. Add item to cart
    await page.goto("/search");
    const addToCartBtn = page.locator('button:has-text("Add to Cart")').first();
    await addToCartBtn.click();

    // 2. Go to cart
    await page.goto("/cart");
    await expect(page.locator("text=Proceed to Checkout")).toBeVisible();
    await page.click("text=Proceed to Checkout");

    // 3. Fill Checkout Form
    await page.fill('input[name="email"]', "shopper@test.com");
    await page.fill('input[name="fullName"]', "Test Shopper");
    await page.fill('input[name="address"]', "123 Shop Lane");
    await page.fill('input[name="city"]', "Commerce City");
    await page.fill('input[name="state"]', "CA");
    await page.fill('input[name="zipCode"]', "90210");

    // Mock Payment
    await page.fill('input[name="cardNumber"]', "1234567812345678");
    await page.fill('input[name="cardName"]', "Test Shopper");
    await page.fill('input[name="expiryDate"]', "12/30");
    await page.fill('input[name="cvv"]', "123");

    // 4. Place Order
    // Handle alert
    page.on("dialog", (dialog) => dialog.accept());

    await page.click('button:has-text("Place Order")');

    // 5. Verify Redirect
    await expect(page).toHaveURL("/orders");

    // 6. Verify Order in History
    await expect(page.locator("h1")).toContainText("Order History");
    // Ensure at least one order card exists
    await expect(page.locator(".border.rounded-lg").first()).toBeVisible();
  });
});
