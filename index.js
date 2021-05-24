const express = require('express');
const bodyParser = require('body-parser');
const { 
  getAllTalkers,
  getSingleTalker,
  login, 
  addNewTalker, 
  alterTalker,
  checkToken,
  checkName,
  checkAge,
  checkDate,
  checkRate,
  deleteTalker,
  searchTalker,
 } = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', getAllTalkers);

app.get('/talker/search', checkToken, searchTalker);

app.get('/talker/:id', getSingleTalker);

app.post('/login', login);

app.post('/talker', [ 
  checkToken,
  checkName, 
  checkAge,
  checkDate,
  checkRate,
  addNewTalker,
]);

app.put('/talker/:id', [ 
  checkToken,
  checkName,
  checkAge,
  checkDate,
  checkRate,
  alterTalker,
]);

app.delete('/talker/:id', [
  checkToken,
  deleteTalker,
]);
