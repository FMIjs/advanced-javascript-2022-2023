'use strict'

const ERROR_MSG1 = 'une propriété bizarre %s a été passée';

const obj = {
  foo: 'Hello, world!',
//   baba: 'a missing BABA property',
}

// Create a proxy for the object
// that intercepts all calls 
// to some properties
const proxy = new Proxy(obj, {
  get(target, prop) {
    console.log(target[prop])
    if (prop === 'foo') {
      // Modify the value of the 'foo' property before returning it
      return target[prop].toUpperCase()
    } 
    // intercept missing properties
    if (target.hasOwnProperty(prop)) {
        return target[prop]
    } else {
        console.error()
        console.error(`some weird property ${prop} was passed`)
        console.error(ERROR_MSG1, prop)
        debugger;
    }
  },
  set(target, prop, value) {
    if (prop === 'numval') {
        // introduce runtime validation for property values
        if (value > 0) {
            // target.prop = value
            // return true
            return Reflect.set(...arguments);
        } else {
            console.error('refusing to set negative value')
            return true
        }
    }
  }
})

proxy.numval = 400
proxy.numval = -1
// Get the value of the 'foo' property from the proxy
console.log(proxy.foo)      // "HELLO, WORLD!"
console.log(proxy.baba)     // "BABA yeah!"


