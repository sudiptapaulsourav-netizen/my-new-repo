const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const mobileToggle = document.getElementById('mobileToggle');

function toggleSidebar() {
  sidebar.classList.toggle('is-visible');
}

sidebarToggle?.addEventListener('click', toggleSidebar);
mobileToggle?.addEventListener('click', toggleSidebar);

window.addEventListener('resize', () => {
  if (window.innerWidth > 1024 && sidebar.classList.contains('is-visible')) {
    sidebar.classList.remove('is-visible');
  }
});
