import SettingsHtml from './Setting.html'
export class Settings {
  constructor() {}

  async render () {
    return SettingsHtml;
  }

  async after_render () {
    const btnSetBack = document.querySelector('.setting__btn-back');
    const btnSetClose = document.querySelector('.setting__btn-close');
    const btnSetting = document.querySelector('.header__btn')
    btnSetting.classList.add('hide');

    
    btnSetBack.addEventListener('click', () => {
      window.location.hash = '/'
    })
    btnSetClose.addEventListener('click', () => {
      window.location.hash = '/'
    })
  };
}
