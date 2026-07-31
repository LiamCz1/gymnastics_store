// Check theme on initial load to prevent screen flash - default to dark
(function() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

// Collection Database
const collectionData = {
  gear: [
    {
      name: "Balance Beam Trainer",
      price: 79.99,
      desc: "Portable foam balance beam for home practice.",
      badge: "Best Seller",
      img: "images/balance_beam.png",
      actionUrl: "product.html"
    },
    {
      name: "Gymnastics Grips",
      price: 24.99,
      desc: "Comfortable leather grips for bar work.",
      badge: "New",
      img: "images/grips.png",
      actionUrl: "product.html"
    },
    {
      name: "Advanced Chalk Ball Set",
      price: 12.99,
      desc: "Non-slip chalk ball set for bars and vaulting.",
      badge: "Popular",
      img: "images/sample 1.jpg",
      actionUrl: "product.html"
    }
  ],
  apparel: [
    {
      name: "Custom Gymnastics Leotard",
      price: 39.99,
      desc: "Design your own leotard with personalized colors and custom texts.",
      badge: "Best Seller",
      img: "images/sample 2.jpg",
      actionUrl: "product.html"
    },
    {
      name: "APEX Training Hoodie",
      price: 45.99,
      desc: "Heavyweight athletic cotton hoodie for warmups.",
      badge: "New",
      img: "images/sample 1.jpg",
      actionUrl: "product.html"
    },
    {
      name: "Performance Dry-Fit Tee",
      price: 29.99,
      desc: "Breathable mesh dry-fit training tee.",
      badge: "Deal",
      img: "images/sample 2.jpg",
      actionUrl: "product.html"
    }
  ],
  packages: [
    {
      name: "Starter Gym Package",
      price: 99.99,
      desc: "Beam trainer, grips, and gym chalk essentials bundle.",
      badge: "Save 15%",
      img: "images/sample 1.jpg",
      actionUrl: "product.html"
    },
    {
      name: "Premium Training Setup",
      price: 249.99,
      desc: "Extended foam beam, advanced grips, slider blocks, and dry chalk bundle.",
      badge: "Most Popular",
      img: "images/balance_beam.png",
      actionUrl: "product.html"
    },
    {
      name: "Elite Coaching Bundle",
      price: 399.99,
      desc: "Complete safety gear kit plus credit for 4 USAG-certified private lessons.",
      badge: "Premium",
      img: "images/sample 2.jpg",
      actionUrl: "product.html"
    }
  ]
};

// Renders the collection items dynamically
function renderCollection(category) {
  const grid = document.getElementById('collection-items-grid');
  if (!grid) return;

  const items = collectionData[category] || [];
  grid.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'collection-card';
    card.innerHTML = `
      <span class="badge">${item.badge}</span>
      <div class="collection-card-image">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <div class="collection-card-info">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <p class="collection-card-price">$${item.price.toFixed(2)}</p>
        <button class="btn collection-card-btn" type="button" onclick="window.location.href='${item.actionUrl}'">View Details</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = localStorage.getItem('theme') || 'dark';

  // Home page customizable messages
  const promoEl = document.getElementById('home-promo-banner');
  const overlineEl = document.getElementById('home-hero-overline');
  const titleEl = document.getElementById('home-hero-title');
  const descEl = document.getElementById('home-hero-desc');

  if (promoEl) {
    const savedPromo = localStorage.getItem('homePromoMsg');
    const savedPromoCode = localStorage.getItem('homePromoCode');
    const savedPromoPercent = localStorage.getItem('homePromoPercent');
    if (savedPromo !== null) {
      let promoText = savedPromo;
      if (savedPromoPercent) {
        promoText = promoText.replace(/\b\d+%\b/g, `${savedPromoPercent}%`);
      }
      if (savedPromoCode) {
        const codeBadge = `<span class="promo-code-badge">${savedPromoCode}</span>`;
        if (!promoText.includes('Use code') && !promoText.includes('code')) {
          promoText = `${promoText}  Use code ${codeBadge}`;
        } else if (promoText.includes('Use code')) {
          promoText = promoText.replace(/Use code\s*/i, `Use code ${codeBadge}`);
        } else {
          promoText = `${promoText} ${codeBadge}`;
        }
      }
      promoEl.innerHTML = promoText;
    }
  }
  if (overlineEl) {
    const savedOverline = localStorage.getItem('homeOverlineMsg');
    if (savedOverline !== null) overlineEl.innerHTML = savedOverline;
  }
  if (titleEl) {
    const savedTitle = localStorage.getItem('homeTitleMsg');
    if (savedTitle !== null) titleEl.innerHTML = savedTitle;
  }
  if (descEl) {
    const savedDesc = localStorage.getItem('homeDescMsg');
    if (savedDesc !== null) descEl.innerHTML = savedDesc;
  }
  
  const tickerEl = document.getElementById('home-ticker-wrapper');
  if (tickerEl) {
    const savedTicker = localStorage.getItem('homeTickerMsg');
    if (savedTicker !== null) {
      const items = savedTicker.split('\n').map(item => item.trim()).filter(item => item.length > 0);
      if (items.length > 0) {
        const duplicated = [...items, ...items];
        tickerEl.innerHTML = duplicated.map(item => `<span class="ticker-item">${item}</span>`).join('');
      }
    }
  }
  
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

  // Category Tabs Switcher
  const tabs = document.querySelectorAll('.collection-tab-btn');
  if (tabs.length > 0) {
    // Initial render
    renderCollection('gear');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Toggle active class
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Render category items
        const cat = tab.dataset.category;
        renderCollection(cat);
      });
    });
  }

  // Contact Modal and Form Handler
  const contactModal = document.getElementById('contact-modal');
  const openContactModalBtn = document.getElementById('open-contact-modal-btn');
  const closeContactModalBtn = document.getElementById('close-contact-modal-btn');
  const contactForm = document.getElementById('contact-form');

  if (openContactModalBtn && contactModal) {
    openContactModalBtn.addEventListener('click', () => {
      contactModal.style.display = 'block';
    });
  }

  if (closeContactModalBtn && contactModal) {
    closeContactModalBtn.addEventListener('click', () => {
      contactModal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = 'none';
    }
  });

  if (contactForm) {
    const contactSubmitBtn = document.getElementById('contact-submit-btn');
    const successBanner = document.getElementById('contact-success-banner');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      const originalBtnText = contactSubmitBtn.textContent;
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.textContent = 'Sending message...';

      const formData = {
        formType: 'General Customer Message',
        name: name,
        email: email,
        message: message
      };

      fetch('https://formspree.io/f/mgojroae', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (response.ok) {
          successBanner.style.display = 'block';
          contactForm.reset();
          setTimeout(() => {
            successBanner.style.display = 'none';
            contactModal.style.display = 'none';
          }, 3000);
        } else {
          throw new Error('Formspree response not OK');
        }
      })
      .catch(error => {
        console.error('Failed to submit contact message:', error);
        alert('There was a problem sending your message. Please try again.');
      })
      .finally(() => {
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.textContent = originalBtnText;
      });
    });
  }

  updateAthletesCoachedStat();
});

function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem('gymCart') || '[]');
  } catch (e) {
    return [];
  }
}

function updateGlobalCartBadge() {
  const badge = document.getElementById('nav-cart-badge') || document.querySelector('.cart-badge');
  if (badge) {
    const cart = getCartItems();
    const count = cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
    localStorage.setItem('cartCount', String(count));
    badge.textContent = String(count);
    if (count > 0) {
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }
}

window.addEventListener('storage', () => {
  updateGlobalCartBadge();
});
window.addEventListener('focus', () => {
  updateGlobalCartBadge();
});

function updateAthletesCoachedStat() {
  const statEl = document.getElementById('stat-athletes-coached');
  if (!statEl) return;

  const baseCount = 25000;
  try {
    const slots = JSON.parse(localStorage.getItem('bookedLessonSlots') || '[]');
    const uniqueBookers = new Set();
    slots.forEach(slot => {
      if (slot.bookerName) {
        const name = slot.bookerName.trim().toLowerCase();
        if (name) {
          uniqueBookers.add(name);
        }
      }
    });
    const totalCount = baseCount + uniqueBookers.size;
    statEl.textContent = totalCount.toLocaleString();
  } catch (e) {
    statEl.textContent = baseCount.toLocaleString();
  }
}
