const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const rewriteList = require('../middlewares/rewriteListMiddleware');

const app = express();
app.use(bodyParser.json());

const data = 'talker.json';

app.get('/', (_req, res) => {
  const allTalkers = JSON.parse(fs.readFileSync(data));
  res.status(200).json(allTalkers);
});

app.post('/', tokenMiddleware, validateMiddleware, async (req, res) => {
  const talkersList = await JSON.parse(fs.readFileSync(data));
  const newTalker = { ...req.body, id: talkersList.length + 1 };
  const updatedList = [...talkersList, newTalker];
  const listString = JSON.stringify(updatedList);
  await rewriteList(listString);
  return res.status(201).json(newTalker);
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync(data));

  const specificTalker = allTalkers.find((talker) => (String(talker.id) === id));
  if (!specificTalker) {
    return res.status(404).json(
      { message: 'Pessoa palestrante não encontrada' },
  ); 
}
  return res.status(200).json(specificTalker);
});

app.put('/:id', tokenMiddleware, validateMiddleware, async (req, res) => {
  const { id } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync(data));
  const specificTalker = allTalkers.find((talker) => talker.id === parseInt(id, 10));
  const editedTalker = { ...req.body, id: specificTalker.id };
  allTalkers[specificTalker.id - 1] = editedTalker;
  const listString = JSON.stringify(allTalkers);
  console.log(listString);
  await rewriteList(listString);
  return res.status(200).json(req.body);
});

app.delete('/:id', tokenMiddleware, async (req, res) => {
  const { id } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync(data));
  const removeTalker = allTalkers.filter((talker) => (String(talker.id) !== id));
  const listString = JSON.stringify(removeTalker);
  await rewriteList(listString);
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

app.get('/search?q=searchTerm', [
  tokenMiddleware,
  (req, res, next) => {
    const allTalkers = JSON.parse(fs.readFileSync(data));
    if (!req.query || req.query === '') {
      return res.status(200).json(allTalkers);
    }
    next();
  },
  (req, _res) => {
  const { q } = req.query;
  const allTalkers = JSON.parse(fs.readFileSync(data));
  console.log(req.query, q);
  const search = allTalkers.filter((talker) => Object.values(talker)
    .some((value) => talker[value].includes(q)));
  console.log(search);
}]);

module.exports = app;
