import { test, expect } from '@playwright/test';

test('adds a product, changes quantity, and updates the checkout total', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto('/product-details.html?id=beam');

  await page.getByRole('button', { name: /add to cart/i }).click();
  await page.goto('/buy.html');

  const quantity = page.locator('.quantity-select');
  await expect(quantity).toHaveValue('1');
  await quantity.selectOption('2');

  await expect(page.locator('#summary-total-price')).toHaveText('$173.58');
});
