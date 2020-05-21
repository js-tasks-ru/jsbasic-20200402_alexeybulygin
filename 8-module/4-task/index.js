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

    this.cartItems.forEach((item, i) => {
      if ( item.product.id === productId ) {
        item.count = item.count + amount;
        if ( item.count < 1 ) {
          this.cartItems.splice([i], 1);
        }
      }
    });

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
          <div class="cart-product__price">€${(product.price).toFixed(2)}</div>
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
    this.modal = new Modal();

    this.modalBody = document.createElement('div');

    this.cartItems.forEach(item => {
      this.modalBody.prepend(this.renderProduct(item.product, item.count));
    });

    this.modalBody.append(this.renderOrderForm());

    this.modal.setTitle('Your order');
    this.modal.setBody(this.modalBody);
    this.modal.open();

  }

  onProductUpdate(productId) {
    this.cartIcon.update(this);

    if ( document.body.classList.contains('is-modal-open') ) {

      let productRow = this.cartItems.find(item => item.product.id === productId);

      if ( !this.isEmpty() && productRow ) {

        document.querySelector(`[data-product-id=${productId}]`).innerHTML = this.renderProduct(productRow.product, productRow.count).innerHTML;

        let productCount = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        let infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`);

        productCount.innerHTML = productRow.count;
        productPrice.innerHTML = `€${(productRow.product.price * productRow.count).toFixed(2)}`;
        infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

      } else if ( this.isEmpty() ) {
        this.modal.close();
      } else {
        this.modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
      }

    }

  }

  onSubmit(event) {
    event.preventDefault();

    event.target.querySelector('[type="submit"]').classList.add('is-loading');

    let response = fetch('https://httpbin.org/post', {
        method: 'POST',
        body: new FormData(event.target)
    })
    .then(response => {
      if ( response.ok ) {
        this.modal.setTitle('Success!');
        this.cartItems = [];
        this.cartIcon.update(this);
        this.modalBody.innerHTML = `
          <div class="modal__body-inner">
          <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
          </p>
          </div>
        `;
      }
    });

  };

  addEventListeners(event) {

    document.addEventListener('click', (event) => {
      if ( event.target.closest('.cart-counter__button_minus') ) {
        let productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, -1);
      } else if ( event.target.closest('.cart-counter__button_plus') ) {
        let productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, 1);
      }
    });

    document.addEventListener('click', (event) => {
      if ( event.target.closest('.cart-form') ) {
        event.target.closest('.cart-form').onsubmit = (event) => this.onSubmit(event);
      }
    });

    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
