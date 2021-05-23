function auth(req, _res, next) {
  if (!req.headers.authorization) {
    next({ status: 401, message: 'Token não encontrado' });
  } else if (req.headers.authorization.length !== 16) {
    next({ status: 401, message: 'Token inválido' });
  } else {
    next();
  }
}

module.exports = auth;
