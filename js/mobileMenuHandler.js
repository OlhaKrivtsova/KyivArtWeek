const btnOpenMobileMenu = document.querySelector('.btn-menu');
const btnCloseMobileMenu = document.querySelector('.mobile-menu__btn-close');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.mobile-menu__overlay');

const toggleMobileMenu = () => {
  mobileMenu.classList.toggle('mobile-menu--is-visible');
  document.body.classList.toggle('no-scroll');
};

const removeMobileMenuInCaseResize = () => {
  if (
    window.innerWidth <= 768 ||
    !document.body.classList.contains('no-scroll')
  )
    return;
  mobileMenu.classList.remove('mobile-menu--is-visible');
  document.body.classList.remove('no-scroll');
};

btnOpenMobileMenu.addEventListener('click', toggleMobileMenu);
btnCloseMobileMenu.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);
window.addEventListener('resize', removeMobileMenuInCaseResize);
