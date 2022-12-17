const express = require('express');
const users = ['Gosho', 'Pesho', 'Ivan'];

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.post('/user', (req, res) => {
  const isJSONRequest = req.headers['content-type'] === 'application/json';
  const index = req.body.index;
  const newUserName = req.body.username;
  if (index) {
    users[index] = newUserName;
  } else {
    users.push(newUserName);
  }
  if (isJSONRequest) {
    res.send(users);
  } else {
    res.redirect('/');
  }
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/', (req, res) => {
  res.render('main', { message: 'TESTING...', users });
});

app.listen(8080, () => {
  console.log('Server is listening on :8080');
});