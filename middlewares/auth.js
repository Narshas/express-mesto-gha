const jwt = require('jsonwebtoken');

const { ERROR_NOTAUTH } = require('../errors/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    res.status(ERROR_NOTAUTH).send({ message: 'not authorized' });
    next();
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'super-secret-key');
  } catch (err) {
    res.status(ERROR_NOTAUTH).send({ message: 'not authorized' });
  }
  req.user = payload;
  next();
};

module.exports = auth;
