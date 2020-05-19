export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.render(steps, value);

    this.value = value;
    this.defaultPosition(value);


    this.elem.addEventListener('click', (event) => this.onClick(event));
    this.elem.addEventListener('pointerdown', (event) => this.changeSpicy(event));

  }

  render(steps, value) {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value"></span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
      </div>
    `;

    for (let i = 0; i < steps; i++) {
      let item = document.createElement('span');
      this.elem.querySelector('.slider__steps').append(item);
    }

  }

  defaultPosition(value) {
    this.setActivePoint(value);

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

    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);

  }

  onPointerMove = (event) => {

    event.preventDefault();

    this.elem.classList.add('slider_dragging');

    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderLeftPosition = this.elem.getBoundingClientRect().left;
    let steps = this.elem.querySelectorAll('.slider__steps span');
    let spanWidth = steps.length - 1;

    // turn off browser drag
    sliderThumb.ondragstart = () => false;

    let clickCoord = (event.clientX - sliderLeftPosition) / (this.elem.offsetWidth / spanWidth);
    this.value = Math.round(clickCoord);
    if ( this.value <= 0 ) this.value = 0;
    if ( this.value > steps.length - 1 ) this.value = steps.length - 1;

    // set active class for selected point
    if ( clickCoord > 0 && clickCoord < steps.length - 1 ) {
      if ( event.type === 'pointermove' ) {
        this.setActivePoint(clickCoord);
      } else {
        this.setActivePoint(this.value);
      }
    }


  }

  onPointerUp = (event) => {
    this.removeEventListeners();

    this.value = Math.round(this.value);

    this.setActivePoint(this.value);

    this.elem.classList.remove('slider_dragging');

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })
    );
  }

  onClick(event) {
    this.onPointerMove(event);

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: this.value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })
    );
  }

  setActivePoint(value) {
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');
    let steps = this.elem.querySelectorAll('.slider__steps span');

    for (let item of steps) {
      item.classList.remove('slider__step-active');
    }
    steps[Math.round(value)].classList.add('slider__step-active');

    let leftPercents = value * (100 / (steps.length - 1));
    sliderThumb.style.left = `${leftPercents}%`;
    sliderProgress.style.width = `${leftPercents}%`;
    sliderValue.textContent = Math.round(this.value);

  }

  removeEventListeners() {
    document.removeEventListener('pointermove', this.onPointerMove);
  }

}
