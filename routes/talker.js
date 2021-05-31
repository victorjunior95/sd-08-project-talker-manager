const express = require('express');

const fs = require('fs');

const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

const readTalker = require('../services/readTalker');

const createTalker = require('../services/writeTalker');

const editTalker = require('../services/editTalker');

const deleteTalker = require('../services/deleteTalker');

const talkerRead = JSON.parse(readTalker());

const validations = require('../middlewares/validations');

router.get('/search', validations.tokenMidd, (req, res) => {
  const { q } = req.query;
  const talkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  const search = talkers.filter(({ name }) => name.includes(q));

  if (search) {
    res.status(200).json(search);
  }
  res.status(200).json(talkers);
});

router.get('/', (req, res, _next) => {
  console.log(readTalker);
  if (readTalker) return res.status(200).json(JSON.parse(readTalker()));
  return res.status(200).json([]);
});

router.get('/:id', (req, res) => {
  const data = JSON.parse(readTalker());
  const id = data.find((item) => item.id === Number(req.params.id));
  if (id) return res.status(200).json(id);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/', validations.tokenMidd,
validations.nameMid,
validations.ageMid,
validations.talkWatchedMid,
validations.rateMid,
(req, res, _next) => {
  const { name, age, talk } = req.body;
  const obj = {
    name,
    age,
    talk,
    id: talkerRead.length + 1,
  };
  createTalker(obj);
  return res.status(201).json({ name, id: talkerRead.length + 1, age, talk });
});

router.put('/:id', validations.tokenMidd,
validations.nameMid,
validations.ageMid,
validations.talkWatchedMid,
validations.rateMid,
(req, res, _next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const obj = {
    name,
    id,
    age,
    talk,
  };

  editTalker(id, obj);
  return res.status(200).json({ obj });
});

router.delete('/:id', validations.tokenMidd, (req, res, _next) => {
  const { id } = req.params;
  deleteTalker(Number(id));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;
