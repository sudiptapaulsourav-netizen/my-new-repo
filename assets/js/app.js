const products = [
  {
    id: 1,
    name: 'AirLoft Field Jacket',
    category: 'Outerwear',
    price: 240,
    rating: 4.9,
    badge: 'New arrival',
    description: 'Featherlight insulation with water-repellent nano finish.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'CloudKnit Crew',
    category: 'Essentials',
    price: 120,
    rating: 4.8,
    badge: 'Bestseller',
    description: 'Organic cotton with micro-brushed interior for softness.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'StrideFlex Jogger',
    category: 'Active',
    price: 140,
    rating: 4.7,
    badge: 'Restocked',
    description: 'Moisture-wicking knit and bonded pockets for essentials.',
    image: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    name: 'Everyday Oxford',
    category: 'Essentials',
    price: 110,
    rating: 4.6,
    badge: 'Earth conscious',
    description: 'BCI cotton with crease-resistant finish for work-to-weekend.',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    name: 'Motion Tech Blazer',
    category: 'Outerwear',
    price: 320,
    rating: 4.9,
    badge: 'Tailored stretch',
    description: 'Unstructured silhouette with four-way stretch for travel.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    name: 'Trailbound Duffel',
    category: 'Accessories',
    price: 185,
    rating: 4.8,
    badge: 'Carry-on ready',
    description: 'Recycled ballistic nylon with modular compartments.',
    image: 'https://images.unsplash.com/photo-1495105791459-90713e589d0d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 7,
    name: 'SolarGuard Anorak',
    category: 'Outerwear',
    price: 210,
    rating: 4.5,
    badge: 'UPF 40',
    description: 'Packable shell with sun protection and taped seams.',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 8,
    name: 'Studio Rib Tank',
    category: 'Active',
    price: 65,
    rating: 4.4,
    badge: 'Breathable',
    description: 'Modal blend with bonded seams and open-back airflow.',
    image: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 9,
    name: 'Atlas Weekender',
    category: 'Accessories',
    price: 260,
    rating: 4.8,
    badge: 'Limited run',
    description: 'Vegetable-tanned leather with removable tech organizer.',
    image: 'https://images.unsplash.com/photo-1495105791459-90713e589d0d?auto=format&fit=crop&w=900&q=80'
  }
]

const productGrid = document.getElementById('product-grid')
const template = document.getElementById('product-card-template')
const filterButtons = Array.from(document.querySelectorAll('#category-filters .filter-chip'))
const searchInput = document.getElementById('search-input')
const sortSelect = document.getElementById('sort-select')
const cartCount = document.getElementById('cart-count')
const themeToggle = document.getElementById('theme-toggle')
const themeLabel = document.getElementById('theme-label')
const themeIcon = document.getElementById('theme-icon')
const menuToggle = document.getElementById('menu-toggle')
const mobileMenu = document.getElementById('mobile-menu')

const activeChipClasses = ['bg-midnight', 'text-white', 'border-midnight', 'dark:bg-white', 'dark:text-midnight', 'dark:border-slate-100']
let selectedCategory = 'all'
let cartTotal = 0

const favorites = new Set()

const formatPrice = (value) => `$${value.toFixed(0)}`

const updateCartCount = () => {
  cartCount.textContent = cartTotal
}

const setActiveChip = (target) => {
  filterButtons.forEach((btn) => {
    btn.classList.remove(...activeChipClasses)
    btn.setAttribute('aria-pressed', 'false')
  })
  target.classList.add(...activeChipClasses)
  target.setAttribute('aria-pressed', 'true')
}

const renderProducts = () => {
  const query = searchInput.value.trim().toLowerCase()
  let visible = products.filter((product) =>
    (selectedCategory === 'all' || product.category === selectedCategory) &&
    (!query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query))
  )

  const sortMode = sortSelect.value
  if (sortMode === 'price-asc') {
    visible = [...visible].sort((a, b) => a.price - b.price)
  } else if (sortMode === 'price-desc') {
    visible = [...visible].sort((a, b) => b.price - a.price)
  } else if (sortMode === 'rating') {
    visible = [...visible].sort((a, b) => b.rating - a.rating)
  }

  productGrid.innerHTML = ''

  visible.forEach((product) => {
    const card = template.content.firstElementChild.cloneNode(true)
    const image = card.querySelector('.product-image')
    const badge = card.querySelector('.badge')
    const category = card.querySelector('.product-category')
    const rating = card.querySelector('.product-rating')
    const name = card.querySelector('.product-name')
    const description = card.querySelector('.product-description')
    const price = card.querySelector('.product-price')
    const addBtn = card.querySelector('.add-btn')
    const favoriteBtn = card.querySelector('.favorite-btn')

    image.src = product.image
    image.alt = product.name

    if (product.badge) {
      badge.textContent = product.badge
    } else {
      badge.classList.add('hidden')
    }

    category.textContent = product.category
    rating.textContent = `${product.rating.toFixed(1)} ★`
    name.textContent = product.name
    description.textContent = product.description
    price.textContent = formatPrice(product.price)

    addBtn.addEventListener('click', () => {
      cartTotal += 1
      updateCartCount()
      addBtn.textContent = 'Added'
      addBtn.classList.add('bg-accent', 'text-white', 'shadow-soft')
      setTimeout(() => {
        addBtn.textContent = 'Add to bag'
        addBtn.classList.remove('bg-accent')
      }, 1400)
    })

    favoriteBtn.addEventListener('click', () => {
      const isFavorite = favorites.has(product.id)
      if (isFavorite) {
        favorites.delete(product.id)
        favoriteBtn.classList.remove('text-accent')
      } else {
        favorites.add(product.id)
        favoriteBtn.classList.add('text-accent')
      }
      favoriteBtn.setAttribute('aria-pressed', (!isFavorite).toString())
    })

    productGrid.appendChild(card)
  })
}

filterButtons.forEach((button) => {
  if (button.dataset.category === selectedCategory) {
    setActiveChip(button)
  }
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.category
    setActiveChip(button)
    renderProducts()
  })
})

searchInput.addEventListener('input', renderProducts)
sortSelect.addEventListener('change', renderProducts)

const applyTheme = (theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  themeLabel.textContent = theme === 'dark' ? 'Dark' : 'Light'
  themeIcon.innerHTML = theme === 'dark'
    ? '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />'
    : '<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v2.5M12 18.5V21M4.75 12H3m18 0h-1.75M6.5 6.5 5 5m14 14-1.5-1.5M6.5 17.5 5 19m14-14-1.5 1.5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />'
  localStorage.setItem('theme', theme)
}

const storedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
const initialTheme = storedTheme || (prefersDark.matches ? 'dark' : 'light')
applyTheme(initialTheme)

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark')
  applyTheme(isDark ? 'light' : 'dark')
})

prefersDark.addEventListener('change', (event) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(event.matches ? 'dark' : 'light')
  }
})

menuToggle.addEventListener('click', () => {
  const isHidden = mobileMenu.classList.toggle('hidden')
  menuToggle.setAttribute('aria-expanded', (!isHidden).toString())
})

document.addEventListener('keyup', (event) => {
  if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden')
    menuToggle.setAttribute('aria-expanded', 'false')
  }
})

renderProducts()
