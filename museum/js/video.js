const player = document.querySelector('.video__player');
const video = document.querySelector('.video__display');
const btnPlay = document.querySelector('.control__btn-play');
const btnMute = document.querySelector('.control__btn-mute');
const btnScreen = document.querySelector('.control__btn-screen');
const progress = document.querySelector('.control__progress');
const volume = document.querySelector('.control__volume');
const btnStart = document.querySelector('.video__start');
const control = document.querySelector('.video__control');
const showSpeed = document.querySelector('.video__speed');
let currentSpeed = 1;
  
function playVideo() {
  document.querySelector('video').playbackRate = 1;
  showSpeed.style.display = 'none';
  if (video.paused) {
    video.play();
    btnPlay.style.background = 'url(./assets/svg/play.svg) no-repeat';
    btnStart.style.display = 'none';
  } else {
    video.pause();
    btnPlay.style.background = 'url(./assets/svg/pause.svg) no-repeat';
    btnStart.style.display = 'block';
  }
}

function changeVolume() {
  video.volume = this.value;
  video.value = this.value * 100;
  volume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${video.value}%, #fff ${video.value}%, white 100%)`
  if (volume.value === '0') {
    btnMute.style.background = 'url(./assets/svg/mute.svg) no-repeat';
  } else {
    btnMute.style.background = 'url(./assets/svg/volume.svg) no-repeat';
  }
}

function videoProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  progress.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progress.value}%, #fff ${progress.value}%, white 100%)`
  if (progress.value === '100') {
    btnPlay.style.background = 'url(./assets/svg/pause.svg) no-repeat';
  } 
}

function changeProgress(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function muteVolume() {
  if (video.muted === false) {
    video.muted = true;
    btnMute.style.background = 'url(./assets/svg/mute.svg) no-repeat';
  } else {
    video.muted = false;
    btnMute.style.background = 'url(./assets/svg/volume.svg) no-repeat';
  }
}

function fullScreen() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

function currentSpeedControl() {
  document.querySelector('video').playbackRate = currentSpeed;
  showSpeed.innerHTML = `${currentSpeed}x`;
  showSpeed.style.display = 'block';
  if (currentSpeed === 1) {
    showSpeed.style.display = 'none';
  }
}

function speedUp() {
  if (event.shiftKey === true) {
    currentSpeed += 0.25;
    currentSpeedControl();
  } else if (video.paused) {
    video.currentTime += 0.04;
  }
}

function speedDown() {
  if (event.shiftKey === true && currentSpeed > 0.25) {
    currentSpeed -= 0.25;
    currentSpeedControl();
  } else if (video.paused) {
    video.currentTime -= 0.04;
  }
}

function whatKey(event) {
  event.preventDefault();
  switch (event.code) {
    case 'Space':
      playVideo();
      break;
    case 'KeyK':
      playVideo();
      break;    
    case 'KeyM':
      muteVolume();
      break;  
    case 'KeyF':
      fullScreen();
    break; 
    case 'Comma':
      speedDown();
    break;   
    case 'Period':
      speedUp();
      break;   
  }
}

btnPlay.addEventListener('click', playVideo);
video.addEventListener('click', playVideo);
volume.addEventListener('change', changeVolume);
progress.addEventListener('click', changeProgress);
video.addEventListener('timeupdate', videoProgress);
btnMute.addEventListener('click', muteVolume);
btnScreen.addEventListener('click', fullScreen);
btnStart.addEventListener('click', playVideo);
document.addEventListener('keydown', whatKey);







// video slider
let videoItem = document.querySelectorAll('.list__item');
let currentVideo = 0;
let isEnabledVideo = true;

function changeCurrentVideo(n) {
  currentVideo = (n + videoItem.length) % videoItem.length;

}

function hideVideo(direction) {
  isEnabledVideo = false;
  videoItem[currentVideo].classList.add(direction);
  videoItem[currentVideo].addEventListener('animationend', function() {
    this.classList.remove('video__active', direction);
  });
}

function showVideo(direction) {
  isEnabledVideo = false;
  videoItem[currentVideo].classList.add('video__next', direction);
  videoItem[currentVideo].addEventListener('animationend', function() {
    this.classList.remove('video__next', direction);
    this.classList.add('video__active');
    isEnabledVideo = true;
  });
}

function prevVideo(n) {
  hideVideo('to-right-video');
  changeCurrentVideo(n - 1);
  showVideo('from-left-video');
  // changeIndecation();
}

function nextVideo(n) {
  hideVideo('to-left-video');
  changeCurrentVideo(n + 1);
  showVideo('from-right-video');
  // changeIndecation();
}

document.querySelector('.list__btn-prev').addEventListener('click', function() {
  if(isEnabledVideo) {
    prevVideo(currentVideo);
    // video.style.transform = `translateY(-450px)`;
  }
})

document.querySelector('.list__btn-next').addEventListener('click', function() {
  if(isEnabledVideo) {
    nextVideo(currentVideo);
    // video.style.transform = `translateX(450px)`;
  }
})
