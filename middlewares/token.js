const utils = require('../utils');

const UNAUTHORIZED_STATUS = 401;

const errNoToken = 'Token não encontrado';
const errTokenInvalid = 'Token inválido';

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(UNAUTHORIZED_STATUS).json({ message: errNoToken });

  const isTokenValidate = utils.validToken(authorization);
  if (!isTokenValidate) return res.status(UNAUTHORIZED_STATUS).json({ message: errTokenInvalid });

  next();
};
