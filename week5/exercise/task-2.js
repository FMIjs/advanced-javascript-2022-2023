
const http = require('http');
const url = require("url");

const hostname = '127.0.0.1';
const port = 3000;

const localDb = {
  'someProp': 'test'
};

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  const desiredProp = (pathname.match(/\/load\/([a-zA-Z]+)/) || [null, null])[1];
  if (!desiredProp) {
    // problem
  }
  const result = localDb[desiredProp];
  res.write(result || '<missing prop>')
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});