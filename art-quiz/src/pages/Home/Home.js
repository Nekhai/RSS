import HomeHtml from './Home.html';
export class Home {
  constructor() {}

  async render () {
    return HomeHtml;
  }

  async after_render () {
    const btnArtist = document.querySelector('.artist-btn');
    const btnPictures = document.querySelector('.pictures-btn');

    btnArtist.addEventListener('click', () => {
      localStorage.setItem('categories', 'artist');
      window.location.hash = '/categories'
    })
    btnPictures.addEventListener('click', () => {
      localStorage.setItem('categories', 'picture');
      window.location.hash = '/categories'
    })
  };
}

