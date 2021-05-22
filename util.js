const fs = require('fs');
const crypto = require('crypto');

function addTalker(talkerData) {
  return fs.writeFileSync('talker.json', JSON.stringify(talkerData));
}

function getAllTalkers() {
  return JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
}

function getAuthenticationToken() {
  return crypto.randomBytes(8).toString('hex');
}

function verifyAge(age) {
  if (age) {
    return age < 18
      ? 'A pessoa palestrante deve ser maior de idade'
      : true;
  }
  return 'O campo "age" é obrigatório';
}

function verifyEmail(email) {
  if (email) {
    const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    return !emailRegex.test(email)
      ? 'O "email" deve ter o formato "email@email.com"'
      : true;
  }
  return 'O campo "email" é obrigatório';
}

function verifyName(name) {
  if (name) {
    return name.length < 3
      ? 'O "name" deve ter pelo menos 3 caracteres'
      : true;
  }
  return 'O campo "name" é obrigatório';
}

function verifyPassword(password) {
  if (password) {
    return password.length < 6
      ? 'O "password" deve ter pelo menos 6 caracteres'
      : true;
  }
  return 'O campo "password" é obrigatório';
}

function verifyRate(talk) {
  const hasRateKey = Object.prototype.hasOwnProperty.call(talk, 'rate');

  if (hasRateKey) {
    return (talk.rate >= 1 && talk.rate <= 5)
     ? true
     : 'O campo "rate" deve ser um inteiro de 1 à 5';
  }
  return 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
}

function verifyWatchedAt(talk) {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const hasWatchedAtKey = Object.prototype.hasOwnProperty.call(talk, 'watchedAt');

  if (hasWatchedAtKey) {
    return dateRegex.test(talk.watchedAt)
     ? true
     : 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
  }
  return 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
}

function verifyTalkerData(talkerData) {
  const { name, age, talk } = talkerData;
 
  if (talk) {
    const isNameValid = verifyName(name);
    const isAgeValid = verifyAge(age);
    const isRateValid = verifyRate(talk);
    const isWatchedAtValid = verifyWatchedAt(talk);
  
    return [isNameValid, isAgeValid, isWatchedAtValid, isRateValid];
  }
}

module.exports = {
  addTalker,
  getAllTalkers,
  getAuthenticationToken,
  verifyAge,
  verifyEmail,
  verifyName,
  verifyPassword,
  verifyRate,
  verifyWatchedAt,
  verifyTalkerData,
};