// // // Primitive types:

// undefined // type undefined
// null // type null !
// false | true // boolean
// 'stata' | "dsdasdas" // string
// 1000 // number
// Symbol('dsada') // Symbol (ES6)
// { } // Object

// // typeof undefined // > "undefined"
// // typeof null // > "object"

// var test = 1000;
// var obj = {
//   prop1: 1000,
//   prop2: {
//     prop1: 200
//   },
//   prop3: []
// };

// function doSomething() {

// }
// doSomething();
// var value = 1213;
// var myFunc = function test() {
//   var test = 13;
//   console.log(value);
//   console.log(123);
//   console.log(rest1);

//   function rest() {
//     var rest1 = 123;
//     console.log(test);
//   }

//   rest();
// };

// console.log(myFunc.name);
// myFunc();
// test();

// // console.log(test == '1000');

// // console.log((1000).toFixed(2));

// var arr = [1, [{}], 3, 4];
// arr[10] = 10;
// console.log(arr.length);




function createPerson(name, age) {
  var nameArray = name.split(' ');
  function getAge() {
    return age;
  }
  return {
    firstName: nameArray[0],
    lastName: nameArray[1],
    getPersonAge: getAge,
    age: age
  };
}

var ivan = createPerson('Ivan Ivanov', 20);
ivan.age = 30;
console.log(ivan.getPersonAge());

// for (var i = 0; i < 10; i++) {
// switch (i % 2 == 0) {
//   case true: {
//     cons
//     break;
//   }
//   case false: {
//     break;
//   }
// }
// if (i % 2 == 0) {
//   console.log('even');
//   continue;
// } else if (true) {
//   console.log('odd');
// } else {

// }
// }

// do {

// } while (true);

// while (true) {

// }

// for (var prop in ivan) {
//   console.log(ivan[prop]);
// }


function test(param) {
  console.log('1');
  return function test() {
    console.log('2', param);
    return function test() {
      console.log('3', param);
    };
  };
}

var newTest = test(1);
var newNewTest = newTest();
var newNewTestResult = newNewTest();
newNewTestResult === test(1)()();

var obj = {};
Object.defineProperty(obj, 'prop1', {
  value: 1,
  writable: false,
  enumerable: false,
  configurable: false,
  // set: function() {

  // },
  // get: function() {

  // }
});