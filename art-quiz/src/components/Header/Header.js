export class Header {
  constructor() {}

  async render () {
    const FooterElement = `
    <h1>Header</h1>
    `
    return FooterElement;
  }

  async after_render () {};
}
