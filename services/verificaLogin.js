const geraToken = require('./geraToken');
const verificaEmail = require('./verificaEmail');
const verificaSenha = require('./verificaSenha');

module.exports = (request, response, _next) => {
  const { email, password } = request.body;

  if (!email) return response.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!verificaEmail(email)) {
    return response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!verificaSenha) {
    return response.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (!verificaSenha(password)) {
    return response.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  response.status(200).send({ token: geraToken() });
};
