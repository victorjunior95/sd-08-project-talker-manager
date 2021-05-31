const authToken = require('./authToken');
const authLogin = require('./authLogin');
const validateTalkerNameAndAge = require('./validateTalkerNameAndAge');
const validateDateAndTalk = require('./validateDateAndTalk');
const validateTalkKeys = require('./validateTalkKeys');

module.exports = {
  authToken,
  authLogin,
  validateTalkerNameAndAge,
  validateTalkKeys,
  validateDateAndTalk,
};