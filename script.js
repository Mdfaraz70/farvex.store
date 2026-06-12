/* ============================================
   FARVEX STORE — MAIN JAVASCRIPT
   ============================================ */

'use strict';

// ── STATE ──────────────────────────────────
const FarvexState = {
  cart: JSON.parse(localStorage.getItem('farvex_cart') || '[]'),
  wishlist: JSON.parse(localStorage.getItem('farvex_wishlist') || '[]'),
  currentPage: 'home',
  user: JSON.parse(localStorage.getItem('farvex_user') || 'null'),
};

// ── PRODUCTS DATA ──────────────────────────
const PRODUCTS = [
  { id: 1, name: 'AuraSync Pro Wireless Earbuds', category: 'Audio', price: 2999, originalPrice: 4999, emoji: '🎧', badge: 'new', rating: 4.8, reviews: 324, description: 'Premium wireless earbuds with active noise cancellation, 30-hour battery life, and crystal-clear audio powered by our proprietary AuraSound™ chip.', tags: ['wireless', 'audio', 'noise-cancellation'], colors: ['#1A1A1A','#E5E5E5','#7C3AED'], sizes: null },
  { id: 2, name: 'NovaSphere Smart Watch Ultra', category: 'Wearables', price: 8499, originalPrice: 11999, emoji: '⌚', badge: 'hot', rating: 4.9, reviews: 512, description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery. Sapphire glass display meets aerospace-grade aluminum.', tags: ['smartwatch', 'health', 'fitness'], colors: ['#0A0A0F','#C0C0C0','#1E3A5F'], sizes: ['38mm','42mm','46mm'] },
  { id: 3, name: 'LunaLens 4K Action Camera', category: 'Photography', price: 5999, originalPrice: 7499, emoji: '📷', badge: 'sale', rating: 4.7, reviews: 189, description: 'Capture life in stunning 4K at 120fps. Waterproof to 50m, shake-proof stabilization, and 12-hour battery.', tags: ['camera', '4k', 'action'], colors: ['#1A1A1A','#2D4A3E'], sizes: null },
  { id: 4, name: 'ZenPad X12 Tablet Pro', category: 'Tablets', price: 19999, originalPrice: 24999, emoji: '📱', badge: 'new', rating: 4.6, reviews: 267, description: 'The thinnest 12-inch tablet ever. OLED display with 120Hz refresh, M3 chip equivalent processing, and 15-hour battery life.', tags: ['tablet', 'productivity', 'oled'], colors: ['#1A1A1A','#E5E5E5','#B8860B'], sizes: null },
  { id: 5, name: 'StellarKeys Mechanical Keyboard', category: 'Peripherals', price: 3499, originalPrice: 4499, emoji: '⌨️', badge: null, rating: 4.5, reviews: 445, description: 'Tactile precision meets elegant design. Premium switches, per-key RGB, and aircraft aluminum chassis.', tags: ['keyboard', 'mechanical', 'rgb'], colors: ['#1A1A1A','#2A2A2A'], sizes: ['TKL','Full Size'] },
  { id: 6, name: 'OmniCharge 65W GaN Charger', category: 'Accessories', price: 1299, originalPrice: 1799, emoji: '🔌', badge: null, rating: 4.8, reviews: 831, description: '65W GaN technology in a palm-sized form factor. Charge 3 devices simultaneously with smart power distribution.', tags: ['charger', 'gan', 'fast-charge'], colors: ['#1A1A1A','#E5E5E5'], sizes: null },
  { id: 7, name: 'PixelPro 8K Monitor 32"', category: 'Monitors', price: 34999, originalPrice: 44999, emoji: '🖥️', badge: 'hot', rating: 4.9, reviews: 156, description: 'The professional\'s canvas. 8K resolution, HDR1000, 1ms response time, and color accuracy that matches studio-grade equipment.', tags: ['monitor', '8k', 'hdr'], colors: ['#1A1A1A'], sizes: ['27"','32"','38"'] },
  { id: 8, name: 'CloudSync USB-C Hub 12-in-1', category: 'Accessories', price: 2199, originalPrice: 2999, emoji: '🔗', badge: 'sale', rating: 4.6, reviews: 623, description: 'Your all-in-one connectivity solution. Thunderbolt 4, 8K display out, 100W pass-through, and 10Gbps data transfer.', tags: ['hub', 'usbc', 'connectivity'], colors: ['#1A1A1A','#C0C0C0'], sizes: null },
];

const CATEGORIES = [
  { name: 'Audio', emoji: '🎧', count: 24 },
  { name: 'Wearables', emoji: '⌚', count: 18 },
  { name: 'Photography', emoji: '📷', count: 31 },
  { name: 'Tablets', emoji: '📱', count: 15 },
  { name: 'Peripherals', emoji: '⌨️', count: 42 },
  { name: 'Accessories', emoji: '🔌', count: 67 },
  { name: 'Monitors', emoji: '🖥️', count: 12 },
  { name: 'Gaming', emoji: '🎮', count: 29 },
];

const BLOG_POSTS = [
  { id: 1, title: 'The Future of Wireless Audio: What 2025 Has in Store', category: 'Tech Insights', emoji: '🎧', date: 'Jan 12, 2025', author: 'Arjun Mehta', readTime: '5 min', excerpt: 'From spatial audio to brain-computer interfaces, we explore the cutting edge of wireless audio technology and what consumers can expect in the coming months.' },
  { id: 2, title: 'Why GaN Charging is a Game Changer for Travelers', category: 'Product Guide', emoji: '🔌', date: 'Jan 8, 2025', author: 'Priya Sharma', readTime: '4 min', excerpt: 'GaN technology has revolutionized portable charging. We break down the science and help you choose the right charger for your needs.' },
  { id: 3, title: 'Building a Premium Home Office Setup for Under ₹50K', category: 'Lifestyle', emoji: '🖥️', date: 'Dec 28, 2024', author: 'Rohan Verma', readTime: '7 min', excerpt: 'A home office should be a sanctuary of productivity. Here is our curated guide to building a stunning, ergonomic setup without breaking the bank.' },
  { id: 4, title: 'Farvex 2024: A Year in Review', category: 'Brand Story', emoji: '✨', date: 'Dec 20, 2024', author: 'Farvex Team', readTime: '6 min', excerpt: 'From our humble beginnings to serving 50,000+ customers, we reflect on an incredible year and share a sneak peek at what 2025 holds.' },
  { id: 5, title: 'How to Choose the Perfect Smartwatch in 2025', category: 'Buying Guide', emoji: '⌚', date: 'Dec 15, 2024', author: 'Neha Kapoor', readTime: '8 min', excerpt: 'With so many options flooding the market, we cut through the noise to help you find the smartwatch that perfectly matches your lifestyle and budget.' },
  { id: 6, title: 'The Art of Minimalist Tech: Less is More', category: 'Design', emoji: '🎨', date: 'Dec 10, 2024', author: 'Dev Patel', readTime: '5 min', excerpt: 'There\'s an elegance in restraint. We explore how the world\'s best tech brands are embracing minimalist design principles to create truly timeless products.' },
];

const TESTIMONIALS = [
  { id: 1, name: 'Aditi Singh', role: 'UI/UX Designer, Mumbai', rating: 5, text: 'Farvex Store has completely changed how I shop for tech. The quality of every product is exceptional, and the delivery was faster than expected. The AuraSync earbuds are genuinely life-changing.', initials: 'AS' },
  { id: 2, name: 'Rahul Nair', role: 'Software Engineer, Bangalore', rating: 5, text: 'I was skeptical at first, but the NovaSphere watch exceeded every expectation. Premium build quality, incredible battery life, and the customer support team is world-class. Will definitely shop again.', initials: 'RN' },
  { id: 3, name: 'Kavya Reddy', role: 'Content Creator, Hyderabad', rating: 5, text: 'The LunaLens camera is literally my entire creative career in a box. Farvex curates only the best products, and it shows. My whole setup came from here and I couldn\'t be happier.', initials: 'KR' },
];

const FAQS = [
  { q: 'What is your delivery timeframe?', a: 'We offer express delivery across India within 2-4 business days. Metro cities typically receive orders within 24-48 hours. All orders above ₹999 qualify for free shipping.' },
  { q: 'What is your return and refund policy?', a: 'We offer a hassle-free 30-day return policy. If you\'re not completely satisfied, contact our support team and we\'ll arrange a pickup within 48 hours. Refunds are processed within 5-7 business days.' },
  { q: 'Are your products genuine and authentic?', a: 'Absolutely. Farvex Store is an authorized retailer for all brands we carry. Every product comes with original manufacturer warranty and authentic certificates where applicable.' },
  { q: 'Do you offer EMI or buy-now-pay-later options?', a: 'Yes! We support 0% EMI options via major credit cards (6-24 months), and integration with Razorpay for flexible payment plans. Look for the EMI badge on eligible products.' },
  { q: 'How can I track my order?', a: 'Once your order ships, you\'ll receive a WhatsApp message and email with a tracking link. You can also track your order in real-time from your Farvex account dashboard.' },
  { q: 'Do you offer warranty on products?', a: 'All products come with the manufacturer\'s official warranty (typically 1-2 years). Farvex also offers an extended warranty program that can be added at checkout for premium protection.' },
  { q: 'Can I get support via WhatsApp?', a: 'Yes! Our WhatsApp support line (+91 91963 85435) is available Monday-Saturday, 9 AM to 8 PM. For faster resolution, have your order ID ready. We typically respond within 30 minutes.' },
  { q: 'Do you ship internationally?', a: 'Currently, we ship across all major cities and towns in India. International shipping is coming in Q2 2025. Sign up for our newsletter to be the first to know.' },
];

// ── UTILITIES ──────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const formatPrice = (n) => '₹' + n.toLocaleString('en-IN');
const storeState = () => {
  localStorage.setItem('farvex_cart', JSON.stringify(FarvexState.cart));
  localStorage.setItem('farvex_wishlist', JSON.stringify(FarvexState.wishlist));
};

function showToast(msg, type = 'info') {
  const container = $('#toast-container');
  const toast = document.createElement('div');
  const icons = { success: '✅', info: '💜', error: '❌' };
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-msg">${msg}</span><span class="toast-close" onclick="this.parentElement.remove()">✕</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ── CART ────────────────────────────────────
function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const existing = FarvexState.cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    FarvexState.cart.push({ ...product, qty });
  }
  storeState();
  updateCartUI();
  showToast(`${product.name} added to cart`, 'success');
}

