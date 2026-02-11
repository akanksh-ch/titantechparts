import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
    test.describe.configure({ mode: 'serial' });
    const uniqueId = Date.now();
    const username = `testuser_${uniqueId}`;
    const email = `test_${uniqueId}@example.com`;
    const password = 'securePassword123!';

    test('should register a new user', async ({ page }) => {
        await page.goto('/register');

        await page.fill('input[name="username"]', username);
        await page.fill('input[name="email"]', email);
        await page.fill('input[name="password"]', password);
        await page.fill('input[name="confirmPassword"]', password);

        await page.click('button[type="submit"]');

        // Should redirect to Home or Login? Based on current flow, it often auto-logs in
        await expect(page).toHaveURL(/\/(login|home)?$/);
    });

    test('should login with registered user', async ({ page }) => {
        await page.goto('/login');

        await page.fill('#username', username); // ID selector from Login Page
        await page.fill('#password', password);

        await page.click('button[type="submit"]');

        await expect(page).toHaveURL('/');

        // Verify user is logged in
        await expect(page.locator('header')).toContainText(username);
    });

    test('should verify protected routes redirect to login', async ({ page }) => {
        // Clear state
        await page.goto('/');
        await page.evaluate(() => localStorage.clear());

        await page.goto('/checkout');
        await expect(page).toHaveURL(/\/login/);
    });
});
