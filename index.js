const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const middleware = require('./middlewares');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', middleware.getAllTalks);

app.get('/talker/:id', middleware.getTalkById);

app.post('/login', middleware.verifyLogin);

app.post('/talker', middleware.verifyToken, middleware.verifyTalker, middleware.addTalk);

app.listen(PORT, () => {
  console.log('Online');
});
