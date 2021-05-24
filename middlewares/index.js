const {
  readTalker,
  writeTalker,
  generateToken,
} = require('./services');

const {
  tokenVerification,
  nameVerification,
  ageVerification,
  talkVerification,
  rateAndWatchedAtVerification,
  emailValidation,
} = require('./verification');

module.exports = {
  readTalker,
  writeTalker,
  generateToken,
  tokenVerification,
  nameVerification,
  ageVerification,
  talkVerification,
  rateAndWatchedAtVerification,
  emailValidation,
};