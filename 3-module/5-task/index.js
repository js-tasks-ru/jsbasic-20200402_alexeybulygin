/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let vals = str
  .split(/,| /)
  .filter(val => parseFloat(val))
  .sort( (a, b) => a - b );
  let result = {
    min: +vals[0],
    max: +vals[vals.length - 1],
  }
  return result;
}
