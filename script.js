const products = [
  {
    id: 1,
    name: 'AeroShell Jacket',
    category: 'outerwear',
    price: 129,
    tag: 'New',
    description: 'Featherweight shell with waterproof coating and breathable mesh lining.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Summit Trail Boots',
    category: 'footwear',
    price: 178,
    tag: 'Bestseller',
    description: 'Rugged traction, recycled leather upper, and cloud-soft cushioning.',
    image:
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Everyday Carry Tote',
    category: 'accessories',
    price: 72,
    tag: 'Limited',
    description: 'Water-resistant canvas with modular pockets and padded laptop sleeve.',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'CloudKnit Hoodie',
    category: 'outerwear',
    price: 98,
    tag: 'Essentials',
    description: 'Buttery-soft knit with temperature control and no-flip hood design.',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Sprint Runner',
    category: 'footwear',
    price: 142,
    tag: 'New',
    description: 'Ultralight running sneaker with responsive foam and knit upper.',
    image:
      'https://images.unsplash.com/photo-1528701800489-20be9c1e1410?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Transit Pack',
    category: 'accessories',
    price: 118,
    tag: 'Travel',
    description: '38L carry-on backpack with clamshell opening and hidden security pockets.',
    image:
      'https://images.unsplash.com/photo-1500522144261-ea64433bbe27?auto=format&fit=crop&w=800&q=80'
  }
];

const cart = [];

const productGrid = document.getElementById('product-grid');
const categorySelect = document.getElementById('category');
const cartToggle = document.getElementById('cart-toggle');
const cartPanel = document.getElementById('cart-panel');
const cartClose = document.getElementById('cart-close');
const overlay = document.getElementById('overlay');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout');

const newsletterForm = document.getElementById('newsletter-form');
const formMessage = document.getElementById('form-message');

function formatCurrency(amount) {
  return `$${amount.toFixed(0)}`;
}

function renderProducts(filter = 'all') {
  productGrid.innerHTML = '';
  const filtered = filter === 'all' ? products : products.filter((product) => product.category === filter);

  filtered.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="card-body">
        <span class="badge">${product.tag}</span>
        <p class="card-title">${product.name}</p>
        <p class="card-meta">${product.description}</p>
        <div class="card-footer-row">
          <span class="price">${formatCurrency(product.price)}</span>
          <button class="btn ghost" data-id="${product.id}">Add to cart</button>
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

function updateCartDisplay() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    const empty = document.createElement('p');
    empty.textContent = 'Your cart is empty. Add something you love!';
    empty.style.color = '#94a3b8';
    cartItems.appendChild(empty);
  }

  let subtotal = 0;

  cart.forEach((item) => {
    subtotal += item.price * item.quantity;
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <strong>${item.name}</strong>
        <small>${item.quantity} × ${formatCurrency(item.price)}</small>
      </div>
      <button class="icon" aria-label="Remove ${item.name}" data-remove="${item.id}">✕</button>
    `;
    cartItems.appendChild(li);
  });

  cartSubtotal.textContent = formatCurrency(subtotal);
  cartTotal.textContent = formatCurrency(subtotal);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  checkoutButton.disabled = cart.length === 0;
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartDisplay();
  openCart();
}

function removeFromCart(id) {
  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCartDisplay();
  }
}

function openCart() {
  cartPanel.classList.add('open');
  overlay.classList.add('show');
}

function closeCart() {
  cartPanel.classList.remove('open');
  overlay.classList.remove('show');
}

productGrid.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-id]');
  if (!button) return;
  const id = Number(button.dataset.id);
  addToCart(id);
});

cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-remove]');
  if (!button) return;
  const id = Number(button.dataset.remove);
  removeFromCart(id);
});

cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

categorySelect.addEventListener('change', (event) => {
  renderProducts(event.target.value);
});

newsletterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = event.target.email.value.trim();
  if (!email) return;

  formMessage.textContent = 'Thanks for subscribing!';
  event.target.reset();
});

renderProducts();
updateCartDisplay();
