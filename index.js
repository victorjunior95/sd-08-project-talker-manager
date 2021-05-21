const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalkers } = require('./womps');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', getAllTalkers);

app.listen(PORT, () => {
  console.log('Online');
});
