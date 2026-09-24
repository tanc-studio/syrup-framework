// Mobile menu: close after a link is picked
const menu = document.querySelector('.sg-nav_menu');
menu?.addEventListener('click', (e) => {
  if (e.target.closest('a')) menu.open = false;
});
