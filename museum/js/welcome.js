let items = document.querySelectorAll('.slider__item');
let currentItem = 0;
let isEnabled = true;
let currNumb = document.getElementById('currNumb');

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('active', direction);
  });
}

function showItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add('next', direction);
  items[currentItem].addEventListener('animationend', function() {
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled = true;
  });
}

function prevItem(n) {
  hideItem('to-right');
  changeCurrentItem(n - 1);
  showItem('from-left');
  changeIndecation();
}

function nextItem(n) {
  hideItem('to-left');
  changeCurrentItem(n + 1);
  showItem('from-right');
  changeIndecation();
}

document.querySelector('.slider__btn-prev').addEventListener('click', function() {
  if(isEnabled) {
    prevItem(currentItem);
  }
})

document.querySelector('.slider__btn-next').addEventListener('click', function() {
  if(isEnabled) {
    nextItem(currentItem);
  }
})


const swipeDetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restraint = 100;
  let allowedTime = 500;

  surface.addEventListener('mousedown', function(e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  })

  surface.addEventListener('mouseup', function(e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) > threshold && Math.abs(distY) < restraint) {
        if (distX > 0) {
          if (isEnabled) {
            prevItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }

    e.preventDefault();
  })
}
let el = document.querySelector('.slider__shadow');
swipeDetect(el);

let bullets = document.querySelectorAll('.slider__icon');

function removeActive() {
  bullets.forEach(n => n.classList.remove('slider__active'));
}

function changeIndecation() {
  currNumb.innerHTML=`0${currentItem + 1}`;
  removeActive();
  bullets[currentItem].classList.add('slider__active');
}

bullets[0].addEventListener('click', function() {
  prevItem(1);
  bullets[0].classList.add('slider__active');
})
bullets[1].addEventListener('click', function() {
  prevItem(2);
  bullets[1].classList.add('slider__active');
})
bullets[2].addEventListener('click', function() {
  prevItem(3);
  bullets[2].classList.add('slider__active');
})
bullets[3].addEventListener('click', function() {
  prevItem(4);
  bullets[3].classList.add('slider__active');
})
bullets[4].addEventListener('click', function() {
  prevItem(5);
  bullets[4].classList.add('slider__active');
})

