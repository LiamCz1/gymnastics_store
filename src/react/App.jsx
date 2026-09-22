const stats = [
  ['98%', 'Satisfaction Rate'],
  ['30+ Yrs', 'In Business'],
  ['Rated #1', 'Gymnastics Retailer']
];

export default function App() {
  return (
    <>
      <a href="#main-content" className="react-skip-link">Skip to main content</a>
      <header className="app-header">
        <a href="index.html" className="nav-brand">APEX<span>GYM</span></a>
        <nav aria-label="Primary navigation">
          <ul className="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="product.html">Shop</a></li>
            <li><a href="lessons.html">Lessons</a></li>
            <li><a href="my-bookings.html">My Bookings</a></li>
          </ul>
        </nav>
        <a href="buy.html" className="cart-nav-btn">Cart</a>
      </header>

      <main id="main-content" className="react-home-shell">
        <section className="hero-grid-layout">
          <div className="hero-left-content">
            <span className="hero-overline">Premium Training Gear &amp; Expert Coaching</span>
            <h1 className="hero-title-main">Train Like<br />A Champion</h1>
            <p className="hero-description-text">
              Competition-grade equipment, performance apparel, and private coaching from USAG-certified coaches.
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

        <section className="info-grid" aria-label="Why choose APEX GYM">
          <article className="info-card"><h2>Expert Coaching</h2><p>Personalized guidance for beginners, competitive athletes, and every skill level in between.</p></article>
          <article className="info-card"><h2>Premium Equipment</h2><p>Competition-ready gear built for durability, performance, and confidence.</p></article>
          <article className="info-card"><h2>Fast, Friendly Service</h2><p>Get the products and support you need quickly, from checkout to lesson booking.</p></article>
        </section>
      </main>
    </>
  );
}
