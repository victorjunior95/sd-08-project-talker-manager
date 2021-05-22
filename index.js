const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { 
  syncData,
  fsPromiseData1,
  fsPromiseData2,
  assigingFs1,
  assigingFs2,
  direct1,
  promiseRs1 } = require('./fsUsage/readFile.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// app.get('/', (_request, response) => {
//   response.status(HTTP_OK_STATUS).sendFile(path.join(__dirname, '/index.html'));
// }); // para brincar dps

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', async (_request, response) => {
  response.status(HTTP_OK_STATUS).send({
    message: 'Olá Mundo',
    sync1: syncData,
     assigment1: assigingFs1(),
     assigment2: fsPromiseData2,
     direct1: await direct1(), 
    //  direct2: await direct2(),
    promise: await promiseRs1(),
    });
});

app.listen(PORT, () => {
  console.log('Online');
});
app.get('/talker', (_req, res) => {
  if (syncData.length > 0) {
  return res.status(HTTP_OK_STATUS).send(syncData);
  }
  return res.status(HTTP_OK_STATUS).send([]);
});

app.get('/talker/:id', (req, res) => {
const idParams = Number(req.params.id);
const palestrantId = syncData.find((element) => element.id === idParams);

if (!palestrantId) {
  res.status(404).send({
    message: 'Pessoa palestrante não encontrada',
  });
}
res.status(HTTP_OK_STATUS).send(palestrantId);
});

app.post('/login', (req, res) => {
  const { name } = req.body;
res.status(HTTP_OK_STATUS).send({ message: name });
});
