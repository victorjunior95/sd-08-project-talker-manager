const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs').promises;

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (_req, res) => {
  fs.readFile('talker.json')
    .then((data) => {
      console.log(JSON.parse(data));
      res.status(200).send(JSON.parse(data));
    })
    .catch(() => {
      res.status(200).send([]);
    });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
