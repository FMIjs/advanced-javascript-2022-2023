// const lib = (function () {
//   const _exports = {};
//   function withErrorHandler(fn) {
//     return function (err, result) {
//       if (err) { return console.error(err); }
//       fn(result);
//     };
//   }
//   _exports.withErrorHandler = withErrorHandler;

//   return _exports;
// })();

// lib.withErrorHandler();

// A -> B -> C -> A

function doSomething() {

}
doSomething();

function withErrorHandler(fn) {
  return function (err, result) {
    if (err) { return console.error(err); }
    fn(result);
  };
}

// module.exports = {
//   withErrorHandler
// };

// module.exports = {
//   withErrorHandler() {

//   } 
// }

module.exports.withErrorHandler = withErrorHandler;
