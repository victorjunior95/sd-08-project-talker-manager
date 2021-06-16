const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const TALKER_PATH = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const getAllTalkers = fs.readFileSync(TALKER_PATH, 'utf8');
  const talkers = getAllTalkers ? JSON.parse(getAllTalkers) : null;
  if (!talkers) return response.status(200).send({});
  return response.status(HTTP_OK_STATUS).send(talkers);
});

// app.get('/talker/:id', (_request, response) => {
//   const getAllTalkers = fs.readFileSync(TALKER_PATH, 'utf8');
//   const talkers = getAllTalkers ? JSON.parse(getAllTalkers) : null;

//   if (!talkers || talkers.length === 0) {
//     return response.status(200).send({
//         message: 'Pessoa palestrante não encontrada',
//   }); 
// }
//   return response.status(HTTP_OK_STATUS).send(talkers);
// });

app.listen(PORT, () => {
  console.log('Online');
});
