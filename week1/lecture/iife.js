var myLib = (function (global) {
  var one;
  var two;
  var three

  function myFunc() {

  }
  
  global.myFunc = myFunc;

})(global);

myFunc();