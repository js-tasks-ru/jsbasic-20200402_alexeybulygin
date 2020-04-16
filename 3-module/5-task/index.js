/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let vals = str
  .split(/,| /)
  .filter(item => Number(item));
  let result = {
    min: Math.min(...vals),
    max: Math.max(...vals),
  }
  return result;
}
