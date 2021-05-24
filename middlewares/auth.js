const boom = require('@hapi/boom');
const tokenSchema = require('../schema/token');

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) throw boom.unauthorized('Token não encontrado');

  const { error } = tokenSchema.validate(token);

  if (error) throw boom.unauthorized('Token inválido');

  next();
};
