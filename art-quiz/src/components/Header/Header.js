import HeaderHtml from './Header.html';
export class Header {
  constructor() {}

  async render () {
    return HeaderHtml;
  }

  async after_render () {
    const btnSetting = document.querySelector('.header__btn')

    btnSetting.addEventListener('click', () => {
      window.location.hash = '/settings'
    })
  };
}
