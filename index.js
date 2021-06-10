const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const getTalkers = () => fs.readFileSync('./talker.json', 'utf-8');

// console.log(talkerFile);

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  try {
    const talkerFile = getTalkers();
    return res.status(HTTP_OK_STATUS).send(JSON.parse(talkerFile));
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log('Online');
});
