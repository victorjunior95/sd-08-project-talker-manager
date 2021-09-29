const utils = require('../utils');

const BAD_REQUEST_STATUS = 400;

const errNoAge = 'O campo "age" é obrigatório';
const errAgeInvalid = 'A pessoa palestrante deve ser maior de idade';

module.exports = (req, res, next) => {
  const { age } = req.body;
  if (!age) return res.status(BAD_REQUEST_STATUS).json({ message: errNoAge });

  const isAgeValidate = utils.validAge(age);
  if (!isAgeValidate) return res.status(BAD_REQUEST_STATUS).json({ message: errAgeInvalid });

  next();
};
