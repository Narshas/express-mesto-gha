const { ERROR_DEFAULT } = require('./errors');

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.name = "DefaultError";
    this.statusCode = ERROR_DEFAULT;
  }
}

module.exports = DefaultError;