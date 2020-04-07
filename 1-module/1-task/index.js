/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  let total = 1;
  for (let i = 0; i < n; i++) {
    total = total * (n - i);
  }
  return total;
}
factorial(3);