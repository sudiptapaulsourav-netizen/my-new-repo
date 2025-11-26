const products = [
  {
    id: 1,
    title: 'Lumen Linen Overshirt',
    price: 128,
    rating: 4.8,
    category: 'Apparel',
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    description: 'Relaxed fit with organic linen and corozo buttons.',
  },
  {
    id: 2,
    title: 'Ripple Stoneware Set',
    price: 86,
    rating: 4.9,
    category: 'Home',
    tag: 'Limited',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-glazed ceramics made by independent artisans.',
  },
  {
    id: 3,
    title: 'Aurora Smart Lamp',
    price: 159,
    rating: 4.7,
    category: 'Tech',
    tag: 'Eco',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    description: 'Adaptive lighting scenes and circadian rhythm support.',
  },
  {
    id: 4,
    title: 'Flow Yoga Mat',
    price: 92,
    rating: 4.9,
    category: 'Wellness',
    tag: 'Recycled',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    description: 'Natural tree rubber with closed-cell cushioning.',
  },
  {
    id: 5,
    title: 'Horizon Weekender',
    price: 210,
    rating: 4.6,
    category: 'Apparel',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    description: 'Carry-on duffle with recycled ocean plastics.',
  },
  {
    id: 6,
    title: 'Cloud Knit Set',
    price: 148,
    rating: 4.8,
    category: 'Apparel',
    tag: 'Soft touch',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80',
    description: 'Lightweight matching knit for travel and leisure.',
  },
  {
    id: 7,
    title: 'Echo Sound Mini',
    price: 118,
    rating: 4.5,
    category: 'Tech',
    tag: 'Smart',
    image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80',
    description: 'Compact speaker with adaptive equalizer and voice control.',
  },
  {
    id: 8,
    title: 'Nordic Throw',
    price: 74,
    rating: 4.7,
    category: 'Home',
    tag: 'Organic',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
    description: 'Cozy lambswool throw with hand-finished edges.',
  },
  {
    id: 9,
    title: 'Calm Mist Diffuser',
    price: 64,
    rating: 4.6,
    category: 'Wellness',
    tag: 'Aroma',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: 'Ultrasonic diffuser with ceramic shell and timer modes.',
  },
];

const state = {
  cartCount: 2,
  filter: 'all',
  theme: 'dark',
};

const productGrid = document.getElementById('product-grid');
const filterButtons = document.querySelectorAll('.filter-chip');
const categoryChips = document.querySelectorAll('.category-chip');
const searchInput = document.getElementById('search');
const cartCount = document.getElementById('cart-count');
const toast = document.getElementById('toast');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const mobileToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const emailForm = document.querySelector('form');

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesFilter = state.filter === 'all' || product.category === state.filter;
    const matchesQuery = !query ||
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });

  productGrid.innerHTML = filtered
    .map(
      (product) => `
        <article class="group flex flex-col rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-brand-300/30">
          <div class="relative overflow-hidden rounded-2xl p-3">
            <div class="aspect-[4/5] rounded-xl bg-cover bg-center" style="background-image: url('${product.image}')"></div>
            <span class="absolute left-5 top-5 rounded-full bg-brand-500/90 px-3 py-1 text-xs font-semibold text-white shadow">${product.tag}</span>
          </div>
          <div class="flex flex-1 flex-col gap-3 p-5">
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-lg font-semibold text-white">${product.title}</h3>
              <span class="text-sm font-bold text-brand-100">${currency.format(product.price)}</span>
            </div>
            <p class="text-sm text-slate-300">${product.description}</p>
            <div class="flex items-center justify-between text-xs text-slate-400">
              <span>${product.category}</span>
              <div class="flex items-center gap-1 text-amber-300">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 00-1.175 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="font-semibold text-slate-200">${product.rating}</span>
              </div>
            </div>
            <button data-id="${product.id}" class="add-to-cart mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-brand-500/80 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-900/30 transition hover:-translate-y-0.5 hover:bg-brand-400/90">
              Add to cart
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </article>
      `,
    )
    .join('');

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', () => addToCart());
  });
}

function setActiveFilter(filter) {
  state.filter = filter;
  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });
  updateChipStyles();
  renderProducts();
}

function setActiveCategory(category) {
  state.filter = category === 'all' ? 'all' : category;
  categoryChips.forEach((chip) => {
    chip.classList.toggle('active', chip.dataset.category === category);
  });
  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === state.filter);
  });
  updateChipStyles();
  renderProducts();
}

function addToCart() {
  state.cartCount += 1;
  cartCount.textContent = state.cartCount;
  toast.classList.remove('opacity-0', 'translate-y-6');
  toast.classList.add('opacity-100', 'translate-y-0');
  setTimeout(() => toast.classList.add('opacity-0', 'translate-y-6'), 1600);
}

function toggleTheme() {
  const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
  state.theme = nextTheme;
  document.body.dataset.theme = nextTheme;
  document.body.classList.toggle('bg-white', nextTheme === 'light');
  document.body.classList.toggle('text-slate-900', nextTheme === 'light');
  document.body.classList.toggle('bg-slate-950', nextTheme === 'dark');
  document.body.classList.toggle('text-slate-100', nextTheme === 'dark');
  themeIcon.textContent = nextTheme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('novashop-theme', nextTheme);
}

function restoreTheme() {
  const stored = localStorage.getItem('novashop-theme');
  if (stored === 'light') {
    state.theme = 'light';
    document.body.dataset.theme = 'light';
    document.body.classList.add('bg-white', 'text-slate-900');
    document.body.classList.remove('bg-slate-950', 'text-slate-100');
    themeIcon.textContent = '☀️';
  }
}

function toggleMobileMenu() {
  mobileMenu.classList.toggle('hidden');
}

function handleSearchInput() {
  setActiveFilter('all');
}

function handleEmailSubmit(event) {
  event.preventDefault();
  const email = event.target.email.value.trim();
  if (!email) return;
  toast.querySelector('span').textContent = `Subscribed as ${email}`;
  toast.classList.remove('opacity-0', 'translate-y-6');
  toast.classList.add('opacity-100', 'translate-y-0');
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-6');
    toast.querySelector('span').textContent = 'Added to cart';
  }, 1800);
  event.target.reset();
}

function bindEvents() {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => setActiveFilter(button.dataset.filter));
  });

  categoryChips.forEach((chip) => {
    chip.addEventListener('click', () => setActiveCategory(chip.dataset.category));
  });

  searchInput.addEventListener('input', handleSearchInput);
  themeToggle.addEventListener('click', toggleTheme);
  mobileToggle.addEventListener('click', toggleMobileMenu);
  emailForm.addEventListener('submit', handleEmailSubmit);
}

function updateChipStyles() {
  const chipClasses =
    'filter-chip inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:border-brand-300/40 hover:bg-brand-500/10';
  document.querySelectorAll('.filter-chip, .category-chip').forEach((chip) => {
    const isActive = chip.classList.contains('active');
    const activeClasses = 'border-brand-300/70 bg-brand-500/20 text-white shadow-md shadow-brand-900/30';
    const inactiveClasses = 'text-slate-200';
    chip.className = `${chipClasses} ${isActive ? activeClasses : inactiveClasses} ${isActive ? 'active' : ''}`;
  });
}

function init() {
  restoreTheme();
  updateChipStyles();
  bindEvents();
  renderProducts();
}

init();
