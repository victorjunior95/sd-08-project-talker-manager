const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const middlewares = require('./middlewares');
const utils = require('./utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
// const UNAUTHORIZED_STATUS = 401;
const NOT_FOUND_STATUS = 404;

const PORT = '3000';
const database = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// 1 - Crie o endpoint GET `/talker`
app.get('/talker', (req, res) => {
  fs.readFile(database, (err, data) => {
    res.status(HTTP_OK_STATUS).json(JSON.parse(data.toString('utf8')));
  });
});

// 2 - Crie o endpoint GET `/talker/:id
app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(database, (err, data) => {
    const talkers = JSON.parse(data.toString('utf-8'));
    const talkerFind = talkers.find((talker) => talker.id === parseInt(id, 10));
    if (talkerFind) {
      return res.status(HTTP_OK_STATUS).json(talkerFind);
    }
    res.status(NOT_FOUND_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  });
});

// 3 - Crie o endpoint POST `/login`
app.post('/login', (req, res) => {
  const errNoEmail = 'O campo "email" é obrigatório';
  const errNoPassword = 'O campo "password" é obrigatório';
  const errEmailInvalid = 'O "email" deve ter o formato "email@email.com"';
  const errPasswordInvalid = 'O "password" deve ter pelo menos 6 caracteres';

  const { email, password } = req.body;

  if (!email) return res.status(BAD_REQUEST_STATUS).json({ message: errNoEmail });
  if (!password) return res.status(BAD_REQUEST_STATUS).json({ message: errNoPassword });

  const isEmailValidate = utils.validEmail(email);
  const isPswdValidate = utils.validPassword(password);

  if (!isEmailValidate) return res.status(BAD_REQUEST_STATUS).json({ message: errEmailInvalid });
  if (!isPswdValidate) return res.status(BAD_REQUEST_STATUS).json({ message: errPasswordInvalid });

  const token = utils.generateToken();
  return res.status(HTTP_OK_STATUS).json({ token });
});

// 4 - Crie o endpoint POST /talker
app.post('/talker',
  middlewares.token,
  middlewares.name,
  middlewares.age,
  middlewares.talk,
  (req, res) => {
    const { name, age, talk } = req.body;
    fs.readFile(database, (err, data) => {
      const talkers = JSON.parse(data.toString('utf-8'));
      const id = talkers.length + 1;
      talkers.push({ name, age, id, talk });

      fs.writeFileSync(database, JSON.stringify(talkers));
      return res.status(CREATED_STATUS).json({ name, age, id, talk });
    });
  });

// 5 - Crie o endpoint PUT `/talker/:id`
app.put('/talker/:id',
  middlewares.token,
  middlewares.name,
  middlewares.age,
  middlewares.talk,
  (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, age, talk } = req.body;

    fs.readFile(database, (err, data) => {
      const talkers = JSON.parse(data.toString('utf-8'));
      const updateTalker = { id, name, age, talk };

      const talkerMap = talkers.map((talker) => {
        if (talker.id === id) return updateTalker;
        return talker;
      });

      fs.writeFileSync(database, JSON.stringify(talkerMap));
      return res.status(HTTP_OK_STATUS).json(updateTalker);
    });
  });

// 6 - Crie o endpoint DELETE `/talker/:id`
app.delete();

// 7 - Crie o endpoint GET `/talker/search?q=searchTerm`

app.listen(PORT, () => {
  console.log('Online');
});
