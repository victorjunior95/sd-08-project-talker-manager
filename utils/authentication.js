const crypto = require('crypto');

const PASSWORD_LENGTH = 6;

const regexEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

function validateEmail(email) {
  const validEmail = regexEmail(email);
  if (!email) {
    return { message: 'O campo "email" é obrigatório' };
  }
  if (!validEmail) {
    return { message: 'O "email" deve ter o formato "email@email.com"' };
  }
  return validEmail;
}

function validatePassword(password) {
  if (!password) {
    return { message: 'O campo "password" é obrigatório' };
  }
  if (password.length < PASSWORD_LENGTH) {
    return { message: 'O "password" deve ter pelo menos 6 caracteres' };
  }
  return true;
}

function getToken(email, password) {
  // const email = validateEmail();
  // const password = validatePassword();
  if (email && password) {
    const token = crypto.randomBytes(8).toString('hex');
    return token;
  }
}

module.exports = { validateEmail, validatePassword, getToken };
