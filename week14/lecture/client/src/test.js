
function logger(target, propertyKey, descriptor) {
  let value;
  Object.defineProperty(target, propertyKey, {
    set(newValue) {
      console.log(`new value for ${propertyKey} is ${newValue}`);
      value = newValue;
    },
    get() {
      return value;
    }
  });
  return target;
}

class Person {
  @logger name;
  constructor() {
  }
}

const ivan = new Person('Test');

ivan.name = 'Ivan';
