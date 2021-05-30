const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

// READ
// localhost:3000/talker/
app.get('/', (req, res) => {
  const allTalkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  res.status(200).json(allTalkers);
});

// READ
// localhost:3000/talker/:id
app.get('/:id', (req, res) => {
  const { id: reqId } = req.params;
  const allTalkers = JSON.parse(fs.readFileSync(`${__dirname}/../talker.json`));
  const talkerById = allTalkers.find(({ id }) => id === Number(reqId));
  if (talkerById) {
    return res.status(200).json(talkerById);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = app;