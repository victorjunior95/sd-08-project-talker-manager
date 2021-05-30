// Email regex:  https://www.regular-expressions.info/email.html
// Crypto token: https://futurestud.io/tutorials/generate-a-random-string-in-node-js-or-javascript

const crypto = require('crypto');

const token = crypto.randomBytes(16).toString('base64').replace('/', '-').slice(0, 16);

const mailChecker = (req, res, next) => {
  const { email } = req.body;

  const NO_EMAIL_FIELD = 'O campo "email" é obrigatório';
  const NO_EMAIL_FORMAT = 'O "email" deve ter o formato "email@email.com"';
  const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!email) {
    return res.status(400).send({ message: NO_EMAIL_FIELD });
  }

  if (!email.match(EMAIL_REGEX)) {
    return res.status(400).send({ message: NO_EMAIL_FORMAT });
  }

  next();
};

const passwordChecker = (req, res, next) => {
  const { password } = req.body;

  const NO_PASSWORD_FIELD = 'O campo "password" é obrigatório';
  const NO_PASSWORD_LENGTH = 'O "password" deve ter pelo menos 6 caracteres';

  if (!password) {
    return res.status(400).send({ message: NO_PASSWORD_FIELD });
  }

  if (password.toString().length < 6) {
    return res.status(400).send({ message: NO_PASSWORD_LENGTH });
  }

  next();
};

const sendToken = (_req, res) => {
  try {
    res.send({ token });
  } catch (err) {
    console.error(err);
  }
};

const login = { mailChecker, passwordChecker, sendToken };

module.exports = login;
