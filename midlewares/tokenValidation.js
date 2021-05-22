module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (token && token.length !== 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};
