const pictureInnerContainer = document.querySelector('.gallery__picture-inner-container');
let arrImg = ['galery1.jpg', 'galery2.jpg', 'galery3.jpg', 'galery4.jpg', 'galery5.jpg', 'galery6.jpg', 'galery7.jpg', 'galery8.jpg', 'galery9.jpg', 'galery10.jpg', 'galery10.jpg', 'galery12.jpg', 'galery13.jpg', 'galery14.jpg', 'galery15.jpg'];

function randomImg() {
  arrImg.sort(() => Math.random() - 0.5);
  let createImg = arrImg.map((pic) => {
    const img = document.createElement('img');
    img.classList.add('gallery-img')
    img.src = `assets/img/${pic}`;
    img.alt = `${pic}`;
    pictureInnerContainer.append(img);
  })
}

randomImg();

const newList = document.querySelectorAll('.gallery-img');
newList[0].classList.add('gallery-img-padding');
newList[10].classList.add('gallery-img-padding');
