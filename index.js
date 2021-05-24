const express = require('express');
const bodyParser = require('body-parser');

const {
  readTalker,
  getTalkerById,
  login,
  addTalker,
  editTalker,
  deleteTalker,
} = require('./Middlewares/index');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', getTalkerById);
app.get('/talker', readTalker);
app.post('/login', login);
app.post('/talker', addTalker);
app.put('/talker/:id', editTalker);
app.delete('/talker/:id', deleteTalker);

app.listen(PORT, () => {
  console.log('Online');
});
