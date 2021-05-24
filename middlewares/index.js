const getTalkers = require('./getTalkers');
const getTalkerById = require('./getTalkerById');
const login = require('./login');
const tokenGenerator = require('./tokenGenerator');
const emailValidation = require('./emailValidation');
const passwordValidation = require('./passwordValidation');

module.exports = {
  getTalkers,
  getTalkerById,
  login,
  tokenGenerator,
  emailValidation,
  passwordValidation,
};
