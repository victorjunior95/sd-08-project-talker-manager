// Leonardo Sardinha
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { authEmail, authPassword } = require('./authMiddleware');
const { validToken, validTalker, 
  validTalkerContent, validAge, validName } = require('./postMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const getAllTalkers = () =>
  JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));

const getTalkerById = (id) => {
  const allTalkers = getAllTalkers();
  const talker = allTalkers.filter((elem) => elem.id === id);
  return talker[0];
};

const generateToken = () => {
  const randonToken1 = Math.random().toString(20).substr(2);
  const randonToken2 = Math.random().toString(20).substr(2);
  const token = (randonToken1 + randonToken2).slice(0, 16);
  return token;
};

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/teste', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('Teste do aplicativo');
});

app.get('/talker/search', validToken, (req, res, next) => {
  try {
  const allTalkers = getAllTalkers();
  const serchTerm = req.query.q.toLowerCase();
  if (!serchTerm) {
    return next();
  } 
  const foundElement = allTalkers.filter((elem) => elem.name.toLowerCase().includes(serchTerm));
  res.status(200).send(foundElement);
  } catch (err) {
  res.status(500).send({ err });
  }
});

app.get('/talker', async (_request, response) => {
  try {
    const resposta = await getAllTalkers();
    response.status(HTTP_OK_STATUS).send(resposta);
  } catch (err) {
    response.status(500).send(`erro encontrado: ${err.message}`);
  }
});

app.get('/talker/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const idParse = parseInt(id, 10);
    const talkerFound = await getTalkerById(idParse);
    if (talkerFound) {
      response.status(HTTP_OK_STATUS).send(talkerFound);
    } else {
      response.status(404).send({
        message: 'Pessoa palestrante não encontrada',
      });
    }
  } catch (err) {
    response.status(500).send({ err });
  }
});

app.post(
  '/login',
  authEmail,
  authPassword,
  async (_req, res) => {
    const token = generateToken();
    res.status(HTTP_OK_STATUS).json({ token });
  },
);

app.post('/talker', validToken, validName, 
validAge, validTalker, validTalkerContent, (req, res) => {
  try {
  const newTalker = req.body;
  const allTalkers = getAllTalkers();
  newTalker.id = allTalkers.length + 1;
  allTalkers.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(allTalkers));
  res.status(201).json(newTalker);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.put('/talker/:id', validToken, validName, 
validAge, validTalker, validTalkerContent, (req, res) => {
  try {
  const newId = parseInt(req.params.id, 10);
  const newTalker = req.body;
  newTalker.id = newId;
  const allTalkers = getAllTalkers();
  const talkersWithExcludedById = allTalkers.filter((talker) => talker.id !== newId);
  talkersWithExcludedById.push(newTalker);
  fs.writeFileSync('./talker.json', JSON.stringify(talkersWithExcludedById));
  res.status(200).json(newTalker);
  } catch (err) {
  res.status(500).send({ err });
  }
});

app.delete('/talker/:id', validToken, (req, res) => {
  try {
  const idToDelete = parseInt(req.params.id, 10);
  const allTalkers = getAllTalkers();
  const talkersWithExcludedById = allTalkers.filter((talker) => talker.id !== idToDelete);
  fs.writeFileSync('./talker.json', JSON.stringify(talkersWithExcludedById));
  res.status(200).send({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
  res.status(500).send({ err });
  }
});

app.listen(PORT, () => {
  console.log('Online');
});

getTalkerById(1);
