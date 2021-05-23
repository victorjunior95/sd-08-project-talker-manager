const express = require('express');
const bodyParser = require('body-parser');
const { addTalker, getAllTalkers } = require('./util');
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

app.get('/talker/search', authMiddleware, (request, response) => {
  const { q } = request.query;
  const allTalkers = getAllTalkers();
  const filteredTalkers = allTalkers.filter((talker) => talker.name.includes(q));
  const searchResults = !q ? allTalkers : filteredTalkers;

  response.status(200).json(searchResults);
});

app.get('/talker', (_request, response) => {
  const allTalkers = getAllTalkers();

  return allTalkers
    ? response.status(200).json(allTalkers)
    : response.status(200).json([]);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const allTalkers = getAllTalkers();
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

app.delete('/talker/:id', (request, response) => {
  const { id } = request.params;
  const allTalkers = getAllTalkers();

  const currentTalkers = allTalkers
    .filter((talker) => talker.id !== parseInt(id, 10));

  addTalker(currentTalkers);
  response.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.use(verifyTalkerMiddleware);

app.post('/talker', (request, response) => {
  const { name, age, talk } = request.body;
  const allTalkers = getAllTalkers();
  const newTalker = { id: allTalkers.length + 1, name, age, talk };

  allTalkers.push(newTalker);
  addTalker(allTalkers);
  response.status(201).json(newTalker);
});

app.put('/talker/:id', (request, response) => {
  const { id } = request.params;
  const { name, age, talk } = request.body;
  const allTalkers = getAllTalkers();
  const editedTalker = { id: parseInt(id, 10), name, age, talk };

  allTalkers[id - 1] = editedTalker;
  addTalker(allTalkers);
  response.status(200).json(editedTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});
