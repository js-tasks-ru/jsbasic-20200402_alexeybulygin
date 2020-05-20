import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    let productId = product.id;

    if ( this.isEmpty() ) {
      this.cartItems.push({"product": product, "count": 1});
    } else {

      let hasProduct = this.cartItems.find(item => item.product.id === productId);
      if ( hasProduct ) {
        hasProduct.count += 1;
      } else {
        this.cartItems.push({"product": product, "count": 1});
      }

    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    this.getTotalCount();
    this.getTotalPrice();

    for (let i = 0; i < this.cartItems.length; i++) {
      let item = this.cartItems[i];
      if ( item.product.id === productId ) {
        item.count = item.count + amount;
        if ( item.count < 1 ) {
          this.cartItems.splice([i], 1);
        }
      }
    }

    this.onProductUpdate(productId);
  }

  isEmpty() {
    return ( this.cartItems.length > 0 ) ? false : true;
  }

  getTotalCount() {
    let totalCount = 0;

    for (let item of this.cartItems) {
      totalCount += item.count;
    }

    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;

    for (let item of this.cartItems) {
      totalPrice += item.product.price * item.count;
    }

    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    let modalBody = document.createElement('div');

    for (let i = 0; i < this.cartItems.length; i++) {
      let item = this.cartItems[i];
      modalBody.prepend(this.renderProduct(item.product, item.count));
    }

    modalBody.append(this.renderOrderForm());

    modal.setTitle('Your order');
    modal.setBody(modalBody);
    modal.open();

    document.addEventListener('click', (event) => {
      if ( event.target.closest('.cart-counter__button_minus') ) {
        let productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, -1);
      } else if ( event.target.closest('.cart-counter__button_plus') ) {
        let productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, +1);
      }
    });
  }

  onProductUpdate(productId) {
    this.cartIcon.update(this);
    if ( document.body.classList.contains('is-modal-open') ) {
      let modalBody = document.querySelector('.modal');
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      let item = this.cartItems.find(item => item.product.id === productId);
      if ( item ) {
        productCount.innerHTML = item.count;
      } else {
        modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
      }
      console.log(this.cartItems);
    }
  }

  onSubmit(event) {
    // ...ваш код
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
