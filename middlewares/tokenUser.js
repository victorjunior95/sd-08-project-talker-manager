const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  const authorizationHeader = req.headers.authorization;
  const validHeaderRegex = new RegExp('0-9a-z', 'i');
  if (
    authorizationHeader.length < 16
    || validHeaderRegex.test(authorizationHeader)
  ) {
    return res.status(401).json({ message: 'Token invalido' });
  }

  next();
};

module.exports = authMiddleware;