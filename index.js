const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const fs = require('fs');

const rawdata = fs.readFileSync('talker.json');
let list = JSON.parse(rawdata);

app.get('/talker', (req, res, _next) => {
  if (list.lenght === 0 || list === null) {
    list = [];
  }
  res.status(200).send(list);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
