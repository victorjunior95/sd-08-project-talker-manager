const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path'); 
const { 
  getSyncData, tokenGenerate, writeSyncData,
  // fsPromiseData1,
  // fsPromiseData2,
  // assigingFs1,
  // assigingFs2,
  // direct1,
  // promiseRs1 
} = require('./functions/fsAndOthers.js');
const { loginValidation } = require('./functions/validations/loginValidation');
const { tokenValidation } = require('./functions/validations/tokenValidation.js');
const { nameAgeValidation } = require('./functions/validations/nameAgeValidation.js');
const {
   talkObjValidation, 
   talkComponentsValidation } = require('./functions/validations/talkValidation.js');

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
.get((_req, res) => {
  const allTalkers = getSyncData();
  return res.status(HTTP_OK_STATUS).send(allTalkers); // o teste sempre pede pra retornar o arquivo JSON, pergunta do README está malfeita.
}) 
// 4 - Crie o endpoint POST /talker
// Os seguintes pontos serão avaliados:
// O endpoint deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo;
// O corpo da requisição deverá ter o seguinte formato:
// {
//   "name": "Danielle Santos",
//   "age": 56,
//   "talk": {
//     "watchedAt": "22/10/2019",
//     "rate": 5
//   }
// }
// Aí vem as instruções de loginValidation; então nameAgeValidation; então talkValidation[talkObjValidation, talkComponentsValidation];
.post([
  tokenValidation,
  nameAgeValidation, 
  talkObjValidation,
  talkComponentsValidation, 
  // Caso esteja tudo certo, retorne o status 201 e a pessoa cadastrada.
  // O endpoint deve retornar o status 201 e a pessoa palestrante que foi cadastrada, da seguinte forma:
  // {
  //   "id": 1,
  //   "name": "Danielle Santos",
  //   "age": 56,
  //   "talk": {
  //     "watchedAt": "22/10/2019",
  //     "rate": 5
  //   }
  // }
  ((req, res) => {
    const allTalkers = getSyncData();
    const newTalker = req.body;
    newTalker.id = allTalkers.length + 1;
    allTalkers.push(newTalker);
    writeSyncData('./talker.json', allTalkers);
    return res.status(201).send({ message1: newTalker, message2: (allTalkers) });
  }),
]);

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
// Há mais instruções no functions > validations > [loginValidation, nameAgeValidation, talkValidation]

app.post('/login', 
[
  loginValidation,
  (_req, res) => {
  const tokenGenerated = tokenGenerate(16);
res.status(HTTP_OK_STATUS).send({ token: tokenGenerated });
},
]);
