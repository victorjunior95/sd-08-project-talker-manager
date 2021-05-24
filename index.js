const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const rescue = require('express-rescue');
const fs = require('fs').promises;

function getTalker() {
  return fs.readFile('./talker.json', 'utf-8')
  .then((file) => JSON.parse(file));
}

// Crie o endpoint GET /talker/:id

app.get(
  '/talker/:id',
  rescue(async (req, res) => {
    const talkers = await getTalker();

    const talker = talkers.find((ObjTalker) => ObjTalker.id === Number(req.params.id));

    if (!talker) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(talker);
  }),
);

// 1 - Crie o endpoint GET /talker
app.get('/talker', rescue(async (_req, res) => {
  const talkers = await getTalker();
  res.status(200).json(talkers);
}));