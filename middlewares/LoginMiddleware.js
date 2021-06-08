const REG_EX = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

module.exports = (request, response, next) => {
  const { email, password } = request.body;

  if (!email) {
    response.status(400).send({ message: 'O campo "email" é obrigatório' });
  } else if (!REG_EX.test(email)) {
    response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else if (!password) {
    response.status(400).send({ message: 'O campo "password" é obrigatório' });
  } else if (password.length < 6) {
    response.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  return next();
};