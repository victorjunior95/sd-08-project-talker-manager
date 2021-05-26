const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (_request, response) => {
  response.send(JSON.parse(fs.readFileSync('./talker.json', 'utf-8')));
});

app.get('/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const talker = JSON.parse(await fs.promises.readFile('./talker.json', 'utf-8'));
    if (talker[id - 1].name) response.send(talker[id - 1]);
  } catch (error) {
    response.status(404).send({ "message": "Pessoa palestrante não encontrada" });
  }
});

module.exports = app;
