const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const allData = fs.readFileSync('./talker.json');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// app.get('/', (_request, response) => {
//   response.status(HTTP_OK_STATUS).sendFile(path.join(__dirname, '/index.html'));
// }); para brincar dps

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  if (allData.length > 1) {
  return res.status(HTTP_OK_STATUS).send(allData);
  }
  return res.status(HTTP_OK_STATUS).send([]);
});

app.listen(PORT, () => {
  console.log('Online');
});
