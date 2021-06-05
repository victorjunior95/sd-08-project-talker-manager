const tokenMiddleware = (_req, res, next) => {
  const { Authorization } = _req.headers;
  if (!Authorization) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (Authorization.length < 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

module.exports = { tokenMiddleware };
