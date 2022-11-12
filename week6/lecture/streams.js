const fs = require('fs');
const { pipeline, Readable, Writable, Transform } = require('stream');

// const readStream = fs.createReadStream('./test.txt', {
//   highWaterMark: 1,
// });
// readStream.pause();
// const writeStream = fs.createWriteStream('./outout.txt');



function createAsyncStreamReader(readStream, cb, delay = 5000) {
  const lineArray = [];
  let currenLine = '';
  return function asyncRead() {
    const chunk = readStream.read();
    if (chunk === null) {
      if (currenLine) { lineArray.push(currenLine); }
      return void cb(lineArray);
    }
    const strChunk = chunk.toString();
    if (strChunk === '\n') {
      lineArray.push(currenLine);
      currenLine = '';
    } else {
      currenLine += strChunk;
    }
    setTimeout(asyncRead, delay);
  }
}

function onCompleted(data) {
  console.log('Completed');
  console.log(data);
}

// readStream.once('readable', createAsyncStreamReader(readStream, onCompleted, 0));

// readStream.on('data', (chunk) => {
//   console.log(chunk.toString());
// });

// setTimeout(() => {
//   readStream.pause();

//   setTimeout(() => {
//     readStream.read();
//     readStream.read();
//     readStream.read();

//     // setTimeout(() => {
//     //   readStream.resume();
//     // }, 1000);
//   }, 1000);
// }, 10);


// readStream.pipe(trasformStream.pipe(writeStream))
// pipeline(readStream, trasformStream, writeStream);



// class MySteamClass extends Readable {
//   constructor(array) {
//     super({ highWaterMark: 1 });
//     this.i = 0;
//     this.array = array;
//   }

//   _read() {

//   }
// }


function fromArray(array) {
  const readableStream = new Readable({ highWaterMark: 1 });
  let i = 0;
  readableStream._read = function () {
    if (i < array.length) {
      readableStream.push(array[i++]);
    } else {
      readableStream.push(null);
    }
  };
  return readableStream;
}

function createWritable(onCompleted) {
  const writableStream = new Writable({ highWaterMark: 1 });
  let allData = '';
  writableStream.write = function (chunk) {
    allData += chunk?.toString();
  };
  writableStream.on('finish', () => {
    onCompleted(allData);
  });
  return writableStream;
}

function createTransform() {
  return new Transform({
    transform(chunk, encoding, callback) {
      const tChunk = chunk.toString().replace('aaa', '***');
      callback(null, tChunk);
    }
  });
}

const tStream = createTransform();



const myReadStream = fromArray(['aaa', 'aaaa', 'aasadasddsa', 'dsasa', '1', '2', '3']);
myReadStream.pause();

// myReadStream.once('readable', createAsyncStreamReader(myReadStream, onCompleted, 10));
const ws = createWritable(allData => console.log(allData));
myReadStream.pipe(tStream).pipe(ws);