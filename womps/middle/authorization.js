module.exports = function checkToken(authorization) {
  if (!authorization) throw new Error('Token não encontrado');
  if (authorization.length < 16) throw new Error('Token inválido');
};
