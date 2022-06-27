function initComparisons() {
  const sliderContainer = document.querySelector('.explore__img-container');
  const slideCover = document.querySelector('.explore__cover');
  const slider = document.querySelector('.explore__pic-mid');
  const width = sliderContainer.offsetWidth;
  let clicked = 0;

  function slideReady(e) {
    e.preventDefault();
    clicked = 1;
    window.addEventListener("mousemove", slideMove);
    window.addEventListener("touchmove", slideMove);
  }
  function slideFinish() {
    clicked = 0;
  }

  function slideMove(e) {
    let position;
    if (clicked == 0) return false;
    position = getCursorPos(e)
    if (position < 0) position = 0;
    if (position > width) position = width;
    slide(position);
  }
  function getCursorPos(e) {
    e = e || window.event;
    let coverWidth = slideCover.getBoundingClientRect();
    let posX = e.pageX - coverWidth.left;
    posX = posX - window.pageXOffset;
    return posX;
  }
  function slide(posX) {
    slideCover.style.width = posX + "px";
    slider.style.left = posX - 20 + "px";
  }

  slider.addEventListener("mousedown", slideReady);
  window.addEventListener("mouseup", slideFinish);
  slider.addEventListener("touchstart", slideReady);
  window.addEventListener("touchstop", slideFinish);

}

initComparisons()
