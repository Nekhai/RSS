const time = document.querySelector('.time');
const screenDate = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};


function showDate() {
  const date = new Date();
  const currentDate = date.toLocaleDateString('en-Us', options);
  const currentTime = date.toLocaleTimeString();
  screenDate.textContent = currentDate;
  time.textContent = currentTime;

  setTimeout(showDate, 1000)
}

showDate()
