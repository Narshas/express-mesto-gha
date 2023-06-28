const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.get('/', (req, res) => {
  res.send('all good');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

//не забыть про импорт моделей
