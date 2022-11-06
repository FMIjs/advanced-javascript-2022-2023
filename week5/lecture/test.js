const toUpperCase = String.prototype.toUpperCase;
const toUpperCaseCall = toUpperCase.call;
const boundToUppercaseCall = toUpperCaseCall.bind(toUpperCase);
console.log(['a', 'b', 'abc'].map(boundToUppercaseCall));
// console.log(['a', 'b', 'abc'].map(el => el.toUpperCase()));


// let fn = String.prototype.toUpperCase;
// let fn2 = fn.bind("aaa");
// console.log(fn2.call(null));


