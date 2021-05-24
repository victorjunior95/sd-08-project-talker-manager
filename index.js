const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const desafio01 = require('./desafios/desafio01');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker',
  rescue(async (_req, res) => {
    const readTalkers = await desafio01();
    console.log(readTalkers);
    res
      .status(HTTP_OK_STATUS)
      .send(readTalkers);
  }),
  (_err, _req, res, _next) => {
    res
    .status(HTTP_OK_STATUS)
    .send([]);
  });

app.listen(PORT, () => {
  console.log('Online');
});
