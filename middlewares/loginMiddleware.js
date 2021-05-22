const TokenGenerator = require('uuid-token-generator');

module.exports = (request, response, _next) => {
  const regex = /\S+@\S+\.\S+/;
  const { email } = request.body;
  const { password } = request.body;
  if (!email) {
    return response.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!regex.test(email)) {
    return response.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    return response.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return response.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const tokenGen = new TokenGenerator(128, TokenGenerator.BASE62);
  const newToken = tokenGen.generate().slice(0, 16);
  return response.status(200).json({ token: newToken });
};
