const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const validator = require('email-validator');
const middlewares = require('./middlewares');
const token = require('./services/token');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (req, res) => {
  try {
    const file = await middlewares.talker();
    return res.status(200).json(file);
  } catch (error) {
    console.log(error);
  }
}));

app.get('/talker/:id', rescue(async (req, res) => {
  const file = await middlewares.talker();
  const result = file.find(({ id }) => id === Number(req.params.id));
  if (result) return res.status(200).json(result);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const validation = validator.validate(email);
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!validation) {
 return res
  .status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}
  
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.toString().length < 6) {
 return res
  .status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}
  
  return res.json({ token: token() });
});

app.listen(PORT, () => {
  console.log('Online');
});
