const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path'); 
const { 
  getSyncData, tokenGenerate,
  // fsPromiseData1,
  // fsPromiseData2,
  // assigingFs1,
  // assigingFs2,
  // direct1,
  // promiseRs1 
} = require('./functions/fsAndOthers.js');
const { emailPassValid } = require('./functions/validations/emailPassValid');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// app.get('/', (_request, response) => {
//   response.status(HTTP_OK_STATUS).sendFile(path.join(__dirname, '/index.html'));
// }); // para brincar dps

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send(
    // {
    // message: 'Olá Mundo',
    //  sync1: getSyncData, // ok
    //  assigment1: assigingFs1(), // não funfa com module exports
    //  assigment2: fsPromiseData2,
    //  direct1: await direct1(), // ok
    // //  direct2: await direct2(),
    // promise: await promiseRs1(), // ok com o await
    // }
    { message: tokenGenerate(10) },
    );
});

app.listen(PORT, () => {
  console.log('Online');
});

// 1 - Crie o endpoint GET /talker
// Os seguintes pontos serão avaliados:
// O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200, com o seguinte corpo: [...]
// Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o status 200.
app.route('/talker')
.get((_req, res) => (res.status(HTTP_OK_STATUS).send(getSyncData()))); // o teste sempre pede pra retornar o arquivo JSON, pergunta do README está malfeita.

// 2 - Crie o endpoint GET /talker/:id
// O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1, com o seguinte corpo: [...]
// Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404 com o seguinte corpo: { "message": "Pessoa palestrante não encontrada" }
app.get('/talker/:id', (req, res) => {
const idParams = Number(req.params.id);
const palestrantId = getSyncData().find((element) => element.id === idParams);

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

// O endpoint deverá o retornar o token gerado, da seguinte forma: [{token: tokenGenerated}]
// Há mais instruções no functions > validations > emailPassValid

app.post('/login', 
[
  emailPassValid, (_req, res) => {
  const tokenGenerated = tokenGenerate(16);
res.status(HTTP_OK_STATUS).send({ token: tokenGenerated });
},
]);
