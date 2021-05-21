const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const re = /.+@[A-z]+[.]com/;

module.exports = (req, res) => {
  const { email, password } = req.body;
  const checkBodyLength = Object.values(req.body).length;
  const stringPass = password;
  if (!email) return res.status(400).send({ message: 'O campo "email" é obrigatório' });
  if (!re.test(email)) {
  return res.status(400).send({ 
    message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  if (checkBodyLength < 2) {
  return res.status(400).send({ 
    message: 'O campo "password" é obrigatório' }); 
}
  if (stringPass.length < 6) {
  return res.status(400).send({ 
    message: 'O "password" deve ter pelo menos 6 caracteres' }); 
} 
return res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
};