function removeFromCart(productId) {
  FarvexState.cart = FarvexState.cart.filter(i => i.id !== productId);
  storeState();
  updateCartUI();
  renderCart();
}

function updateCartQty(productId, delta) {
  const item = FarvexState.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  storeState();
  updateCartUI();
  renderCart();
}

function updateCartUI() {
  const count = FarvexState.cart.reduce((s, i) => s + i.qty, 0);
  $$('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderCart() {
  const itemsEl = $('#cart-items');
  const subtotalEl = $('#cart-subtotal');
  if (!itemsEl) return;
  if (FarvexState.cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><span>🛒</span><p>Your cart is empty</p><button class="btn btn-primary btn-sm" onclick="closeSidebars(); navigateTo('shop')">Shop Now</button></div>`;
    subtotalEl.textContent = '₹0';
    return;
  }
  const subtotal = FarvexState.cart.reduce((s, i) => s + i.price * i.qty, 0);
  itemsEl.innerHTML = FarvexState.cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${formatPrice(item.price)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
          <span class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑</span>
        </div>
      </div>
    </div>
  `).join('');
  subtotalEl.textContent = formatPrice(subtotal);
}

// ── WISHLIST ────────────────────────────────
function toggleWishlist(productId) {
  const idx = FarvexState.wishlist.indexOf(productId);
  if (idx >= 0) {
    FarvexState.wishlist.splice(idx, 1);
    showToast('Removed from wishlist', 'info');
  } else {
    FarvexState.wishlist.push(productId);
    showToast('Added to wishlist 💜', 'success');
  }
  storeState();
  $$(`[data-wishlist="${productId}"]`).forEach(el => {
    el.classList.toggle('active', FarvexState.wishlist.includes(productId));
  });
}

// ── NAVIGATION ─────────────────────────────
function navigateTo(pageId, productId = null) {
  // Hide all pages
  $$('.page').forEach(p => p.classList.remove('active'));
  // Show target
  const page = $(`#page-${pageId}`);
  if (!page) return;
  page.classList.add('active');
  FarvexState.currentPage = pageId;
  // Update nav links
  $$('.nav-link, .mobile-nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === pageId);
  });
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Special page logic
  if (pageId === 'product' && productId) {
    renderProductDetail(productId);
  }
  if (pageId === 'shop') renderShop();
  if (pageId === 'blog') renderBlog();
  if (pageId === 'home') initHomePage();
  closeMobileMenu();
  setupRevealObserver();
}

