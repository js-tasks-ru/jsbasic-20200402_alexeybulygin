/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
 function highlight(table) {

   // find all rows in table
   let tableRows = table.querySelectorAll('tbody tr');

   for (row of tableRows) {

     // check available status
     if ( row.querySelector('td:nth-child(4)').dataset.available === 'true' ) {
       row.classList.add('available');
     } else if ( row.querySelector('td:nth-child(4)').dataset.available === 'false' ) {
       row.classList.add('unavailable');
     } else if ( !row.querySelector('td:nth-child(4)').hasAttribute('') ) {
       row.setAttribute('hidden', '');
     }

     // check gender
     if ( row.querySelector('td:nth-child(3)').textContent === 'm' ) {
       row.classList.add('male');
     } else if ( row.querySelector('td:nth-child(3)').textContent === 'f' ) {
       row.classList.add('female');
     }

     // check age
     if ( row.querySelector('td:nth-child(2)').textContent < '18' ) {
       row.style.textDecoration = 'line-through';
     }

   }

 }
