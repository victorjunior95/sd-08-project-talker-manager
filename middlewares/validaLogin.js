/* Trecho de código tirado do Course, Exercícios-Bônus-26.4 */
const crypto = require('crypto');

function geradorDeToken() {
  return crypto.randomBytes(8).toString('hex');
}

/* Trecho tirado stackoverflow */
/* https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail */
function validaEmail(email) {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  return regex.test(email);
}

const validaLogin = (request, response) => {
  const { email, password } = request.body;
  const token = geradorDeToken();

  if (!email) return response.status(400).send({ message: 'O campo "email" é obrigatório' });

  if (!validaEmail(email)) {
    return response.status(400).send({ message: 'O "email" deve ter o formato "email@email.com' });
  }

  if (!password) {
    return response.status(400).send({ message: 'O campo "password" é obrigatório' });
  }

  if (password.length < 6) {
    return response.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } 

  return response.status(200).send({ token });
};

module.exports = { 
  validaLogin,
};
