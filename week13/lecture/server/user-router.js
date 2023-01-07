const router = new require('express').Router();
const users = ['Gosho', 'Pesho', 'Ivan'];

router.get('/', (req, res) => {
  res.send(users);
});

router.post('/', (req, res) => {
  const newUserName = req.body.username;
  users.push(newUserName);
  res.send(users);
});


router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(users[id]);
});

router.put('/:id', (req, res) => {
  const index = req.params.id;
  const newUserName = req.body.username;
  users[index] = newUserName;
  res.send(users);
});

router.delete('/:id', (req, res) => {
  const index = req.params.id;
  delete users[id];
  res.send(users);
});

module.exports = router;