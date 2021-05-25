const express = require('express');
const bodyParser = require('body-parser');
const talker = require('./talker.json');

const app = express();
app.use(bodyParser.json());

// app.use(function (err, req, res, next) {
//   res.status(500).send(`Algo deu errado! Mensagem: ${err.message}`);
// });

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', (_req, res) => {
  if (!talker) {
    return res.status(200).json([]);
  }
  res.status(200).json(talker);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
