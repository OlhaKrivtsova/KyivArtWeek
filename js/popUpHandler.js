const popUpWindow = document.querySelectorAll('.pop-up');

export const closePopupWindow = popUpWindow => {
  popUpWindow.classList.remove('pop-up--is-visible');
};

export const openPopupWindow = popUpWindow => {
  popUpWindow.classList.add('pop-up--is-visible');
};

const closeWindow = event => {
  if (
    event.target.closest('.pop-up__btn-close') ||
    event.target.classList.contains('pop-up__overlay')
  ) {
    const currentWindow = event.target.closest('.pop-up');
    currentWindow.classList.remove('pop-up--is-visible');
  }
};

popUpWindow.forEach(item => {
  item.addEventListener('click', closeWindow);
});
