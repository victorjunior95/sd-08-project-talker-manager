function authMiddleware(req, response, next) {
    if (!req.headers.authorization) {
      response.status(401);
       return response.send({
            message: 'Token não encontrado',
        });
    } 
    if (req.headers.authorization.length !== 16) {
      response.status(401);
     return response.send({
        message: 'Token inválido',
      });
    }
    next();
  }
module.exports = authMiddleware;
