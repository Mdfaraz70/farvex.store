/* =====================================================
   FARVEX STORE - JAVASCRIPT LOGIC
   ===================================================== */

// --- 1. DATA & STATE ---
const products = [
    {
        id: 1,
        name: "Farvex Alpha Buds",
        category: "Audio",
        price: 8990,
        oldPrice: 12990,
        image: "https://images.unsplash.com/photo-1590658268037-6ff121f6359f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 5
    },
    {
        id: 2,
        name: "Smart Watch Ultra",
        category: "Wearables",
        price: 15990,
        oldPrice: 21990,
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.8
    },
    {
        id: 3,
        name: "Mechanical Keypad",
        category: "Accessories",
        price: 4990,
        oldPrice: 7990,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.9
    },
    {
        id: 4,
        name: "4K Drone X1",
        category: "Electronics",
        price: 45990,
        oldPrice: 59990,
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 5
    },
    {
        id: 5,
        name: "Gaming Mouse V2",
        category: "Accessories",
        price: 2990,
        oldPrice: 4500,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.7
    },
    {
        id: 6,
        name: "Noise Cancelling Pro",
        category: "Audio",
        price: 12990,
        oldPrice: 18990,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        rating: 4.9
    }
];

let cart = JSON.parse(localStorage.getItem('farvexCart')) || [];

// --- 2. CORE FUNCTIONS ---

// Navigation Router
function router(viewId) {
    // Hide all views
    document.querySelectorAll('.page-view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Show target view
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Update Navbar active state (simple logic)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick')?.includes(viewId)) {
            link.classList.add('active');
        }
    });

    // Mobile menu close
    document.querySelector('.nav-links').classList.remove('active');
}

// Render Products
function renderProducts(gridId, items = products) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    grid.innerHTML = items.map(product => `
        <div class="product-card">
            <div class="img-box">
                <img src="${product.image}" alt="${product.name}">
                <div class="actions">
                    <button onclick="addToCart(${product.id})" title="Add to Cart"><i class="fas fa-shopping-bag"></i></button>
                    <button onclick="addToWishlist(${product.id})" title="Wishlist"><i class="far fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span>₹${product.oldPrice.toLocaleString()}</span> 
                    ₹${product.price.toLocaleString()}
                </div>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    updateCart();
    // Visual Feedback
    const btn = document.querySelector('.cart-icon .badge');
    btn.style.transform = 'scale(1.5)';
    setTimeout(() => btn.style.transform = 'scale(1)', 200);
    alert(`${product.name} added to cart!`);
}

// Add to Wishlist (Mock)
function addToWishlist(id) {
    const product = products.find(p => p.id === id);
    alert(`${product.name} added to wishlist!`);
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Update Cart Count & Data
function updateCart() {
    localStorage.setItem('farvexCart', JSON.stringify(cart));
    
    // Badge count
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    document.querySelectorAll('.badge').forEach(badge => {
        badge.innerText = count;
    });
    
    renderCartItems();
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-msg" style="text-align:center; padding: 40px;">Your cart is empty. <br><button class="btn-primary" style="margin-top:15px;" onclick="router(\'shop\')">Continue Shopping</button></p>';
        return;
    }

    let total = 0;
    container.innerHTML = cart.map((item, index) => {
        total += item.price * item.qty;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price.toLocaleString()}</p>
                </div>
                <div class="item-qty">
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
    }).join('');

    // Update Total in Summary (if exists)
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.innerText = `₹${total.toLocaleString()}`;
}

function changeQty(index, change) {
    if (cart[index].qty + change <= 0) {
        removeFromCart(index);
    } else {
        cart[index].qty += change;
        updateCart();
    }
}

// Toggle Modal (Login/Register)
function toggleModal(type) {
    // Simple mock modal logic
    if (type === 'login') {
        const email = prompt("Enter your email for login:");
        if(email) alert("OTP sent to " + email);
    }
}

// --- 3. INITIALIZATION & EVENTS ---

document.addEventListener('DOMContentLoaded', () => {
    // Hide Preloader
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
    }, 1500);

    // Render Products Grids
    renderProducts('new-arrivals-grid', products.slice(0, 4)); // Show first 4 on home
    renderProducts('shop-grid', products);
    renderProducts('shop-grid', products);
    
    // Update Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Interactive Filter Buttons (Shop)
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // In a real app, filter logic would go here
        });
    });

    // Form Validation (Mock)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Just a visual feedback mechanism happens in html onsubmit
        });
    });

    // Smooth Scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});