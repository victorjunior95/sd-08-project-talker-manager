const express = require('express');
const bodyParser = require('body-parser');
const rescue = require('express-rescue');
const Middleware = require('./middlewares/index');
const functions = require('./functions');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const pathTalker = './talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', rescue((_request, response) => {
  const fileContent = JSON.parse(functions.readFile(pathTalker));
  const emptyArray = [];
  if (!fileContent) response.status(HTTP_OK_STATUS).send(emptyArray);
  response.status(HTTP_OK_STATUS).json(fileContent);
}));

app.get('/talker/:id', rescue((request, response) => {
  const { id } = request.params;
  const intID = parseInt(id, 10);
  const fileContent = JSON.parse(functions.readFile(pathTalker));
  const result = functions.findPerson(intID, fileContent);
  if (result) return response.status(HTTP_OK_STATUS).json(result);
  response.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
}));

app.use(Middleware.erroMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
