const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => { res.send(users) })
    .catch(() => {
      res.status(500).send({ message: 'error on server' });
    })
};

const getUsersById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if(!user) {
        return res.status(404).send({ message: "we don't have such user" })
      }
      res.status(200).send(user);
    });
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "data is not correct" });
      } else if (err.message === "Not Found") {
        res.status(404).send({ message: "we don't have such user" });
      } else {
        res.status(500).send({ message: 'error on server' });
      }
    })
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => { res.send(user) });
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "validation error" })
      } else {
        res.status(500).send({ message: "error on server" })
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,

};