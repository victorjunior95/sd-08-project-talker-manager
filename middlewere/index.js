const signIn = require('./signIn');
const verifyAuth = require('./authToken');
const form = require('./form');
const error = require('./error');

module.exports = {
  signIn,
  verifyAuth,
  form,
  error,
};
