const utils = require('../utils');

const BAD_REQUEST_STATUS = 400;

const errNoName = 'O campo "name" é obrigatório';
const errNameInvalid = 'O "name" deve ter pelo menos 3 caracteres';

module.exports = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(BAD_REQUEST_STATUS).json({ message: errNoName });

  const isNameValidate = utils.validName(name);
  if (!isNameValidate) return res.status(BAD_REQUEST_STATUS).json({ message: errNameInvalid });

  next();
};
