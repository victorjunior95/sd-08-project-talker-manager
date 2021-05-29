const tokenTalker = ((request, response, next) => {
  const { authorization } = request.headers;
  
  if (!authorization) {
    return response.status(401).send({
      message: 'Token não encontrado',
    });
  }
  if (authorization.length !== 16) {
    return response.status(401).send({
      message: 'Token inválido',
    });
  }

  next();
});

module.exports = tokenTalker;