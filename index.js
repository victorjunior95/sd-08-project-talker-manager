const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (req, res) => {
  const data = fs.readFileSync('talker.json', 'utf8');

  if (data) {
    res.status(HTTP_OK_STATUS).send(data);
  } else {
    res.status(HTTP_OK_STATUS).send([]);
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
