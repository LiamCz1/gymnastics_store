# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart-checkout.spec.ts >> adds a product, changes quantity, and updates the checkout total
- Location: tests\specs\cart-checkout.spec.ts:3:5

# Error details

```
Error: expect(locator).toHaveValue(expected) failed

Locator: locator('.quantity-select')
Expected: "1"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveValue" with timeout 5000ms
  - waiting for locator('.quantity-select')

```

```yaml
- banner:
  - link "APEX GYM":
    - /url: index.html
  - button "Toggle Theme":
    - img
    - text: Light
  - link "View Cart":
    - /url: buy.html
    - img
    - text: Cart
  - button "Get Started"
  - link "Login":
    - /url: login.html
  - link "Sign Up":
    - /url: signup.html
- main:
  - heading "Secure Checkout" [level=1]
  - heading "Your Cart is empty." [level=3]
  - paragraph: Please go back to the products page to select items for purchase.
  - button "Go to Products"
- contentinfo:
  - heading "APEX GYM" [level=3]
  - paragraph: Premium gymnastics gear, apparel, and private coaching for athletes who want to train with confidence.
  - heading "Quick Links" [level=3]
  - list:
    - listitem:
      - link "Home":
        - /url: index.html
    - listitem:
      - link "Shop gymnastics equipment and apparel":
        - /url: product.html
    - listitem:
      - link "Book private gymnastics lessons":
        - /url: lessons.html
    - listitem:
      - link "View your lesson bookings":
        - /url: my-bookings.html
  - heading "Contact" [level=3]
  - paragraph: "Email: info@apexgym.com"
  - paragraph: "Phone: (555) 123-4567"
  - paragraph: © 2026 APEX GYM. All rights reserved.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('adds a product, changes quantity, and updates the checkout total', async ({ page }) => {
  4  |   await page.addInitScript(() => localStorage.clear());
  5  |   await page.goto('/product-details.html?id=beam');
  6  | 
  7  |   await page.getByRole('button', { name: /add to cart/i }).click();
  8  |   await page.goto('/buy.html');
  9  | 
  10 |   const quantity = page.locator('.quantity-select');
> 11 |   await expect(quantity).toHaveValue('1');
     |                          ^ Error: expect(locator).toHaveValue(expected) failed
  12 |   await quantity.selectOption('2');
  13 | 
  14 |   await expect(page.locator('#summary-total-price')).toHaveText('$173.58');
  15 | });
  16 | 
```