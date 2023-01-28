const router = new require('express').Router();
const users = ['Gosho', 'Pesho', 'Ivan'];
const auth = [{
  email: 'test@best.com',
  name: "Test User",
  password: '123'
}];


function isAuth(req, res, next) {
  const user = req.session.user;
  if (!user) { return void res.status(401).send({ errorCode: 'USER_NOT_FOUND' }); } // TODO move to global error handler and use next here
  next();
}

router.get('/', isAuth, (req, res) => {

  if (req.query['action'] === 'logout') {
    req.session.destroy();
    return void res.end();
  }

  if (req.query['action'] === 'auth') {
    const user = req.session.user;
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
    req.session.user = user;
    const { password: _, ...data } = user;
    return void res.send(data);
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