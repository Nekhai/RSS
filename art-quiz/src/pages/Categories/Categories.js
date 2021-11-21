import CategoriesPicHtml from './CategoriesPic.html'
import CategoriesArtHtml from './CategoriesArt.html'
export class Categories {
  constructor() {}
  async render () {
    if (localStorage.categories === 'artist') {
      return CategoriesArtHtml;
    } else {
      return CategoriesPicHtml;
    }
  }

  async after_render () {
    const btnCategories = document.querySelector('.categories__btn');

    btnCategories.addEventListener('click', () => {
      window.location.hash = '/';
    })
  };
}
