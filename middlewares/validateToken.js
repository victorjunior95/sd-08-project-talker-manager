const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.send(401).send({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16) {
    return res.send(401).send({ message: 'Token inválido' });
  }
  next();
};

module.exports = validateToken;
