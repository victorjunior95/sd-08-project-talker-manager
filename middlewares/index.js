const authentication = require('./authentication');
const nameValidation = require('./nameValidation');
const ageValidation = require('./ageValidation');
const talkValidation = require('./talkValidation');
const rateValidation = require('./rateValidation');
const watchedAtValidation = require('./watchedAtValidation');

module.exports = {
  authentication,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
};
