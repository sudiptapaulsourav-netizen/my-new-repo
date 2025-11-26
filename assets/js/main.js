const products = [
  {
    id: 'aura-watch',
    name: 'Aura Smartwatch',
    category: 'wearables',
    price: 249,
    description: 'Minimalist wearable with health sensors, gesture control, and 7-day battery.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    badge: 'Editor’s pick',
  },
  {
    id: 'drift-headphones',
    name: 'Drift Noise-cancelling Headphones',
    category: 'audio',
    price: 189,
    description: 'Adaptive noise cancelling, Bluetooth 5.3, and spatial audio for immersive listening.',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=900&q=80',
    badge: 'Back in stock',
  },
  {
    id: 'solis-lamp',
    name: 'Solis Smart Lamp',
    category: 'home',
    price: 129,
    description: 'Voice-ready ambient lamp with RGB scenes, wireless charging, and sunrise mode.',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=900&q=80',
    badge: 'New arrival',
  },
  {
    id: 'flux-desk',
    name: 'Flux Standing Desk',
    category: 'work',
    price: 699,
    description: 'Electric sit-stand desk with cable management, tempered glass top, and presets.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
    badge: 'Trending',
  },
  {
    id: 'pulse-speaker',
    name: 'Pulse Smart Speaker',
    category: 'audio',
    price: 159,
    description: 'Hi-fi smart speaker with spatial tuning, multi-room sync, and privacy controls.',
    image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=900&q=80',
    badge: 'Staff favorite',
  },
  {
    id: 'haven-brewer',
    name: 'Haven Cold Brew System',
    category: 'home',
    price: 98,
    description: 'Cafe-grade cold brew at home with stainless micro-filter and airtight carafe.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
    badge: 'Limited',
  },
];

const state = {
  category: 'all',
  search: '',
  cartItems: new Map(),
  theme: 'light',
};

const productGrid = document.querySelector('#product-grid');
const filterButtons = document.querySelectorAll('.filter-tag');
const searchInput = document.querySelector('#search-input');
const cartCount = document.querySelector('#cart-count');
const cartButton = document.querySelector('#cart-button');
const menuToggle = document.querySelector('#menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const themeToggle = document.querySelector('#theme-toggle');
const themeToggleMobile = document.querySelector('#theme-toggle-mobile');
const themeIcon = document.querySelector('#theme-icon');

const renderProducts = () => {
  const filtered = products.filter(({ category, name, description }) => {
    const matchesCategory = state.category === 'all' || category === state.category;
    const searchTerm = state.search.toLowerCase();
    const matchesSearch = [name, description].some((value) =>
      value.toLowerCase().includes(searchTerm)
    );
    return matchesCategory && matchesSearch;
  });

  const list = filtered
    .map(
      (item) => `
        <article class="group rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
          <div class="relative">
            <img src="${item.image}" alt="${item.name}" class="h-52 w-full object-cover transition duration-300 group-hover:scale-105" loading="lazy" />
            <span class="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
              ${item.badge}
            </span>
            <button data-id="${item.id}" class="add-to-cart absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-white text-xs font-semibold shadow-glass opacity-0 transition group-hover:opacity-100">
              Add to cart
            </button>
          </div>
          <div class="space-y-3 p-5">
            <div class="flex items-start justify-between gap-3">
              <h3 class="text-lg font-semibold text-slate-900">${item.name}</h3>
              <span class="rounded-lg bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">$${item.price}</span>
            </div>
            <p class="text-sm text-slate-600">${item.description}</p>
            <div class="flex items-center gap-2 text-xs text-slate-500">
              <span class="inline-flex rounded-full bg-slate-100 px-3 py-1">${item.category}</span>
              <span class="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-emerald-600">In stock</span>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  productGrid.innerHTML = filtered.length ? list : emptyState();
};

const emptyState = () => `
  <div class="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center text-slate-500">
    <div class="mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">🔎</div>
    <p class="text-lg font-semibold text-slate-900">No products matched your filters</p>
    <p class="text-sm text-slate-500">Try clearing search or selecting another category.</p>
  </div>
`;

const updateFilters = (category) => {
  state.category = category;
  filterButtons.forEach((btn) => {
    btn.classList.toggle(
      'bg-primary text-white shadow-glass',
      btn.dataset.category === category
    );
    btn.classList.toggle(
      'border border-slate-200 bg-white text-slate-600 shadow-sm',
      btn.dataset.category !== category
    );
  });
  renderProducts();
};

const updateCartCount = () => {
  const count = Array.from(state.cartItems.values()).reduce((sum, qty) => sum + qty, 0);
  cartCount.textContent = count;
  cartButton.classList.toggle('bg-emerald-500', count > 0);
  cartButton.classList.toggle('bg-primary', count === 0);
};

const handleAddToCart = (event) => {
  const target = event.target.closest('.add-to-cart');
  if (!target) return;
  const { id } = target.dataset;
  const quantity = state.cartItems.get(id) ?? 0;
  state.cartItems.set(id, quantity + 1);
  updateCartCount();
};

const setupSearch = () => {
  searchInput.addEventListener('input', (event) => {
    state.search = event.target.value.trim();
    renderProducts();
  });
};

const setupFilters = () => {
  filterButtons.forEach((button) => {
    button.classList.add('filter-base');
    button.addEventListener('click', () => updateFilters(button.dataset.category));
  });
  updateFilters('all');
};

const setupCart = () => {
  document.addEventListener('click', handleAddToCart);
};

const toggleMenu = () => {
  const isOpen = mobileMenu.classList.toggle('scale-y-100');
  mobileMenu.classList.toggle('scale-y-0', !isOpen);
};

const setupMenu = () => {
  menuToggle.addEventListener('click', toggleMenu);
  mobileMenu.addEventListener('click', (event) => {
    if (event.target.matches('a')) toggleMenu();
  });
};

const applyTheme = (theme) => {
  const root = document.documentElement;
  const isDark = theme === 'dark';
  root.classList.toggle('dark', isDark);
  document.body.classList.toggle('bg-slate-900', isDark);
  document.body.classList.toggle('text-white', isDark);
  themeIcon.innerHTML = isDark
    ? '<path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 12 21c-5.385 0-9.75-4.365-9.75-9.75 0-3.436 1.764-6.458 4.43-8.238" />'
    : '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25M12 18.75V21M4.5 12H2.25M21.75 12H19.5M6.364 6.364 4.95 4.95m14.142 14.142-1.414-1.414M17.636 6.364l1.414-1.414M6.364 17.636 4.95 19.05M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />';
};

const setupTheme = () => {
  const stored = localStorage.getItem('pulse-theme');
  if (stored) state.theme = stored;
  applyTheme(state.theme);

  const toggle = () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('pulse-theme', state.theme);
    applyTheme(state.theme);
  };

  themeToggle?.addEventListener('click', toggle);
  themeToggleMobile?.addEventListener('click', toggle);
};

const init = () => {
  setupFilters();
  setupSearch();
  setupCart();
  setupMenu();
  setupTheme();
  renderProducts();
};

const filterStyles = document.createElement('style');
filterStyles.innerHTML = `
  .filter-base {
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.2s ease;
  }
  .filter-base:hover { transform: translateY(-1px); }
`;

document.head.append(filterStyles);

init();
