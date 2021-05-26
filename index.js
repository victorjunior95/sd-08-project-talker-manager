const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const {
  validationEmail,
  validationPassword,
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationTalkFormat,
} = require('./authMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const NOT_FOUND_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const allTalkers = () => JSON.parse(fs.readFileSync('talker.json', 'utf-8'));

app.get('/talker/:id', (req, res) => {
  const data = allTalkers();
  const { id } = req.params;
  const talkerIdFilter = data.find((talker) => talker.id === Number(id));

  if (!talkerIdFilter) {
    return res
      .status(NOT_FOUND_STATUS)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talkerIdFilter);
});

app.get('/talker', (_req, res) => {
  const talkers = allTalkers();

  if (talkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);
  res.status(HTTP_OK_STATUS).json(talkers);
});

app.post(
  '/talker',
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationTalkFormat,
  (req, res) => {
    try {
      const newTalker = req.body;
      const talkers = allTalkers();
      newTalker.id = talkers.length + 1;

      fs.writeFileSync(
        'talker.json',
        JSON.stringify([...talkers, newTalker]),
      );
      res.status(201).json(newTalker);
    } catch (e) {
      throw new Error(e);
    }
  },
);

app.post('/login', validationEmail, validationPassword, (_req, res) => {
  /* Info about crypto.randomBytes method found at
  https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/ */
  const token = crypto
    .randomBytes(64)
    .toString('base64')
    .replace([/[+]/, /[/]/], '')
    .substring(0, 16);
  res.status(HTTP_OK_STATUS).send({ token });
});

app.put(
  '/talker/:id',
  validationToken,
  validationName,
  validationAge,
  validationTalk,
  validationTalkFormat,
  (req, res) => {
    const talkerId = Number(req.params.id);
    const data = allTalkers();
    const talkerReq = { id: talkerId, ...req.body };
    const talkerIndex = data.indexOf(data.find((talker) => talker.id === talkerId));
    data.splice(talkerIndex, 1, talkerReq);

    fs.writeFileSync('talker.json', JSON.stringify(data));
    res.status(HTTP_OK_STATUS).json(talkerReq);
  },
);

app.delete('/talker/:id', validationToken, (req, res) => {
  const talkers = allTalkers();
  const { id } = req.params;
  const talkerIdFilter = talkers.find((talker) => talker.id === Number(id));
  const newTalkersList = talkers.splice(talkerIdFilter, 1)[0];
  fs.writeFileSync('talker.json', JSON.stringify(newTalkersList));
  res
    .status(HTTP_OK_STATUS)
    .json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Online');
});
