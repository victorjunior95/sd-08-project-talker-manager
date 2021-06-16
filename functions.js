const randtoken = require('rand-token');
const validator = require('email-validator');

const findTalkerByID = (talkers, id) => talkers.find((e) => e.id === Number(id));

const generateToken = () => randtoken.generate(16);

const verifyEmailAndPassword = (email, password, MESSAGES) => {
  if (!email) return MESSAGES.emptyEmail;
  if (!password) return MESSAGES.emptyPassword;
  if (password.toString().length < 6) return MESSAGES.passwordLowerThenSix;
  const validEmail = validator.validate(email);
  if (!validEmail) return MESSAGES.wrongEmailFormat;
  return false;
};

module.exports = {
  findTalkerByID,
  generateToken,
  verifyEmailAndPassword,
};
