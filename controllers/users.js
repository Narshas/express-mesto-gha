const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'error on server' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'we dont have it' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'data is not correct' });
      } else if (err.message === 'Not Found') {
        res.status(404).send({ message: 'we dont have it' });
      } else {
        res.status(500).send({ message: 'error on server' });
      }
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'validation error' });
      } else {
        res.status(500).send({ message: 'error on server' });
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
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'we dont have it' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'validation error' });
      } else {
        res.status(500).send({ message: 'error on server' });
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
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'we dont have it' });
      }
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'validation error' });
      } else {
        res.status(500).send({ message: 'error on server' });
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