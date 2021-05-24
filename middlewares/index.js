const { 
  validateEmail,
  validatePassword,
} = require('./validateLogin');
const { 
  validateName, 
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
} = require('./validateTalker');
const validateToken = require('./validateToken');
const readTalkers = require('./readFile');
const writeTalkers = require('./writeFile');
const generateToken = require('./generateToken');

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt, 
  validateRate,
  validateToken,
  readTalkers,
  writeTalkers,
  generateToken,
};