// O corpo da requisição deverá ter o seguinte formato:

// {
//   "email": "email@email.com",
//   "password": 123456
// }
// O campo email deverá ser um email válido. Ele é obrigatório.
// JSON.stringify({ message: 'O campo "email" é obrigatório' }) == jsonFile({{ "message": "O campo \"email\" é obrigatório" }});
// const jsonfiletest = require('./JsonTesting.json');

// console.log(jsonfiletest);
// console.log(JSON.stringify({ message: 'O campo "email" é obrigatório' }));
const emailPassValid = (req, res, next) => {
  const { body } = req;
  const { email, password } = body;
  const EMAIL_VALIDATION = /^[\w]+@([\w]+\.)+[\w]{2,4}$/gi; // fonte: https://regexr.com/3e48o
  // Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo: { "message": "O campo \"email\" é obrigatório" }
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  // Caso o email passado não seja um email válido retorne um código de status 400, com o seguinte corpo: { "message": "O \"email\" deve ter o formato \"email@email.com\"" }
  if (!EMAIL_VALIDATION.test(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }
  // O campo password deverá ter pelo menos 6 caracteres.
// Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo: { "message": "O campo \"password\" é obrigatório" }
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  // Caso a senha não tenha pelo menos 6 caracteres retorne um código de status 400, com o seguinte corpo: { "message": "O \"password\" deve ter pelo menos 6 caracteres" }
  if (password.length <= 6) {
    return res.status(400)
    .send(JSON.stringify({ message: 'O "password" deve ter pelo menos 6 caracteres' }));
  }
  next();
};

module.exports = { emailPassValid };
