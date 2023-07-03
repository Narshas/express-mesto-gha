const User = require('../models/user');

const { ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  OK,
} = require('../errors/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(() => res.status(ERROR_DEFAULT).send({ message: 'error on server' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => new Error('Not Found'))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'data is incorrect' });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'we dont have it' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'error on server' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'data is incorrect' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'error on server' });
      }
    });
};

const patchUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    { _id },
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Not Found'))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'data is incorrect' });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'we dont have it' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'error on server' });
      }
    });
};

const patchAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    { _id },
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => new Error('Not Found'))
    .then((data) => res.status(OK).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'data is incorrect' });
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({ message: 'we dont have it' });
      } else {
        res.status(ERROR_DEFAULT).send({ message: 'error on server' });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUser,
  patchAvatar,
};
