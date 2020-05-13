import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<button class="cart-icon"></button>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (this.elem.closest('.cart-icon_visible')) {
      if ( document.documentElement.clientWidth <= 767 ) {

        // clear all elem styles
        this.elem.style.position = '';
        this.elem.style.top = '';
        this.elem.style.left = '';
        this.elem.style.zIndex = '';

      } else {

        this.elem.style.position = 'fixed';
        this.elem.style.top = `50px`;
        this.elem.style.zIndex = '10000';

        // calculate right position
        let container = document.querySelectorAll('.container');
        let rightSpace = document.documentElement.clientWidth - container[0].getBoundingClientRect().left - container[0].offsetWidth;
        if ( rightSpace >= this.elem.offsetWidth + 20 ) {
          this.elem.style.left = container[0].getBoundingClientRect().left + container[0].offsetWidth + 20 + 'px';
        } else {
          this.elem.style.left = document.documentElement.clientWidth - this.elem.offsetWidth - 10 + 'px';
        }
      }
    }

  }
}
