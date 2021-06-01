const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const tokenMiddleware = require('../middlewares/tokenMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const rewriteList = require('../middlewares/rewriteListMiddleware');

const app = express();
app.use(bodyParser.json());

const data = 'talker.json';

app.get('/search', tokenMiddleware, (req, res) => {
    const allTalkers = JSON.parse(fs.readFileSync(data));
    if (!req.query || req.query === '') {
      return res.json(allTalkers);
    }
    const { q } = req.query;
    const search = allTalkers.filter((talker) => talker.name.includes(q));
    return res.json(search);
});

app.get('/', (_req, res) => {
  const allTalkers = JSON.parse(fs.readFileSync(data));
  res.json(allTalkers);
});

app.post('/', tokenMiddleware, validateMiddleware, (req, res) => {
  const allTalkers = JSON.parse(fs.readFileSync(data));
  const newTalker = { ...req.body, id: allTalkers.length + 1 };
  const updatedList = [...allTalkers, newTalker];
  rewriteList(JSON.stringify(updatedList));
  return res.status(201).json(newTalker);
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync(data));

  const specificTalker = allTalkers.find((talker) => talker.id === parseInt(id, 10));
  if (!specificTalker) {
    return res.status(404).json(
      { message: 'Pessoa palestrante não encontrada' },
  ); 
}
  return res.json(specificTalker);
});

app.put('/:id', tokenMiddleware, validateMiddleware, (req, res) => {
  const { id } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync(data));

  const specificTalker = allTalkers.find((talker) => talker.id === parseInt(id, 10));
  const editedTalker = { ...req.body, id: specificTalker.id };
  allTalkers[specificTalker.id - 1] = editedTalker;
  rewriteList(JSON.stringify(allTalkers));
  return res.json(editedTalker);
});

app.delete('/:id', tokenMiddleware, (req, res) => {
  const { id } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync(data));

  const removeTalker = allTalkers.filter((talker) => talker.id !== parseInt(id, 10));
  rewriteList(JSON.stringify(removeTalker));
  return res.json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = app;
