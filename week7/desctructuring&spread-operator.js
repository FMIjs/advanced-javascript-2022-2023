// ! Spread operator

// Arrays
const arr1 = [1, 2, 3];
const arr2 = [5, 6, 7];
const arr1_2 = [...arr1, 4, ...arr2];

// Objects
const ivanPersonData = { name: 'Ivan', age: 27, birthday: '19.11' };
const ivanProfessionalData = { job: 'student' };

const wholeIvan = {
  ...ivanPersonData,
  ...ivanProfessionalData,
};

const wholeIvanUnsuccessfulNameChange = {
  name: 'Peter',
  ...ivanPersonData, // `name` gets replaced with the value from the spread ==> we are left with 'Ivan'
  ...ivanProfessionalData,
};

const wholeIvanSuccessfulNameChange = {
  ...ivanPersonData,
  ...ivanProfessionalData,
  name: 'Peter',
};

// ! Destructuring

// const name = wholeIvan.name;
// const age = wholeIvan.age;
const {
  name, age,       // * extract these from the given object
  birthday: bDay, // * extract the given prop to the given variable
  ...rest        // * get the rest
} = wholeIvan;
console.log(name, age, bDay); // 'Ivan' 27 '19.11'
console.log(rest); // { job: 'student' }

// let { a, ...rest, c } = { a:1, b:2, c:3 }; // ! Uncaught SyntaxError: Rest element must be last element

const arr3 = [1, 2, 3, 4, 5, 6, 7];
// const [a, b, c] = arr3; // 1, 2, 3
// const [,,a, b, c] = arr3; // 3, 4, 5
// const [,, a, b, c, ...arrRest] = arr3; // 3, 4, 5; [6,7]
// const [,, a, b, c, ...arrRest, d] = arr3; // ! Uncaught SyntaxError: Rest element must be last element

// ! Function

const fn = (a, b, ...rest) => console.log(a, b, rest)

fn(1);              // 1 undefined []
fn(1, 2);           // 1 2 []
fn(1, 2, 3);        // 1 2 [3]
fn(1, 2, 3, 4);     // 1 2 [3, 4]
fn(1, 2, 3, 4, 5);  // 1 2 [3, 4, 5]