module.exports = (req, res, next) => {
  const tokenValidation = /[\w]{16}$/;
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    }); 
  }
  if (!authorization.match(tokenValidation)) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};
