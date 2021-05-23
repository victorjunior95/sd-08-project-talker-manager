const boom = require('@hapi/boom');

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw boom.unauthorized('Token não encontrado');

  if (authorization.length !== 16) throw boom.unauthorized('Token inválido');
  
  next();
};
