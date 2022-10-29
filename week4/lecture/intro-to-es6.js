// const / let

console.log(a); // undefined // Variable with var initialization gets *hoisted*
// console.log(b); // ! Uncaught ReferenceError ReferenceError: Cannot access 'b' before initialization
var a = 5;
let b = 6;
const c = 7;
// c = 8; // ! Uncaught TypeError TypeError: Assignment to constant variable.
// The 'const' is constant only constant for the given *reference*
// We can change the value, but not the reference (we can't say x = y)

const arr = [1,2,3];
arr.push(4);
// arr.pop();
console.log(arr);

const obj = {};
obj['1'] = 1
obj['a'] = 'a';

console.log(obj);


// function vs arrow function

// arrow function syntax

function myFn(x) {
  return x + 5;
}
(x) => { return x + 5; }
x => { return x + 5;}
x => x + 5;
x => ({ prop: x });


function add1(x) { 
  return x + 1;
}

const arrowAdd1 = x => x + 1;

// ...

function SomeClass(fn) { 
  this.someVariable = 5;
  this.fn = fn;
  this.fn();
}

function someFunction() {
  // in this case the context is the one of SomeClass, meaning we have access to `someVariable`
  // we have the context where the function was called
  console.log(this);
}
const someArrowFunction = () => {
  // in this case the context is {}, meaning we have access to `someVariable`
  console.log(this);
}
const someClassObj = new SomeClass(someFunction);
const someClassArrowObj = new SomeClass(someArrowFunction);


// setTimeout(function() {
//   console.log('timeout'); // this gets called after *at least* 100ms
// }, 100);

function callMeAsync(fn, interval) {
  setTimeout(fn, interval);
  console.log('---');
}

// callMeAsync(someFunction, 1000);
// callMeAsync(someArrowFunction, 1000);
// callMeAsync(someClassObj.fn, 1000);
// callMeAsync(someClassArrowObj.fn, 1000);

SomeClass.prototype.asyncExec = function() {
  callMeAsync(this.fn);
}

// someClassObj.asyncExec();
// someClassArrowObj.asyncExec();

// function test3() {
//   const arrow = () => {
//     console.log(this.var);
//   }

//   const self = this;
//   function internalNormalFunction() {
//     console.log(self.var);
//     console.log(this.var);
//   }
//   // arrow(); // ==> 42
//   // setTimeout(arrow, 100) // ==> 42

//   // internalNormalFunction(); // ==> 42 / undefined
//   // setTimeout(internalNormalFunction, 100); // ==> 42 / undefined

//   internalNormalFunction.bind(this)(); // ==> 42 / 42
//   setTimeout(internalNormalFunction.bind(this), 100); // ==> 42 / 42
// }

// test3.call({ var: 42 });

function MySecondClass() {
  this.var = 5;

  this.fn = function() {
    console.log(this.var);
  }
  this.arrowFn = () => {
    console.log(this.var);
  }
}

// const someSecondClassInstance = new MySecondClass();
// secondClassInstance.fn(); // ==> 5
// secondClassInstance.arrowFn(); // ==> 5

function letsBreakTheSecondClass() {
  this.var = 6;
  
  // const secondClassInstance = new MySecondClass();
  // secondClassInstance.fn(); // ==> 5
  // secondClassInstance.arrowFn(); // ==> 5

  this.innerSecondClassInstance = new MySecondClass();
  this.innerSecondClassInstance.fn.bind(this)(); // ==> 6
  this.innerSecondClassInstance.fn(); // ==> 5
  this.innerSecondClassInstance.arrowFn(); // ==> 5
}

// letsBreakTheSecondClass.bind({ var2: 7 })();


// Class

function PersonFn(name, age) {
  this.name = name;
  this.age = age;
}

PersonFn.prototype.speak = function() {
  console.log('*woof*');
}

class Person {
  someValue = 5;
  static numberOfCreated = 0;

  constructor(name, age) {
    this.name = name;
    this.age = age;

    Person.numberOfCreated++;
  }

  speak = function () {
    console.log('*woof*')
  }
}

const ivan = new Person('Ivan', 20);
// const fnIvan = new PersonFn('Ivan', 20);

// console.log(ivan.name, ivan.age);
// console.log(fnIvan.name, fnIvan.age);


// console.log(ivan.numberOfCreated);
// console.log(Person.numberOfCreated);

const ivan2 = new Person('Ivan2', 30);
// console.log(Person.numberOfCreated);

class Employee extends Person {
  job;
  constructor(name, age, job) {
    super(name, age);
    this.job = job;
  }
}

const pesho = new Employee('ivan3', 20, 'dev');
console.log(pesho);


// Symbol

const someSymbol = Symbol('ASD');

const someObj = {
  1: 1,
  'a': 'a',
  someSymbol: `my key is the string 'someSymbol'`,
  [someSymbol]: `my key is the symbol 'someSymbol'`
};

console.log(someObj);

// Different Collections

// Map -- key/value pair

const myMap = new Map();
myMap.set('a', 1);
myMap.set(1, 1);

myMap.has(1); // ==> true
myMap.has(2); // ==> false

myMap.get('a'); // ==> 1
myMap.delete('a'); // ==> true, since the element was deleted successfully
myMap.has('a'); // ==> false
myMap.get('a'); // ==> undefined
myMap.delete('a'); // ==> false, since the element was not present in the map

myMap.set({ prop: 1 }, 1);


myMap.clear
// WeakMap

const myWeakMap = new WeakMap();
let john = { prop: 1 };
myWeakMap.set(john, 'doe');
console.log(myWeakMap.get(john));
john = null;
console.log(myWeakMap.get(john));

john = { prop: 1 };
myMap.set(john, 'doe');
console.log(myMap.get(john));
john = null;
console.log(myMap.get(john));

// use cases:
//   - additional data
//   - caching
//   - dropping unnecessary references --> doesn't increase the ref count


// Set 
const mySet = new Set();

john = { name: 'John' };
mySet.add(1);
mySet.has(1); // ==> true
mySet.add(john);
mySet.add('john').add('doe');

console.log(mySet.add('ivan'));
console.log(mySet.add('ivan'));

mySet.clear();

const arr2 = [1,2,3,3,3,4,5];
const uniqueSet = arr2.reduce((acc, curr) => acc.add(curr), new Set()).values();
const uniqueArr2 = [...uniqueSet]; // 1, 2, 3, 4, 5;

// WeakSet
const myWeakSet = new WeakSet();

john = { name: 'John' };
myWeakSet.add(john);
console.log(myWeakSet.has(john));
john = null;
console.log(myWeakSet.has(john));

// String Interpolation
john = { name: 'John', age: 20 };
console.log('Hi! My name is ' + john.name + ' and I am ' + john.age);
console.log(`Hi! My name is ${john.name} and I am ${john.age}`);