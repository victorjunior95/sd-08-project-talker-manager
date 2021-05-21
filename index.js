const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
// const path = require('path');

const allData = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));

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

// 1 - Crie o endpoint GET /talker
// Os seguintes pontos serão avaliados:
// O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200, com o seguinte corpo:
// Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o status 200.
app.get('/talker', (_req, res) => {
  if (allData.length > 1) {
  return res.status(HTTP_OK_STATUS).send(allData);
  }
  return res.status(HTTP_OK_STATUS).send([]);
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker/:id', (req, res) => {
const idParams = req.params.id;
const palestrantId = allData.find((element) => element.id === Number(idParams));

if (palestrantId) {
  res.status(HTTP_OK_STATUS).send(palestrantId);
}
res.status(404).send({
  message: 'Pessoa palestrante não encontrada',
});
});
