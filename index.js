const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const randtoken = require('rand-token');
const validate = require('./validate');
// const path = require('path');

const app = express();
app.use(bodyParser.json());

const SUCCESS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
// const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const PORT = '3000';

const TALKER_FILE = 'talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

// Requisito 01
app.get('/talker', async (req, res) => {
  const data = await fs.readFile(TALKER_FILE);

  if (!data) {
    return res.status(SUCCESS).send([]);
  }

  return res.status(SUCCESS).send(JSON.parse(data));
});

// Requisito 02
app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const data = await fs.readFile(TALKER_FILE);

  const findTalker = JSON.parse(data).find((e) => e.id === parseInt(id, 10));

  if (!findTalker) {
    return res
      .status(NOT_FOUND)
      .send({ message: 'Pessoa palestrante não encontrada' });
  }

  return res.status(SUCCESS).send(findTalker);
});

// Requisito 03
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const isEmailValid = validate.email(email);
  const isPasswordValid = validate.password(password);

  if (typeof isEmailValid === 'object') {
    return res.status(BAD_REQUEST).send(isEmailValid);
  }

  if (typeof isPasswordValid === 'object') {
    return res.status(BAD_REQUEST).send(isPasswordValid);
  }

  const token = randtoken.generate(16);

  return res.status(SUCCESS).send({ token: `${token}` });
});

// Reqisito 04
app.post(
  '/talker',
  validate.token,
  validate.name,
  validate.age,
  validate.talk,
  validate.rate,
  validate.watchedAt,
  async (req, res) => {
    const file = await fs.readFile(TALKER_FILE);
    const talkers = JSON.parse(file);
    const { name, age, talk } = req.body;

    const newTalker = {
      name,
      age,
      id: talkers.length + 1,
      talk: {
        watchedAt: talk.watchedAt,
        rate: talk.rate,
      },
    };

    talkers.push(newTalker);
    const jsonTalkers = JSON.stringify(talkers);
    await fs.writeFile('talker.json', jsonTalkers);
    return res.status(CREATED).json(newTalker);
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
