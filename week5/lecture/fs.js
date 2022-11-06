const fs = require('fs');
const utils = require('./utils');

// const fileContent = fs.readFileSync('./index.js', 'utf8');

// console.log(fileContent);

// function logCalc(a, b) {
//   a = a + b;
//   console.log(a);
//   return a;
// }


// function doSomething(flag) {
//   if (flag) { return void logCalc(1, 2); }
//   console.log('else');
// }

// const res = doSomething(true);







function processFiles(content1, content2) {
  return content1 + content2;
}

// const obj = {
//   content1: null,
//   content2: null,
//   next() {
//     if (this.content1 === null || this.content2 === null) { return; }
//     processFiles(this.content1, this.content2);
//   }
// }

// function firstFileHandler(content) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   obj.content1 = content;
//   obj.next();
// }

// const firstFileHandlerWithError = utils.contentwithErrorHandler(firstFileHandler);

// fs.readFile('./index.js', 'utf-8', firstFileHandlerWithError);

// fs.readFile('./index.js', 'utf-8', utils.contentwithErrorHandler(function (content) {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   obj.content2 = content;
//   obj.next();
// }));





fs.readFile('./index.js', 'utf-8', utils.withErrorHandler(function (content1) {
  if (err) {
    console.error(err);
    return;
  }
  fs.readFile('./index.js', 'utf-8', utils.withErrorHandler(function (content2) {
    if (err) {
      console.error(err);
      return;
    }
    const result = processFiles(content1, content2);
    fs.writeFile('./result', result, utils.withErrorHandler(function () {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Success!');
    }));
  }));
}));

function readFirstFile(err, content1) {
  if (err) {
    console.error(err);
    return;
  }
  fs.readFile('./index.js', 'utf-8', readSecondFile(content1));
}

function readSecondFile(content1) {
  return function readSecondFileHelper(err, content2) {
    if (err) {
      console.error(err);
      return;
    }
    const result = processFiles(content1, content2);
    fs.writeFile('./result', result, finalStep);
  }
}

function finalStep(err) {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Success!');
}

fs.readFile('./index.js', 'utf-8', readFirstFile);