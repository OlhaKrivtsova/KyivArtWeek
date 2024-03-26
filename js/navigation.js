const navLinks = document.querySelectorAll('.nav');
const buyTicket = document.querySelector('#buyTicket');

navLinks.forEach(item =>
  item.addEventListener('click', event => {
    event.preventDefault();
    if (!event.target.classList.contains('link')) return;
    const href = event.target.getAttribute('href');
    const section = document.querySelector(href);
    section.scrollIntoView({behavior: 'smooth'});
    if (event.target.closest('.mobile-menu')) {
      event.target
        .closest('.mobile-menu')
        .classList.remove('mobile-menu--is-visible');
      document.body.classList.remove('no-scroll');
    }
  })
);

buyTicket.addEventListener('click', () =>
  document.querySelector('#tickets').scrollIntoView({behavior: 'smooth'})
);
