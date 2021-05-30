const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (_req, resp) => {
  const file = fs.readFileSync('./talker.json');
  const data = JSON.parse(file || '[]');
  resp.status(HTTP_OK_STATUS).json(data);
});

app.get('/talker/:id', (req, resp, next) => {
  const file = fs.readFileSync('./talker.json');
  const data = JSON.parse(file || '[]');
  console.log(req.params.id);
  const talker = data.find(({ id }) => req.params.id === id.toString());
  if (talker !== undefined) resp.status(HTTP_OK_STATUS).json(talker);
  else {
    const error = new Error('Pessoa palestrante não encontrada');
    error.status = 404;
    return next(error);
  }
});

const validateLogin = (email, password) => {
  if (!email) return 'O campo "email" é obrigatório';
  if (!/^.+@.+\.com/.test(email)) return 'O "email" deve ter o formato "email@email.com"';
  if (!password) return 'O campo "password" é obrigatório';
  if (password.length < 6) return 'O "password" deve ter pelo menos 6 caracteres';
};

// const tokens = [];
const tokenGenerate = (size = 16) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < size; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * 62));
  }
  return token;
};

app.post('/login', (req, _resp, next) => {
  const { email, password } = req.body;
  const errMessage = validateLogin(email, password);
  if (!errMessage) return next();
  const error = new Error(errMessage);
  error.status = 400;
  return next(error);
}, (_req, resp) => {
  const token = tokenGenerate();
  // tokens.push(token);
  resp.json({ token });
});

app.use((err, _req, res, _next) => { res.status(err.status).json({ message: err.message }); });
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
