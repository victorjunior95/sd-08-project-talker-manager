const validateLogin = require('./validateLogin');
const handleErrors = require('./handleErrors');
const validateNewTalker = require('./validateNewTalker');
const validateEditTalker = require('./validateEditTalker');
const validateToken = require('./validateToken');

module.exports = {
  validateLogin,
  handleErrors,
  validateNewTalker,
  validateEditTalker,
  validateToken,
};