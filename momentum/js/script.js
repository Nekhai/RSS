// date
const time = document.querySelector('.time');
const screenDate = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};

function setDate() {
  const date = new Date();
  const currentDate = date.toLocaleDateString('en-Us', options);
  screenDate.textContent = currentDate;
}

function setTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
}

function showAll() {
  setDate();
  showGreeting();
  setTime();
  setTimeout(showAll, 1000);
}

// hello
const gretting = document.querySelector('.greeting');
let textGreeting;
function showGreeting() {
  const date = new Date();
  const hours = date.getHours();

  if (hours < 6) {
    textGreeting = 'night';
  } else if (hours < 12) {
    textGreeting = 'morning';
  } else if (hours < 18) {
    textGreeting = 'afternoon';
  } else {
    textGreeting = 'evening';
  }
  gretting.textContent = `Good ${textGreeting}`;
}

let currentName = document.querySelector('.name');

function setLocalStorage() {
  localStorage.setItem('name', currentName.value)
}
function getLocalStorage() {
  if (localStorage.getItem('name')) {
    currentName.value = localStorage.getItem('name');
  }
}

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

showAll();

// slider
const body = document.querySelector('body');
const btnSlideNext = document.querySelector('.slide-next');
const btnSlidePrev = document.querySelector('.slide-prev');
let imgNum;

window.addEventListener('load', getRandomNum);
btnSlideNext.addEventListener('click', getSlideNext);
btnSlidePrev.addEventListener('click', getSlidePrev);


function getRandomNum() {
  imgNum = Math.ceil(Math.random() * 20);
  setBg();
}

function setBg() {
  const numToString = imgNum.toString();
  const bgNum = numToString.padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/nekhai/stage1-tasks/assets/images/${textGreeting}/${bgNum}.jpg`;
  img.onload = () => {      
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/nekhai/stage1-tasks/assets/images/${textGreeting}/${bgNum}.jpg')`;
  }; 
}

function getSlideNext() {
  if (imgNum === 20) {
    imgNum = 1;
  } else {
    imgNum++
  }
  setBg();
}
function getSlidePrev() {
  if (imgNum === 1) {
    imgNum = 20;
  } else {
    imgNum--
  }
  setBg();
}

// weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
city.value = 'Minsk';
const weatherError = document.querySelector('.weather-error');

async function getWeather() {  
  weatherError.textContent = '';
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=863302701d9f6f247fdcd9f107f23dd9&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 


  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Winde speed: ${Math.round(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${Math.round(data.main.humidity)} %`;
} catch (err) {
  weatherError.textContent = "Error, city don't exist";
  temperature.textContent = '';
  weatherDescription.textContent = '';
  wind.textContent = '';
  humidity.textContent = '';
}
}

function setCityLocalStorage() {
  localStorage.setItem('city', city.value)
}
function getCityLocalStorage() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  getWeather()
}

window.addEventListener('load', getCityLocalStorage);
window.addEventListener('beforeunload', setCityLocalStorage);
city.addEventListener('change', getWeather);

// quotes
const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes() {  
  const quotes = 'data.json';
  const res = await fetch(quotes);
  const data = await res.json(); 

  let quoteNum = Math.ceil(Math.random() * (data.length - 1));

  quote.textContent = data[quoteNum].quote;
  author.textContent = data[quoteNum].author;
}

changeQuote.addEventListener('click', getQuotes);

getQuotes();
