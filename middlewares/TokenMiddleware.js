module.exports = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    response.status(401).send({ message: 'Token não encontrado' });
  } else if (authorization.length !== 16) {
    response.status(401).send({ message: 'Token inválido' });
  }

  return next();
}; 