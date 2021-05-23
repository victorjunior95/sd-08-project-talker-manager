const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

const HTTP_OK_STATUS = 200;

//  https://regexr.com/3e48o

function validateEmail(email) {
  const urlRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const re = urlRegex;

  return re.test(email);
}

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!validateEmail(email)) {
    return res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(HTTP_OK_STATUS).send({ token: '7mqaVRXJSp886CGr' });
});

module.exports = router;
