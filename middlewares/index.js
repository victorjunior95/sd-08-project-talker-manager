const getTalkers = require('./getTalkers');
const getTalkerById = require('./getTalkerById');
const login = require('./login');
const tokenGenerator = require('./tokenGenerator');
const emailValidation = require('./emailValidation');

module.exports = {
  getTalkers,
  getTalkerById,
  login,
  tokenGenerator,
  emailValidation,
};
