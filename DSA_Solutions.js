// 1. Reverse a String
function reverseString(str) {
  return str.split('').reverse().join('');
}
// Example: reverseString("hello") ➞ "olleh"

// 2. Find the Maximum Number in an Array
function findMax(arr) {
  return Math.max(...arr);
}
// Example: findMax([1, 5, 3, 9, 2]) ➞ 9

// 3. Check if a number is prime
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}
// Example: isPrime(7) ➞ true

// 4. FizzBuzz (Classic)
function fizzBuzz(n) {
  let result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i);
  }
  return result;
}
// Example: fizzBuzz(5) ➞ [1, 2, "Fizz", 4, "Buzz"]

// Exporting for testing (optional)
module.exports = { reverseString, findMax, isPrime, fizzBuzz };
