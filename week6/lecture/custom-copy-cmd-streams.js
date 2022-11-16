const files = process.argv.slice(2);
const fs = require('fs');
const path = require('path');

for (const file of files) {
  const fileExt = path.extname(file);
  const readStream = fs.createReadStream('./' + file);
  readStream.on('error', function () {
    console.error('Someting went wrong!');
  });
  const writeStream = fs.createWriteStream('./' + file.replace(fileExt, '') + ' (copy)' + fileExt);
  readStream.pipe(writeStream);
}

// readStream.on('data', (chunk) => {
//   console.log(chunk.toString());
// });

// readStream.pipe(writeStream);
