const router = new require('express').Router();
const jwt = require('./jwt');
const { ACCESS_HEADER_NAME, ACCESS_COOKIE_NAME } = require('./constants');
const users = ['Gosho', 'Pesho', 'Ivan'];
const tokenBlacklist = [];
const auth = [{
  email: 'test@best.com',
  name: "Test User",
  password: '123'
}];


// function isAuth(req, res, next) {
//   const user = req.session.user;
//   if (!user) { return void res.status(401).send({ errorCode: 'USER_NOT_FOUND' }); } // TODO move to global error handler and use next here
//   next();
// }

function isAuth(req, res, next) {
  const token = req.cookies[ACCESS_COOKIE_NAME] || req.headers[ACCESS_HEADER_NAME];
  if (!token || tokenBlacklist.includes(token)) { return void res.status(401).send({ errorCode: 'USER_NOT_FOUND' }); } // TODO move to global error handler and use next here
  jwt.verify(token, (err, decoded) => {
    const user = JSON.parse(decoded.data);
    if (err || !user) { return void res.status(401).send({ errorCode: 'USER_NOT_FOUND' }); } // TODO move to global error handler and use next here
    req.user = user;
    next();
  });
}

router.get('/', isAuth, (req, res) => {

  if (req.query['action'] === 'logout') {
    // req.session.destroy();
    const token = req.cookies[ACCESS_COOKIE_NAME] || req.headers[ACCESS_HEADER_NAME];
    tokenBlacklist.push(token);
    res.clearCookie(ACCESS_COOKIE_NAME);
    return void res.end();
  }

  if (req.query['action'] === 'auth') {
    // const user = req.session.user;
    const user = req.user;
    const { password: _, ...data } = user;
    return void res.send(data);
  }

  res.send(users);
});

router.post('/', (req, res, next) => {

  if (req.query['action'] === 'login') {
    const { email, password } = req.body;
    const user = auth.find(u => u.email === email && u.password === password);
    if (!user) { return void res.status(401).send({ errorCode: 'USER_NOT_FOUND' }); } // TODO move to global error handler and use next here
    // req.session.user = user;
    const { password: _, ...data } = user;
    const token = jwt.sign(data);
    res.cookie(ACCESS_COOKIE_NAME, token, { httpOnly: true });
    return void res.send({ user: data, token });
  }

  isAuth(req, res, (err) => {
    if (err) { return void next(err); }
    const newUserName = req.body.username;
    users.push(newUserName);
    res.send(users);
  });

});


router.get('/:id', isAuth, (req, res) => {
  const id = req.params.id;
  res.send(users[id]);
});

router.put('/:id', isAuth, (req, res) => {
  const index = req.params.id;
  const newUserName = req.body.username;
  users[index] = newUserName;
  res.send(users);
});

router.delete('/:id', isAuth, (req, res) => {
  const index = req.params.id;
  delete users[id];
  res.send(users);
});

module.exports = router;