const sectionAnimation = document.querySelector(
  '.entertainment-section__animation'
);
const images = document.querySelectorAll(
  '.entertainment-section__animation-img'
);

const switchImageAnimated = entries => {
  if (!entries[0].isIntersecting) {
    images.forEach(item => {
      item.classList.add('entertainment-section__animation-img--none');
    });
  } else {
    images.forEach(item => {
      item.classList.remove('entertainment-section__animation-img--none');
    });
  }
};

const animationObserver = new IntersectionObserver(switchImageAnimated, {
  root: null,
  threshold: [0],
});

animationObserver.observe(sectionAnimation);
