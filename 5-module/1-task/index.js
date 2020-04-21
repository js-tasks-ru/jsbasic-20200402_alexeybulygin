function hideSelf() {
  let button = document.querySelector('.hide-self-button');
  button.addEventListener('click', function(event) {
    event.target.hidden = true;
  });
}
