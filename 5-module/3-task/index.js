function initCarousel() {
  // init
  let slider = document.querySelector('[data-carousel-holder]');

  // find slider arrows
  let sliderArrowLeft = slider.querySelector('.carousel__arrow_left');
  let sliderArrowRight = slider.querySelector('.carousel__arrow_right');

  // find main carousel
  let sliderWrap = slider.querySelector('.carousel__inner');

  // find all carousel items
  let sliderItems = sliderWrap.querySelectorAll('.carousel__slide');

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
