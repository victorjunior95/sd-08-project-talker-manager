const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const app = express();
const token = require('./generateToken');

app.use(bodyParser.json());
const nameValidador = require('./nameValidator');
const ageValidador = require('./ageValidator');
const dateValidador = require('./dateValidator');
const rateValidador = require('./rateValidator');
const talkValidator = require('./talkValidator');
const talkerValidator = require('./talkerValidator');
const tokenValidator = require('./tokenValidator');
const tokenValid = require('./tokenValid');

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const FILEPATH = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talker = await fs.readFile(FILEPATH, 'utf8');
  const jason = await JSON.parse(talker);
  res.status(200).json(jason);
});

app.post('/talker', tokenValidator, tokenValid, nameValidador,
 ageValidador, talkerValidator, talkValidator, rateValidador, dateValidador, async (req, res) => {
  const { name, age, talk } = req.body;
  
  const talkerss = await fs.readFile(FILEPATH, 'utf8');
  const jason = await JSON.parse(talkerss);
  const newCommer = { name, age, id: jason.length + 1, talk };
  const add = await jason.concat(newCommer);
  const writer = await fs.writeFile(FILEPATH, JSON.stringify(add));
  console.log(writer);
  return res.status(201).json(newCommer);
});

app.put('/talker/:id', tokenValidator, tokenValid, nameValidador,
ageValidador, talkerValidator, talkValidator, rateValidador, dateValidador, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const talkers = await fs.readFile(FILEPATH, 'utf8');
  const jason = await JSON.parse(talkers);
  if (jason.some((item) => item.id === +id)) {
    const filtered = jason.filter((item) => item.id !== +id);
    const newCommer = { name, age, id: +id, talk };
    const add = await filtered.concat(newCommer);
    const writer = await fs.writeFile(FILEPATH, JSON.stringify(add));
    console.log(writer);
    return res.status(200).json(newCommer);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(FILEPATH, 'utf8');
  const jason = await JSON.parse(talkers);
  const finder = jason.find((item) => item.id === +id);

  if (!jason.some((item) => item.id === +id)) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(200).json(finder);
});

app.delete('/talker/:id', tokenValidator, tokenValid, async (req, res) => {
  const { id } = req.params;
  const talkers = await fs.readFile(FILEPATH, 'utf8');
  const jason = await JSON.parse(talkers);
  if (jason.some((item) => item.id === +id)) {
    const filtered = jason.filter((item) => item.id !== +id);
    const writer = await fs.writeFile(FILEPATH, JSON.stringify(filtered));
    console.log(writer);
    return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const validadeRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }

  if (!validadeRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres',
  });
  }
    return res.status(200).json({ token: token() });
});

app.listen(PORT, () => {
  console.log('Online');
});
