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
    const cartsCategoties = document.querySelector('.categories__list');



    cartsCategoties.addEventListener('click', event => {
      let cartTarget = event.target.closest('.categories__item');
      if (cartTarget) {
        console.log(cartTarget.id)
        window.location.hash = '/questions';
      }
    })

    btnCategories.addEventListener('click', () => {
      window.location.hash = '/';
    })
  };
}
