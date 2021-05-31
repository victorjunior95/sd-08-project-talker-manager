const express = require('express');
const crypto = require('crypto');

const router = express.Router();

// router.use(express.json());

// tive auxilio da aluna karine
// https://github.com/tryber/sd-08-project-talker-manager/tree/ana-karine-sd-08-project-talker-manager

function verifyEmail(email) {
  const emailRegex = /^[a-z0-9.]+@[a-z0-9.]+\.[a-z]+$/i;
  return emailRegex.test(email);
}

router.post('/', (req, res) => { 
  const { email, password } = req.body;
  const emailIsValid = verifyEmail(email);

  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!emailIsValid) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;