const express = require('express');
// const bodyParser = require('body-parser');
const { TALKER } = require('./services');
const { getData } = require('./utils');
const { talkerByIdMiddleware, loginMiddleware } = require('./middlewares');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const data = await getData(TALKER);
  return response.status(200).json(data);
});

app.get('/talker/:id', talkerByIdMiddleware, async (_request, _response) => {});

app.post('/login', loginMiddleware, (request, response) => {
  console.log(response.status);
  // response.status(200).json('ok');
});

app.listen(PORT, () => {
  console.log('Online');
});
