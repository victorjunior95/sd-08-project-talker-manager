const express = require('express');
const bodyParser = require('body-parser');

const desafio01 = require('./desafios/router01');
const desafio02 = require('./desafios/router02');
const desafio03 = require('./desafios/router03');
const desafio04 = require('./desafios/router04');
const desafio05 = require('./desafios/router05');
const desafio06 = require('./desafios/router06');
const desafio07 = require('./desafios/router07');

const app = express();
const HTTP_OK_STATUS = 200;
const PORT = '3000';
app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

  app.use('/talker',
    desafio01,
    desafio07,
    desafio02,
    desafio04,
    desafio05,
    desafio06);
  
  app.use('/login', desafio03);

app.listen(PORT, () => {
  console.log('Online');
});