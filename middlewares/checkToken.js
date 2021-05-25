const TOKEN_ERRADO = 401;
const DEZESSEIS = 16;

const checkToken = (req, res, next) => {
  const { authorization } = req.headers;
  
  if (!authorization) return res.status(TOKEN_ERRADO).send({ message: 'Token não encontrado' });
  if (authorization.length !== DEZESSEIS) {
    return res.status(TOKEN_ERRADO)
      .send({ message: 'Token inválido' });
  }
  next();
};

module.exports = checkToken;
