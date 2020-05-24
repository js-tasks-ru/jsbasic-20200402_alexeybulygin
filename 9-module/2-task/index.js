import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    return new Promise(async resolve => {

      this.cartIcon = new CartIcon();
      document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

      this.carousel = new Carousel(slides);
      document.querySelector('[data-carousel-holder]').append(this.carousel.elem);

      this.ribbonMenu = new RibbonMenu(categories);
      document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);

      this.stepSlider = new StepSlider({steps: 5, value: 3});
      document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);

      this.cart = new Cart(this.cartIcon);

      let productsAwait = await fetch('products.json');
      if ( productsAwait.ok ) {

        let productsPlace = document.querySelector('[data-products-grid-holder]');
        this.products = await productsAwait.json();

        productsPlace.innerHTML = '';
        this.productsGrid = new ProductsGrid(this.products);
        productsPlace.append(this.productsGrid.elem);

      }

      this.productsGrid.updateFilter({
        noNuts: document.getElementById('nuts-checkbox').checked,
        vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbonMenu.value
      });

      this.addEventListeners();

    });

  }

  addEventListeners() {

    document.addEventListener('product-add', (event) => {
      let product = this.products.find(item => item.id === event.detail);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail // значение остроты из события 'slider-change'
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail // категория из события 'ribbon-select'
      });
    });

    document.addEventListener('change', (event) => {

      if ( event.target.closest('#nuts-checkbox') ) {
        this.productsGrid.updateFilter({
          noNuts: event.target.checked // новое значение чекбокса
        });
      }

      if ( event.target.closest('#vegeterian-checkbox') ) {
        this.productsGrid.updateFilter({
          vegeterianOnly: event.target.checked // новое значение чекбокса
        });
      }

    });

  }


}
