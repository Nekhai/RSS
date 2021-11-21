import FooterHtml from './Footer.html';
export class Footer {
  constructor() {}

  async render () {
    return FooterHtml;
  }

  async after_render () {};
}
