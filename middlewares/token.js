module.exports = (req, res, next) => {
  const { authorization: token } = req.headers;
  const tokenRegex = /^[0-9a-zA-Z]{16}$/;
  if (!token) {
    res.status(401).send({ message: 'Token não encontrado' });
  }
  const testToken = tokenRegex.test(token);
  if (!testToken) {
    res.status(401).send({ message: 'Token inválido' });
  }
  next();
};
