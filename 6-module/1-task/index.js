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
    this.elem.addEventListener('click', (event) => this.deleteRowClick(event));
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
    <tbody>
      ${this.render(rows)}
    </tbody>
    `;

    return this.elem.innerHTML;
  }

  render(rows) {
    let row = rows.map(value => {
      return `
      <tr>
        <td>${value.name}</td>
        <td>${value.age}</td>
        <td>${value.salary}</td>
        <td>${value.city}</td>
        <td><button class="js-remove-row">X</button></td>
      </tr>
      `
    }).join('');
    return row;
  }

  deleteRowClick(event) {
    if (event.target.className == 'js-remove-row') {
      event.target.closest('tr').remove();
    }
  }

}
