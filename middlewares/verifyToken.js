const rescue = require('express-rescue');
const { readJSON } = require('../utils');

module.exports = rescue(async (req, _res, next) => {
  const reqToken = req.headers.authorization;
  if (!reqToken) return next({ status: 401, message: 'Token não encontrado' });
  const { token } = await readJSON('./data/token.json');
  if (reqToken !== token) return next({ status: 401, message: 'Token inválido' });
  next();
});
