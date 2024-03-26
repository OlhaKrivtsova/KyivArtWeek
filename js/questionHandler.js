const questionList = document.querySelector('.faq-section__list');

questionList.addEventListener('click', event => {
  if (!event.target.classList.contains('faq-section__question')) return;
  const question = event.target;
  const answer = question.nextElementSibling;
  question.classList.toggle('faq-section__question--active');

  if (answer.style.maxHeight) {
    answer.style.maxHeight = null;
  } else {
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
});
