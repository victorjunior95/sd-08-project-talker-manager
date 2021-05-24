module.exports = (request, response, next) => {
  const { authorization } = request.headers;
  const regex = /^[a-z0-9]+$/i;
  // REGEX obtido em: https://qastack.com.br/programming/388996/regex-for-javascript-to-allow-only-alphanumeric

  if (!authorization) return response.status(401).json({ message: 'Token não encontrado' });
  if (authorization.length !== 16 || !regex.test(authorization)) {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};
