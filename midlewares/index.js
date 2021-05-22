const readFile = require('./readFile');
const generateToken = require('./generateToken');
const emailValidation = require('./emailValidation');
const passwordValidation = require('./passwordValidation');
const tokenValidation = require('./tokenValidation');
const nameValidation = require('./nameValidation');
const ageValidation = require('./ageValidation');
const talkValidation = require('./talkValidation');

const { dateValidation, talkValidationExists } = talkValidation;

module.exports = {
  readFile,
  generateToken,
  emailValidation,
  passwordValidation,
  tokenValidation,
  nameValidation,
  ageValidation,
  dateValidation,
  talkValidationExists,
};
