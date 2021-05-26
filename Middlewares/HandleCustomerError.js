function HandleCustomerError(message) {
  this.name = 'HandleCustomerError';
  this.message = message || '';
  this.stack = new Error().stack;
}

function logError(err, _req, res, next) {
  console.error(`=>  ${err}`);
  res.status(500)
  .json({ message: `error in the server ${err.message}` });
  next(err);
}

HandleCustomerError.prototype = Object.create(HandleCustomerError.prototype);
HandleCustomerError.prototype.constructor = HandleCustomerError;

module.exports = { HandleCustomerError, logError };
