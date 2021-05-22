const MIN_PASSWORD_LENGTH = 6;
const express = require('express');
const randomCharacter = require('./Middlewares/randomCharacter');

const router = express.Router();
router.post('/', (req, res) => {
  console.log(req.body);
  // console.log(`${req.query.eamil}  email `);
  const re = /\S+@\S+\.\S+/;
  if (!req.body.password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (req.body.password.length < MIN_PASSWORD_LENGTH) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } if (!req.body.email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!re.test(String(req.body.email).toLowerCase())) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  res.status(200).json({ token: randomCharacter(16) });
});
module.exports = router;
// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript