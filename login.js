const express = require('express');

const router = express.Router();

const HTTP_OK_STATUS = 200;

function generateToken() {
  const token = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 16; i += 1) {
    token.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
 }
 return token.join('');
}

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const token = generateToken();
  const reGex = /\S+@\S+\.\S+/;

  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (!reGex.test(email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else if (password.length <= 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(HTTP_OK_STATUS).json({ token });
});

module.exports = router;
