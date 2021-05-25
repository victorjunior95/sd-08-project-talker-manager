const validateToken = require('./validateToken');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateDate = require('./validateDate');
const validateRate = require('./validateRate');
const validateEmptyRate = require('./validadeEmptyRate');
const validateEmptyWatched = require('./validateEmptyWatched');
const postTalker = require('./postTalker');

module.exports = {
  validateToken,
  validateName,
  validateAge,
  validateDate,
  validateRate,
  validateEmptyRate,
  validateEmptyWatched,
  postTalker,
};
