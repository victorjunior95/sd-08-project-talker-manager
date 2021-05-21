const express = require('express');
// const bodyParser = require('body-parser');

const router = express.Router();

function makeToken(desiredLength) {
  const result = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < desiredLength; i += 1) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
}

// ideia do código do makeToken: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

router.post('/', (req, res) => {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  regex.test(email);
  if (!email) {
    res.status(400).send({ message: 'O campo "email" é obrigatório' });
  }
  if (!regex.test(email)) {
    res.status(400).send({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    res.status(400).send({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    res.status(400).send({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = makeToken(16);
  console.log(token);
  res.status(200).json({ token });
});

module.exports = router;
