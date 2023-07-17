// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

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
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
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
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(/(https)?:\/\/(www\.)?[a-z0-9\-._~:/?#[\]@!$&'()*+,;=]{2,}\.[a-z0-9/#?]{2,}$/),
    }),
  }),
  patchAvatar,
);

router.get('/users/me', getCurrentUser);

module.exports = router;
