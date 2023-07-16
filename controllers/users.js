// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcrypt');
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/error-bad-request');
const NotFoundError = require('../errors/error-not-found');
const NotAllowedError = require('../errors/error-not-allowed');
const NotAuthorizedError = require('../errors/error-not-auth');

const {
  OK,
  CREATED,
} = require('../errors/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(OK).send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('we dont have it');
      }
      res.status(OK).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(CREATED).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('data is incorrect'));
      } if (err.code === 11000) {
        next(new NotAllowedError('user already exists'));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
    })
    .catch(() => {
      throw new NotAuthorizedError('not authorized');
    })
    .catch(next);
};

const patchUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    { _id },
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequestError('data is incorrect'));
      } else if (err.message === 'Not Found') {
        next(NotFoundError('we dont have it'));
      } next(err);
    });
};

const patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    { _id },
    { avatar },
    { new: true, runValidators: true },
  )
    .then((data) => res.status(OK).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(BadRequestError('data is incorrect'));
      } else if (err.message === 'Not Found') {
        next(NotFoundError('we dont have it'));
      } next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('we dont have it');
      }
      res.status(OK).send(user);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  patchUser,
  patchAvatar,
  login,
  getCurrentUser,
};
