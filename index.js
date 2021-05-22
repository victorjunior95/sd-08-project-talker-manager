const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker/:id', middlewares.showOneMiddleware);

app.get('/talker', middlewares.showAllMiddleware);

app.post('/talker', middlewares.verifyToken, middlewares.createTalker);

app.post('/login', middlewares.loginMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
