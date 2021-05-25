const {
  REGEX_TO_VALIDATE_EMAIL,
  REGEX_TO_VALIDADE_DATE,
} = require('../common/regexDefs');
const {
  HTTP_UNAUTHORIZED_STATUS,
  HTTP_BAD_REQUEST_STATUS,
} = require('../common/httpStatus');

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
  return typeof param === 'object';
}

function tokenValidation({ headers: { authorization } }, response, cb) {
  if (!authorization) {
    return response
      .status(HTTP_UNAUTHORIZED_STATUS)
      .send({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return response
      .status(HTTP_UNAUTHORIZED_STATUS)
      .send({ message: 'Token inválido' });
  }
  cb();
}

function nameValidation({ body: name }, response, cb) {
  if (!name) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length <= 3) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  cb();
}

function ageValidation({ body: age }, response, cb) {
  if (!age) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send({ message: 'O campo "age" é obrigatório' });
  }
  if (age < 18) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  cb();
}

function notIsANumber(param) {
  return typeof param !== 'number';
}

function notIsAString(param) {
  return typeof param !== 'string';
}

function talkValidation({ body: talk }, response, cb) {
  const { rate, watchdAt } = talk;
  if (!talk || notIsANumber(rate) || notIsAString(watchdAt)) {
    return response.status(HTTP_BAD_REQUEST_STATUS).find({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  cb();
}

function rateValidation({ body: talk }, response, cb) {
  const { rate } = talk;
  if (!talk || notIsANumber(rate)) {
    cb();
  }
  if (rate < 1) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  cb();
}

function watchedAtValidation({ body: talk }, response, cb) {
  const { watchedAt } = talk;
  if (REGEX_TO_VALIDADE_DATE.test(watchedAt)) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  cb();
}

module.exports = {
  emailValidation,
  passwordValidation,
  isObject,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
};
