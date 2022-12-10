
// Generators in JavaScript are special functions that can be paused and resumed, 
// allowing them to yield multiple values over time. 
// Generators are well-suited to a variety of tasks, such as:

//     Implementing lazy evaluation of expensive computations.
//     Simplifying asynchronous programming by allowing you to write 
//          code that looks and behaves like synchronous code.
//     Allowing you to iterate over data structures or sequences 
//          of values that may be too large to fit in memory all at once.
//     Providing a way to abstract away the details of iterating 
//          over a data structure or sequence, making your code more readable and maintainable.//

function fib(cnt) {
    let current = 0
    let next = 1
    while (cnt--) {
        [current, next] = [next, current + next]
    }
    return current
}
// console.log(fib(10))

/// now lets try with generator

function* fibgen() {
    let current = 0
    let next = 1
    while (current < Math.pow(10, 6)) {
        yield current;
        [current, next] = [next, current + next]
    }
}

let gen = fibgen()
let cnt = 10;
let res
while (!(res = gen.next()).done) {
    // console.log(res.value)
}

function* mgen(c) {
    let res = yield c * 2;
    res = yield res * 2;
    res = yield res * 2;
}

let genobj = mgen(25);
console.log(genobj.next(100).value)
console.log(genobj.next(123).value)
console.log(genobj.next(235).value)

// https://oeis.org/A000045 
// 
// A000045 		
// Fibonacci numbers: F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.
// (Formerly M0692 N0256) 		5475
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 
// 144, 233, 377, 610, 987, 1597, 2584, 4181, 
// 6765, 10946, 17711, 28657, 46368, 75025, 
// 121393, 196418, 317811, 514229, 832040,  
// 1346269, 2178309, 3524578, 5702887, 9227465, 
// 14930352, 24157817, 39088169, 63245986, 102334155

function* loadData() {
    // Load the data asynchronously and yield the result
    const res1 = yield fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())

    console.log(res1)

    const res2 = yield fetch('https://jsonplaceholder.typicode.com/comments/2')
        .then(response => response.json())

    console.log(res2)

    // Return the result after the asynchronous operation is complete
    return true
}

function run(generator, val) {
    if (val === undefined) {
        val = generator.next().value
    }
    if (val instanceof Promise) {
        val.then(result => {    // Handle the asynchronous result
            // Resume the generator 
            // passing  the result to the next yield statement
            newval = generator.next(result)
            if (newval.done !== true) {
                return run(generator, newval.value); // tail call
            }
        }).catch(err => {
            console.error('some error running the generator: %s', err)
        })
    }
}

run(loadData())


//////////////////////

function* iterateTree(node) {
    if (node.left) yield* iterateTree(node.left)
    yield node.value
    if (node.right) yield* iterateTree(node.right)
  }
  
  const tree = {
    value: 'A',
    left: {
      value: 'B',
      left: {
        value: 'C',
      },
      right: {
        value: 'D',
      },
    },
    right: {
      value: 'E',
      left: {
        value: 'F',
      },
      right: {
        value: 'G',
      },
    },
  }
  
  // Create a generator object by calling the generator function
  const generator = iterateTree(tree)
  
  // Iterate over the generator and print its values
  for (const value of generator) {
    console.log(value)
  }

