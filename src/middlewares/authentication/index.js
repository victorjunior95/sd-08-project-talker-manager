const boom = require('@hapi/boom');
const validation = require('../../validation');

const authentication = (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) throw boom.unauthorized('Token não encontrado');

  const { error } = validation.token.validate(token);

  if (error) throw boom.unauthorized('Token inválido');

  next();
};

module.exports = authentication;
