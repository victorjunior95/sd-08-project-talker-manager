const express = require('express');

const middlewares = require('../middlewares');

const routeTalker = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_BAD_REQUEST_STATUS = 400;
const MIN_TOKEN = 16;
const MIN_NAME = 3;

routeTalker.get('/', (_req, res) => {
  const talker = middlewares.readTalker();
  return res.status(HTTP_OK_STATUS).json(talker);
});

routeTalker.get('/:id', (req, res) => {
  const { id } = req.params;
  const talkerById = middlewares.readTalker()
    .find((element) => Number(element.id) === Number(id));
  if (talkerById) {
    return res.status(HTTP_OK_STATUS).json(talkerById);
  }
  return res.status(HTTP_NOT_FOUND_STATUS).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

const tokenVerification = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }
  if (token.length < MIN_TOKEN) {
    res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
  next();
};

const nameVerification = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < MIN_NAME) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageVerification = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof (age) !== 'number' && Number.isInteger(age)) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A idade da pessoa palestrante deve ser um número inteiro' });
  }
  if (age < MIN_NAME) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
};

const talkVerification = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const formatDate = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;
  if (!formatDate.test(watchedAt)) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  const intervalNumbers = /^([1-5])$/;
  if (Number.isInteger(rate) && !intervalNumbers.test(rate)) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'O campo "rate" deve ser um inteiro entre 1 e 5' });
  }
  next();
};

const rateAndWatchedAtVerification = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  if (!watchedAt || !rate) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
  }
  next();
};

routeTalker.post('/', tokenVerification, nameVerification,
  ageVerification, talkVerification, rateAndWatchedAtVerification, (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkerArray = middlewares.readTalker();
  talkerArray.push({ name, age, talk: { watchedAt, rate } });
  middlewares.writeTalker(talkerArray);
  const add = req.body;
  res.status(HTTP_CREATED_STATUS).json(add);
});

module.exports = routeTalker;
