class EventEmitterWithMapAndSet {
  constructor() {
    this.eventMap = new Map();
  }

  emit = (eventName, data) => {
    const handlers = this.eventMap.get(eventName);
    if (!handlers) { return; }
    handlers.forEach(handler => handler(data));
  }
  on = (eventName, handler) => {
    if (!this.eventMap.has(eventName)) {
      this.eventMap.set(eventName, new Set())
    }
    this.eventMap.get(eventName).add(handler)
  }
  unsubscribe = (eventName, handler) => {
    this.eventMap.get(eventName).delete(handler)
  }
}

class EventEmitter {
  constructor() {
    this.eventMap = {};
  }

  emit = (eventName, data) => {
    const handlers = this.eventMap[eventName];
    if (!handlers) { return; }
    handlers.forEach(handler => handler(data));
  }
  on = (eventName, handler) => {
    this.eventMap[eventName] = [...(this.eventMap[eventName] || []), handler];
  }
  unsubscribe = (eventName, handler) => {
    if (!this.eventMap[eventName]) { return; }
    this.eventMap[eventName] = this.eventMap[eventName].filter(h => h !== handler);
  }
}

class Person extends EventEmitter {
  constructor(age) {
    super();
    this.age = age;
  }
  getOlder() {
    this.age++;
    this.emit('get-older', this.age);
  }
}

const ivan = new Person(23);
const handler = (age) => console.log(`Happy ${age}th birthday! 🎂`);
const handler2 = (age) => console.log(`${age} 🎂`);
ivan.on('get-older', handler);
ivan.getOlder(); // Happy 24th birthday! 🎂
ivan.getOlder(); // Happy 25th birthday! 🎂

ivan.unsubscribe('get-older', handler)
ivan.getOlder(); // *nothing*

ivan.on('get-older', handler);
ivan.on('get-older', handler2);
ivan.getOlder(); // Happy 27th birthday! 🎂 && 27 🎂

ivan.unsubscribe('get-older', handler)
ivan.getOlder(); // 28 🎂
