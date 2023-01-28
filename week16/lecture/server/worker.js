console.log('worker is working!');
let cond = false;
let counter = 0;

function asyncLoop(fn, cb) {
  setTimeout(() => {
    fn();
    if (cond) { return asyncLoop(fn, cb); }
    cb();
  }, 0);
}

self.onmessage = function (message) {
  if (message.data === 'start') {
    if (cond) { return; }
    cond = true;
    asyncLoop(() => counter++, () => self.postMessage(counter));
  }
  if (message.data === 'stop') {
    cond = false;
  }
}