function initCarousel() {
  // init
  let slider = document.querySelector('[data-carousel-holder]');

  // find slider arrows
  let sliderArrows = slider.querySelectorAll('.carousel__arrow');

  // find main carousel
  let sliderWrap = slider.querySelector('.carousel__inner');

  // find all carousel items
  let sliderItems = sliderWrap.querySelectorAll('.carousel__slide');

  // create empty array for params of every slide
  let carouselSlides = [];

  // add params of every slide to carouselSlides array
  sliderItems.forEach((item, i) => {
    carouselSlides[i] = {
      width: item.offsetWidth,
    }
  });

  // set default slide index
  let currentIndex = 0;

  // execute sliderMain function
  sliderMain();

  // slider arrow click event
  for (let item of sliderArrows) {
    item.addEventListener('click', (event) => {
      if ( event.currentTarget.classList.contains('carousel__arrow_right') ) {
        currentIndex++;
      } else {
        currentIndex--;
      }
      sliderMain();
    });
  }

  // show or hide slider arrow
  function showHideArrow() {
    // sorting collection
    for (let item of sliderArrows) {
      if ( currentIndex > 0 && currentIndex < sliderItems.length - 1 ) {
        item.style.display = '';
      } else if (currentIndex == '0') {
        if ( item.classList.contains('carousel__arrow_left') ) {
          item.style.display = 'none';
        }
      } else if ( currentIndex == sliderItems.length - 1 ) {
        if ( item.classList.contains('carousel__arrow_right') ) {
          item.style.display = 'none';
        }
      }
    }
  }

  // main slider function
  function sliderMain() {
    let slidesWidth = 0;
    for (let i = 0; i < currentIndex; i++) {
      slidesWidth -= carouselSlides[i].width;
    }
    for (let item of sliderItems) {
      item.style.transform = `translateX(${slidesWidth}px)`;
      item.style.transition = 'all .5s';
    }
    showHideArrow();
  }

}
