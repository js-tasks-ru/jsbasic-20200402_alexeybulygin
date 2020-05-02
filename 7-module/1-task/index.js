import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.render(categories);

    this.elem.addEventListener('click', (event) => this.categoryFilter(event));
    this.elem.addEventListener('click', (event) => this.arrowClick(event));

  }

  render(menu) {

    // create a new element and adding him class
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');

    // mapping array
    let menuItems = menu.map( item => {
      return `
        <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>
      `;
    }).join('');

    this.elem.innerHTML = `
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${menuItems}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `;

  }

  categoryFilter(event) {

    if ( event.target.closest('.ribbon__item') ) {
      event.preventDefault();

      // adding active class for selected element
      let items = event.target.closest('.ribbon__inner').querySelectorAll('.ribbon__item');
      for (let item of items) {
        item.classList.remove('ribbon__item_active');
      }
      event.target.closest('.ribbon__item').classList.add('ribbon__item_active');

      // custom event
      this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
        detail: event.target.closest('.ribbon__item').dataset.id,
        bubbles: true,
      }));
    }

  }

  arrowClick(event) {
    let ribbonInner = this.elem.querySelector('.ribbon__inner');

    // find arrows
    let arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    let arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    // get scroll value;
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollRight = ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth;

    // arrow click scroll action
    let scrollValue = 350;
    if ( event.target.closest('.ribbon__arrow_right') ) {
      ribbonInner.scrollBy(scrollValue, 0);
      scrollLeft += scrollValue;
      arrowUpdate();
    } else if ( event.target.closest('.ribbon__arrow_left') ) {
      ribbonInner.scrollBy(-scrollValue, 0);
      scrollRight -= scrollValue;
      arrowUpdate();
    }

    function arrowUpdate() {
      scrollLeft > 0 ? arrowLeft.classList.add('ribbon__arrow_visible') : arrowLeft.classList.remove('ribbon__arrow_visible');
      scrollRight > 0 ? arrowRight.classList.add('ribbon__arrow_visible') : arrowRight.classList.remove('ribbon__arrow_visible');
    }
  }


}
