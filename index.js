const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const database = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (req, res) => {
  fs.readFile(database, (err, data) => {
    res.status(HTTP_OK_STATUS).json(JSON.parse(data.toString('utf-8')));
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
