import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.render(product);

    this.elem.addEventListener('click', (event) => this.addToCart(event));
    this.id = product.id;
  }

  render(product) {
    // create element
    this.elem = document.createElement('div');

    // add card class for the root element
    this.elem.classList.add('card');

    // set product pictures path
    let productImagePath = '/assets/images/products';

    // create product card skeleton
    this.elem.innerHTML = `
    <div class="card__top">
      <img src="${productImagePath}/${product.image}" class="card__image" alt="product">
      <span class="card__price">€${product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
    `;
  }

  addToCart(event) {
    if ( event.target.closest('.card__button') ) {
      this.elem.dispatchEvent(new CustomEvent("product-add", {
        detail: this.id,
        bubbles: true
      }));
    }
  }

}
