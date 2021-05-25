const { REGEX_TO_VALIDATE_EMAIL } = require("../common/regexDefs");

function emailValidation(email) {
  if (!email || email.length === 0) {
    return { message: 'O campo "email" é obrigatório' };
  }
  if (!REGEX_TO_VALIDATE_EMAIL.test(email)) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return true;
}

function passwordValidation(password) {
  if (!password || password.length === 0) {
    return { message: 'O campo "password" é obrigatório' };
  }
  if (password.toString().length < 6) {
    return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return true;
}

function isObject(param) {
  return typeof param === "object";
}

module.exports = {
  emailValidation,
  passwordValidation,
  isObject,
};
