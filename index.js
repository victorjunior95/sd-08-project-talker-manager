const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path'); 
const { req6Responses } = require('./functions/validations/JsonResponseMessages.json');
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
app.get('/', (_request, response) => response.status(HTTP_OK_STATUS).send(
    // {
    // message: 'Olá Mundo',
    //  sync1: getSyncData, // ok
    //  assigment1: assigingFs1(), // não funfa com module exports
    //  assigment2: fsPromiseData2,
    //  direct1: await direct1(), // ok
    // //  direct2: await direct2(),
    // promise: await promiseRs1(), // ok com o await
    // }
    ));

// 7 - Crie o endpoint GET /talker/search?q=searchTerm (a partir do ? na verdade não é a rota, mas o exemplo. README enganativo)
// Os seguintes pontos serão avaliados:
// O endpoint deve retornar um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL. Devendo retornar o status 200, com o seguinte corpo:
// queryExemplo => /search?q=Ke
// corpo: [{id: 1, name: "Keanu Reeves", age: 56, talk: { watchedAt: "22/10/2019", rate: 5, } }];
app.get('/talker/search', [tokenValidation, (req, res) => {
  try {
    const queryString = req.query.q;
    const allTalkers = getSyncData();
    const founded = allTalkers.filter((palestrant) => palestrant.name.includes(queryString));
    return res.status(200).send(founded);
  } catch (error) {
    return res.status(500).send({ error });
  }
}]);

// 1 - Crie o endpoint GET /talker
// Os seguintes pontos serão avaliados:
// O endpoint deve retornar um array com todas as pessoas palestrantes cadastradas. Devendo retornar o status 200, com o seguinte corpo: [...]
// Caso não exista nenhuma pessoa palestrante cadastrada o endpoint deve retornar um array vazio e o status 200.
app.get('/talker', (_req, res) => {
  try {
    const allTalkers = getSyncData();
    return res.status(HTTP_OK_STATUS).send(allTalkers); // o teste sempre pede pra retornar o arquivo JSON, desnecessário if/else, como o README induz a crer.
  } catch (error) {
    return res.status(500).send({ error });
  }
}); 

// 2 - Crie o endpoint GET /talker/:id
// O endpoint deve retornar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200 ao fazer uma requisição /talker/1, com o seguinte corpo: [...]
// Caso não seja encontrada uma pessoa palestrante com base no id da rota, o endpoint deve retornar o status 404 com o seguinte corpo: { "message": "Pessoa palestrante não encontrada" }
app.get('/talker/:id', (req, res) => {
  try {
    const idParams = Number(req.params.id);
    const palestrantId = getSyncData().find((element) => element.id === idParams);
    if (!palestrantId) {
    return res.status(404).send({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    res.status(HTTP_OK_STATUS).send(palestrantId);
  } catch (error) {
    return res.status(500).send({ error });
  }
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
    try {
      const tokenGenerated = tokenGenerate(16);
    return res.status(HTTP_OK_STATUS).send({ token: tokenGenerated });
    } catch (error) {
      return res.status(500).send({ error });
    }
},
]);

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
app.post('/talker', [
  tokenValidation,
  nameAgeValidation, 
  talkObjValidation,
  talkComponentsValidation, 
  // Caso esteja tudo certo, retorne o status 201 e a pessoa cadastrada.
  // O endpoint deve retornar o status 201 e a pessoa palestrante que foi cadastrada, da seguinte forma: { "id": 1, "name": "Danielle Santos", "age": 56, "talk": { "watchedAt": "22/10/2019", "rate": 4 } }
  ((req, res) => {
    try {
      const allTalkers = getSyncData();
      const newTalker = req.body;
      newTalker.id = allTalkers.length + 1;
      allTalkers.push(newTalker);
      writeSyncData('./talker.json', allTalkers);
      return res.status(201).send(newTalker);
    } catch (error) {
      return res.status(500).send({ error });
    }
  }),
]);

// 5 - Crie o endpoint PUT /talker/:id
// Os seguintes pontos serão avaliados:
// O endpoint deve ser capaz de editar uma pessoa palestrante com base no id da rota, sem alterar o id registrado.
// O corpo da requisição deverá ter o seguinte formato: (praticamente uma repetição do exercício 4)
// Caso esteja tudo certo, retorne o status 200 e a pessoa editada.
// O endpoint deve retornar o status 200 e a pessoa palestrante que foi editada, dá seguinte forma:
// { "id": 1, "name": "Danielle Santos", "age": 56, "talk": { "watchedAt": "22/10/2019", "rate": 4 } }
app.put('/talker/:id', [
  tokenValidation,
  nameAgeValidation, 
  talkObjValidation,
  talkComponentsValidation, (req, res) => {
    try {
      const idParams = Number(req.params.id);
      const everyData = getSyncData();
      let toUpdate = getSyncData().find((element) => element.id === idParams);
      const requestBody = req.body;  
      requestBody.id = toUpdate.id;
      if (toUpdate) {
       const dataUpdate = everyData.filter((element) => element.id !== idParams);
        toUpdate = requestBody;
        dataUpdate.push(toUpdate);
        dataUpdate.sort((a, b) => (a.id > b.id ? 1 : -1));
       writeSyncData('./talker.json', dataUpdate);
       return res.status(200).send(requestBody);
      }
    } catch (error) {
      return res.status(500).send({ error });
    }
}]);

// 6 - Crie o endpoint DELETE /talker/:id
// Os seguintes pontos serão avaliados:
// A requisição deve ter o token de autenticação nos headers. (repetir tudo que envolve o token)
// O endpoint deve deletar uma pessoa palestrante com base no id da rota. Devendo retornar o status 200, com o seguinte corpo: { "message": "Pessoa palestrante deletada com sucesso" }
app.delete('/talker/:id', [tokenValidation, (req, res) => {
  try {
    const allTalkers = getSyncData();
    const idParams = req.params.id;
    const deleteUpdate = allTalkers.filter((talker) => talker.id !== idParams);
    writeSyncData('./talker.json', deleteUpdate); // o requisito pede para deletar do arquivo json, mas não pede a pessoa deletada;
    return res.status(201).send(req6Responses[0]);
  } catch (error) {
    return res.status(500).send({ error });
  }
}]);

app.listen(PORT, () => console.log('Online'));
