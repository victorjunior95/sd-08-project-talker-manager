const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const registeredSpeakers = require('./fs-utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', rescue(async (req, res) => {
  const talkers = await registeredSpeakers.getRegisteredSpeakers();
  res.status(200).json(talkers);
}));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
