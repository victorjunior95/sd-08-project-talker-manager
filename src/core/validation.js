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

function tokenValidation(_request, response, cb) {
  if (!_request.headers.authorization) {
    return response.status(HTTP_UNAUTHORIZED_STATUS).send({ message: 'Token não encontrado' });
  }
  if (_request.headers.authorization.length < 16) {
    return response.status(HTTP_UNAUTHORIZED_STATUS).send({ message: 'Token inválido' });
  }
  cb();
}

function nameValidation(_request, response, cb) {
  if (!_request.body.name) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send({ message: 'O campo "name" é obrigatório' });
  }
  if (_request.body.name.length <= 3) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  cb();
}

function ageValidation(_request, response, cb) {
  if (!_request.body.age) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send({ message: 'O campo "age" é obrigatório' });
  }
  if (_request.body.age < 18) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function notIsANumber(param) {
  return typeof param !== 'number';
}

function notIsAString(param) {
  return typeof param !== 'string';
}

function talkValidation(_request, response, cb) {
  if (
    !_request.body.talk
      || notIsANumber(_request.body.talk.rate)
      || notIsAString(_request.body.talk.watchedAt)
  ) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }
  cb();
}

function rateValidation(_request, response, cb) {
  if (
    !_request.body.talk
      || notIsANumber(_request.body.talk.rate)
  ) {
    cb();
  }
  if (_request.body.talk.rate < 1 || _request.body.talk.rate > 5) {
    return response
      .status(HTTP_BAD_REQUEST_STATUS)
      .send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  cb();
}

function watchedAtValidation(_request, response, cb) {
  if (!VALID_DATE.test(_request.body.talk.watchedAt)) {
    return response.status(REGEX_TO_VALIDADE_DATE).send({
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
