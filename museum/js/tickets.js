const buy = document.querySelector('.amount__btn-buy');
const close = document.querySelector('.booking__btn-close');
const booking = document.querySelector('.booking');
const form = document.querySelector('.booking__container');

function showBooking() {
  booking.classList.add('animation');
}

function hideBooking() {
  booking.classList.remove('animation');
}

buy.addEventListener('click', showBooking);
close.addEventListener('click', hideBooking);
booking.addEventListener('click', hideBooking);
form.addEventListener('click', function(event) {
  event.stopPropagation()
});
