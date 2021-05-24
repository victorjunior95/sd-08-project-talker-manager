const checkAuth = (token, res) => {
  if (!token) {
    res.status(401).send({ message: 'Token não encontrado' });
    return false;
  }

  if (token && token.toString().length !== 16) {
    res.status(401).send({ message: 'Token inválido' });
    return false;
  }
  return true;
};

module.exports = checkAuth;
