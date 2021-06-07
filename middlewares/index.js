const getTalkers = require('./getTalkers');
const getTalkerById = require('./getTalkerById');
const login = require('./login');
const tokenGenerator = require('./tokenGenerator');
const emailValidation = require('./emailValidation');
const passwordValidation = require('./passwordValidation');
const tokenValidation = require('./tokenValidation');
const postTalker = require('./postTalker');
const nameValidation = require('./nameValidation');
const ageValidation = require('./ageValidation');
const talkValidation = require('./talkValidation');
const talkWatchedAtValidation = require('./talkWatchedAtValidation');
const talkRateValidation = require('./talkRateValidation');
const putTalker = require('./putTalker');
const deleteTalker = require('./deleteTalker');

module.exports = {
  getTalkers,
  getTalkerById,
  login,
  tokenGenerator,
  emailValidation,
  passwordValidation,
  tokenValidation,
  postTalker,
  nameValidation,
  ageValidation,
  talkValidation,
  talkWatchedAtValidation,
  talkRateValidation,
  putTalker,
  deleteTalker,
};
