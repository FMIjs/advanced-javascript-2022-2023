function archiverFactory() {
  var archive = [];
  var number = 4;
  var temperature = null;

  var obj = {
    temp: null,
    getArchive: function () {
      // scope - the values that can be used inside the function body
      // we can use values from upper scopes but can't use values from inner scopes
      return archive.slice();
    },
    getNumber: function () {
      return number;
    }
  };


  Object.defineProperty(obj, 'temp', {
    get: function () { // closure - a function that uses a value from outer scope
      return temperature;
    },
    set: function (newValue) {
      temperature = newValue;
      archive.push(newValue);
    }
  });

  return obj;
}

var obj = archiverFactory();
console.log(obj.getArchive());
console.log(obj.temp);

obj.temp = 4;
obj.temp = 5;

var archive = obj.getArchive();
archive.push(4, 5, 6);
console.log(obj.getArchive());

// var result = false || {};

// if (true) {

// } else {

// }

// function test(arg1) {
//   arg1 = arg1 || null;
//   return arg1;
// }

// function createPerson(name) {
//   name = name || 'Ivan Ivanov';
//   return { name: name };
// }

function createSomething(logPersonName) {
  return {
    name: 'Test',
    logPersonName: logPersonName
  };
}

function logName() {
  console.log(this.name);
}

var user = createPerson();
user.logName = logName;
// user.logName();

var result = createSomething(user.logName.bind(user));
result.logPersonName();



// function test(arg1, arg2, arg3) {
//   console.log(this, arg1, arg2, arg3);
// }

// var fn = test.bind(1000, 1, 2);

// test.call(1000, 1, 2, 3);
// test.apply(1000, [1, 2, 3]);

// var obj2 = {
//   test1: fn
// };

// obj2.test1(100, 200, 300);

function test() {
  var args = [].slice.call(arguments);
  console.log(args, args instanceof Array);
}

test(1, 2, 3, 4);
test.length;

// var testCr = curry(test);
// testCr(1)(2)(3)(4) - this is currying - https://en.wikipedia.org/wiki/Currying;
// testCr(1)(2,3)(4);

function compose() {
  var fns = [].slice.call(arguments);
  return function (x) {
    fns.forEach(function (fn, index, fns) {
      x = fn(x);
    });
    // fns.map(function(fn) {
    //   x = fn(x)
    //   return ;
    // });
    // for (var i = 0; i < fns.length; i++) {
    //   x = fns[i](x);
    // }
    return x;
  };
}



function createEmployeeFactory(salary) {
  return function createEmployee(person) {
    person.salary = salary || 2000;
    return person;
  };
}

var createUserEmployeeWith4000Salary = compose(
  createPerson,
  createEmployeeFactory(4000)
);

console.log(createUserEmployeeWith4000Salary('Ivan'));


// var fn = compose(function (a) { return a + 1 }, function (a) { return a * a; });
// fn(1);


[1, 2, 3, 4].reduce(function (acc, currElement) {
  return acc + currElement;
}, 0);


var res = [1, 2, 3, 4, 5].reduce(function (acc, curr) {
  return acc.concat(curr + 2);
}, []);

console.log(res);

var res2 = [['prop1', 1], ['prop2', 2], ['prop3', 3], ['prop4', 4]]
  .reduce(function (acc, curr) {
    var key = curr[0];
    var value = curr[1];
    acc[key] = value;
    return acc;
  }, {});

console.log(res2);

[1, 2, 3, 4]
  .map(function (x) { return x + 2; }).map(function (x) { return x * 2; });


function mixin(obj1, obj2) {
  var result = {};
  for (var prop1 in obj1) {
    result[prop1] = obj1[prop1];
  }
  for (var prop2 in obj2) {
    result[prop2] = obj2[prop2];
  }
  return result;
}

var prototype = {
  getName: function () {
    // context - the value of this
    return this.name;
  },
  getAge: function () {
    return this.age;
  }
};

function createAnimal(name, age, breed) {
  var animalWithPrototype = Object.create(prototype);
  animalWithPrototype.name = name;
  animalWithPrototype.age = age;
  animalWithPrototype.breed = breed;

  return animalWithPrototype;
}

var a = createAnimal('a', 10, 'test');
a.getAge();

function createPerson(name, age) {
  var personWithPrototype = Object.create(prototype);
  personWithPrototype.name = name;
  personWithPrototype.age = age;

  return person;
}

var a = createPerson('a', 10);
a.getAge();