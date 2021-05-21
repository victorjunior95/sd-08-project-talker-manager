const express = require('express');
const fs = require('fs');

const database = 'talker.json';
let talkers = [];

const router = express.Router();
router.get('/', (_req, res) => {
  try {
    talkers = JSON.parse(fs.readFileSync(database));
    console.log(talkers);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
  res.status(200).json(talkers);
});
router.get('/:id', (req, res) => {
  try {
    talkers = JSON.parse(fs.readFileSync(database));
    console.log(talkers);
  } catch (err) {
    console.error(`Erro ao ler o arquivo: ${err.path}`);
    console.log(err);
  }
  const { id } = req.params;
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  if (!talkerId) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talkerId);
});
module.exports = router;