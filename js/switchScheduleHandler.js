const lectureDayList = document.querySelector('.lecture-section__date-list');
const lectureDays = document.querySelectorAll('.lecture-section__date');
const lectureSchedule = document.querySelectorAll(
  '.lecture-section__daily-schedule'
);

lectureDayList.addEventListener('click', event => {
  event.preventDefault();
  const href = event.target.getAttribute('href');
  if (
    event.target.classList.contains('lecture-section__date') &&
    !event.target.classList.contains('lecture-section__date--active')
  ) {
    lectureDays.forEach(item =>
      item.classList.remove('lecture-section__date--active')
    );
    event.target.classList.add('lecture-section__date--active');

    lectureSchedule.forEach(item => {
      if (item.id === href)
        item.classList.add('lecture-section__daily-schedule--active');
      else item.classList.remove('lecture-section__daily-schedule--active');
    });
  }
});
