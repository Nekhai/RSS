export class Categories {
  constructor() {}

  async render () {
    const CategoriesElement = `
    <h1>Categories</h1>
    `;

    return CategoriesElement;
  }

  async after_render () {};
}
