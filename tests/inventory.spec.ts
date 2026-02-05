import { test, expect } from '@playwright/test';

test.describe('Inventory Browsing', () => {

    test.beforeEach(async ({ page }) => {
        // Start at home
        await page.goto('/');
    });

    test('should display featured products on home page', async ({ page }) => {
        // Wait for inventory to load
        await expect(page.locator('.grid')).toBeVisible();
        await expect(page.locator('text=NVIDIA RTX 4080')).toBeVisible();
    });

    test('should search for a specific product', async ({ page }) => {
        await page.goto('/search');

        await page.fill('input[placeholder*="Search"]', 'Ryzen'); // Adjust selector as needed
        // Assuming search is realtime or triggerable. If simple filtering:

        // If we implemented the search bar in header or search page:
        // await page.press('input[type="search"]', 'Enter');

        // Check results
        await expect(page.locator('text=AMD Ryzen')).toBeVisible();
    });

    test('should filter by category', async ({ page }) => {
        await page.goto('/search');

        // Click GPU category
        await page.click('button:has-text("GPU")');

        // Verify GPU is there
        await expect(page.locator('text=NVIDIA')).toBeVisible();

        // Verify CPU is NOT there (assuming clean data)
        // This depends on test data, but generally:
        // await expect(page.locator('text=Ryzen')).not.toBeVisible();
    });
});
