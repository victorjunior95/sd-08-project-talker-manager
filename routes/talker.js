const express = require('express');

const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

const readTalker = require('../services/readTalker');

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

module.exports = router;
