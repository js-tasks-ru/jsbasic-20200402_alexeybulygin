import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.elem = document.createElement('div');
    this.elem.addEventListener('click', (event) => this.productAdd(event));
    this.id = product.id;
    this.render(product);
    return this.elem.innerHTML;
  }

  render(product) {
    // set product pictures path
    let productImagePath = '/assets/images/products';

    // add card class for the root element
    this.elem.classList.add('card');

    // create product card
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
    return this.elem;
  }

  productAdd(event) {
    if ( event.target.closest('.card__button') ) {
      this.elem.dispatchEvent(new CustomEvent("product-add", {
        detail: this.id,
        bubbles: true
      }));
    }
  }

}
