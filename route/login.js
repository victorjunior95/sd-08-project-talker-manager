const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();
const crypto = require('crypto');

router.use(bodyParser.json());

router.post('/', (req, res, _next) => {
  const { email, password } = req.body;
  const validLogin = [{ email }, { password }].find((validate) => {
    const [value] = Object.values(validate);
    return (!value);
  });
  if (validLogin) {
    const field = Object.keys(validLogin)[0];
    return res.status(400).json({ message: `O campo "${field}" é obrigatório` });
  }
  if (!email.match(/(.+@.+\.com)(\.br)?/)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = crypto.randomBytes(8).toString('hex');
  res.status(200).json({ token });
});

module.exports = router;