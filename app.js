// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const router = require('./routes/index');
// const auth = require('./middlewares/auth');
// const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(router);
// app.use('/', (req, res) => {
//   res.status(ERROR_NOT_FOUND).send({ message: 'we dont have it' });
// });

app.use(cookieParser());
// app.post('/signin', login);
// app.post('/signup', createUser);
// app.use(auth);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
