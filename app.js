// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cookieParser = require('cookie-parser');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const error = require('./middlewares/error');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { cors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(error);
// app.use(cors);
app.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});
