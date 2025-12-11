const tabs = document.querySelectorAll('.role-tab');
const dashboards = document.querySelectorAll('.dashboard');

function activateDashboard(id) {
  dashboards.forEach((dash) => {
    dash.classList.toggle('active', dash.id === id);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.target === id);
    tab.setAttribute('aria-pressed', tab.dataset.target === id);
  });
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateDashboard(tab.dataset.target));
});

// Activate based on URL hash if present
const hash = window.location.hash.replace('#', '');
if (hash) {
  const existing = Array.from(dashboards).find((dash) => dash.id === hash);
  if (existing) activateDashboard(hash);
}
