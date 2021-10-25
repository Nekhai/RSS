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

// audio
const btnPlay = document.querySelector('.play');
const btnPlayNext = document.querySelector('.play-next');
const btnPlayPrev = document.querySelector('.play-prev');
const audio = new Audio();
let isPlay = false;
let playNum = 0;
const playListContainer = document.querySelector('.play-list');

btnPlay.addEventListener('click', playAudio);
btnPlayNext.addEventListener('click', playNext);
btnPlayPrev.addEventListener('click', playPrev);
body.addEventListener('keydown', function(event) {
  event.preventDefault();
})
let currentAudioTime = 0;

audio.addEventListener('ended', playNext);

function playAudio() {
  currentAudioTime = audio.currentTime;
  audio.src = playList[playNum].src;
  // audio.currentTime = 0;
  if (!isPlay) {
    audio.currentTime = currentAudioTime;
    console.log(audio.currentTime)
    audio.play();
    isPlay = true;
    toggleBtn();
    playItems[playNum].classList.add('item-active');
  } else {
    currentAudioTime = audio.currentTime;
    console.log(audio.currentTime)
    audio.pause();
    isPlay = false;
    toggleBtn();
  }
}

function toggleBtn() {
  btnPlay.classList.toggle('pause');
}

function playNext() {
  if (playNum === playList.length - 1) {
    playNum = 0;
    isPlay = false;
    changeAudioTitle()
    removeActiveClass();
    playAudio();
  } else {
    playNum++;
    isPlay = false;
    changeAudioTitle()
    removeActiveClass();
    playAudio();
  }
}
function playPrev() {
  if (playNum === 0) {
    playNum = playList.length - 1;
    isPlay = false;
    changeAudioTitle()
    removeActiveClass();
    playAudio();
  } else {
    playNum--;
    isPlay = false;
    changeAudioTitle()
    removeActiveClass();
    playAudio();
  }
}

function removeActiveClass() {
  playItems.forEach(el => {
    el.classList.remove('item-active');
  })
}

function addListTitle(el) {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = el.title;
  playListContainer.append(li);
}

// import playList from './playList.js';
const playList = [
  {      
    title: 'Aqua Caelestis',
    src: './assets/sounds/Aqua Caelestis.mp3',
    duration: '00:58'
  },  
  {      
    title: 'River Flows In You',
    src: './assets/sounds/River Flows In You.mp3',
    duration: '03:50'
  },
  {      
    title: 'Ennio Morricone',
    src: './assets/sounds/Ennio Morricone.mp3',
    duration: '01:37'
  },  
  {      
    title: 'Summer Wind',
    src: './assets/sounds/Summer Wind.mp3',
    duration: '01:50'
  }
]
// 

playList.forEach(el => {
  addListTitle(el);
})

const playItems = document.querySelectorAll('.play-item')

// custom audio
const progress = document.querySelector('.control-progress');
const volume = document.querySelector('.control-volume');
const audioTitle = document.querySelector('.current-audio');
const audioDuration = document.querySelector('.audio-duration');
changeAudioTitle();
changeAudioDuration()

function changeAudioTitle() {
  audioTitle.textContent = `${playNum + 1}. ${playList[playNum].title}`;
}
function changeAudioDuration() {
  if (!audio.duration) {
    audioDuration.textContent = `0:00 / ${playList[playNum].duration}`;
  } else {
    audioDuration.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  }
}

function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};

function changeVolume() {
  audio.volume = volume.value;
  // audio.value = this.value * 100;
}

function changProgressBg() {
  progress.value = (audio.currentTime / audio.duration) * 100;
  progress.style.background = `linear-gradient(to right, #FF940A 0%, #FF940A ${progress.value}%, #ffffff ${progress.value}%, white 100%)`
}

function changeProgress(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}

// function muteVolume() {
//   if (audio.muted === false) {
//     audio.muted = true;
//     btnMute.style.background = 'url(./assets/svg/mute.svg) no-repeat';
//   } else {
//     audio.muted = false;
//     btnMute.style.background = 'url(./assets/svg/volume.svg) no-repeat';
//   }
// }

volume.addEventListener('change', changeVolume);
progress.addEventListener('click', changeProgress);
audio.addEventListener('timeupdate', changProgressBg);
audio.addEventListener('timeupdate', changeAudioDuration);

