module.exports = (request, response, next) => {
  const token = request.headers.authorization;
  if (!token) return response.status(401).json({ message: 'Token não encontrado' });
  if (typeof token !== 'string' || token.length !== 16 || token === '') {
    return response.status(401).json({ message: 'Token inválido' });
  }
  next();
};