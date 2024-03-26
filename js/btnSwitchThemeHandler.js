import switchTheme from './switchTheme.js';

export const btnSwitchTheme = document.querySelectorAll('.btn-switch-theme');

btnSwitchTheme.forEach(item => item.addEventListener('click', switchTheme));

btnSwitchTheme.forEach(item =>
  item.addEventListener('mouseenter', e => {
    e.currentTarget.classList.add('btn-switch-theme--is-hover');
  })
);

btnSwitchTheme.forEach(item =>
  item.addEventListener('mouseleave', e => {
    e.currentTarget.classList.remove('btn-switch-theme--is-hover');
  })
);
