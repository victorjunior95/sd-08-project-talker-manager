const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const Crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const allTalkers = JSON.parse(fs.readFileSync('talker.json'));
  res.status(200).json(allTalkers);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync('talker.json'));

  const specificTalker = allTalkers.find((talker) => (String(talker.id) === id));
  if (!specificTalker) {
    return res.status(404).json(
      { message: 'Pessoa palestrante não encontrada' },
  ); 
}
  return res.status(200).json(specificTalker);
});

function randomString(size = 16) {  
  return Crypto
    .randomBytes(size)
    .toString('base64')
    .slice(0, size);
}

app.post('/login', [
  (req, res, next) => {
    if (!req.body.email || req.body.email.length === 0) {
      return res.status(400)
      .json({ message: 'O campo "email" é obrigatório' }); 
  }
  const { email } = req.body;
    if (!/^[A-Z0-9._-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email)) {
      return res.status(400)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
    }
    next();
  },
  (req, res, next) => {
    if (!req.body.password || req.body.password.length === 0) {
      return res.status(400)
        .json({ message: 'O campo "password" é obrigatório' }); 
    }
    if (req.body.password.length < 6) {
      return res.status(400)
        .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
    }
    next();
  },
  (req, res) => {
    const token = randomString();
    res.status(200).send({ token });
  },
]);

app.listen(PORT, () => {
  console.log('Online');
});
