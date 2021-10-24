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
  // body.style.backgroundImage = `url('https://raw.githubusercontent.com/nekhai/stage1-tasks/assets/images/${textGreeting}/${bgNum}.jpg')`;
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



