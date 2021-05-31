module.exports = (request, response, next) => {
  const { authorization } = request.headers;
  const regex = /^[a-z0-9]+$/i;

  if (!authorization) {
    return response.status(401).send({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 || !regex.test(authorization)) {
    return response.status(401).send({ message: 'Token inválido' });
  }
  next();
};
