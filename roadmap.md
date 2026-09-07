# 🚀 Student Web Development Roadmap: Gym Store

This roadmap provides a step-by-step path to improve the current static website before moving to advanced frameworks. The goal is to understand what is currently built, refactor and improve it, add testing, and *then* migrate to more complex tools.

> **Important Rule for Using AI on this Project:**
> "First explain the plan and which files will change. Then make only this one feature. Do not rewrite unrelated code. Afterward, give me a test checklist."

---

## 🟢 Phase 1: Understand & Clean Up
*Focus on understanding the current code, improving accessibility, and fixing basic issues.*

- [ ] **Step 1: Understand the Existing Site**
  - **Task:** Review `index.html`, `style.css`, and `script.js`. Understand how product data, cart data, checkout totals, and bookings are currently stored (via `localStorage`). Identify what is just a "demo" and not safe for a real business.
- [ ] **Step 2: Create a Clean README**
  - **Task:** Write a beginner-friendly `README.md`. Include instructions on how to setup/run the site, a list of current features, and future plans.
- [ ] **Step 3: Fix File Names**
  - **Task:** Rename files with spaces (e.g., `view my.html` to `my-bookings.html`). Safely update every link, canonical URL, and script reference so navigation still works perfectly.
- [ ] **Step 4: Remove Repeated Page Code**
  - **Task:** Identify repeated code (like headers and footers) across different HTML pages and implement a simple, reusable approach suitable for plain HTML/JavaScript.
- [ ] **Step 5: Improve Mobile Navigation**
  - **Task:** Test the site at mobile width. Add an accessible mobile menu with keyboard support, ensuring the desktop design remains intact.
- [ ] **Step 6: Accessibility (a11y) Pass**
  - **Task:** Audit the HTML. Fix image `alt` text, labels, button names, keyboard focus, and color contrast. Ensure the `Tab` key clearly moves through every interactive element.

## 🟡 Phase 2: JavaScript Refactoring & Safety
*Improve how data is handled and make the demo features more robust.*

- [ ] **Step 7: Improve Product Data**
  - **Task:** Move all product information into a single JavaScript data file. Include properties like `id`, `name`, `category`, `price`, `description`, `image`, and `stock`.
- [ ] **Step 8: Make Product Details Real**
  - **Task:** Create a dynamic `product-details.html?id=...` page that loads the correct selected product from your new product data file.
- [ ] **Step 9: Strengthen the Cart**
  - **Task:** Refactor the shopping cart to store product IDs in `localStorage` instead of duplicating whole product objects. Ensure quantity changes, removals, and totals work correctly.
- [ ] **Step 10: Add Validation & Error States**
  - **Task:** Improve checkout validation. Show clear inline errors for missing or invalid fields, and prevent users from checking out with an empty cart.
- [ ] **Step 11: Make Bookings Safer (Demo)**
  - **Task:** Update the booking system. Instead of looking up a booking just by a first name, require a booking reference number and an email address. (Still keeping it as a `localStorage` demo for now).

## 🟠 Phase 3: Introduction to Testing
*Learn how to write automated tests to ensure the code works as expected.*

- [ ] **Step 12: Add Basic Unit Tests**
  - **Task:** Set up **Vitest** for the pure JavaScript files. Write tests to verify that checkout totals, promo codes, and cart quantity calculations are correct.
- [ ] **Step 13: Add Browser (E2E) Tests**
  - **Task:** Set up **Playwright**. Write one complete automated test that opens the browser, adds a product to the cart, changes the quantity, and verifies the final total.

## 🔵 Phase 4: Modern Framework & Database
*Now that the foundation is solid and tested, migrate to modern tools.*

- [ ] **Step 14: Migrate to React/Vite**
  - **Task:** Migrate the static site into React using Vite *one page at a time*. Focus on preserving the exact same design and behavior before adding any new features.
- [ ] **Step 15: Add Supabase (Database)**
  - **Task:** Add Supabase authentication and set up tables for products, bookings, and orders. Start by loading products from the real database (do not add payments yet).
- [ ] **Step 16: Add Real Customer Features**
  - **Task:** Create protected customer accounts. Ensure users must log in and can only see their own specific bookings and orders.

## 🟣 Phase 5: Payments & Launch
*The final steps for a real-world application.*

- [ ] **Step 17: Payments and Deployment**
  - **Task:** Integrate Stripe in test mode for the checkout process. Ensure secret keys are kept out of GitHub. Finally, deploy the finished site safely to the web.
