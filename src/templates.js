// Simple header/footer templates for static pages
(function () {
  const headerHTML = `
  <header class="app-header">
    <a href="index.html" class="nav-brand">
      APEX<span>GYM</span>
    </a>
    <button id="mobile-nav-toggle" class="mobile-nav-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <ul id="primary-navigation" class="nav-links" aria-hidden="true">
      <li><a href="index.html">Home</a></li>
      <li><a href="product.html">Shop</a></li>
      <li><a href="lessons.html">Lessons</a></li>
      <li><a href="my-bookings.html">My Bookings</a></li>
    </ul>
    <div class="nav-actions">
      <button id="theme-toggle" class="theme-toggle-btn" type="button" aria-label="Toggle Theme"></button>
      <a href="buy.html" class="cart-nav-btn" aria-label="View Cart">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        Cart <span class="cart-badge" id="nav-cart-badge">0</span>
      </a>
      <button class="btn" type="button" onclick="window.location.href='lessons.html'"
        style="padding: 0.45rem 1rem; font-size: 0.85rem; border-radius: var(--radius-md);">Get Started</button>

      <a href="login.html" id="nav-login-link" class="auth-link" style="margin-left:0.75rem;">Login</a>
      <a href="signup.html" id="nav-signup-link" class="auth-link" style="margin-left:0.5rem;">Sign Up</a>

      <div id="nav-user" style="display:none; align-items:center; gap:0.5rem; margin-left:0.5rem;">
        <img id="nav-avatar" src="" alt="User avatar" style="width:36px;height:36px;border-radius:999px;object-fit:cover;border:1px solid var(--border-color);display:none;">
        <span id="nav-username" style="font-weight:700;"></span>
        <a href="#" id="nav-logout-link" style="color:var(--primary);">Logout</a>
      </div>
    </div>
  </header>`;

  const ownerHeaderHTML = `
  <header class="app-header">
    <a href="index.html" class="nav-brand">
      APEX<span>GYM</span> <span style="font-size: 0.95rem; font-weight: 500; color: var(--text-muted); margin-left: 0.5rem; background: var(--primary-light); padding: 0.2rem 0.6rem; border-radius: 4px; vertical-align: middle; border: 1px solid rgba(225, 29, 72, 0.15);">Owner Portal</span>
    </a>
    <button id="mobile-nav-toggle" class="mobile-nav-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
    <ul id="primary-navigation" class="nav-links" aria-hidden="true">
      <li><a href="admin-bookings.html">Bookings Calendar</a></li>
      <li><a href="admin-orders.html">Customer Orders</a></li>
      <li><a href="admin-settings.html">Custom Messages</a></li>
      <li><a href="admin-analytics.html">Analytics &amp; Performance</a></li>
      <li><a href="admin-subscribers.html">Subscribers</a></li>
      <li><a href="product.html" style="color: var(--accent);">Front Store</a></li>
    </ul>
    <div class="nav-actions">
      <button id="theme-toggle" class="theme-toggle-btn" type="button" aria-label="Toggle Theme"></button>
    </div>
  </header>`;

  const footerHTML = `
  <footer class="site-footer">
    <div class="footer-columns">
      <div>
        <h3>APEX GYM</h3>
        <p>Premium gymnastics gear, apparel, and private coaching for athletes who want to train with confidence.</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="product.html">Shop gymnastics equipment and apparel</a></li>
          <li><a href="lessons.html">Book private gymnastics lessons</a></li>
          <li><a href="my-bookings.html">View your lesson bookings</a></li>
        </ul>
      </div>
      <div>
        <h3>Contact</h3>
        <p>Email: info@apexgym.com</p>
        <p>Phone: (555) 123-4567</p>
      </div>
    </div>
    <p class="footer-copy">&copy; 2026 APEX GYM. All rights reserved.</p>
  </footer>`;

  window.renderHeader = function () {
    const root = document.getElementById('header-root');
    if (root) root.innerHTML = headerHTML;
    if (root) setupMobileNav(root);
  };

  window.renderOwnerHeader = function () {
    const root = document.getElementById('header-root');
    if (root) root.innerHTML = ownerHeaderHTML;
    if (root) setupMobileNav(root);
  };

  window.renderFooter = function () {
    const root = document.getElementById('footer-root');
    if (root) root.innerHTML = footerHTML;
  };

  // Auto-run if placeholders exist early, but only render when the placeholder is empty.
  // This prevents pages that call `renderOwnerHeader()` before DOMContentLoaded from being overwritten.
  document.addEventListener('DOMContentLoaded', () => {
    const headerRoot = document.getElementById('header-root');
    if (headerRoot && headerRoot.innerHTML.trim() === '') {
      renderHeader();
    }
    const footerRoot = document.getElementById('footer-root');
    if (footerRoot && footerRoot.innerHTML.trim() === '') {
      renderFooter();
    }
  });
  
  // Mobile navigation accessibility helpers
  function setupMobileNav(root) {
    const toggle = root.querySelector('#mobile-nav-toggle');
    const nav = root.querySelector('.nav-links');
    if (!toggle || !nav) return;

    const navId = nav.id || 'primary-navigation';
    nav.id = navId;
    toggle.setAttribute('aria-controls', navId);

    function isOpen() { return nav.classList.contains('open'); }

    function openNav() {
      nav.classList.add('open');
      nav.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      // move focus into the nav
      const first = nav.querySelector('a, button');
      if (first) first.focus();
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('click', onDocClick);
    }

    function closeNav() {
      nav.classList.remove('open');
      nav.setAttribute('aria-hidden', 'true');
      toggle.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onDocClick);
      toggle.focus();
    }

    function toggleNav() { if (isOpen()) closeNav(); else openNav(); }

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        closeNav();
        return;
      }
      if (e.key === 'Tab') {
        // trap focus inside the nav
        const focusable = Array.from(nav.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    function onDocClick(e) {
      if (!nav.contains(e.target) && e.target !== toggle) {
        closeNav();
      }
    }

    toggle.addEventListener('click', (e) => { e.stopPropagation(); toggleNav(); });
    toggle.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleNav(); } });
  }
})();
