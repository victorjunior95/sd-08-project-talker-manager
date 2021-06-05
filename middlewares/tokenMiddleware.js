const tokenMiddleware = (_req, res, next) => {
  const { authorization } = _req.headers;
  if (!authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (authorization.toString().length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};

module.exports = { tokenMiddleware };
