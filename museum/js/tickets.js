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


let ticketPrice = 20;
let basicAmount = document.getElementById('basic-amount');
let seniorAmount = document.getElementById('senior-amount');
let totalAmount = document.getElementById('total-amount');
const changeTotalPrice = document.querySelectorAll('.change-total-price');

function checkTicketPrice() {
  const chbox1 = document.getElementById('ticket-choice1');
  const chbox2 = document.getElementById('ticket-choice2');
  const chbox3 = document.getElementById('ticket-choice3');
  if (chbox1.checked) {
    ticketPrice = 20;
  } else if (chbox2.checked) {
    ticketPrice = 25;
  } else {
    ticketPrice = 40;
  }
}

function countPrice() {
  checkTicketPrice();
  totalAmount.innerHTML = basicAmount.value * ticketPrice + seniorAmount.value * ticketPrice / 2;
}

changeTotalPrice.forEach(
  function(n) {
    console.log(ticketPrice)
    n.addEventListener('click', countPrice);
  }
)

// changeTotalPrice.addEventListener('click', countPrice);

