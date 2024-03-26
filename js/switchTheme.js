const whiteThemeColor = new Map([
  ['--bg-color-main', '#f9f9f9'],
  ['--bg-color-secondary', '#0f1014'],
  ['--text-color-main', '#000000'],
  ['--text-color-secondary', '#ffffff'],
  ['--main-gray-color', '#081de6'],
  ['--hover-link-color', '#777777'],
  ['--hover-link-color-secondary', '#b6b6b6'],
  ['--hover-button-color', '#4f5de9'],
  ['--grey-color-for-pop-up', '#9B9B9B'],
  ['--frame-color-for-pop-up', '#081DE6'],
]);
const blackThemeColor = new Map([
  ['--bg-color-main', '#0f1014'],
  ['--bg-color-secondary', '#f9f9f9'],
  ['--text-color-main', '#ffffff'],
  ['--text-color-secondary', '#000000'],
  ['--main-gray-color', '#6e8094'],
  ['--hover-link-color', '#b6b6b6'],
  ['--hover-link-color-secondary', '#777777'],
  ['--hover-button-color', '#8195ab'],
  ['--grey-color-for-pop-up', '#808080'],
  ['--frame-color-for-pop-up', '#ffffff'],
]);

let themeIsBlack = JSON.parse(localStorage.getItem('themeIsBlack')) ?? true;

const fullTicket = document.querySelector('.ticket__full');
const faqSection = document.querySelector('.faq-section');
const entertainmentSection = document.querySelector(
  '.entertainment-section__animation'
);
const sectionTitle = document.querySelectorAll('.section-title');
const btnSwitchTheme = document.querySelectorAll('.btn-switch-theme');

const switchTheme = function () {
  if (themeIsBlack) {
    for (const [key, value] of whiteThemeColor) {
      document.documentElement.style.setProperty(key, value);
    }
    themeIsBlack = false;
    localStorage.setItem('themeIsBlack', themeIsBlack);
    btnSwitchTheme.forEach(item => {
      item.classList.remove('btn-switch-theme--is-hover');
      item.classList.replace(
        'btn-switch-theme--black',
        'btn-switch-theme--white'
      );
    });
    fullTicket.classList.replace('ticket__full--black', 'ticket__full--white');
    sectionTitle.forEach(item => {
      item.classList.remove('btn-switch-theme--is-hover');
      item.classList.replace('section-title--black', 'section-title--white');
    });
    entertainmentSection.classList.add(
      'entertainment-section__animation--white'
    );
    faqSection.classList.add('faq-section--white');
  } else {
    for (const [key, value] of blackThemeColor) {
      document.documentElement.style.setProperty(key, value);
    }
    themeIsBlack = true;
    localStorage.setItem('themeIsBlack', themeIsBlack);
    btnSwitchTheme.forEach(item => {
      item.classList.replace(
        'btn-switch-theme--white',
        'btn-switch-theme--black'
      );
      item.classList.remove('btn-switch-theme--is-hover');
    });
    fullTicket.classList.replace('ticket__full--white', 'ticket__full--black');
    sectionTitle.forEach(item => {
      item.classList.remove('btn-switch-theme--is-hover');
      item.classList.replace('section-title--white', 'section-title--black');
    });
    entertainmentSection.classList.remove(
      'entertainment-section__animation--white'
    );
    faqSection.classList.remove('faq-section--white');
  }
};

if (!themeIsBlack) {
  {
    themeIsBlack = true;
    switchTheme();
  }
}

export default switchTheme;
