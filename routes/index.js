// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardRoutes = require('./cards');
const userRoutes = require('./users');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

const { ERROR_NOT_FOUND } = require('../errors/errors');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).optional(),
      about: Joi.string().min(2).max(30).optional(),
      avatar: Joi.string().optional().pattern(/(https)?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]{2,}\.[a-z0-9/#?]{2,}$/),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6).max(30),
    }),
  }),
  login,
);

router.use('/cards', cardRoutes);
router.use('/users', userRoutes);
router.use(auth);

router.use('*', (req, res , next) => {
  res.status(ERROR_NOT_FOUND).send('we dont have it');
  next();
});

module.exports = router;
