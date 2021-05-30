const crypto = require('crypto');

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!password) return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).send(
      { message: 'O "password" deve ter pelo menos 6 caracteres' },
    ); 
  }
  const validatorRegex = /^\w+@[a-zA-Z_]+?\.[[a-zA-Z]{2,3}$/;
  const validatorEmail = validatorRegex.test(email);
  
  if (!validatorEmail) {
    return res.status(400).send(
      { message: 'O "email" deve ter o formato "email@email.com"' },
      ); 
    }
    return res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
  };
// regex disponível no slack da turma 07, thread do dia 06/01/2021  
// formula de geração de token disponível em qastack.com.br/programming/8855687/secure-random-token-in-node-js

module.exports = login;