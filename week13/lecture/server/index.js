const express = require('express');
const cors = require('cors');
const path = require('path');
const userRouter = require('./user-router.js');

const corsOptions = {
  origin: 'http://localhost:8080',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/dist')));
app.use('/users', userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

app.listen(8081, () => {
  console.log('Server is listening on :8081');
});