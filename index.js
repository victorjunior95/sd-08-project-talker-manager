const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { MESSAGES } = require('./messages');
const { auth } = require('./middlewares/authorization');
const { findTalkerByID, generateToken, 
  verifyEmailAndPassword, addIdToTalk } = require('./functions');
const { nameAndAgeVerificarions, talkVerifications, 
  talkExists } = require('./middlewares/talkerVerifier');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKER_PATH = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const getAllTalkers = fs.readFileSync(TALKER_PATH, 'utf8');
  const talkers = getAllTalkers ? JSON.parse(getAllTalkers) : null;
  if (!talkers) return response.status(200).send({});
  return response.status(HTTP_OK_STATUS).send(talkers);
});

app.get('/talker/:id', (req, res) => {
  const getAllTalkers = fs.readFileSync(TALKER_PATH, 'utf8');
  const talkers = getAllTalkers ? JSON.parse(getAllTalkers) : null;
  const talker = findTalkerByID(talkers, req.params.id);
  if (!talker) return res.status(404).send({ message: MESSAGES.idNotFound });
  return res.status(HTTP_OK_STATUS).send(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const failedToverify = verifyEmailAndPassword(email, password, MESSAGES);
  if (failedToverify) return res.status(400).send({ message: failedToverify });
  const token = generateToken();
  res.status(200).send({ token });
});

app.post('/talker', auth, nameAndAgeVerificarions, talkExists, talkVerifications, (req, res) => {
  const { body } = req;
  const allTalkers = JSON.parse(fs.readFileSync(TALKER_PATH, 'utf8'));
  const talkerWithId = addIdToTalk(allTalkers, body);
  const addTalkes = [...allTalkers, talkerWithId];
  fs.writeFileSync(TALKER_PATH, JSON.stringify(addTalkes, null, '\t'));
  return res.status(201).send(talkerWithId);
});

app.listen(PORT, () => {
  console.log('Online');
});
