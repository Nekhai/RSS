let state = {
  language: 'en',
  photoSource: 'github',
  blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}

// date
const time = document.querySelector('.time');
const screenDate = document.querySelector('.date');
const options = {weekday: 'long', month: 'long', day: 'numeric'};

function setDate() {
  const date = new Date();
  let currentDate;
  if (state.language === 'en') {
    currentDate = date.toLocaleDateString('en-Us', options);
  } else {
    currentDate = date.toLocaleDateString('ru-Ru', options);
  }

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
const greeting = document.querySelector('.greeting');
let textGreeting;
let textGreetingRu;
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

  if (hours < 6) {
    textGreetingRu = 'Доброе утро';
  } else if (hours < 12) {
    textGreetingRu = 'Доброе утро';
  } else if (hours < 18) {
    textGreetingRu = 'Добрый день';
  } else {
    textGreetingRu = 'Добрый вечер';
  }

  if (state.language === 'en') {
    greeting.textContent = `Good ${textGreeting}`;
  } else {
    greeting.textContent = textGreetingRu;
  }
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
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${state.language}&appid=863302701d9f6f247fdcd9f107f23dd9&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 


  weatherIcon.className = 'weather-icon owf'
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  if (state.language === 'en') {
    wind.textContent = `Winde speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)} %`;
  } else {
    wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
    humidity.textContent = `Влажность: ${Math.round(data.main.humidity)} %`;
  }

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
const player = document.querySelector('.player');
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
player.addEventListener('keydown', function(event) {
  event.preventDefault();
})
let currentAudioTime = '0';

audio.addEventListener('ended', playNext);

function playAudio() {
  // currentAudioTime = audio.currentTime;
  audio.src = playList[playNum].src;
  // audio.currentTime = '0';
  if (!isPlay) {
    // audio.currentTime = currentAudioTime;
    // console.log(audio.currentTime)
    audio.play();
    isPlay = true;
    toggleBtn();
    playItems[playNum].classList.add('item-active');
  } else {
    // currentAudioTime = audio.currentTime;
    // console.log(audio.currentTime)
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
  } else {
    playNum++;
  }
  changeAudio();
}
function playPrev() {
  if (playNum === 0) {
    playNum = playList.length - 1;
  } else {
    playNum--;
  }
  changeAudio();
}

function changeAudio() {
  isPlay = false;
  changeAudioTitle();
  removeActiveClass();
  playAudio();
}

function removeActiveClass() {
  playItems.forEach(el => {
    el.classList.remove('item-active');
    btnPlay.classList.remove('pause');
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
const btnMute = document.querySelector('.unmute');
changeAudioTitle();
changeAudioDuration();

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
  if (volume.value === '0') {
    btnMute.classList.add('mute');
  } else {
    btnMute.classList.remove('mute');
  }
}

function changProgressBg() {
  progress.value = (audio.currentTime / audio.duration) * 100;
  progress.style.background = `linear-gradient(to right, #FF940A 0%, #FF940A ${progress.value}%, #ffffff ${progress.value}%, white 100%)`
}

function changeProgress(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * audio.duration;
  audio.currentTime = scrubTime;
}

function muteVolume() {
  if (audio.muted === false) {
    audio.muted = true;
    btnMute.classList.add('mute');
  } else {
    audio.muted = false;
    btnMute.classList.remove('mute');
  }
}

volume.addEventListener('change', changeVolume);
progress.addEventListener('click', changeProgress);
audio.addEventListener('timeupdate', changProgressBg);
audio.addEventListener('timeupdate', changeAudioDuration);
btnMute.addEventListener('click', muteVolume);

// setting
const menu = document.querySelector('.menu');
const closeMenu =document.querySelector('.close-menu');
const setting = document.querySelector('.setting');
const inputTime = document.querySelector('#time');
const inputDate = document.querySelector('#date');
const inputGreeting = document.querySelector('#greeting');
const inputQuotes = document.querySelector('#quotes');
const inputWeather = document.querySelector('#weather');
const inputAudio = document.querySelector('#audio-player');
const greetingContainer = document.querySelector('.greeting-container')
const weather = document.querySelector('.weather');
const quoteWrap = document.querySelector('.quote-wrap');

inputTime.addEventListener('change', function() {
  if (!this.checked) {
    time.classList.add('hide');
    time.classList.remove('show');
    delete state.blocks[0];

  } else {
    time.classList.add('show')
    time.classList.remove('hide');
    state.blocks[0] = 'time';
    console.log(state.blocks[0])
  }
});
inputDate.addEventListener('change', function() {
  if (!this.checked) {
    screenDate.classList.add('hide');
    screenDate.classList.remove('show');
  } else {
    screenDate.classList.add('show')
    screenDate.classList.remove('hide');
  }
});
inputGreeting.addEventListener('change', function() {
  if (!this.checked) {
    greetingContainer.classList.add('hide');
    greetingContainer.classList.remove('show');
  } else {
    greetingContainer.classList.add('show')
    greetingContainer.classList.remove('hide');
  }
});
inputQuotes.addEventListener('change', function() {
  if (!this.checked) {
    quoteWrap.classList.add('hide');
    quoteWrap.classList.remove('show');
    changeQuote.classList.add('hide');
    changeQuote.classList.remove('show');
  } else {
    quoteWrap.classList.add('show')
    quoteWrap.classList.remove('hide');
    changeQuote.classList.add('show')
    changeQuote.classList.remove('hide');
  }
});
inputWeather.addEventListener('change', function() {
  if (!this.checked) {
    weather.classList.add('hide');
    weather.classList.remove('show');
  } else {
    weather.classList.add('show')
    weather.classList.remove('hide');
  }
});
inputAudio.addEventListener('change', function() {
  if (!this.checked) {
    player.classList.add('hide');
    player.classList.remove('show');
  } else {
    player.classList.add('show')
    player.classList.remove('hide');
  }
});

function showMenu() {
  setting.classList.toggle('show-menu');
  menu.classList.toggle('hide-btn');
}

menu.addEventListener('click', showMenu);
closeMenu.addEventListener('click', showMenu);

// function setSettingLocalStorage() {
//   localStorage.setItem('setting', state.blocks[0])
// }
// function getSettingLocalStorage() {
//   if (localStorage.getItem('setting')) {
//     state.blocks[0] = localStorage.getItem('setting');
//     hideBlock();
//   }
// }

// function hideBlock() {
//   if (!state.blocks[0]) {
//     time.classList.add('hide');
//     time.classList.remove('show');
//   }
// }

// window.addEventListener('load', getSettingLocalStorage);
// window.addEventListener('beforeunload', setSettingLocalStorage);

// console.log(state.blocks[0])


// language
const languages = document.querySelectorAll('[name="language"]');

function changeLang() {
  if (languages[0].checked) {
    state.language = 'en';
  } else {
    state.language = 'ru';  
  }
  getWeather()
}

languages.forEach(el => el.addEventListener('change', changeLang))
// console.log(state.language)


