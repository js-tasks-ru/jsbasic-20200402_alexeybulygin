import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.elem.addEventListener('click', (event) => this.modalClose(event));
    document.addEventListener('keydown', (event) => this.modalClose(event));
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.classList.add('modal');

    this.elem.innerHTML = `
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title"></h3>
        </div>

        <div class="modal__body"></div>
    `;
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    this.bodyText = node;
    this.elem.querySelector('.modal__body').append(this.bodyText);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  close() {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }

  modalClose(event) {
    if ( event.target.closest('.modal__close') || event.code == 'Escape' ) {
      this.close();
    }
  }



}
