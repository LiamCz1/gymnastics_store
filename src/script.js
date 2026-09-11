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
      img: "public/images/balance_beam.png",
      actionUrl: "product.html"
    },
    {
      name: "Gymnastics Grips",
      price: 24.99,
      desc: "Comfortable leather grips for bar work.",
      badge: "New",
      img: "public/images/grips.png",
      actionUrl: "product.html"
    },
    {
      name: "Advanced Chalk Ball Set",
      price: 12.99,
      desc: "Non-slip chalk ball set for bars and vaulting.",
      badge: "Popular",
      img: "public/images/sample-1.jpg",
      actionUrl: "product.html"
    }
  ],
  apparel: [
    {
      name: "Custom Gymnastics Leotard",
      price: 39.99,
      desc: "Design your own leotard with personalized colors and custom texts.",
      badge: "Best Seller",
      img: "public/images/sample-2.jpg",
      actionUrl: "product.html"
    },
    {
      name: "APEX Training Hoodie",
      price: 45.99,
      desc: "Heavyweight athletic cotton hoodie for warmups.",
      badge: "New",
      img: "public/images/sample-1.jpg",
      actionUrl: "product.html"
    },
    {
      name: "Performance Dry-Fit Tee",
      price: 29.99,
      desc: "Breathable mesh dry-fit training tee.",
      badge: "Deal",
      img: "public/images/sample-2.jpg",
      actionUrl: "product.html"
    }
  ],
  packages: [
    {
      name: "Starter Gym Package",
      price: 99.99,
      desc: "Beam trainer, grips, and gym chalk essentials bundle.",
      badge: "Save 15%",
      img: "public/images/sample-1.jpg",
      actionUrl: "product.html"
    },
    {
      name: "Premium Training Setup",
      price: 249.99,
      desc: "Extended foam beam, advanced grips, slider blocks, and dry chalk bundle.",
      badge: "Most Popular",
      img: "public/images/balance_beam.png",
      actionUrl: "product.html"
    },
    {
      name: "Elite Coaching Bundle",
      price: 399.99,
      desc: "Complete safety gear kit plus credit for 4 USAG-certified private lessons.",
      badge: "Premium",
      img: "public/images/sample-2.jpg",
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
    if (localStorage.getItem('hideHomePromoBanner') === 'true') {
      promoEl.style.display = 'none';
    }
    const savedPromo = localStorage.getItem('homePromoMsg');
    const savedPromoCode = localStorage.getItem('homePromoCode');
    const savedPromoPercent = localStorage.getItem('homePromoPercent');
    const hasPromoMessage = savedPromo !== null && savedPromo.trim() !== '';
    const hasPromoOffer = savedPromoCode && Number(savedPromoPercent) > 0;
    if (hasPromoMessage || hasPromoOffer) {
      const promoText = hasPromoMessage
        ? savedPromo.replace(/\b\d+%\b/g, `${savedPromoPercent}%`)
        : `Save ${savedPromoPercent}% when you use promo code`;
      promoEl.textContent = promoText;
      if (savedPromoCode) {
        const codeBadge = document.createElement('span');
        codeBadge.className = 'promo-code-badge';
        codeBadge.textContent = savedPromoCode;
        promoEl.append(document.createTextNode(hasPromoMessage ? '  Use code ' : ' '), codeBadge);
      }
    }
  }
  if (overlineEl) {
    const savedOverline = localStorage.getItem('homeOverlineMsg');
    if (savedOverline !== null && savedOverline.trim() !== '') overlineEl.innerHTML = savedOverline;
  }
  if (titleEl) {
    const savedTitle = localStorage.getItem('homeTitleMsg');
    if (savedTitle !== null && savedTitle.trim() !== '') titleEl.innerHTML = savedTitle;
  }
  if (descEl) {
    const savedDesc = localStorage.getItem('homeDescMsg');
    if (savedDesc !== null && savedDesc.trim() !== '') descEl.innerHTML = savedDesc;
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

  // Accessible modal helper: open/close, focus trap, aria management
  function openModal(modal, opener) {
    if (!modal) return;
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    modal.removeAttribute('tabindex');
    document.body.style.overflow = 'hidden';

    const focusable = Array.from(modal.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // remember opener to restore focus on close
    modal._opener = opener || document.activeElement;

    // keydown handler for trap and Escape
    modal._keydown = function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal(modal);
        return;
      }
      if (e.key === 'Tab') {
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', modal._keydown);

    // click outside to close
    modal._click = function (e) {
      if (e.target === modal) closeModal(modal);
    };
    modal.addEventListener('click', modal._click);

    // focus first element
    if (first) first.focus();
    else modal.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modal._keydown) document.removeEventListener('keydown', modal._keydown);
    if (modal._click) modal.removeEventListener('click', modal._click);
    try {
      if (modal._opener && typeof modal._opener.focus === 'function') modal._opener.focus();
    } catch (e) {
      // noop
    }
  }

  if (openContactModalBtn && contactModal) {
    openContactModalBtn.addEventListener('click', (e) => {
      openModal(contactModal, openContactModalBtn);
    });
  }

  if (closeContactModalBtn && contactModal) {
    closeContactModalBtn.addEventListener('click', () => {
      closeModal(contactModal);
    });
  }

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
            try { closeModal(contactModal); } catch (e) { contactModal.style.display = 'none'; }
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

  const heroPhoto = document.querySelector('.hero-photo');
  if (heroPhoto) {
    const makeGymnastFlip = () => {
      const photoRect = heroPhoto.getBoundingClientRect();
      const flipPhoto = heroPhoto.cloneNode();
      flipPhoto.className = 'gymnast-flip';
      flipPhoto.removeAttribute('role');
      flipPhoto.removeAttribute('tabindex');
      flipPhoto.setAttribute('aria-hidden', 'true');
      const flipWidth = Math.min(window.innerWidth * 0.38, 280);
      const flipHeight = photoRect.height * (flipWidth / photoRect.width);
      const startX = window.innerWidth - flipWidth;
      const startY = window.innerHeight - flipHeight;
      const endX = 0;
      const endY = window.innerHeight - flipHeight * 0.65;
      const controlX = (startX + endX) / 2;
      const arcY = Math.max(20, window.innerHeight * 0.08);
      const controlY = 2 * arcY - (startY + endY) / 2;
      flipPhoto.style.width = `${flipWidth}px`;
      flipPhoto.style.setProperty('--flight-path', `path("M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}")`);
      document.body.appendChild(flipPhoto);
      flipPhoto.addEventListener('animationend', () => flipPhoto.remove(), { once: true });
    };

    heroPhoto.addEventListener('click', makeGymnastFlip);
    heroPhoto.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        makeGymnastFlip();
      }
    });
  }

  let thanosCode = '';
  let thanosCodeTimeout;
  document.addEventListener('keydown', (event) => {
    if (event.key.length !== 1) return;
    thanosCode = `${thanosCode}${event.key.toLowerCase()}`.slice(-6);
    clearTimeout(thanosCodeTimeout);
    thanosCodeTimeout = setTimeout(() => { thanosCode = ''; }, 1500);

    if (thanosCode !== 'thanos') return;
    thanosCode = '';

    const textElements = document.querySelectorAll('h1, h2, h3, h4, p, .nav-links a, .stat-desc, .ticker-item');
    const originalMarkup = [];
    const ashTargets = [];
    textElements.forEach(element => {
      originalMarkup.push({ element, html: element.innerHTML });
      const words = element.textContent.split(/(\s+)/);
      element.replaceChildren();
      words.forEach(word => {
        if (!word.trim()) {
          element.appendChild(document.createTextNode(word));
          return;
        }
        const ashWord = document.createElement('span');
        ashWord.className = 'thanos-ash-word';
        ashWord.textContent = word;
        ashWord.style.setProperty('--ash-x', `${Math.round((Math.random() - 0.5) * 80)}px`);
        ashWord.style.setProperty('--ash-y', `${Math.round((Math.random() - 0.5) * 70)}px`);
        ashWord.style.setProperty('--ash-rotate', `${Math.round((Math.random() - 0.5) * 50)}deg`);
        element.appendChild(ashWord);
        ashTargets.push(ashWord);
      });
    });
    for (let index = ashTargets.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [ashTargets[index], ashTargets[randomIndex]] = [ashTargets[randomIndex], ashTargets[index]];
    }
    const snapFlash = document.createElement('div');
    snapFlash.className = 'thanos-snap-flash';
    snapFlash.setAttribute('aria-hidden', 'true');
    document.body.appendChild(snapFlash);
    const gauntlet = document.createElement('div');
    gauntlet.className = 'thanos-gauntlet';
    gauntlet.setAttribute('aria-hidden', 'true');
    gauntlet.innerHTML = '<span class="thanos-finger finger-pinky"></span><span class="thanos-finger finger-ring"></span><span class="thanos-finger finger-middle"></span><span class="thanos-finger finger-index"></span><span class="thanos-gem gem-red"></span><span class="thanos-gem gem-orange"></span><span class="thanos-gem gem-yellow"></span><span class="thanos-gem gem-green"></span><span class="thanos-gem gem-blue"></span><span class="thanos-gem gem-purple"></span>';
    document.body.appendChild(gauntlet);
    const releaseAsh = target => {
      const targetRect = target.getBoundingClientRect();
      const targetColor = getComputedStyle(target).color;
      for (let particleIndex = 0; particleIndex < 7; particleIndex += 1) {
        const particle = document.createElement('span');
        particle.className = 'thanos-ash-particle';
        particle.style.left = `${targetRect.left + Math.random() * targetRect.width}px`;
        particle.style.top = `${targetRect.top + Math.random() * targetRect.height}px`;
        particle.style.backgroundColor = targetColor;
        particle.style.setProperty('--particle-x', `${Math.round((Math.random() - 0.5) * 100)}px`);
        particle.style.setProperty('--particle-y', `${Math.round((Math.random() - 0.5) * 90)}px`);
        document.body.appendChild(particle);
        particle.addEventListener('animationend', () => particle.remove(), { once: true });
      }
      target.classList.add('thanos-dusted');
    };
    setTimeout(() => {
      gauntlet.remove();
      ashTargets.forEach((target, index) => {
        setTimeout(() => releaseAsh(target), index * 35);
      });
      setTimeout(() => {
        originalMarkup.forEach(({ element, html }) => { element.innerHTML = html; });
        snapFlash.remove();
      }, 20000);
    }, 1250);
  });

  // Mobile nav toggle handler
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navLinksEl = document.querySelector('.nav-links');
  if (mobileToggle && navLinksEl) {
    // let CSS control visibility; ensure aria
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinksEl.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // close when a link is clicked
    navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }));
    // close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinksEl.contains(e.target) && e.target !== mobileToggle) {
        navLinksEl.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
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

