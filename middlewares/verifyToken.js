module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  if (authorization === undefined) {
    return res.status(401).send({ message: 'Token não encontrado' });
  }
  if (authorization.length < 16) {
    return res.status(401).send({ message: 'Token inválido' });
  }
  next();
};
