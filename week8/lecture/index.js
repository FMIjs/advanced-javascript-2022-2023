const http = require('http');
const port = 8080;

const urlEncodedStringValueRe = /^"(.*)"$/;

const users = [
  { username: 'Ivan', id: 1 },
  { username: 'Pesho', id: 2 },
  { username: 'Gosho', id: 3 }
];

const router = {
  routes: {
    '\/user$': {
      POST: (data, res) => {
        const { body } = data;
        const id = users.length + 1;
        const user = { ...body, id };
        users.push(user);
        res.write(JSON.stringify(user));
      },
      GET: (data, res) => {
        res.write(JSON.stringify(users));
      }
    },
    '\/user\/(?<id>[^\/]*)$': {
      PUT: (data, res) => {
        const { params: { id }, body } = data;
        const user = users[id - 1];
        if (!user) { return void res.write(null); }
        const updatedUser = { ...user, ...body };
        users[id - 1] = updatedUser;
        res.write(JSON.stringify(updatedUser));
      },
      GET: (data, res) => {
        const { params: { id } } = data;
        if (!id) { return void res.write(null); }
        res.write(JSON.stringify(users[id - 1] || null));
      },
      DELETE: (data, res) => {
        const { params: { id } } = data;
        if (!id) { return void res.write(null); }
        const deletedUser = users[id - 1];
        delete users[id - 1];
        res.write(JSON.stringify(deletedUser));
      }
    }
  },
  handleUrl(url, body, req, res) {
    let handlers = null;
    let params = {};
    for (const [routeKey, routeHandlers] of Object.entries(this.routes)) {
      const routeKeyRe = new RegExp(routeKey);
      if (!routeKeyRe.test(url)) { continue; }
      handlers = routeHandlers;
      const { groups = {} } = routeKeyRe.exec(url);
      params = groups || {};
      break;
    }
    const method = req.method.toUpperCase();
    const methodHanlder = handlers[method] || null;
    if (!methodHanlder) {
      res.writeHead(404, 'Route not found!');
      res.end();
      return;
    }
    methodHanlder({ body, params }, res);
    res.end();
  }
};

function parseData(contentType, dataString) {
  if (contentType === 'application/json') {
    return JSON.parse(dataString);
  }
  if (contentType === 'application/x-www-form-urlencoded') {
    return dataString.split('&')
      .map(str => str.split('='))
      .reduce((acc, [key, value]) => {
        value = decodeURI(value);
        if (urlEncodedStringValueRe.test(value)) {
          acc[key] = value.replace(urlEncodedStringValueRe, '$1');
        } else if (['true', 'false'].includes(value)) {
          acc[key] = value === 'true' ? true : false;
        } else if (value === 'null') {
          acc[key] = null;
        } else {
          const numberValue = +value;
          if (!Number.isNaN(numberValue)) {
            acc[key] = numberValue;
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, {});
  }
  return null;
}

const server = http.createServer((req, res) => {
  let reqData = '';

  req.on('data', (chunk) => {
    reqData += chunk;
  });

  req.on('end', () => {
    const data = parseData(req.headers['content-type'], reqData);
    const url = req.url;
    router.handleUrl(url, data, req, res);
  });
});

server.listen(port, () => {
  console.log(`Server is listening on :${port}`);
});