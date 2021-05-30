/* Trecho de código tirado do Course, Exercícios-Bônus-26.4 */
const crypto = require('crypto');

function geradorDeToken() {
  return crypto.randomBytes(8).toString('hex');
};

/* Trecho tirado stackoverflow */
/*https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript*/
function validaEmail(email) {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const validaLogin = (request, response) => {
  const { email, password } = request.body;
  const token = geradorDeToken();

  if (!email) {
    return response.status(400).send({ 
      message: 'O campo "email" é obrigatório'
    });
  };

  if (!validaEmail(email)) {
    return response.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com'
    });
  };

  if (!password) {
    return response.status(400).send({
      message: 'O campo "password" é obrigatório'
    });
  };

  if (password.length < 6) {
    return response.status(400).send({
      message: 'O "password" deve ter pelo menos 6 caracteres'
    });
  };

  return response.status(200).send({
    token
  });
};

module.exports = {
  validaLogin,
}
