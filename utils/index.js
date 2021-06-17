const generateToken = require('./createToken');
const validEmail = require('./email');
const validPassword = require('./password');
const validToken = require('./token');
const validName = require('./name');
const validAge = require('./age');
const validTalk = require('./talk');
const validDate = require('./talkWatchedAt');
const validRate = require('./talkRate');

module.exports = {
  generateToken,
  validEmail,
  validPassword,
  validToken,
  validName,
  validAge,
  validTalk,
  validDate,
  validRate,
};
