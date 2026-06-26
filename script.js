// Check theme on initial load to prevent screen flash
(function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Theme toggle button logic
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    updateThemeToggleIcon(themeToggleBtn, currentTheme);
    
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeToggleIcon(themeToggleBtn, newTheme);
    });
  }

  function updateThemeToggleIcon(btn, theme) {
    if (theme === 'dark') {
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <span class="theme-text">Light</span>
      `;
    } else {
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <span class="theme-text">Dark</span>
      `;
    }
  }

  // Update navbar cart badge count across all pages
  updateGlobalCartBadge();

  // Navigation active links highlighting
  const path = window.location.pathname;
  const page = path.split("/").pop();
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (page === href || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Wire up home/landing buttons if they exist
  const shopBtn = document.getElementById('shop-button');
  if (shopBtn) {
    shopBtn.addEventListener('click', () => { window.location.href = 'product.html'; });
  }
  const lessonsBtn = document.getElementById('shop-button1');
  if (lessonsBtn) {
    lessonsBtn.addEventListener('click', () => { window.location.href = 'lessons.html'; });
  }
});

function updateGlobalCartBadge() {
  const badge = document.getElementById('nav-cart-badge') || document.querySelector('.cart-badge');
  if (badge) {
    const count = parseInt(localStorage.getItem('cartCount') || '0', 10);
    badge.textContent = String(count);
    if (count > 0) {
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }
}
