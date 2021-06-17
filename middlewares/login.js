const crypto = require('crypto');

const validateEmail = (email, res) => {
  const emailRgx = /[a-z]\w+@\w+.\w+/;

  if (!email || email === undefined) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }

  if (!emailRgx.test(email)) {
    return res
      .status(400)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
};

const validatePass = (pass, res) => {
  if (!pass || pass === undefined) {
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

  const hash = crypto.randomBytes(8).toString('hex');

  return res.status(200).send({ token: hash });
};
