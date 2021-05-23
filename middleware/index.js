const { validateData } = require('../services');

function validateToken(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).send({ message: 'Token inválido' });
  next();
}

function validateName(req, res, next) {
  const { name } = req.body;
if (!name) return res.status(400).send({ message: 'O campo "name" é obrigatório' });
if (name.length < 3) {
  return res.status(400).send({ message: 'O "name" deve ter pelo menos 3 caracteres' });
}
next();
}

function validateAge(req, res, next) {
  const { age } = req.body;
  if (!age) return res.status(400).send({ message: 'O campo "age" é obrigatório' });
  if (age < 18) {
    return res.status(400).send({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function validadeTalkKey(req, res, next) {
  if (!req.body.talk) {
    return res.status(400)
    .send({ message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  const { talk: { watchedAt, rate } } = req.body;
  if (!watchedAt || !rate) {
    return res.status(400).send(
      { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
    );
  }
  next();
}

function validadeTalkValues(req, res, next) {
  const { talk: { rate, watchedAt } } = req.body;

  if (!validateData(watchedAt)) {
    return res.status(400).send({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
   return res.status(400).send({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  next();
}

module.exports = { validateToken, validateName, validateAge, validadeTalkKey, validadeTalkValues };
