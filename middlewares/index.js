const validateToken = require('./validateToken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateDate = require('./validateDate');
const validateRate = require('./validateRate');
const validateEmptyRate = require('./validadeEmptyRate');
const validateEmptyWatched = require('./validateEmptyWatched');
const validateEmptyTalk = require('./validateEmptyTalk');
const postTalker = require('./postTalker');
const putTalker = require('./putTalker');

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateEmptyTalk,
  validateEmptyRate,
  validateEmptyWatched,
  postTalker,
  putTalker,
};
