const auth = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('token do auth', authorization);

  if (!authorization) return res.status(401).send({ message: 'Token não encontrado' });
  if (authorization.length !== 16) return res.status(401).send({ message: 'Token inválido' });
  next();
};

module.exports = auth;
