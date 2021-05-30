const crypto = require('crypto');

module.exports = (request, response) => {
  /* Trecho de código tirado do Course, Exercícios-Bônus-26.4 */
  const token = crypto.randomBytes(8).toString('hex');
  const { email, password } = request.body;
  const regexFormatoEmailValido = /[a-z]\w+@\w+.\w+/.test(email);
  
  if (!email) return response.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!regexFormatoEmailValido) {
     return response.status(400).send({ 
       message: 'O "email" deve ter o formato "email@email.com"',
      });
  }
  if (!password) return response.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return response.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return response.status(200).send({ token });
};
