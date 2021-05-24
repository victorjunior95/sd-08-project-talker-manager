module.exports = (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    next({
      status: 401,
      message: 'Token não encontrado',
    });
  }
  const regex = /[0-9a-zA-Z]{16}/;
  if (!token.match(regex)) {
    next({
      status: 401,
      message: 'Token inválido',
    });
  }
  next();
};