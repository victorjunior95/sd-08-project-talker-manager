const { req4Responses: { tokenRes } } = require('./JsonResponseMessages.json');

const tokenValidation = (req, res, next) => {
  // A requisição deve ter o token de autenticação nos headers.
  const { authorization } = req.headers;
  const AUTH_REGEX = /^[0-9a-zA-Z]{16}$/;
  // Caso o token não seja encontrado retorne um código de status 401, com o seguinte corpo: { "message": "Token não encontrado" }
  if (!authorization) return res.status(401).send(tokenRes[0]);
  // Caso o token seja inválido retorne um código de status 401, com o seguinte corpo: { "message": "Token inválido" }
  if (!AUTH_REGEX.test(authorization)) return res.status(401).send(tokenRes[1]);
  next();
};

module.exports = { tokenValidation };
