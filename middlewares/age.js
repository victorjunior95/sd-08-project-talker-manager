const utils = require('../utils');

const BAD_REQUEST_STATUS = 400;

const errNoAge = 'O campo "name" é obrigatório';
const errAgeInvalid = 'O "name" deve ter pelo menos 3 caracteres';

module.exports = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(BAD_REQUEST_STATUS).json({ message: errNoAge });

  const isAgeValidate = utils.validAge(age);
  if (!isAgeValidate) return res.status(BAD_REQUEST_STATUS).json({ message: errAgeInvalid });

  next();
};
