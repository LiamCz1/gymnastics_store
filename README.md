# APEX GYM — Project README

## Overview
This repository is a static site demo for a gymnastics store and coaching service (APEX GYM). It includes pages for Home, Shop, Lessons, Bookings, Authentication demos, and lightweight owner tools. The site is intentionally simple so you can learn HTML/CSS/JS and later migrate to frameworks and a real backend.

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

## Project Structure (important files)
- `index.html` — Home / landing page
- `product.html`, `product-details.html` — Shop and product views
- `style.css` — Main site styles
- `src/script.js` — Client-side site logic (products, UI behavior)
- `src/auth.js` — Authentication demo wiring (Google, owner UI)
- `server/` — small server-side utilities and owner scripts (if present)
- `public/images/` — media assets

## Current Features (what works now)
- Static product catalogue rendered by `src/script.js` (client-side)
- Shopping cart demo that uses `localStorage` for persistence
- Booking demo pages that save bookings to `localStorage`
- Theme toggle (light/dark) persisted in `localStorage`
- Contact form wired to a Formspree endpoint
- Basic accessibility considerations (skip link, alt text on main hero image)

## Phase 1 Plan (what I'll do next)
This repository follows the student-friendly roadmap. Phase 1 focuses on understanding and small incremental improvements.

- Step 1: Review core files (`index.html`, `style.css`, `src/script.js`) — completed.
- Step 2: Create a clean `README.md` with setup and warnings — completed (this file).
- Step 3: Fix filenames with spaces and update internal links (e.g., `my-bookings.html`) — next.
- Step 4: Reduce repeated header/footer HTML into a small include or a JS-inserted template (simple reusable approach) — planned.
- Step 5: Improve mobile navigation (accessible menu with keyboard support) — planned.
- Step 6: Accessibility pass — audit pages and fix missing alt text, label issues, and focus order — planned.

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
