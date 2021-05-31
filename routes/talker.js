const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

const readTalker = require('../services/readTalker');

const createTalker = require('../services/writeTalker');

const talkerRead = JSON.parse(readTalker());

const validations = require('../middlewares/validations');

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

module.exports = router;
