const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRouter = require('./user-router.js');

const corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};


const app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true, maxAge: 60000 }
}));
app.use(cookieParser());
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