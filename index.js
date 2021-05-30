const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const {
  validateEmail,
  validatePassword,
  generateToken,
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
} = require('./utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const NOT_FOUND_STATUS = 404;

const PORT = '3000';
const TALKER_FILE = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get(
  '/talker/search',
  tokenMiddleware,
  (req, res) => {
    const search = req.query.q;
    fs.readFile(TALKER_FILE, (err, data) => {
      const talkers = JSON.parse(data.toString('utf8'));
      if (!search) return res.status(HTTP_OK_STATUS).json();
      const searchResult = talkers.filter((talker) => talker.name.includes(search));
      return res.status(HTTP_OK_STATUS).json(searchResult);
    });
  },
);

app.get('/talker', (_request, response) => {
  fs.readFile(TALKER_FILE, (err, data) => {
    response.status(HTTP_OK_STATUS).json(JSON.parse(data.toString('utf8')));
  });
});

app.get('/talker/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  fs.readFile(TALKER_FILE, (err, data) => {
    const talkers = JSON.parse(data.toString('utf8'));
    const talker = talkers.find((talker_) => talker_.id === id);
    if (talker) return res.status(HTTP_OK_STATUS).json(talker);
    res.status(NOT_FOUND_STATUS).json({
      message: 'Pessoa palestrante não encontrada',
    });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const noEmail = 'O campo "email" é obrigatório';
  const noPw = 'O campo "password" é obrigatório';
  const emailNotValid = 'O "email" deve ter o formato "email@email.com"';
  const pwNotValid = 'O "password" deve ter pelo menos 6 caracteres';

  if (!email) return res.status(BAD_REQUEST_STATUS).json({ message: noEmail }); 
  if (!password) return res.status(BAD_REQUEST_STATUS).json({ message: noPw }); 

  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);

  if (!isEmailValid) return res.status(BAD_REQUEST_STATUS).json({ message: emailNotValid });
  if (!isPasswordValid) return res.status(BAD_REQUEST_STATUS).json({ message: pwNotValid });

  const token = generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

app.post(
  '/talker',
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  (req, res) => {
    const { name, age, talk } = req.body;
    fs.readFile(TALKER_FILE, (err, data) => {
      const talkers = JSON.parse(data.toString('utf8'));
      const newTalker = {
        id: talkers.length + 1,
        name,
        age,
        talk,
      };
      talkers.push(newTalker);
      fs.writeFileSync(TALKER_FILE, JSON.stringify(talkers));
      return res.status(CREATED_STATUS).json(newTalker);
    });
  },
);

app.put(
  '/talker/:id',
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, age, talk } = req.body;
    fs.readFile(TALKER_FILE, (err, data) => {
      const talkers = JSON.parse(data.toString('utf8'));
      const updatedTalker = {
        id,
        name,
        age,
        talk,
      };
      const updatedTalkers = talkers.map((talker) => {
        if (talker.id === id) return updatedTalker;
        return talker;
      });
      fs.writeFileSync(TALKER_FILE, JSON.stringify(updatedTalkers));
      return res.status(HTTP_OK_STATUS).json(updatedTalker);
    });
  },
);

app.delete(
  '/talker/:id',
  tokenMiddleware,
  (req, res) => {
    const id = parseInt(req.params.id, 10);
    fs.readFile(TALKER_FILE, (err, data) => {
      const talkers = JSON.parse(data.toString('utf8'));
      const updatedTalkers = talkers.filter((talker) => talker.id !== id);
      fs.writeFileSync(TALKER_FILE, JSON.stringify(updatedTalkers));
      return res.status(HTTP_OK_STATUS).json({
        message: 'Pessoa palestrante deletada com sucesso',
      });
    });
  },
);
