import { test, expect } from '@playwright/test';

test('should render the selected product details from the query string', async ({ page }) => {
  await page.goto('/product-details.html?id=beam');

  await expect(page.getByRole('heading', { name: /Balance Beam Trainer/i })).toBeVisible();
  await expect(page.getByText('$79.99')).toBeVisible();
  await expect(page.getByRole('button', { name: /add to cart/i })).toBeVisible();
});
