import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render(this.products);

  }

  render() {

    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');
    this.elem.innerHTML = `<div class="products-grid__inner"></div>`;

    let productsGrid = this.elem.querySelector('.products-grid__inner');

    for (let item of this.products) {
      this.itemConstruct(item);
    }

  }

  updateFilter(filters) {

    Object.assign(this.filters, filters);

    this.elem.querySelector('.products-grid__inner').innerHTML = '';

    for (let item of this.products) {

      if ( this.filters.noNuts && item.nuts ) continue;
      if ( this.filters.vegeterianOnly && !item.vegeterian ) continue;
      if ( item.spiciness > this.filters.maxSpiciness ) continue;
      if ( this.filters.category && item.category != this.filters.category ) continue;

      this.itemConstruct(item);

    }
  }

  itemConstruct(item) {
    let productCard = new ProductCard(item);
    this.elem.querySelector('.products-grid__inner').append(productCard.elem);
  }


}
