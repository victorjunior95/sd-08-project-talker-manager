module.exports = (req, res, next) => {
  const { token } = req.headers;
  if (token.length !== 16) {
    res.status(401).json({ token: 'Token inválido' });
  }
  if (!token) {
    res.status(401).json({ token: 'Token não encontrado' });
  }
  next();
};