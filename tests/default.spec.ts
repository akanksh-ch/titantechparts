import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/home');
  await page.getByRole('link', { name: 'Search' }).click();
  await page.getByRole('link', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search for products...' }).click();
  await page.getByRole('textbox', { name: 'Search for products...' }).fill('fl');
});