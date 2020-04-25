/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {

  // find all rows in table tbody section
  let tableRows = table.querySelectorAll('tbody tr');

  for (row of tableRows) {

    // check available status
    let availableStatus = row.querySelector('td:nth-child(4)').dataset;
    switch(availableStatus.available) {
      case('true'):
        row.classList.add('available');
        break;
      case('false'):
        row.classList.add('unavailable');
        break;
      default:
        row.setAttribute('hidden', '');
    }

    // check gender
    let gender = row.querySelector('td:nth-child(3)').textContent;
    switch (gender) {
      case('m'):
        row.classList.add('male');
        break;
      case('f'):
        row.classList.add('female');
        break;
    }

    // check age
    if ( row.querySelector('td:nth-child(2)').textContent < '18' ) {
      row.style.textDecoration = 'line-through';
    }
  }
}
