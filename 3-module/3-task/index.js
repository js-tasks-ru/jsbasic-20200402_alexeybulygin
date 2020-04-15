/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let wordsArray = str.split('-');
  for (let i = 1; i < wordsArray.length; i++) {
    wordsArray[i] = wordsArray[i].slice(0, 1).toUpperCase() + wordsArray[i].slice(1);
    wordsArray.splice(i, 1, wordsArray[i]);
  }
  return wordsArray.join('');
}
