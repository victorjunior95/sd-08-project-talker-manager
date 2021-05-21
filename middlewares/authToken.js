const FAILD_TOKEN_AUTH_STATUS = 401;

const authToken = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res
      .status(FAILD_TOKEN_AUTH_STATUS)
      .json({ message: 'Token não encontrado' });
  }
  if (token.length !== 16) {
    return res
      .status(FAILD_TOKEN_AUTH_STATUS)
      .json({ message: 'Token inválido' });
  }
  next();
};

module.exports = authToken;
