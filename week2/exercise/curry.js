function curry(fn) {
  return function helper() {
    var arity = fn.length;
    var args = [].slice.call(arguments);
    if (args.length === arity) {
      return fn.apply(undefined, args);
    }
    return function () {
      var allArgs = args.concat([].slice.call(arguments));
      return helper.apply(undefined, allArgs);
    }
  }
}

function sum(a, b) { return a + b; }
function sum4(a, b, c, d) { return sum(sum(a, b), sum(c, d)); }

console.log(curry(sum)(1)(3));
console.log(curry(sum4)(1)()(3, 4)(5));

// some extra `bind` magic
var sum4With1and2AsBoundArguments = sum4.bind(undefined, 1, 2);
console.log(sum4With1and2AsBoundArguments(3,4));