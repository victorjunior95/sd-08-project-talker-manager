const checkSizeTokenAuth = (token) => {
  const LENGTH_TOKEN = 16;
  return String(token).length === LENGTH_TOKEN;
};
const UNAUTHORIZED = 401;

const getToken = (request, response, next) => {
  const { authorization } = request.headers;
  const verifyIfIsValidToken = checkSizeTokenAuth(authorization);
  if (!authorization) {
    return response
      .status(UNAUTHORIZED)
      .json({ message: 'Token não encontrado' });
  }
  if (!verifyIfIsValidToken) {
    return response.status(UNAUTHORIZED).json({ message: 'Token inválido' });
  }

  return next();
  //   return response.status(200)
};

module.exports = { getToken };
