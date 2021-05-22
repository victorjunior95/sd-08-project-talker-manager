const express = require('express');
const bodyParser = require('body-parser');
const util = require('./util');
const {
  authMiddleware,
  loginMiddleware,
  verifyTalkerMiddleware,
} = require('./middlewares');

const app = express();
const PORT = '3000';

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.status(200).send();
});

app.get('/talker', (_request, response) => {
  const allTalkers = util.getAllTalkers();

  return allTalkers
    ? response.status(200).json(allTalkers)
    : response.status(200).json([]);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const allTalkers = util.getAllTalkers();
  const talkerById = allTalkers.find((talker) => talker.id === parseInt(id, 10));

  return talkerById 
   ? response.status(200).json(talkerById)
   : response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', loginMiddleware, (request, response) => {
  const token = request.headers.authorization;
  response.json({ token });
});

app.use(authMiddleware);
app.use(verifyTalkerMiddleware);

app.post('/talker', (request, response) => {
  const { name, age, talk } = request.body;
  const allTalkers = util.getAllTalkers();
  const newTalker = { id: allTalkers.length + 1, name, age, talk };

  allTalkers.push(newTalker);
  util.addTalker(allTalkers);
  response.status(201).json(newTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