// Owner orders management (admin-orders.html)
function getOrders() {
  try {
    return JSON.parse(localStorage.getItem('gymOrders') || '[]');
  } catch (e) {
    return [];
  }
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>\"]/g, function (m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]); });
}

function setOrders(orders) {
  localStorage.setItem('gymOrders', JSON.stringify(orders));
}

function displayOwnerOrders() {
  const orders = getOrders();
  const container = document.getElementById('owner-orders-container');
  const accessForm = document.getElementById('owner-access-form');
  const listEl = document.getElementById('orders-list');
  if (!container || !listEl) return;
  accessForm.style.display = 'none';
  listEl.innerHTML = '';
  if (!orders || orders.length === 0) {
    listEl.innerHTML = '<p class="no-bookings">No orders found.</p>';
    container.style.display = 'block';
    return;
  }

  orders.slice().reverse().forEach((order, idx) => {
    const item = document.createElement('div');
    item.className = 'owner-order-item';
    const when = order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Unknown date';
    const itemsHtml = (order.items || []).map(it => `<li>${(it.name||'Item')} x ${it.quantity || 1} — $${(Number(it.price)||0).toFixed(2)}</li>`).join('');
    item.innerHTML = `
      <div class="owner-order-info">
        <strong>Order #${(order.id || (orders.length - idx))}</strong>
        <p>${when} &middot; ${escapeHtml(order.customerName || order.name || 'Guest')}</p>
        <p>Email: ${escapeHtml(order.customerEmail || order.email || 'N/A')}</p>
        <ul>${itemsHtml}</ul>
        <p><strong>Total:</strong> $${(Number(order.total)||0).toFixed(2)}</p>
      </div>
    `;
    listEl.appendChild(item);
  });

  container.style.display = 'block';
}

