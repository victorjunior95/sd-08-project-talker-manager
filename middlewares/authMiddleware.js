module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const tokenValidation = /^[0-9a-zA-Z]{16}$/.test(authorization);
  if (!authorization) res.status(401).send({ message: 'Token não encontrado' });
  if (!tokenValidation) res.status(401).send({ message: 'Token inválido' });
  next();
};
