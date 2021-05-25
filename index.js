const express = require('express');
// const bodyParser = require('body-parser');
const { getAllTalker } = require('./routes');

const app = express();
// app.use(bodyParser.json());
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// meu código aqui

app.use('/talker', getAllTalker);

app.listen(PORT, () => {
  console.log('Online');
});
