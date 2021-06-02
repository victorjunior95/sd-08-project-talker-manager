/*
Muito da organização desse projeto foi sugestão da Rosi
Muito Obrigado Rosi =)
*/

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/routes');
const middleware = require('./src/middlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', router.talker);
app.use('/login', router.login);
app.use(middleware.handleErrors);

app.listen(PORT, () => {
  console.log('Online');
});
