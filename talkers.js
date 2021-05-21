const express = require('express');
const fs = require('fs');

const router = express.Router();

const HTTP_OK_STATUS = 200;

router.get('/:id', (req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  const { id } = req.params;

  const talker = talkers.find((person) => person.id === Number(id));

  if (!talker) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(HTTP_OK_STATUS).json(talker);
});

router.get('/', (_req, res) => {
  const talkers = JSON.parse(fs.readFileSync('./talker.json', 'utf-8'));
  if (!talkers.length) {
    res.status(HTTP_OK_STATUS).json([]);
  }
  res.status(HTTP_OK_STATUS).json(talkers);
});

module.exports = router;
