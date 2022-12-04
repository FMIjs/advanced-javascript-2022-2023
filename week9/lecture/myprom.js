// Simple implementation of Promise-like clas
// (C) 2022 G.Penkov
// (C) 2022 Sofia University
//
// Creative Commons Share-alike

class MyPromise {
    constructor(fun) {
        this.cbs = [];                    // keep a list of callbacks
        fun(val => this.res(val),       // call the function provided
            err => this.rej(err));
    }

    res(val) {
        let cb;
        while (cb = this.cbs.shift()) {          // process callbacks
            val = cb(val);        // if the returned value is Promise
            if (val instanceof Promise) {     // defer the processing
                return val.then( result => this.res(result)); 
            }
        }
    }

    rej = function () {
        console.error('failed promise');
    };

    then = function (cb) {      // then will simply register the next
        this.cbs.push(cb);     // register new callback to be handled
        return this
    }

    // note the finally and catch methods are missing,
    // so don't count on them
}

let prom = new MyPromise((res, rej) => {    
    setTimeout(function () {                // something asynchronous
        res(100);                                  // deffered result
    }, 2000)
})                     

prom.then(res => res * 3)                                // not async
    .then(res => Promise.resolve(res))             // immediate async
    .then(res => {                                       // not async
        console.log(res);
    })
