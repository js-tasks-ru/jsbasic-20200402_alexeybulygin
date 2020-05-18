export default class StepSlider {
  constructor({ steps, value = 1 }) {
    this.render(steps, value);

    this.defaultPosition(value);

    this.elem.addEventListener('pointerdown', (event) => this.changeSpicy(event));

  }

  render(steps, value) {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${value}</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
      </div>
    `;

    for (let i = 0; i < steps; i++) {
      let item = document.createElement('span');

      if ( i === value ) {
        item.classList.add('slider__step-active');
      }

      this.elem.querySelector('.slider__steps').append(item);
    }

  }

  defaultPosition(value) {
    this.onPointerMove(value);

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })
    );
  }

  changeSpicy(event) {

    event.preventDefault();

    // disable default drag and drop method
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    sliderThumb.ondragstart = () => false;

    let pointermoveLink = (event) => this.onPointerMove(event);
    document.addEventListener('pointermove', pointermoveLink);
    document.addEventListener('pointerup', (event) => {
      document.removeEventListener('pointermove', pointermoveLink);
      this.elem.classList.remove('slider_dragging');
      this.elem.dispatchEvent(
        new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
          detail: this.value, // значение 0, 1, 2, 3, 4
          bubbles: true // событие всплывает - это понадобится в дальнейшем
        })
      );

    });

    // recalculate value if simple click, not drag
    this.onPointerMove(event);

  }

  onPointerMove(event) {

    // add class while move event
    this.elem.classList.add('slider_dragging');

    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    let sliderPoints = this.elem.querySelectorAll('.slider__steps span');
    let sliderLeftPosition = this.elem.getBoundingClientRect().left;
    let steps = this.elem.querySelectorAll('.slider__steps span').length;
    let spanWidth = this.elem.offsetWidth / (steps - 1);

    // check if not defaultPosition
    if ( isNaN(event) ) {

      let clickCoord = event.clientX - sliderLeftPosition;
      this.value = Math.round(clickCoord / spanWidth);
      if ( this.value < 1 ) this.value = 0;
      if ( this.value > sliderPoints.length - 1 ) this.value = sliderPoints.length - 1;

      // set active class for selected point
      for (let item of sliderPoints) {
        item.classList.remove('slider__step-active');
      }
      this.elem.querySelectorAll('.slider__steps span')[this.value].classList.add('slider__step-active');

    } else {
      this.value = event;
    }

    // select active point and colring drag
    let leftPercents = 0;
    if ( isNaN(event) ) {
      leftPercents = this.value * (100 / (steps - 1));
    } else {
      leftPercents = event * (100 / (steps - 1));
    }
    sliderThumb.style.left = `${leftPercents}%`;
    sliderProgress.style.width = `${leftPercents}%`;
    sliderValue.textContent = this.value;

  }

}
