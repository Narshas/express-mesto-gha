const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'error on server' }));
};

const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'we dont have such user' });
      } else {
        res.status(500).send({ message: 'error on server' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'we dont have it' });
      }
      res.status(200).send(card);
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

module.exports = {
  getCards,
  createCard,
  deleteCard,
};