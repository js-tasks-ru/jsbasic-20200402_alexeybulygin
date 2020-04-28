/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {

  constructor(rows) {

    this.elem = document.createElement('table');
    this.elem.addEventListener('click', (event) => this.deleteClick(event));
    this.elem.innerHTML =
    `
    <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    ${this.render(rows).innerHTML}
    `;

    return this.elem.innerHTML;
  }

  render(rows) {
    const rowList = document.createElement('tbody');
    for (let row of rows) {
      let tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button class="js-remove-row">X</button></td>
      `;
      rowList.appendChild(tr);
    }
    return rowList;
  }

  deleteClick(event) {
    if (event.target.className == 'js-remove-row') {
      event.target.closest('tr').remove();
    }
  }

}
