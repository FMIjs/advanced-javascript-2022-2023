const http = require('http');
const fs = require('fs');

const fileStream = fs.createReadStream('./index.js');

function handleGetRequest(req, res) {
  res.writeHead(200);
  fileStream.pipe(res);
  // res.write('HELLO WORLD 1');

  // const interlId = setInterval(() => {
  //   counter++;
  //   res.write('HELLO WORLD ' + counter + '\n');
  //   if (counter === 5) {
  //     clearInterval(interlId);
  //     res.end();
  //   }
  // }, 3000);
}



function handlePostRequest(req, res) {

}



const sever = http.createServer(function (req, res) {
  const method = req.method.toUpperCase();
  if (method === 'GET') {
    return void handleGetRequest(req, res);
  }
  if (method === 'POST') {
    return void handlePostRequest(req, res);
  }
});


sever.listen(8080, () => {
  console.log('Server is listening :8080');
});
