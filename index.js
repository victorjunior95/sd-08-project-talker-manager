const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./service');
const middlewares = require('./middlewares');
const newTalker = require('./write');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker/search', middlewares.token, async (req, res) => {
  const talkers = await talker();
  const { q } = req.query;
  console.log(q);
  if (q) {
    const filter = talkers.filter(({ name }) => name.includes(q));
    return res.status(200).json(filter);
  }
  return res.status(200).json(talkers);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await talker();
  return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const data = await talker();
  const dataById = data.find((item) => parseInt(item.id, 0) === parseInt(req.params.id, 0));
  if (!dataById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(dataById);
});

app.post('/login', middlewares.login);

app.post('/talker', middlewares.token, middlewares.name,
 middlewares.age, middlewares.talk, middlewares.watchedAt,
  middlewares.rate, async (req, res) => {
    const talkers = await talker();
    const otherTalker = req.body;
    otherTalker.id = talkers.length + 1;
    talkers.push(otherTalker);
    await newTalker(talkers);
    res.status(201).json(otherTalker);
});

app.put('/talker/:id', middlewares.token, middlewares.name,
middlewares.age, middlewares.talk, middlewares.watchedAt,
 middlewares.rate, async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await talker();
  const otherTalker = { ...req.body, id };
  const editedTalker = talkers.map((item) => {
    if (item.id === id) return otherTalker;
    return talker;
  });
  await newTalker(editedTalker);
  res.status(200).json(otherTalker);
});

app.delete('/talker/:id', middlewares.token, async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await talker();
  const deleted = talkers.find((item) => item.id !== id);
  await newTalker(deleted);
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.listen(PORT, () => {
  console.log('Onlinee');
});
