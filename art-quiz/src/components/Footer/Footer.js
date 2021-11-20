export class Footer {
  constructor() {}

  async render () {
    const FooterElement = `
    <h1>Footer</h1>
    `
    return FooterElement;
  }

  async after_render () {};
}
