// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  OK,
  ERROR_NOTAUTH,
  CREATED
} = require('../errors/errors');

const {
  getUsers,
  getUserById,
  createUser,
  patchUser,
  patchAvatar,
  getCurrentUser,

} = require('../controllers/users');

router.get('/users', getUsers);
router.get(
  '/:userId',
  celevrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).required(),
    }),
  }),
  getUserById,
);

router.post('/', createUser);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  patchUser,
);

router.patch(
  'users/me/avatar',
  celevrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(/(https)?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]{2,}\.[a-z0-9/#?]{2,}$/),
    }),
  }),
  patchAvatar,
);

router.get('/users/me', getCurrentUser)

module.exports = router;

