const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');

const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue(async (req, res) => {
  const file = await middlewares.talker();
  if (file.length === 0) return res.status(200).json([]);
  return res.status(200).json(file);
 }));

app.listen(PORT, () => {
  console.log('Online');
});
