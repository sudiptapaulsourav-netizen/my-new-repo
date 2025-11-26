const cartCount = document.getElementById('cart-count');
const cartPill = document.getElementById('cart-pill');
const cartItems = document.getElementById('cart-items');
const toast = document.getElementById('toast');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const paymentForm = document.getElementById('payment-form');
const paymentStatus = document.getElementById('payment-status');
const sendCodeBtn = document.getElementById('send-code');
const verifyCodeBtn = document.getElementById('verify-code');
const twoFactorInput = document.getElementById('twofactor-code');

let cart = [];
let twoFactorCode = '';
let isTwoFactorVerified = false;

const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2000);
};

const updateCart = () => {
  cartCount.textContent = cart.length;
  cartPill.textContent = `${cart.length} item${cart.length === 1 ? '' : 's'}`;
  cartItems.innerHTML = '';

  if (!cart.length) {
    cartItems.innerHTML = '<p class="rounded-xl bg-slate-50 p-4 text-slate-600">Add products to see them here. We encrypt cart data before checkout.</p>';
    return;
  }

  cart.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3';
    row.innerHTML = `<span class="font-semibold text-slate-800">${item.name}</span><span class="text-sm text-slate-600">${formatter.format(item.price)}</span>`;
    cartItems.appendChild(row);
  });
};

const encryptCartPreview = async () => {
  const encoder = new TextEncoder();
  const data = encoder.encode(JSON.stringify(cart));
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16);
};

const addToCart = async (productCard) => {
  const name = productCard.dataset.product;
  const price = Number(productCard.dataset.price);
  cart = [...cart, { name, price }];
  updateCart();

  const checksum = await encryptCartPreview();
  showToast(`${name} added securely • checksum ${checksum}`);
};

document.querySelectorAll('.add-to-cart').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const productCard = event.target.closest('.product-card');
    addToCart(productCard);
  });
});

menuToggle?.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

const generateTwoFactorCode = () => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  twoFactorCode = (array[0] % 900000 + 100000).toString();
  isTwoFactorVerified = false;
  paymentStatus.textContent = '2FA code sent to your email (demo code shown for testing).';
  showToast(`2FA demo code: ${twoFactorCode}`);
};

sendCodeBtn.addEventListener('click', generateTwoFactorCode);

verifyCodeBtn.addEventListener('click', () => {
  if (!twoFactorCode) {
    paymentStatus.textContent = 'Please request a new 2FA code first.';
    return;
  }

  if (twoFactorInput.value.trim() === twoFactorCode) {
    isTwoFactorVerified = true;
    paymentStatus.textContent = 'Two-factor authentication verified. You can finish checkout.';
    showToast('2FA verified. Ready for payment.');
  } else {
    isTwoFactorVerified = false;
    paymentStatus.textContent = 'Invalid code. Please try again to complete secure checkout.';
  }
});

const simulatePaymentGateway = async (gateway, payload) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${gateway}:${JSON.stringify(payload)}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  const token = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 24);
  return `${gateway.toUpperCase()}-${token}`;
};

paymentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!cart.length) {
    paymentStatus.textContent = 'Your cart is empty. Add items before checking out.';
    showToast('Add products to cart first.');
    return;
  }

  if (!isTwoFactorVerified) {
    paymentStatus.textContent = 'Complete two-factor authentication to continue.';
    showToast('2FA is required before payment.');
    return;
  }

  const formData = new FormData(paymentForm);
  const gateway = formData.get('gateway');
  const payload = {
    name: formData.get('name'),
    email: formData.get('email'),
    amount: cart.reduce((sum, item) => sum + item.price, 0),
  };

  paymentStatus.textContent = 'Processing secure payment...';
  const token = await simulatePaymentGateway(gateway, payload);
  paymentStatus.textContent = `${gateway === 'stripe' ? 'Stripe' : 'PayPal'} token generated. Use server-side keys to confirm: ${token}`;
  showToast('Payment token created securely.');
});

updateCart();
