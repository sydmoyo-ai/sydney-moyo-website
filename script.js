document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.menu-toggle');
  const menuLinks = document.querySelector('#main-links');

  if (!menuButton || !menuLinks) return;

  menuButton.addEventListener('click', function () {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuLinks.classList.toggle('open', !isOpen);
  });
});
