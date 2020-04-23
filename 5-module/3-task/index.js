function initCarousel() {
  // init
  let slider = document.querySelector('[data-carousel-holder]');

  // find slider arrows
  let sliderArrows = slider.querySelectorAll('.carousel__arrow');

  // find main carousel
  let sliderWrap = slider.querySelector('.carousel__inner');

  // find all carousel items
  let sliderItems = sliderWrap.querySelectorAll('.carousel__slide');

  // set default slide
  let defaultIndex = 0;

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

  // main slider function
  function sliderMain() {
    let slidesWidth = currentIndex * -sliderWrap.offsetWidth;
    sliderWrap.style.transform = `translateX(${slidesWidth}px)`;
    showHideArrow();
  }

  // show or hide slider arrow
  function showHideArrow() {
    // sorting collection of arrows
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

}
