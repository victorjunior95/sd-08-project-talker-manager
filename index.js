const express = require('express');
const bodyParser = require('body-parser');
const functions = require('./functions');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const pathTalker = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const fileContent = JSON.parse(functions.readFile(pathTalker));
  emptyArray = [];
  !fileContent ? response.status(HTTP_OK_STATUS).send(emptyArray) :
    response.status(HTTP_OK_STATUS).json(fileContent);
});

app.listen(PORT, () => {
  console.log('Online');
});
