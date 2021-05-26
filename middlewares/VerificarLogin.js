const crypto = require('crypto');

/** Source: https://stackoverflow.com/questions/55104802/nodejs-crypto-randombytes-to-string-hex-doubling-size */
function gerarToken() {
  return crypto.randomBytes(8).toString('hex');
}

/** Source: https://cursos.alura.com.br/forum/topico-como-validar-email-e-senha-em-javascript-80469 */
function validarEmail(email) {
  const reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return reg.test(email);
}

const verificarLogin = (req, res) => {
  const { email, password } = req.body;
  const token = gerarToken();

  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });

  if (!validarEmail(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });

  if (password.toString().length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  
  return res.status(200).send({ token });
};

module.exports = verificarLogin;
