const pictureInnerContainer = document.querySelector('.gallery__picture-inner-container');
let arrImg = ['galery1.jpg', 'galery2.jpg', 'galery3.jpg', 'galery4.jpg', 'galery5.jpg', 'galery6.jpg', 'galery7.jpg', 'galery8.jpg', 'galery9.jpg', 'galery10.jpg', 'galery10.jpg', 'galery12.jpg', 'galery13.jpg', 'galery14.jpg', 'galery15.jpg'];

function randomImg() {
  arrImg.sort(() => Math.random() - 0.5);
  let createImg = arrImg.map((pic) => {
    const img = document.createElement('img');
    img.classList.add('gallery__img')
    img.src = `assets/img/${pic}`;
    img.alt = `${pic}`;
    pictureInnerContainer.append(img);
  })
}

randomImg();

const newList = document.querySelectorAll('.gallery__img');
newList[0].classList.add('gallery__img-padding');
newList[10].classList.add('gallery__img-padding');

function checkImg(e) {
  newList.forEach(pic => {
    let rect = pic.getBoundingClientRect();
    const picTop = window.scrollY + window.innerHeight;
    const picBottom = rect.top + window.pageYOffset + pic.height;
    const isHalfShow = picTop > rect.top + window.pageYOffset;
    const isNotScrolled = window.scrollY < picBottom;
    if (isHalfShow && isNotScrolled) {
      pic.classList.add('gallery__img-active');
    } else {
      pic.classList.remove('gallery__img-active');
    }
  })
}

window.addEventListener('scroll', checkImg)


