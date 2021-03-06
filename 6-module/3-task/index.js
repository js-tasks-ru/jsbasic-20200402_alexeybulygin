import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  // main skeleton
  constructor(slides) {
    this.slides = slides;

    this.render(slides);

    // main slider method
    this.slider();

    // add to cart event
    this.elem.addEventListener('click', (event) => this.addToCart(event));
  }

  // render method
  render(slider) {
    // creating a new element
    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');

    let productPicturesPath = '/assets/images/carousel';

    let sliderItems = slider.map( item => {
      return `
      <div class="carousel__slide" data-id="${item.id}">
        <img src="${productPicturesPath}/${item.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `;
    }).join('');

    // slider skeleton
    this.elem.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${sliderItems}
      </div>
    `;
  }

  // add to cart event
  addToCart(event) {
    if ( event.target.closest('.carousel__button') ) {
      this.elem.dispatchEvent(new CustomEvent("product-add", {
        detail: event.target.closest('.carousel__slide').dataset.id,
        bubbles: true
      }));
    }
  }

  // main function of the slider
  slider() {
    // find slider arrows
    let sliderArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let sliderArrowRight = this.elem.querySelector('.carousel__arrow_right');

    // find main carousel
    let sliderWrap = this.elem.querySelector('.carousel__inner');

    // find all carousel items
    let sliderItems = this.elem.querySelectorAll('.carousel__slide');

    // set default slide
    let defaultIndex = 0;

    // execute sliderMain function
    sliderMain();

    // slider swipe left/right events
    let touchParams = [];
    document.addEventListener('touchmove', (event) => {
      if ( event.target.closest('.carousel__inner') ) {
        touchParams.push(event.touches[0].clientX);
      }
    });
    document.addEventListener('touchend', () => {
      if ( touchParams[0] > touchParams[touchParams.length - 1] && defaultIndex != sliderItems.length - 1 ) {
        nextSlide();
      } else if ( touchParams[0] < touchParams[touchParams.length - 1] && defaultIndex != 0 ) {
        prevSlide();
      }
      // clear touchParams array for next touchmove event
      touchParams = [];
    });

    // slider arrow click event
    document.addEventListener('click', (event) => {
      if ( event.target.closest('.carousel__arrow_right') ) {
        nextSlide();
      } else if ( event.target.closest('.carousel__arrow_left') ) {
        prevSlide();
      }
    });

    // turn to next slide
    function nextSlide() {
      defaultIndex++;
      sliderMain();
    }

    // turn to previous slide
    function prevSlide() {
      defaultIndex--;
      sliderMain();
    }

    // main slider function
    function sliderMain() {
      let slidesWidth = defaultIndex * -sliderWrap.offsetWidth;
      sliderWrap.style.transform = `translateX(${slidesWidth}px)`;
      showHideArrow();
    }

    // show or hide slider arrow
    function showHideArrow() {
      // sorting collection of arrows
      if ( defaultIndex > 0 && defaultIndex < sliderItems.length - 1 ) {
        sliderArrowLeft.style.display = '';
        sliderArrowRight.style.display = '';
      } else if (defaultIndex == '0') {
        sliderArrowLeft.style.display = 'none';
      } else if ( defaultIndex == sliderItems.length - 1 ) {
        sliderArrowRight.style.display = 'none';
      }
    }
  }

}
