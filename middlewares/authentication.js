const UNAUTHORIZED = 401;

const authentication = (request, response, next) => {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(UNAUTHORIZED).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return response.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = authentication;
