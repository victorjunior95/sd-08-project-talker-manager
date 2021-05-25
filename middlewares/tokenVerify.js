module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({
      message: 'Token não encontrado',
    });
    return;
  }

  if (authorization !== '7mqaVRXJSp886CGr') {
    res.status(401).json({
      message: 'Token inválido',
    });
    return;
  }
  
  next();
};
