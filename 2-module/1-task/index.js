/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let summ = 0;
  for (let key in salaries) {
    if ( parseFloat(salaries[key]) ) {
      summ += salaries[key];
    }
  }
  return summ;
}
