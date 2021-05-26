const validaToken = (req, res, next) => {
  const { autorization } = req.headers;
  if (!autorization) return res.status(401).send({ message: 'Token não encontrado' });
  if (autorization.length > 16) res.status(401).send({ message: 'Token inválido' });
  next();
};

module.exports = validaToken;