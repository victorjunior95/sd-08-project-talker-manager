const express = require('express');
const bodyParser = require('body-parser');
const {
  showOne,
  showAll,
  verifyToken,
  createTalker,
  login,
  verifyReqBody,
  updateTalker,
  deleteTalker,
  searchTalker,
} = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/talker', verifyToken, verifyReqBody, createTalker);

app.get('/talker/search', verifyToken, searchTalker, showAll);

app.get('/talker/:id', showOne);

app.get('/talker', showAll);

app.put('/talker/:id', verifyToken, verifyReqBody, updateTalker);

app.delete('/talker/:id', verifyToken, deleteTalker);

app.post('/login', login);

app.listen(PORT, () => {
  console.log('Online');
});
