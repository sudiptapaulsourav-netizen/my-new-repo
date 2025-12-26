const appShell = document.querySelector('.app-shell');
const compactToggle = document.getElementById('compactToggle');
const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));

const prefersCompact = window.matchMedia('(max-width: 640px)');

function setCompact(state) {
  const isCompact = Boolean(state);
  appShell?.setAttribute('data-compact', String(isCompact));
  compactToggle?.setAttribute('aria-pressed', String(isCompact));
}

function toggleCompact() {
  const current = appShell?.getAttribute('data-compact') === 'true';
  setCompact(!current);
}

compactToggle?.addEventListener('click', toggleCompact);

prefersCompact.addEventListener('change', (event) => {
  setCompact(event.matches);
});
setCompact(prefersCompact.matches);

let focusIndex = navLinks.findIndex((link) => link.classList.contains('is-active'));

function updateFocus(index) {
  navLinks.forEach((link, i) => {
    const isCurrent = i === index;
    link.classList.toggle('is-focused', isCurrent);
    if (isCurrent) {
      link.focus();
    }
  });
}

navLinks.forEach((link, index) => {
  link.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusIndex = (index + 1) % navLinks.length;
      updateFocus(focusIndex);
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusIndex = (index - 1 + navLinks.length) % navLinks.length;
      updateFocus(focusIndex);
    }
  });

  link.addEventListener('focus', () => {
    focusIndex = index;
    navLinks.forEach((item, i) => item.classList.toggle('is-focused', i === index));
  });
});

const cards = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--delay', `${80 + i * 40}ms`);
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

cards.forEach((card) => observer.observe(card));
