function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  document.addEventListener('click', (event) => {
    let text = document.querySelector('#text');
    if (event.target == button ) {
      text.toggleAttribute('hidden');
    }
  });
}
