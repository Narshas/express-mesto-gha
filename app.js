// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const { celebrate, Joi } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const { ERROR_NOT_FOUND } = require('./errors/errors');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64a081518795e056ad3607af', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(router);
app.use('/', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'we dont have it' });
});

app.use(cookieParser());


// app.post('/signin', login);
// app.post('/signup', createUser);

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
