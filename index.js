const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
const showTalkers = 'talker.json';

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const data = JSON.parse(fs.readFileSync(showTalkers, 'utf-8'));
  if (!data.length) {
    return res.status(200).json([]);
  }
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log('Online');
});
