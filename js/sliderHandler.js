const sliderContainer = document.querySelector('.exposition-section__items');
const slider = document.querySelector('.exposition-section__item-container');
const btnLeft = document.querySelector('.exposition-section__btn--left');
const btnRight = document.querySelector('.exposition-section__btn--right');

const skip = 288;
let move = 0;
let maxTranslate = sliderContainer.scrollWidth - sliderContainer.clientWidth;

const scrollToLeftInCaseResize = () => {
  if (window.innerWidth <= 1280 && move < 0) {
    move = 0;

    sliderContainer.style.transform = `translateX(0px)`;
  }
  if (window.innerWidth > 1280) {
    maxTranslate = sliderContainer.scrollWidth - sliderContainer.clientWidth;
    slider.scrollLeft = 0;
    btnLeft.disabled = true;
    btnRight.disabled = false;
  }
};

const btnRightHandler = () => {
  if (-move >= maxTranslate) return;
  move -= skip;
  sliderContainer.style.transform = `translateX(${move}px)`;
  if (move < 0 && btnLeft.disabled) btnLeft.disabled = false;
  if (-move >= maxTranslate) {
    btnRight.disabled = true;
  }
};

const btnLeftHandler = () => {
  if (move === 0) return;
  move += skip;
  sliderContainer.style.transform = `translateX(${move}px)`;
  if (move === 0) btnLeft.disabled = true;
  if (-move <= maxTranslate && btnRight.disabled) {
    btnRight.disabled = false;
  }
};

window.addEventListener('resize', scrollToLeftInCaseResize);
btnRight.addEventListener('click', btnRightHandler);
btnLeft.addEventListener('click', btnLeftHandler);

document.addEventListener('keydown', e => {
  if (
    slider.getBoundingClientRect().bottom < 0 ||
    slider.getBoundingClientRect().top > document.documentElement.clientHeight
  )
    return;

  if (e.key === 'ArrowLeft') btnLeftHandler();
  if (e.key === 'ArrowRight') btnRightHandler();
});
