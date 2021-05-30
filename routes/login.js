// reference: https://nodejs.org/dist/latest-v10.x/docs/api/fs.html
const express = require('express');
const {
  checkValidityEmail,
  tokenGenerator,
  checkValidityPassword,
} = require('./helpers');

const router = express.Router();
const SUCCESS = 200;
const BAD_REQUEST = 400;

const token = tokenGenerator();

router.post('/', (request, response) => {
  const { email, password } = request.body;
  const checkEmail = checkValidityEmail(email);
  const checkPassword = checkValidityPassword(password);
  if (!email) {
    response.status(BAD_REQUEST).send({ message: 'O campo "email" é obrigatório' });
  } else if (!checkEmail) {
    response
      .status(BAD_REQUEST)
      .send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    response.status(BAD_REQUEST).send({ message: 'O campo "password" é obrigatório' });
  } else if (!checkPassword) {
    response
      .status(BAD_REQUEST)
      .send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return response.status(SUCCESS).send({ token });
});

module.exports = router;
