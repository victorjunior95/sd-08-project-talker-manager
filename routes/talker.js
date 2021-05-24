const express = require('express');

const middlewares = require('../middlewares');

const routeTalker = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_UNAUTHORIZED_STATUS = 401;
const HTTP_BAD_REQUEST_STATUS = 400;

routeTalker.get('/', (_req, res) => {
  try {
    const talker = middlewares.readTalker();
    return res.status(HTTP_OK_STATUS).json(talker);
  } catch (err) {
    return res.status(500).send({ err });
  }
});

routeTalker.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const talkerById = middlewares.readTalker()
      .find((element) => Number(element.id) === Number(id));
    if (talkerById) {
      return res.status(HTTP_OK_STATUS).json(talkerById);
    }
    return res.status(HTTP_NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

const tokenVerification = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenValidation = /^[0-9a-zA-Z]{16}$/;
  if (!authorization) {
    res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }
  if (!tokenValidation.test(authorization)) {
    res.status(HTTP_UNAUTHORIZED_STATUS).json({ message: 'Token inválido' });
  }
  next();
};

const nameVerification = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    res.status(HTTP_BAD_REQUEST_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
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
  if (!Number.isInteger(age)) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json({ message: 'A idade da pessoa palestrante deve ser um número inteiro' });
  }
  if (age < 18) {
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
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
};

const msgTalk = {
  message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
};

const rateAndWatchedAtVerification = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    res.status(HTTP_BAD_REQUEST_STATUS)
    .json(msgTalk);
  }
  const { talk: { watchedAt, rate } } = req.body;
  if (!watchedAt || !rate) {
    res.status(HTTP_BAD_REQUEST_STATUS)
      .json(msgTalk);
  }
  next();
};

routeTalker.post(
  '/',
  tokenVerification,
  nameVerification,
  ageVerification,
  rateAndWatchedAtVerification,
  talkVerification,
  (req, res) => {
    // try {
      const newTalker = req.body;
      const talkerArray = middlewares.readTalker();
      newTalker.id = talkerArray.length + 1;
      talkerArray.push(newTalker);
      middlewares.writeTalker(talkerArray);
      const add = req.body;
      res.status(HTTP_CREATED_STATUS).json(add);
    // } catch (err) {
    //   return res.status(500).send({ err });
    // }
  },
);

module.exports = routeTalker;
