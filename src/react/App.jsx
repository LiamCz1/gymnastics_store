import { useEffect, useState } from 'react';
import { loadProducts } from '../supabase-data.js';

const stats = [
  ['98%', 'Satisfaction Rate'],
  ['30+ Yrs', 'In Business'],
  ['Rated #1', 'Gymnastics Retailer']
];

const collections = {
  gear: [
    ['Balance Beam Trainer', 'Portable foam balance beam for home practice.', 'public/images/balance_beam.png'],
    ['Gymnastics Grips', 'Comfortable leather grips for bar work.', 'public/images/grips.png'],
    ['Advanced Chalk Ball Set', 'Non-slip chalk ball set for bars and vaulting.', 'public/images/sample-1.jpg']
  ],
  apparel: [
    ['Custom Gymnastics Leotard', 'Design your own leotard with personalized colors and custom texts.', 'public/images/sample-2.jpg'],
    ['APEX Training Hoodie', 'Heavyweight athletic cotton hoodie for warmups.', 'public/images/sample-1.jpg'],
    ['Performance Dry-Fit Tee', 'Breathable mesh dry-fit training tee.', 'public/images/sample-2.jpg']
  ],
  packages: [
    ['Starter Gym Package', 'Beam trainer, grips, and gym chalk essentials bundle.', 'public/images/sample-1.jpg'],
    ['Premium Training Setup', 'Extended foam beam, advanced grips, slider blocks, and dry chalk bundle.', 'public/images/balance_beam.png'],
    ['Elite Coaching Bundle', 'Complete safety gear kit plus credit for four private lessons.', 'public/images/sample-2.jpg']
  ]
};

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [collection, setCollection] = useState('equipment');
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.reduce((total, item) => total + Number(item.quantity || 1), 0));
    } catch {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await loadProducts();
        setProducts(data || []);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoadingProducts(false);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!contactOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setContactOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [contactOpen]);

  return (
    <>
      <a href="#main-content" className="react-skip-link">Skip to main content</a>
      <div className="promo-banner">Summer Sale - Up to 30% off Competition Gear - Use code FLIP30</div>
      <header className="app-header">
        <a href="index.html" className="nav-brand">APEX<span>GYM</span></a>
        <button className="mobile-nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="react-primary-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? 'X' : '☰'}
        </button>
        <nav aria-label="Primary navigation">
          <ul id="react-primary-navigation" className={`nav-links${menuOpen ? ' open' : ''}`}>
            <li><a href="index.html">Home</a></li>
            <li><a href="product.html">Shop</a></li>
            <li><a href="lessons.html">Lessons</a></li>
            <li><a href="my-bookings.html">My Bookings</a></li>
          </ul>
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle-btn" type="button" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <a href="buy.html" className="cart-nav-btn" aria-label={`View cart with ${cartCount} items`}>Cart <span className="cart-badge">{cartCount}</span></a>
        </div>
      </header>

      <main id="main-content" className="react-home-shell">
        <section className="hero-grid-layout">
          <div className="hero-left-content">
            <span className="hero-overline">Premium Training Gear &amp; Expert Coaching</span>
            <h1 className="hero-title-main">Train Like<br />A Champion</h1>
            <p className="hero-description-text">
              Competition-grade equipment, performance apparel, and private coaching from USAG-certified coaches - everything you need to reach elite level.
            </p>
            <div className="hero-cta-group">
              <a className="btn" href="product.html">Shop Now</a>
              <a className="btn btn-secondary" href="lessons.html">Book Coaching</a>
            </div>
          </div>
          <div className="hero-right-visual">
            <div className="hero-photo-wrapper">
              <img className="hero-photo" src="public/images/hero.jpg" alt="Coach and gymnast practicing gymnastics skills at APEX GYM" />
            </div>
          </div>
        </section>

        <section className="stats-grid-layout" aria-label="APEX GYM highlights">
          <div className="stat-card"><div className="stat-num">1000+</div><div className="stat-desc">Athletes Coached</div></div>
          {stats.map(([value, label]) => (
            <div className="stat-card" key={label}><div className="stat-num">{value}</div><div className="stat-desc">{label}</div></div>
          ))}
        </section>

        <div className="ticker-ribbon" aria-label="APEX GYM benefits">
          <div className="ticker-wrapper">
            {['USAG Certified Equipment', 'Olympic-Grade Materials', 'Expert Coaching - All Levels', '30-Day Returns', '12-Month Warranty', 'Free Shipping Over $250'].map((item) => <span className="ticker-item" key={item}>{item}</span>)}
          </div>
        </div>

        <section className="info-grid" aria-label="Why choose APEX GYM">
          <article className="info-card"><h2>Expert Coaching</h2><p>Personalized guidance for beginners, competitive athletes, and every skill level in between.</p></article>
          <article className="info-card"><h2>Premium Equipment</h2><p>Competition-ready gear built for durability, performance, and confidence.</p></article>
          <article className="info-card"><h2>Fast, Friendly Service</h2><p>Get the products and support you need quickly, from checkout to lesson booking.</p></article>
        </section>

        <section className="collection-section" aria-labelledby="collection-title">
          <div className="collection-header-row">
            <div className="collection-titles"><p className="hero-overline">THE COLLECTION</p><h2 id="collection-title">Shop by Category</h2></div>
            <div className="collection-tabs" role="tablist" aria-label="Product categories">
              {['equipment', 'apparel', 'packages'].map((category) => <button className={`collection-tab-btn${collection === category ? ' active' : ''}`} type="button" role="tab" aria-selected={collection === category} key={category} onClick={() => setCollection(category)}>{category[0].toUpperCase() + category.slice(1)}</button>)}
            </div>
          </div>
          <div className="collection-grid">
            {loadingProducts ? (
              <p>Loading products...</p>
            ) : products.filter(p => p.category === collection).length > 0 ? (
              products.filter(p => p.category === collection).map((p) => (
                <article className="collection-card" key={p.id}>
                  <div className="collection-card-image"><img src={p.image} alt={p.name} loading="lazy" /></div>
                  <div className="collection-card-info"><h3>{p.name}</h3><p>{p.description}</p><a className="btn collection-card-btn" href={`product-details.html?id=${p.id}`}>View Details</a></div>
                </article>
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </section>

        <section className="contact-cta-section" aria-labelledby="contact-title">
          <span className="hero-overline contact-section-label">Have Questions?</span>
          <h2 id="contact-title">Get in Touch</h2>
          <p>Questions about premium gear or private coaching? Send us a message.</p>
          <button className="btn contact-modal-btn" type="button" onClick={() => setContactOpen(true)}>Contact Support Form</button>
        </section>
      </main>

      {contactOpen && <div className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" style={{ display: 'block' }} onClick={(event) => event.target === event.currentTarget && setContactOpen(false)}>
        <div className="modal-content">
          <button className="close" type="button" aria-label="Close contact form" onClick={() => setContactOpen(false)}>&times;</button>
          <h2 id="contact-modal-title">Contact Us</h2>
          <p>Have questions about our gear or private coaching lessons? Send us a message.</p>
          <form onSubmit={(event) => { event.preventDefault(); setContactOpen(false); }}>
            <div className="form-group"><label htmlFor="react-contact-name">Full Name</label><input id="react-contact-name" type="text" required autoComplete="name" /></div>
            <div className="form-group"><label htmlFor="react-contact-email">Email Address</label><input id="react-contact-email" type="email" required autoComplete="email" /></div>
            <div className="form-group"><label htmlFor="react-contact-message">Message</label><textarea id="react-contact-message" required /></div>
            <button className="submit-btn" type="submit">Send Message</button>
          </form>
        </div>
      </div>}
    </>
  );
}
