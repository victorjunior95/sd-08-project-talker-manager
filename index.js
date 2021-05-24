const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path'); 
const { 
  syncData,
  // fsPromiseData1,
  // fsPromiseData2,
  // assigingFs1,
  // assigingFs2,
  // direct1,
  // promiseRs1 
} = require('./fsUsage/readFile.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// app.get('/', (_request, response) => {
//   response.status(HTTP_OK_STATUS).sendFile(path.join(__dirname, '/index.html'));
// }); // para brincar dps

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', async (_request, response) => {
  response.status(HTTP_OK_STATUS).send(
    // {
    // message: 'Olá Mundo',
    //  sync1: syncData, // ok
    //  assigment1: assigingFs1(), // não funfa com module exports
    //  assigment2: fsPromiseData2,
    //  direct1: await direct1(), // ok
    // //  direct2: await direct2(),
    // promise: await promiseRs1(), // ok com o await
    // }
    );
});

app.listen(PORT, () => {
  console.log('Online');
});

// 1 - Crie o endpoint GET /talker
// Os seguintes pontos serão avaliados:
// O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200, com o seguinte corpo: [...]
// Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o status 200.
app.get('/talker', (_req, res) => (syncData.length > 0 
  ? res.status(HTTP_OK_STATUS).send(syncData) : res.status(HTTP_OK_STATUS).send([]))); // o teste sempre pede pra retornar o arquivo JSON, pergunta do README está malfeita.

// 2 - Crie o endpoint GET /talker/:id
// O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1, com o seguinte corpo: [...]
// Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404 com o seguinte corpo: { "message": "Pessoa palestrante não encontrada" }
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

// 3 - Crie o endpoint POST /login
// Os seguintes pontos serão avaliados:
// O endpoint deve ser capaz de retornar um token aleatório de 16 caracteres que deverá ser utilizado nas demais requisições.

// O endpoint deverá o retornar o token gerado, da seguinte forma: [...]

const chars = [...'abcdefghijklmniopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'];
// and then just do:
const token = [...Array(16)].map((_usage) => chars[Math.random() * chars.length || 0]).join``;

app.post('/login', (req, res) => {
  const { name } = req.body;
res.status(HTTP_OK_STATUS).send({ message: name });
console.log(token);
});
