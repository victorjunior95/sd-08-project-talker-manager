const signIn = require('./signIn');
const verifyAuth = require('./authToken');
const form = require('./form');
const { logError } = require('./HandleCustomerError');

module.exports = {
  signIn,
  verifyAuth,
  form,
  logError,
};