// wire owner orders UI on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const ownerCode = 'LiaMycIaa123';
  const ownerCodeInput = document.getElementById('owner-code');
  const loadBtn = document.getElementById('load-owner-orders-btn');
  const resetBtn = document.getElementById('reset-orders-btn');

  // auto-authorize from URL param
  try {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get('code');
    if (codeParam === ownerCode) {
      sessionStorage.setItem('ownerAuthorized', 'true');
    }
  } catch (e) {
    // ignore
  }

  if (sessionStorage.getItem('ownerAuthorized') === 'true') {
    // only display if this page has orders container
    if (document.getElementById('owner-orders-container')) displayOwnerOrders();
  }

  if (loadBtn && ownerCodeInput) {
    loadBtn.addEventListener('click', () => {
      const entered = ownerCodeInput.value.trim();
      if (entered !== ownerCode) return alert('Invalid owner code.');
      sessionStorage.setItem('ownerAuthorized', 'true');
      displayOwnerOrders();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (!confirm('Delete all orders from this browser? This cannot be undone.')) return;
      setOrders([]);
      displayOwnerOrders();
    });
  }
});

// Owner settings & analytics (admin-settings.html, admin-analytics.html)
function displayOwnerSettings() {
  const container = document.getElementById('owner-settings-container');
  if (!container) return;
  container.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'owner-settings-form';
  form.innerHTML = `
    <label>Homepage Overline (small):<br><input id="owner-home-overline" type="text" placeholder="e.g. New Season"/></label>
    <label>Homepage Title:<br><input id="owner-home-title" type="text" placeholder="Welcome to APEX"/></label>
    <label>Homepage Description:<br><textarea id="owner-home-desc" rows="3" placeholder="Short description"></textarea></label>
    <fieldset class="owner-promo-settings">
      <legend>Discount Code</legend>
      <p class="owner-settings-help">Create the discount shown on the homepage and accepted during checkout.</p>
      <label for="owner-home-promo">Offer Message</label>
      <input id="owner-home-promo" type="text" placeholder="Free shipping for orders $50+"/>
      <div class="owner-promo-fields">
        <label for="owner-home-promo-code">Code<input id="owner-home-promo-code" type="text" placeholder="APEX10"/></label>
        <label for="owner-home-promo-percent">Discount Percent<input id="owner-home-promo-percent" type="number" min="0" max="100" placeholder="10"/></label>
      </div>
    </fieldset>
    <div class="owner-settings-actions"><button id="owner-save-settings" type="button" class="btn">Save Settings</button><button id="owner-reset-settings" type="button" class="btn btn-ghost">Reset</button><button id="owner-hide-banner" type="button" class="btn btn-ghost">Hide Homepage Banner</button></div>
  `;
  container.appendChild(form);

  // populate current values
  const overline = document.getElementById('owner-home-overline');
  const title = document.getElementById('owner-home-title');
  const desc = document.getElementById('owner-home-desc');
  const promo = document.getElementById('owner-home-promo');
  const promoCode = document.getElementById('owner-home-promo-code');
  const promoPercent = document.getElementById('owner-home-promo-percent');
  const hideBannerButton = document.getElementById('owner-hide-banner');

  overline.value = localStorage.getItem('homeOverlineMsg') || '';
  title.value = localStorage.getItem('homeTitleMsg') || '';
  desc.value = localStorage.getItem('homeDescMsg') || '';
  promo.value = localStorage.getItem('homePromoMsg') || '';
  promoCode.value = localStorage.getItem('homePromoCode') || '';
  promoPercent.value = localStorage.getItem('homePromoPercent') || '';
  hideBannerButton.textContent = localStorage.getItem('hideHomePromoBanner') === 'true' ? 'Show Homepage Banner' : 'Hide Homepage Banner';

  hideBannerButton.addEventListener('click', () => {
    const shouldHide = localStorage.getItem('hideHomePromoBanner') !== 'true';
    localStorage.setItem('hideHomePromoBanner', String(shouldHide));
    hideBannerButton.textContent = shouldHide ? 'Show Homepage Banner' : 'Hide Homepage Banner';
    alert(shouldHide ? 'Homepage banner hidden.' : 'Homepage banner enabled.');
  });

  document.getElementById('owner-save-settings').addEventListener('click', () => {
    const promoPercentValue = Math.min(100, Math.max(0, parseInt(promoPercent.value, 10) || 0));
    const promoCodeValue = promoCode.value.trim().toUpperCase();
    const textSettings = [
      ['homeOverlineMsg', overline.value],
      ['homeTitleMsg', title.value],
      ['homeDescMsg', desc.value],
      ['homePromoMsg', promo.value]
    ];
    textSettings.forEach(([key, value]) => {
      const trimmedValue = value.trim();
      if (trimmedValue) localStorage.setItem(key, trimmedValue);
      else localStorage.removeItem(key);
    });
    localStorage.setItem('homePromoCode', promoCodeValue);
    localStorage.setItem('homePromoPercent', String(promoPercentValue));
    promoCode.value = promoCodeValue;
    promoPercent.value = promoPercentValue ? String(promoPercentValue) : '';
    alert('Settings saved locally. Refresh the home page to see changes.');
  });

  document.getElementById('owner-reset-settings').addEventListener('click', () => {
    if (!confirm('Reset all site messages to defaults?')) return;
    localStorage.removeItem('homeOverlineMsg');
    localStorage.removeItem('homeTitleMsg');
    localStorage.removeItem('homeDescMsg');
    localStorage.removeItem('homePromoMsg');
    localStorage.removeItem('homePromoCode');
    localStorage.removeItem('homePromoPercent');
    localStorage.removeItem('hideHomePromoBanner');
    overline.value = title.value = desc.value = promo.value = promoCode.value = promoPercent.value = '';
    hideBannerButton.textContent = 'Hide Homepage Banner';
    alert('Settings reset. Refresh the home page to see default content.');
  });
}

