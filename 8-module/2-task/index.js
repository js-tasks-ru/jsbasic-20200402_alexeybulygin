import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render(this.products);

  }

  render(products) {

    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');
    this.elem.innerHTML = `<div class="products-grid__inner"></div>`;

    let productsGrid = this.elem.querySelector('.products-grid__inner');

    for (let item of products) {
      this.itemConstruct(item);
    }

  }

  updateFilter(filters) {

    this.elem.querySelector('.products-grid__inner').innerHTML = '';

    for (let item of this.products) {

      if ( filters.noNuts === true && !("nuts" in item) ) {
        this.itemConstruct(item);
      } else if ( filters.noNuts === false ) {
        this.itemConstruct(item);
      }

      if ( filters.vegeterianOnly && filters.vegeterianOnly === true ) {
        if ( "vegeterian" in item && item.vegeterian === true ) {
          this.itemConstruct(item);
        }
      } else if ( filters.vegeterianOnly && filters.vegeterianOnly === false ) {
        if ( "vegeterian" in item && item.vegeterian === false ) {
          this.itemConstruct(item);
        }
      }

      if ( filters.maxSpiciness && item.spiciness <= filters.maxSpiciness ) {
        this.itemConstruct(item);
      }

      if ( filters.category && item.category === filters.category ) {
        this.itemConstruct(item);
      }

    }

  }

  itemConstruct(item) {
    let productCard = new ProductCard(item);
    this.elem.querySelector('.products-grid__inner').append(productCard.elem);
  }


}
