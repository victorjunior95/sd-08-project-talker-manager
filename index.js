const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const token = require('./utils/generateToken');
const middlewares = require('./middlewares');
const { getToken, checkName, checkAge, checkWatchedAt, checkTalk } = require('./middlewares');

const PATH = './talker.json';

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (req, res) => {
  fs.readFile(PATH, 'utf-8', (err, content) => {
    res.status(200).json(JSON.parse(content));
  });
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  fs.readFile(PATH, 'utf-8', (err, content) => {
    const talkers = JSON.parse(content);
    const talker = talkers.find((tempTalker) => tempTalker.id === parseInt(id, 10));
    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talker);
  });
});

app.post('/talker', getToken, checkName, checkAge, checkTalk, checkWatchedAt, (req, res) => {
  fs.readFile(PATH, 'utf-8', (err, content) => {
    const talkers = JSON.parse(content);
    const newTalker = req.body;
    talkers.push({ ...newTalker, id: talkers.length + 1 });
    fs.writeFile(
      PATH,
      JSON.stringify(talkers),
      () => res.status(201).json(talkers[talkers.length - 1]),
      );
  });
});

app.use('/login', middlewares.login);

app.post('/login', (req, res) => res.status(200).json({ token: token() }));

app.put('/talker/:id', getToken, checkName, checkAge, checkTalk, checkWatchedAt, (req, res) => {
  const { id } = req.params;
  fs.readFile(PATH, 'utf-8', (err, content) => {
    const talkers = JSON.parse(content);
    const talker = talkers.find((tempTalker) => tempTalker.id === parseInt(id, 10));
    const newInformation = req.body;
    const editedTalker = { ...talker, ...newInformation };
    const teste = talkers.filter((tempTalker) => tempTalker.id !== parseInt(id, 10));
    teste.push({ ...editedTalker });
    fs.writeFile(PATH, JSON.stringify(teste), () => res.status(200).json(editedTalker));
  });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});