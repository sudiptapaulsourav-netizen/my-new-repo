const products = [
  {
    id: 1,
    name: "Encrypted Hoodie",
    price: 74,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    badge: "New",
  },
  {
    id: 2,
    name: "Zero Trust Backpack",
    price: 128,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    badge: "Top pick",
  },
  {
    id: 3,
    name: "TLS Sneakers",
    price: 96,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=900&q=80",
    badge: "Hot",
  },
  {
    id: 4,
    name: "Firewall Jacket",
    price: 142,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Endpoint Watch",
    price: 189,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Secure Sunglasses",
    price: 65,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
  },
];

const cart = [];
let otpCode = null;

const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const mobileCartCount = document.getElementById("mobile-cart-count");
const cartItems = document.getElementById("cart-items");
const toast = document.getElementById("toast");
const year = document.getElementById("year");
const secureBanner = document.getElementById("secure-banner");
const checkoutForm = document.getElementById("checkout-form");
const otpInput = document.getElementById("otp");
const sendOtp = document.getElementById("send-otp");
const stripeAction = document.getElementById("stripe-action");
const paypalAction = document.getElementById("paypal-action");
const mobileMenu = document.getElementById("mobile-menu");
const mobileNav = document.getElementById("mobile-nav");

const formatPrice = (value) => `$${value.toFixed(2)}`;

function renderProducts() {
  const fragment = document.createDocumentFragment();
  products.forEach((product) => {
    const card = document.createElement("article");
    card.className =
      "bg-white rounded-2xl shadow border border-slate-100 overflow-hidden flex flex-col transition transform hover:-translate-y-1 hover:shadow-xl";
    card.innerHTML = `
      <div class="relative">
        <img src="${product.image}" alt="${product.name}" class="h-48 w-full object-cover" loading="lazy" />
        ${
          product.badge
            ? `<span class="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-indigo-700">${product.badge}</span>`
            : ""
        }
      </div>
      <div class="p-5 flex-1 flex flex-col gap-3">
        <div>
          <h3 class="font-semibold text-lg">${product.name}</h3>
          <p class="text-sm text-slate-500">Securely curated gear for modern shoppers.</p>
        </div>
        <div class="flex items-center justify-between mt-auto">
          <p class="text-xl font-bold text-indigo-700">${formatPrice(product.price)}</p>
          <button data-id="${product.id}" class="add-to-cart px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none">Add to Cart</button>
        </div>
      </div>
    `;
    fragment.appendChild(card);
  });
  productGrid.appendChild(fragment);
}

function updateCartUI() {
  cartCount.textContent = cart.length;
  mobileCartCount.textContent = `(${cart.length})`;

  cartItems.innerHTML = "";
  if (!cart.length) {
    cartItems.innerHTML = '<p class="text-slate-500">Cart is empty. Start shopping to add secure deals.</p>';
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement("div");
    row.className = "flex items-center justify-between p-3 rounded-xl bg-slate-100";
    row.innerHTML = `
      <div>
        <p class="font-semibold">${item.name}</p>
        <p class="text-xs text-slate-500">${formatPrice(item.price)}</p>
      </div>
      <span class="text-sm font-semibold text-indigo-700">Added</span>
    `;
    cartItems.appendChild(row);
  });
}

function showToast(message, tone = "success") {
  toast.textContent = message;
  toast.classList.remove("hidden", "bg-red-600", "bg-slate-900");
  toast.classList.add(tone === "error" ? "bg-red-600" : "bg-slate-900");
  setTimeout(() => toast.classList.add("hidden"), 2600);
}

function initPayPal() {
  if (!window.paypal) return;
  const container = document.getElementById("paypal-button-container");
  window.paypal
    .Buttons({
      style: { layout: "vertical" },
      createOrder: (data, actions) =>
        actions.order.create({
          purchase_units: [
            {
              amount: {
                value: cart.reduce((sum, item) => sum + item.price, 0).toFixed(2) || "10.00",
              },
            },
          ],
        }),
      onApprove: (_, actions) =>
        actions.order.capture().then(() => {
          showToast("PayPal payment authorized (sandbox)");
        }),
      onError: () => showToast("PayPal payment failed to initialize", "error"),
    })
    .render(container);
}

function togglePaymentUI(method) {
  if (method === "paypal") {
    stripeAction.classList.add("hidden");
    paypalAction.classList.remove("hidden");
    initPayPal();
  } else {
    stripeAction.classList.remove("hidden");
    paypalAction.classList.add("hidden");
  }
}

function maybeWarnInsecure() {
  if (location.protocol !== "https:" && location.hostname !== "localhost") {
    secureBanner.textContent = "SSL required for production. Deploy behind HTTPS with HSTS enabled.";
    secureBanner.classList.remove("hidden");
  }
}

function bindEvents() {
  productGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart");
    if (!button) return;
    const id = Number(button.dataset.id);
    const product = products.find((item) => item.id === id);
    if (!product) return;
    cart.push(product);
    updateCartUI();
    showToast(`${product.name} added to cart`);
  });

  mobileMenu.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
  });

  document.querySelectorAll('input[name="payment"]').forEach((input) => {
    input.addEventListener("change", (event) => togglePaymentUI(event.target.value));
  });

  sendOtp.addEventListener("click", () => {
    otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    showToast(`Verification code sent: ${otpCode}`);
  });

  checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!otpCode) {
      showToast("Send a 2FA code before paying", "error");
      return;
    }
    if (otpInput.value !== otpCode) {
      showToast("Invalid 2FA code. Please try again.", "error");
      return;
    }
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    showToast(`Secure ${paymentMethod} checkout initialized`);
    otpInput.value = "";
  });
}

function initYear() {
  year.textContent = new Date().getFullYear();
}

function ready() {
  renderProducts();
  updateCartUI();
  initYear();
  bindEvents();
  maybeWarnInsecure();

  const paypalInterval = setInterval(() => {
    if (window.paypal) {
      clearInterval(paypalInterval);
      if (document.querySelector('input[name="payment"]:checked').value === "paypal") {
        initPayPal();
      }
    }
  }, 400);
}

document.addEventListener("DOMContentLoaded", ready);
