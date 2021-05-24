const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
    res.status(200).send(talkers);
  } catch (err) {
    return res.status(500).json(err);
  }
});

app.get('/talker/:id', (req, res) => {
  try {
    const talkers = JSON.parse(fs.readFileSync('talker.json', 'utf-8'));
    const idTalker = Number(req.params.id);
    const talker = talkers[idTalker - 1];
  if (talker) {
    res.status(200).send(talker);
  } else {
    return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  }
  } catch (err) {
    return res.status(500).send({ err });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regex = /.+@[A-z]+[.]com/;
  const isValidEmail = regex.test(email);
  console.log(req.body);
  if (!email) { 
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!isValidEmail) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) { 
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.toString().length < 6) { 
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  res.status(200).json({ token: crypto.randomBytes(8).toString('hex') });
});

app.listen(PORT, () => {
  console.log('Online');
});
