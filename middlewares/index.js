const login = require('./login');
const tokenValidation = require('./tokenValidation');
const nameValidation = require('./nameValidation');
const ageValidation = require('./ageValidation');
const watchedAtValidation = require('./watchedAtValidation');
const rateValidation = require('./rateValidation');
const talkValidation = require('./talkValidation');

module.exports = {
  login,
  tokenValidation,
  nameValidation,
  ageValidation,
  watchedAtValidation,
  rateValidation,
  talkValidation,
};