// ── MOBILE MENU ─────────────────────────────
function toggleMobileMenu() {
  const toggle = $('#menu-toggle');
  const menu = $('#mobile-menu');
  toggle.classList.toggle('open');
  menu.classList.toggle('open');
}

function closeMobileMenu() {
  const toggle = $('#menu-toggle');
  const menu = $('#mobile-menu');
  toggle?.classList.remove('open');
  menu?.classList.remove('open');
}

function closeSidebars() {
  $('#cart-overlay')?.classList.remove('open');
  $('#cart-sidebar')?.classList.remove('open');
}

function toggleCart() {
  const overlay = $('#cart-overlay');
  const sidebar = $('#cart-sidebar');
  const isOpen = overlay.classList.contains('open');
  overlay.classList.toggle('open', !isOpen);
  sidebar.classList.toggle('open', !isOpen);
  if (!isOpen) renderCart();
}

// ── SEARCH MODAL ────────────────────────────
function openSearch() {
  $('#search-modal')?.classList.add('open');
  setTimeout(() => $('#search-modal-input')?.focus(), 100);
}
function closeSearch() {
  $('#search-modal')?.classList.remove('open');
}

// ── AUTH MODAL ──────────────────────────────
function openAuth(tab = 'login') {
  const overlay = $('#auth-overlay');
  overlay?.classList.add('open');
  switchAuthTab(tab);
}
function closeAuth() {
  $('#auth-overlay')?.classList.remove('open');
}
function switchAuthTab(tab) {
  $$('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  $$('.auth-form').forEach(f => f.classList.toggle('active', f.dataset.form === tab));
}
function handleLogin(e) {
  e.preventDefault();
  FarvexState.user = { name: 'Alex Johnson', email: 'alex@example.com', initials: 'AJ' };
  localStorage.setItem('farvex_user', JSON.stringify(FarvexState.user));
  closeAuth();
  updateUserUI();
  showToast('Welcome back! 👋', 'success');
}
function handleRegister(e) {
  e.preventDefault();
  FarvexState.user = { name: 'New User', email: 'user@example.com', initials: 'NU' };
  localStorage.setItem('farvex_user', JSON.stringify(FarvexState.user));
  closeAuth();
  updateUserUI();
  showToast('Account created successfully! 🎉', 'success');
}
function updateUserUI() {
  const loginBtn = $('#nav-login-btn');
  const userBtn = $('#nav-user-btn');
  if (FarvexState.user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (userBtn) {
      userBtn.style.display = 'flex';
      userBtn.textContent = FarvexState.user.initials;
    }
  }
}

// ── RENDER HOME ─────────────────────────────
function initHomePage() {
  renderFeaturedProducts();
  renderBestSellers();
  renderTestimonials();
  renderCategories();
  initHeroMouseEffect();
}

function renderCategories() {
  const grid = $('#categories-grid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card reveal" onclick="navigateTo('shop')">
      <span class="category-icon">${cat.emoji}</span>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${cat.count} products</div>
    </div>
  `).join('');
}

function renderFeaturedProducts() {
  const grid = $('#featured-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.slice(0, 4).map((p, i) => renderProductCard(p, i)).join('');
}

function renderBestSellers() {
  const grid = $('#bestsellers-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.slice(4, 8).map((p, i) => renderProductCard(p, i)).join('');
}

function renderProductCard(p, i = 0) {
  const isWishlisted = FarvexState.wishlist.includes(p.id);
  const discount = p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  return `
    <div class="product-card reveal reveal-delay-${Math.min(i+1,4)}">
      <div class="product-img-wrap">
        <div class="product-img-placeholder" onclick="navigateTo('product', ${p.id})" style="cursor:pointer">${p.emoji}</div>
        <div class="product-img-actions">
          <button class="product-action-btn ${isWishlisted ? 'active' : ''}" data-wishlist="${p.id}" onclick="toggleWishlist(${p.id})" title="Wishlist">♡</button>
          <button class="product-action-btn" onclick="navigateTo('product', ${p.id})" title="Quick view">👁</button>
        </div>
        <div class="product-badge">
          ${p.badge ? `<span class="badge badge-${p.badge}">${p.badge.toUpperCase()}</span>` : ''}
          ${discount > 0 ? `<span class="badge badge-sale">-${discount}%</span>` : ''}
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <div class="product-name" onclick="navigateTo('product', ${p.id})" style="cursor:pointer">${p.name}</div>
        <div class="rating product-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-count">${p.rating} (${p.reviews})</span>
        </div>
        <div class="product-price-row">
          <div class="product-price">
            ${formatPrice(p.price)}
            ${p.originalPrice ? `<span class="original">${formatPrice(p.originalPrice)}</span>` : ''}
          </div>
          <button class="product-add-btn" onclick="addToCart(${p.id})" title="Add to cart">+</button>
        </div>
      </div>
    </div>
  `;
}

function renderTestimonials() {
  const grid = $('#testimonials-grid');
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="testimonial-card reveal reveal-delay-${i+1}">
      <div class="testimonial-quote">"</div>
      <p class="testimonial-text">${t.text}</p>
      <div class="rating" style="margin-bottom:16px">
        <span class="stars">★★★★★</span>
      </div>
      <div class="testimonial-author">
        <div class="testimonial-avatar">${t.initials}</div>
        <div>
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-role">${t.role}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// ── SHOP PAGE ────────────────────────────────
function renderShop(filter = null) {
  const grid = $('#shop-grid');
  if (!grid) return;
  let products = [...PRODUCTS];
  if (filter) products = products.filter(p => p.category === filter);
  grid.innerHTML = products.map((p, i) => renderProductCard(p, i)).join('');
  setupRevealObserver();
}

// ── PRODUCT DETAIL ─────────────────────────
function renderProductDetail(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const container = $('#product-detail-container');
  if (!container) return;
  const relatedProducts = PRODUCTS.filter(p => p.id !== id && p.category === product.category).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  container.innerHTML = `
    <div class="breadcrumb">
   