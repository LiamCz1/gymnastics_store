# APEX GYM — Project README

## Overview
This repository is a gymnastics store and coaching service demo (APEX GYM). It includes pages for Home, Shop, Lessons, Bookings, authentication demos, owner tools, and the first React/Vite home-page migration at `react-home.html`.

Important note: many demo features store data in `localStorage` (cart, bookings, promo settings). This is fine for learning and testing, but not suitable for production or storing PII.

## Quick Start (serve locally)
- Option A — simple static server (Node):

```bash
npx serve .
# then open http://localhost:3000 (or the port shown)
```

- Option B — Python 3 (if installed):

```bash
python -m http.server 8000
# open http://localhost:8000
```

- Option C — open `index.html` directly in your browser (some features requiring fetch or routing may need a server).

For the optional server features:

```bash
cd server
npm install
npm start
```

Copy `.env.example` to `.env` before enabling Supabase or Stripe. Keep server-only keys out of browser code and Git.

## Project Structure (important files)
- `index.html` — Home / landing page
- `product.html`, `product-details.html` — Shop and product views
- `style.css` — Main site styles
- `src/script.js` — Client-side site logic (products, UI behavior)
- `src/auth.js` — Authentication demo wiring (Google, owner UI)
- `src/react/` — First React/Vite page migration
- `src/supabase-client.js`, `src/supabase-data.js` — Environment-gated Supabase access
- `supabase/schema.sql` — Products, bookings, orders, and row-level security policies
- `server/index.js` — Newsletter API and fail-closed Stripe Checkout/webhook routes
- `server/` — small server-side utilities and owner scripts (if present)
- `public/images/` — media assets

## Current Features (what works now)
- Static product catalogue rendered by `src/script.js` (client-side)
- Shopping cart demo that uses `localStorage` for persistence
- Booking demo pages that save bookings to `localStorage`
- Theme toggle (light/dark) persisted in `localStorage`
- Contact form wired to a Formspree endpoint
- Basic accessibility considerations (skip link, alt text on main hero image)

## Roadmap Status
The current status is tracked in `roadmap.md`. Phases 1–3 are implemented or partially implemented. The React, Supabase, and Stripe work has foundations in place, but production activation still requires configured services, migrations, and deployment access.

- Step 1: Review core files (`index.html`, `style.css`, `src/script.js`) — completed.
- Step 2: Create a clean `README.md` with setup and warnings — completed (this file).
- Step 3: Fix filenames with spaces and update internal links (e.g., `my-bookings.html`) — completed.
- Step 4: Reduce repeated header/footer HTML into a small include or a JS-inserted template — completed.
- Step 5: Improve mobile navigation — completed.
- Step 6: Accessibility pass — partially completed; continue auditing remaining admin and dynamic controls.

## LocalStorage and Safety (demo caveats)
- Cart and booking data are stored in `localStorage` only. Do not use this for production data or sensitive information.
- Bookings and orders in this project are demo-only and should be moved to a proper backend (with authentication and server-side validation) before any real use.

## How you can help / contribute
- Open an issue describing a bug or improvement.
- Preferred small PRs that change one feature at a time (follow the roadmap steps).

## What's changed in Phase 1 so far
- Added this beginner-friendly README with setup, features, and Phase 1 checklist.

## Test Checklist for this change (README)
- [ ] `README.md` opens in editor and clearly explains how to run the site locally.
- [ ] Contains a warning about `localStorage` usage and demo limitations.
- [ ] Lists the main files to inspect for Phase 1 work.

---
If you'd like, I'll proceed to Step 3 (rename files with spaces and update links). Say "yes" to continue or tell me which Step to run next.
