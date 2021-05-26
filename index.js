const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');
const { logError } = require('./Middlewares');

const app = express();

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/login', router.loginRoute);
app.use('/talker', router.talkerRoute);
app.use(logError);

app.listen(PORT, () => {
  console.log('Online');
});
