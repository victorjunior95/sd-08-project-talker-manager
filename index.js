const fs = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const {
  emailValidation,
  passwordValidation,
  isObject,
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
} = require('./src/core/validation');

const {
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_CREATED_STATUS,
  PORT,
} = require('./src/common/httpStatus');

const file = 'talker.json';

const app = express();
app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const mockData = await fs.readFile(file);
  if (!mockData) {
    return response.status(HTTP_OK_STATUS).send([]);
  }
  return response.status(HTTP_OK_STATUS).send(JSON.parse(mockData));
});

app.get('/talker/search', tokenValidation, async (_request, response) => {
  const query = _request.query.q;
  const mockData = await fs.readFile(file);
  const talkers = JSON.parse(mockData);

  if (!query || query.length < 1) {
    return response.status(HTTP_OK_STATUS).json(talkers);
  }

  const querySearch = talkers.filter((talker) => talker.name.includes(query));

  if (!querySearch || querySearch === []) {
    return response.status(HTTP_OK_STATUS).json([]);
  }

  return response.status(HTTP_OK_STATUS).json(querySearch);
});

app.get('/talker/:id', async (_request, response) => {
  const mockData = await fs.readFile(file);
  const { id } = _request.params;
  const talker = JSON.parse(mockData).find((eachTalker) => eachTalker.id === parseInt(id, 10));
  if (!talker) {
    return response.status(HTTP_NOT_FOUND_STATUS).send({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return response.status(HTTP_OK_STATUS).send(talker);
});

app.post('/login', (_request, response) => {
  const { email, password } = _request.body;
  const token = crypto.randomBytes(8).toString('hex');
  if (isObject(emailValidation(email))) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send(emailValidation(email));
  }
  if (isObject(passwordValidation(password))) {
    return response.status(HTTP_BAD_REQUEST_STATUS).send(passwordValidation(password));
  }
  return response.status(HTTP_OK_STATUS).send({ token: `${token}` });
});

app.post(
  '/talker',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
  async (_request, response) => {
    const mockData = await fs.readFile(file);
    const talkers = JSON.parse(mockData);
    const { name, age, talk } = _request.body;

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
    return response.status(HTTP_CREATED_STATUS).json(newTalker);
  },
);

// const _interface = { // pattern factory
//   name,
//   age,
//   id: parseInt(id, 10),
//   talk: {
//     watchedAt: talk.watchedAt,
//     rate: talk.rate,
//   },
// };

function talkerEdited(name, age, talk, id) {
  return {
    name,
    age,
    id: parseInt(id, 10),
    talk: {
      watchedAt: talk.watchedAt,
      rate: talk.rate,
    },
  };
};

app.put(
  '/talker/:id',
  tokenValidation,
  nameValidation,
  ageValidation,
  talkValidation,
  rateValidation,
  watchedAtValidation,
  async (_request, response) => {
    const { id } = _request.params;
    const mockData = await fs.readFile(file);
    const talkers = JSON.parse(mockData);
    const { name, age, talk } = _request.body;

    const newTalker = talkerEdited(name, age, talk, id);

    const editedTalkers = [
      ...talkers.slice(0, id - 1),
      newTalker,
      ...talkers.slice(id - 1, talkers.length - 1),
    ];

    const jsonTalkers = JSON.stringify(editedTalkers);
    await fs.writeFile(file, jsonTalkers);
    return response.status(HTTP_OK_STATUS).json(editedTalker);
  },
);

app.listen(PORT, () => {
  console.log('Online');
});
