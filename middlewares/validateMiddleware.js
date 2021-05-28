const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const validateMiddleware = [
  (req, res, next) => {
    if (!req.body.name || req.body.name === '') {
      return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (req.body.name.length < 3) {
      return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
  },
  (req, res, next) => {
    if (!req.body.age || req.body.age === '') {
      return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (req.body.age < 18) {
      return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
  },
  (req, res, next) => {
    if (!req.body.talk || req.body.talk === '') {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
    const { watchedAt, rate } = req.body.talk;
    if (!watchedAt || !rate) {
      return res.status(400).json(
        { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
      );
    }
    next();
  },
  (req, res, next) => {
    const { watchedAt } = req.body.talk;
    // https://support.dooblo.net/hc/en-us/articles/208295925-How-To-Validate-Date-Format-Using-Regular-Expression
    if (!/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/i.test(watchedAt)) {
      return res.status(400).json(
        { message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' },
      );
    }
    next();
  },
  (req, res, next) => {
    const { rate } = req.body.talk;
    if (rate < 1 || rate > 5 || rate % 1 !== 0) {
      return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
  },
];

module.exports = validateMiddleware;
