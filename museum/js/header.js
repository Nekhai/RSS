const burgerBtn = document.querySelector('.header__burger-btn');
const burgerMenu = document.querySelector('.burger');
const btnWrap = document.querySelector('.header__burger-wrap');
const welTitle = document.querySelector('.welcome__content');

function showBurger() {
  burgerMenu.classList.toggle('animation');
  welTitle.classList.toggle('hideTitle');
}
function closeBurger(event) {
  if (event.target.id != 'burger' || event.target.id != 'burger-btn') {
    burgerMenu.classList.remove('animation');
    welTitle.classList.remove('hideTitle');
  }
}

burgerBtn.addEventListener('click', showBurger);
document.addEventListener('click', closeBurger);
btnWrap.addEventListener('click', function(event) {
  event.stopPropagation()
});
// burgerMenu.addEventListener('click', function(event) {
//   event.stopPropagation()
// });

