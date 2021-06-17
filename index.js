const express = require('express');
const bodyParser = require('body-parser');
const {
  handleSearchForId,
  handleTalkersRequest,
  createTalker,
  // deleteTalker,
  // searchByTerm,
} = require('./routes');
const {
  verifyAge,
  verifyDateAndRate,
  verifyLogin,
  verifyName,
  verifyToken,
} = require('./auxFunctions');

const app = express();

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', handleSearchForId);

app.get('/talker', handleTalkersRequest);

app.post('/login', verifyLogin);

app.post(
  '/talker',
  verifyToken,
  verifyName,
  verifyAge,
  verifyDateAndRate,
  createTalker,
);

// app.delete('/talker/:id', deleteTalker);

// app.get('/talker/search?q=searchTerm', searchByTerm);

app.listen(PORT, () => {
  console.log('Online');
});
