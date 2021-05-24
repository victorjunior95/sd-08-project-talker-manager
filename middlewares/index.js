const talkerByIdMiddleware = require('./getTalkerByIdMiddleware');
const loginMiddleware = require('./loginMiddleware');
const ageValidateMiddleware = require('./ageValidateMiddleware');
const nameValidateMiddleware = require('./nameValidateMiddleware');
const rateValidateMiddleware = require('./rateValidateMiddleware');
const talkValidateMiddleware = require('./talkValidateMiddleware');
const tokenValidateMiddleware = require('./tokenValidateMiddleware');
const watchedAtValidateMiddleware = require('./watchedAtValidateMiddleware');
const createTalkerMiddleware = require('./createTalkerMiddleware');
const editTalkerMiddleware = require('./editTalkerMiddleware');
const deleteTalkerMiddleware = require('./deleteTalkerMiddleware');

module.exports = {
  talkerByIdMiddleware,
  loginMiddleware,
  ageValidateMiddleware,
  nameValidateMiddleware,
  rateValidateMiddleware,
  talkValidateMiddleware,
  tokenValidateMiddleware,
  watchedAtValidateMiddleware,
  createTalkerMiddleware,
  editTalkerMiddleware,
  deleteTalkerMiddleware,
};