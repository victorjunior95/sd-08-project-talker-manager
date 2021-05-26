const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const rescue = require('express-rescue');

const app = express();
app.use(bodyParser.json());
const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (_req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8')
  .then((data) => JSON.parse(data));
  if (talkers.length > 0) {
    res.status(200).json(talkers);
  } else {
    res.status(200).json([]);
  }
}));

app.get('/talker/:id', rescue(async (req, res) => {
  const talkers = await fs.readFile('./talker.json', 'utf-8')
  .then((data) => JSON.parse(data));
  const { id } = req.params;
  console.log(id);
  const findId = talkers.find((talker) => talker.id === +id);
  console.log(findId);
  if (!findId) {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } else {
    res.status(200).json(findId);
  }
}));

app.listen(PORT, () => {
  console.log('Online');
});
