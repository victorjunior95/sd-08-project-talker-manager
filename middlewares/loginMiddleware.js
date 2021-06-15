const crypto = require('crypto-js');

const hash = crypto.MD5().toString();

const validateEmail = (email, res) => {
  const emailRgx = /[a-z]\w+@\w+.\w+/;

  if (!email || email === '') {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRgx.test(email)) {
    return res
      .status(400)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const validatePass = (pass, res) => {
  if (!pass || pass === '') {
    return res
      .status(400)
      .send({ message: 'O campo "password" é obrigatório' });
  }
  
  if (pass.length < 6) {
    return res
      .status(400)
      .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
};

module.exports = (req, res) => {
  const { email, password } = req.body;

  validateEmail(email, res);

  validatePass(password, res);

  console.log(hash);

  const token = hash.substr(0, 16);

  console.log(token.length);

  return res.status(200).send({ token });
};
