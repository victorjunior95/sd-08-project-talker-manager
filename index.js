const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const rescue = require('express-rescue');
const talkersFile = require('./middleware/fs-readFile');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', 
rescue(async (_req, res, _next) => {
  const talkers = await talkersFile.getTalker();
  res.status(200).json(talkers);
}));

app.get('/talker/:id', 
rescue(async (req, res, _next) => {
  const talkers = await talkersFile.getTalker();
  const idParams = parseInt(req.params.id, 10);
  const talker = talkers.find(({ id }) => id === idParams);
  if (!talker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
}));

app.listen(PORT, () => {
  console.log('Online');
});
