function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  document.addEventListener('click', (event) => {
    if ( event.target == button ) {
      text.toggleAttribute('hidden');
    }
  });
}
