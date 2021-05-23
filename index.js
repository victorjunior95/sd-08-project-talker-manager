const express = require('express');
const bodyParser = require('body-parser');
// const rescue = require('express-rescue');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.route('/talker')
  .get(middlewares.getAllPeople)
  .post(middlewares.createTalker);

app.get('/talker/:id', middlewares.getPeopleById);

app.post('/login', middlewares.loginThisCorrect, middlewares.logged);

app.use(middlewares.error);

app.listen(PORT, () => {
  console.log('Online');
});
