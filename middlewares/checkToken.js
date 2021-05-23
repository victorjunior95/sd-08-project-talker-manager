const checkToken = (req, res, next) => {
  if (!req.headers.token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (req.headers.token.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};
module.exports = checkToken;