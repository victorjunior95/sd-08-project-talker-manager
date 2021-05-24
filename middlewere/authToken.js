const verifyFieldToken = (token = '') => {
  const isValid = new RegExp('[a-z0-9]').test(token) && token.length >= 16;
  if (token) {
    if (!isValid) {
      return {
        message: 'Token inválido',
        isValid,
      };
    }
    return {
      message: '',
      isValid,
    };
  }
  return {
    message: 'Token não encontrado',
    isValid,
  };
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const isAuth = verifyFieldToken(authorization);
  if (!isAuth.isValid) return res.status(401).json({ message: isAuth.message }); 
  next();
};