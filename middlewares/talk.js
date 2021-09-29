const utils = require('../utils');

const BAD_REQUEST_STATUS = 400;

const errNoTalk = 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios';
const errDateInvalid = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';
const errRateInvalid = 'O campo "rate" deve ser um inteiro de 1 à 5';

module.exports = (req, res, next) => {
  const { talk } = req.body;
  if (utils.validTalk(talk)) return res.status(BAD_REQUEST_STATUS).json({ message: errNoTalk });

  const isDateValidate = utils.validDate(talk.watchedAt);
  if (!isDateValidate) return res.status(BAD_REQUEST_STATUS).json({ message: errDateInvalid });

  const isRateValidate = utils.validRate(talk.rate);
  if (!isRateValidate) return res.status(BAD_REQUEST_STATUS).json({ message: errRateInvalid });

  next();
};