function displayOwnerAnalytics() {
  const container = document.getElementById('owner-stats-container');
  if (!container) return;
  container.innerHTML = '';

  const orders = getOrders();
  const bookings = (function(){ try { return JSON.parse(localStorage.getItem('bookedLessonSlots')||'[]'); } catch(e){ return []; } })();

  // try subscribers count from local file if available
  let subscribersCount = 0;
  try {
    const subs = JSON.parse(localStorage.getItem('localSubscribers') || 'null');
    if (Array.isArray(subs)) subscribersCount = subs.length;
  } catch (e) {}

  const totalRevenue = orders.reduce((sum,o) => sum + (Number(o.total) || 0), 0);
  const uniqueBookers = new Set((bookings || []).map(b => (b.bookerName || '').trim().toLowerCase()).filter(Boolean));

  container.innerHTML = `
    <div class="stats-grid">
      <div class="stat"><h3>Orders</h3><p>${orders.length}</p></div>
      <div class="stat"><h3>Revenue</h3><p>$${totalRevenue.toFixed(2)}</p></div>
      <div class="stat"><h3>Bookings</h3><p>${(bookings||[]).length}</p></div>
      <div class="stat"><h3>Unique Bookers</h3><p>${uniqueBookers.size}</p></div>
      <div class="stat"><h3>Subscribers (local)</h3><p>${subscribersCount}</p></div>
    </div>
  `;
}

