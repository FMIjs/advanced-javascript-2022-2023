const { resolvePtr } = require('dns');
const fs = require('fs')
const fsPromises = require('node:fs/promises');

const npath = __dirname + '/nevronka.txt'

// const tobj = setTimeout(t => { 
//     console.log('(2) now here')
//     setTimeout(
//         t => {                          // this effectively is a continuation
//             console.log("(3) here we are");
//         }, 1000)
//     }, 1000)

// console.log('(1) here first')

let asyncop = (res, rej) => {
    let value = 100; 

    console.log("schedule something async");
    setTimeout(
        t => {                          // this effectively is a continuation
            res("(5) here we are");
        }, 1000)
}

let promiseObject = new Promise(asyncop)
let readFileAsync = function(fileName) { 
    return () => new Promise ((res, rej) => {
        fs.readFile(
            fileName, 
            { encoding: 'utf8'}, 
            ( err, data ) => {
                if (err) { 
                    return rej (err) }
                return res(data)
            })
        return 'yeah!'  // has absolutely no effect whatsoever
    })
};

// const readBadPromise = readFileAsync('NOSUCH.TXT');

Promise.any([
    promiseObject, 
    fsPromises.readFile(npath, { encoding: 'utf8'} )
]).then( res => { 
    console.log('here')
});

////////////////////

Promise.resolve('start!')
    .then(
        readFileAsync('example.json'))
    .then(
        res => JSON.parse(res))
    .catch(     // will fall here if JSON is with errors
        err => console.log(err))
    .then(
        res =>console.log(res))

promiseObject
    .then( res => 
        console.log(res))
    // .then( res =>                // here res would be undefined
    //     console.log(res))
    .then( readFileAsync(npath) )
    .then( () => Promise.resolve('123') )
    // .then( res => fsPromises.readFile(npath, { encoding: 'utf8'} ) )
    .then( res => {
        console.log(res) 
    } )
    .then( readFileAsync('NOSUCH.TXT') )
    .catch( err => {
        console.error('some error occured!')
    })
    .finally( () => {
        console.log('this run no matter of the chain being rejected or resolved. => always');
    })

////////////////////

async function fn() {
    let res = await readFileAsync(npath)();   
    res = await Promise.resolve();
    return new Promise( (res, rej) => {
        setTimeout( () => res(4), 2000)
    })
}

fn().then(res =>  {
    console.log(res)} 
);

// original promises spec by Kris Kowal
// https://github.com/kriskowal/q

// additional full-blown promises library
// http://bluebirdjs.com/docs/api-reference.html

// promises in C++
// http://www.home.hs-karlsruhe.de/~suma0002/publications/advanced-futures-promises-cpp.pdf

// sqlLite access with promises
// https://www.npmjs.com/package/promised-sqlite3