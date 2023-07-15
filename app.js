// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const router = require('./routes/index');
const auth = require('./middlewares/auth');
// const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const { ERROR_NOT_FOUND } = require('./errors/errors');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(router);
app.use('/', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'we dont have it' });
});

app.use(cookieParser());
// app.post('/signin', login);
// app.post('/signup', createUser);
app.use(auth);

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
