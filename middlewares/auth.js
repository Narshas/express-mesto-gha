// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/error-not-auth');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthorizedError('not authorized'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-secret-key');
  } catch (err) {
    throw new NotAuthorizedError('not authorized');
  }
  req.user = payload;
  next();
};

module.exports = auth;
