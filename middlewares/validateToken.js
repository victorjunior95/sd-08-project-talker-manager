const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.send(401).send({ message: 'Token não encontrado' });
    return;
  }
  if (authorization.length !== 16) {
    res.send(401).send({ message: 'Token inválido' });
    return;
  }
  next();
};

module.exports = validateToken;
