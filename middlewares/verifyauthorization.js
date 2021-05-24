const messages = {
  tokenNotFound: 'Token não encontrado',
  tokenInvalid: 'Token inválido',
};

// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
const tokenValidation = (token) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{16}$/;
  console.log(regex.test(token));
  return regex.test(token);
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization === undefined) return res.status(401).json({ message: messages.tokenNotFound });
  if (!tokenValidation(authorization)) {
    return res.status(401).json({ message: messages.tokenInvalid });
  }
  next();
};
