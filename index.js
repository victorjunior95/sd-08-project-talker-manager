const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const rescue = require('express-rescue');
const crypto = require('crypto');
const middlewares = require('./middleware');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', 
rescue(async (_req, res, _next) => {
  const talkers = await middlewares.fsTalkers.getTalker();
  res.status(200).json(talkers);
}));

app.get('/talker/:id', 
rescue(async (req, res, _next) => {
  const talkers = await middlewares.fsTalkers.getTalker();
  const idParams = parseInt(req.params.id, 10);
  const talker = talkers.find(({ id }) => id === idParams);
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
}));

app.post('/login', (req, res, _next) => {
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

app.post('/talker', middlewares.validToken, middlewares.validEmptyFields,
middlewares.validTalker, middlewares.validTalk,
rescue(async (req, res, _next) => {
  const talkers = await middlewares.fsTalkers.getTalker();
  const newTalker = req.body;
  newTalker.id = talkers.length + 1;
  talkers.push(newTalker);
  await middlewares.fsTalkers.setTalker(talkers);
  res.status(201).json(newTalker);
}));

app.listen(PORT, () => {
  console.log('Online');
});
