export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.render(steps, value);

    this.renderActivePoint(steps, value);

    this.elem.addEventListener('click', (event) => this.changeSpicy(event));
  }

  render(steps, value) {
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.innerHTML = `
      <div class="slider__thumb">
        <span class="slider__value">${value + 1}</span>
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

  renderActivePoint(steps, value) {
    let sliderThumb = this.elem.querySelector('.slider__thumb');
    let sliderProgress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');

    // set active class for selected point
    let sliderPoints = this.elem.querySelectorAll('.slider__steps span');
    for (let item of sliderPoints) {
      item.classList.remove('slider__step-active');
    }
    this.elem.querySelectorAll('.slider__steps span')[value].classList.add('slider__step-active');

    let leftPercents = value * (100 / (steps - 1));

    sliderThumb.style.left = `${leftPercents}%`;
    sliderProgress.style.width = `${leftPercents}%`;
    sliderValue.textContent = value;

  }

  changeSpicy(event) {
    let steps = this.elem.querySelectorAll('.slider__steps span').length;
    let spanWidth = this.elem.clientWidth / (steps - 1);
    let clickCoord = event.clientX - this.elem.getBoundingClientRect().left;
    let value = Math.round(clickCoord / spanWidth);
    this.renderActivePoint(steps, value);

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      })
    );
  }
}
