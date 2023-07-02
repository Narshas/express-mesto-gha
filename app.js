// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

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
  res.status(404).send({ message: 'unknown error' });
});

app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
