function toggleText() {
  document.addEventListener('click', (event) => {
    if ( event.target.classList.contains('toggle-text-button') ) {
      document.querySelector('#text').toggleAttribute('hidden');
    }
    return;
  });
}
