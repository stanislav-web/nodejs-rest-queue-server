/**
 *
 * @returns {Function}
 */
let counter = (function() {
  var i = 0;
   return function() {
     return ++i;
   };
})();

console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());