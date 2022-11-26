const express = require('express');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.headers);
  setTimeout(() => {
    next();
  }, 1000);
});

app.post('/user', (req, res, next) => {
  console.log(req.body);

}, function (req, res, next) {
  res.send('POST');
});

app.get('/', (req, res) => {
  res.send('HELLO!');
});

app.listen(8080, () => { console.log('Server is running') });