/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
 function highlight(table) {
   // check available status
 	let status = table.querySelectorAll('tbody td:nth-child(4)');
 	for (let item of status) {
 		if ( item.dataset.available == 'true' ) {
 			item.closest('tr').classList.add('available');
 		} else if ( item.dataset.available == 'false' ) {
 			item.closest('tr').classList.add('unavailable');
 		} else if ( !item.hasAttribute('') ) {
 			item.closest('tr').setAttribute('hidden', '')
 		}
 	}

 	// check gender
 	let gender = table.querySelectorAll('tbody td:nth-child(3)');
 	for (let item of gender) {
 		if ( item.textContent === 'm' ) {
 			item.closest('tr').classList.add('male');
 		} else if ( item.textContent == 'f' ) {
 			item.closest('tr').classList.add('female');
 		}
 	}

 	// check age
 	let age = table.querySelectorAll('tbody td:nth-child(2)');
 	for (let item of age) {
 		if ( item.textContent < '18' ) {
 			item.closest('tr').style.cssText = `text-decoration: line-through`;
 		}
 	}

 }
