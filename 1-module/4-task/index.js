/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  str = str.toLowerCase();
  let stopWordOne = '1xBet'.toLowerCase();
  let stopWordTwo = 'XXX'.toLowerCase();

  return str.includes(stopWordOne) || str.includes(stopWordTwo)
}
