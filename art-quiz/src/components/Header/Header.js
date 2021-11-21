import HeaderHtml from './Header.html';
export class Header {
  constructor() {}

  async render () {
    return HeaderHtml;
  }

  async after_render () {};
}