// Wire settings and analytics owner buttons
document.addEventListener('DOMContentLoaded', () => {
  const ownerCode = 'LiaMycIaa123';
  const settingsBtn = document.getElementById('load-owner-settings-btn');
  const settingsContainer = document.getElementById('owner-settings-container');
  const statsBtn = document.getElementById('load-owner-stats-btn');
  const statsContainer = document.getElementById('owner-stats-container');

  if (sessionStorage.getItem('ownerAuthorized') === 'true') {
    if (settingsContainer) {
      settingsContainer.style.display = 'block';
      displayOwnerSettings();
    }
    if (statsContainer) {
      statsContainer.style.display = 'block';
      displayOwnerAnalytics();
    }
  }

  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      const entered = document.getElementById('owner-code').value.trim();
      if (entered !== ownerCode) return alert('Invalid owner code.');
      sessionStorage.setItem('ownerAuthorized', 'true');
      if (settingsContainer) { settingsContainer.style.display = 'block'; displayOwnerSettings(); }
    });
  }

  if (statsBtn) {
    statsBtn.addEventListener('click', () => {
      const entered = document.getElementById('owner-code').value.trim();
      if (entered !== ownerCode) return alert('Invalid owner code.');
      sessionStorage.setItem('ownerAuthorized', 'true');
      if (statsContainer) { statsContainer.style.display = 'block'; displayOwnerAnalytics(); }
    });
  }
});
