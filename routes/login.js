const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

const crypto = require('crypto');

router.use(bodyParser.json());

const verifyEmail = (email) => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
  return true;
};

const verifyPass = (password) => {
  if (!password) return false;
  if (password.length >= 6) return true;
  return false;
};

router.post('/', (req, res) => {
  const ramdonToken = crypto.randomBytes(8).toString('hex');
  const validEmail = verifyEmail(req.body.email);
  const validPassword = verifyPass(req.body.password);
  const emptyEmailMessage = 'O campo "email" é obrigatório';
  const invalidEmailMessage = 'O "email" deve ter o formato "email@email.com"';
  const emptyPasswordMessage = 'O campo "password" é obrigatório';
  const invalidPasswordMessage = 'O "password" deve ter pelo menos 6 caracteres';

  if (!req.body.email) return res.status(400).json({ message: emptyEmailMessage });
  if (!validEmail) return res.status(400).json({ message: invalidEmailMessage });
  if (!req.body.password) return res.status(400).json({ message: emptyPasswordMessage });
  if (!validPassword) return res.status(400).json({ message: invalidPasswordMessage });

  return res.status(200).json({ token: ramdonToken });
});

module.exports = router;
