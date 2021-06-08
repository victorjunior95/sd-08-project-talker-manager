const REG_EX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

module.exports = (request, response, next) => {
  const { email, password } = request.body;

  if (!email) {
    return response.status(400).send({ message: 'O campo "email" é obrigatório' });
  } if (!REG_EX.test(email)) {
    return response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return response.status(400).send({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return response.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return next();
};