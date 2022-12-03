const http = require('http');

function jsonParser(req, res, cb) {
  if (req.headers['content-type'] !== 'application/json') {
    return void cb();
  }
  let reqData = '';

  req.on('data', (chunk) => { reqData += chunk; });

  req.on('error', (err) => {
    cb(err);
  })
  req.on('end', () => {
    req.body = JSON.parse(reqData);
    cb();
  });
}

function urlEncodedParser(contentType, dataString) {
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

function myExpress() {

  const middlewares = [];

  const router = {
    routes: {},
    handleUrl(url, req, res) {
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
      req.params = params;
      methodHanlder(req, res);
      res.end();
    }
  };

  const server = http.createServer((req, res) => {
    let counter = 0;

    function mainHandler() {
      const url = req.url;
      router.handleUrl(url, req, res);
    }

    function getNextMiddleware() {
      return middlewares[counter++] || mainHandler;
    }

    const firstMiddleware = getNextMiddleware();
    const hanlder = (err) => {
      if (err) {
        res.writeHead(500);
        return void res.end();
      }
      const nextMiddleware = getNextMiddleware();
      if (nextMiddleware !== null) {
        return void nextMiddleware(req, res, hanlder);
      }
    }

    firstMiddleware(req, res, hanlder);
  });

  return {
    use(fn) {
      middlewares.push(fn);
    },
    put(urlReStr, handlerFn) {
      const handlers = router.routes[urlReStr] || {};
      handlers['PUT'] = handlerFn;
      router.routes[urlReStr] = handlers;
    },
    get(urlReStr, handlerFn) {
      const handlers = router.routes[urlReStr] || {};
      handlers['GET'] = handlerFn;
      router.routes[urlReStr] = handlers;
    },
    post(urlReStr, handlerFn) {
      const handlers = router.routes[urlReStr] || {};
      handlers['POST'] = handlerFn;
      router.routes[urlReStr] = handlers;
    },
    delete(urlReStr, handlerFn) {
      const handlers = router.routes[urlReStr] || {};
      handlers['DELETE'] = handlerFn;
      router.routes[urlReStr] = handlers;
    },
    listen(port, cb) {
      server.listen(port, cb);
    }
  };
};

myExpress.jsonParser = jsonParser;
module.exports = myExpress;