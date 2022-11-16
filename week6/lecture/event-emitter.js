// function OldEventEmitter() {

// }

// OldEventEmitter.prototype.on = function () {

// }

// OldEventEmitter.prototype.emit = function () {

// }

// // super
// function MyClass() {
//   OldEventEmitter.call(this)
// }

// // extends
// MyClass.prototype =
//   Object.create(OldEventEmitter.prototype);





class EventEmitter {
  constructor() {
    this.eventHandlers = {};
  }

  on(eventName, cb) {
    this.eventHandlers[eventName] =
      (this.eventHandlers[eventName] || []).concat(cb);

    // const cbs = this.eventHandlers[eventName] || [];
    // cbs.push(cb);
    // this.eventHandlers[eventName] = cbs;

    return () => {
      this.eventHandlers[eventName] =
        (this.eventHandlers[eventName] || []).filter(fn => fn !== cb);
    };
  }

  once(eventName, cb) {
    const unsub = this.on(eventName, (data) => {
      cb(data);
      unsub();
    });
  }

  emit(eventName, data) {
    (this.eventHandlers[eventName] || [])
      .forEach(cb => cb(data));

    // const cbs = this.eventHandlers[eventName] || [];
    // cbs.forEach(cb => cb(data));
  }


}

class MyClass extends EventEmitter {

  set name(newValue) {
    this._name = newValue;
    // setTimeout(() => {
    //   this.emit('nameChange', this._name);
    // });
    process.nextTick(() => {
      this.emit('nameChange', this._name);
    });
  }
  get name() {
    return this._name;
  }

  constructor(name) {
    super();
    this.name = name;
  }

}

setTimeout(() => {
  console.log(1);
});
const myObj = new MyClass('TEST');
myObj.once('nameChange', (newName) => {
  console.log(newName);
});

setTimeout(() => {
  myObj.name = 'HELLO!';

}, 3000);