const products = [
  {
    name: "Zero-Trust Backpack",
    price: 129,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    guarantee: "30-day returns",
    badge: "Encrypted tags",
  },
  {
    name: "Encrypted Headphones",
    price: 179,
    image: "https://images.unsplash.com/photo-1518445382514-5c0523f741e8?auto=format&fit=crop&w=800&q=80",
    guarantee: "2-year warranty",
    badge: "Privacy mode",
  },
  {
    name: "Secure Smartwatch",
    price: 249,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    guarantee: "Free shipping",
    badge: "Biometric lock",
  },
  {
    name: "Hardened Laptop Sleeve",
    price: 89,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    guarantee: "Impact resistant",
    badge: "RFID safe",
  },
  {
    name: "Privacy Keyboard",
    price: 159,
    image: "https://images.unsplash.com/photo-1519241047957-be31d7379a5d?auto=format&fit=crop&w=800&q=80",
    guarantee: "Hot-swap switches",
    badge: "Firmware signed",
  },
  {
    name: "Secure Camera Lens",
    price: 399,
    image: "https://images.unsplash.com/photo-1508898578281-774ac4893c0f?auto=format&fit=crop&w=800&q=80",
    guarantee: "Lifetime support",
    badge: "Tamper seals",
  },
];

const cart = [];
const productsGrid = document.getElementById("products-grid");
const cartCount = document.getElementById("cart-count");
const toast = document.getElementById("toast");
const year = document.getElementById("year");
const sslStatus = document.getElementById("ssl-status");

const renderProducts = () => {
  const fragment = document.createDocumentFragment();
  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.className = "product-image";

    const body = document.createElement("div");
    body.className = "card-body";

    const name = document.createElement("p");
    name.className = "text-lg font-semibold text-slate-900";
    name.textContent = product.name;

    const meta = document.createElement("div");
    meta.className = "meta-row";
    meta.innerHTML = `<span class="badge">${product.badge}</span><span class="text-sm text-slate-500">${product.guarantee}</span>`;

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = `$${product.price}`;

    const button = document.createElement("button");
    button.className = "btn-primary w-full text-center";
    button.textContent = "Add to cart";
    button.addEventListener("click", () => addToCart(product));

    body.append(name, meta, price, button);
    card.append(image, body);
    fragment.appendChild(card);
  });

  productsGrid.appendChild(fragment);
};

const addToCart = (product) => {
  cart.push(product);
  cartCount.textContent = cart.length;
  showToast(`${product.name} added securely to cart.`);
};

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.remove("hidden");
  requestAnimationFrame(() => toast.classList.add("show"));
  setTimeout(() => toast.classList.remove("show"), 2400);
};

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
window.scrollToSection = scrollToSection;

const mockVerify = (email, password, code) => {
  const valid = email && password && /^[0-9]{6}$/.test(code);
  return valid ? { status: "ok" } : { status: "error", message: "Invalid credentials" };
};

const handleLogin = (event) => {
  event.preventDefault();
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();
  const code = event.target.twofactor.value.trim();
  const result = mockVerify(email, password, code);
  if (result.status === "ok") {
    showToast("2FA verified. Session locked with secure cookie.");
    event.target.reset();
  } else {
    showToast(result.message || "Login failed");
  }
};

document.getElementById("login-form").addEventListener("submit", handleLogin);

const handleStripeCheckout = () => {
  showToast("Redirecting to Stripe (test mode) with HTTPS & tokenization...");
  // Replace with Stripe.js redirect using a Checkout Session returned by your backend
  setTimeout(() => window.open("https://stripe.com/docs/payments/checkout", "_blank"), 600);
};

const handlePayPalCheckout = () => {
  showToast("Opening PayPal sandbox in secure mode...");
  // Replace with PayPal SDK integration tied to an order created on your server
  setTimeout(() => window.open("https://developer.paypal.com/docs/checkout/", "_blank"), 600);
};

document.getElementById("stripe-btn").addEventListener("click", handleStripeCheckout);
document.getElementById("paypal-btn").addEventListener("click", handlePayPalCheckout);

const updateSecurityStatus = () => {
  const https = window.location.protocol === "https:";
  sslStatus.textContent = https ? "SSL active" : "Enable HTTPS for live traffic";
  sslStatus.className = https ? "text-green-600" : "text-amber-500 font-semibold";
};

const init = () => {
  renderProducts();
  year.textContent = new Date().getFullYear();
  updateSecurityStatus();
};

init();
