// https://www.youtube.com/watch?v=cCOL7MC4Pl0&vl=en - EVENT LOOP EXPAINED

function foo() {
  baz();
}

function baz() {
  bar();
}

function bar() {
  setImmediate(function () {
    console.log(3);
  });
  setTimeout(function () {
    console.log(1);
  }, 0);
}

foo();
console.log(2);






