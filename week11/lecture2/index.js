const express = require('express');
const path = require('path');
const userRouter = require('./user-router.js');


const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use('/users', userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve('./public/index.html'));
});

app.listen(8080, () => {
  console.log('Server is listening on :8080');
});